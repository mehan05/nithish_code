import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, companyName, customerName, email, productName, quantity, country, message, newsletterEmail } = body;

    // Verify env vars
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RECEIVER_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !RECEIVER_EMAIL) {
      console.warn("SMTP credentials or RECEIVER_EMAIL are not set in .env. Form submission received but email was not sent.");
      return NextResponse.json({ success: true, warning: "Email not sent due to missing configuration." });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // 1. Try saving to Supabase if configured
    const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;
    if (NEXT_PUBLIC_SUPABASE_URL && NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);
        const { error } = await supabase
          .from('inquiries')
          .insert([
            {
              type,
              company_name: companyName,
              customer_name: customerName,
              email: email || newsletterEmail,
              country,
              product_name: productName,
              quantity,
              message
            }
          ]);
        if (error) {
          console.error("Supabase insert error:", error);
        } else {
          console.log("Successfully saved inquiry to Supabase.");
        }
      } catch (dbErr) {
        console.error("Failed to connect to Supabase:", dbErr);
      }
    }

    let subject = "";
    let htmlContent = "";

    if (type === "quote") {
      subject = `New Bulk Inquiry from ${customerName || companyName} (${country})`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; color: #333;">
          <div style="background-color: #0F2D1E; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">Plentra Exports</h2>
            <p style="color: #A0AEC0; margin: 5px 0 0 0; font-size: 14px;">New Bulk Inquiry Received</p>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 16px; line-height: 1.5; margin-top: 0;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.5;">You have received a new bulk inquiry from your website. Here are the details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 15px;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-weight: bold; width: 40%;">Company Name</td>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-weight: bold;">Contact Person</td>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-weight: bold;">Business Email</td>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;"><a href="mailto:${email}" style="color: #2D6A4F; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-weight: bold;">Destination Country</td>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-weight: bold;">Product Needed</td>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;"><strong>${productName}</strong></td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-weight: bold;">Quantity Required</td>
                <td style="padding: 12px; border-bottom: 1px solid #edf2f7; color: #1a202c;">${quantity}</td>
              </tr>
            </table>

            <div style="margin-top: 25px; padding: 20px; background-color: #f7fafc; border-left: 4px solid #2D6A4F; border-radius: 4px;">
              <h4 style="margin: 0 0 10px 0; color: #2d3748; font-size: 14px; text-transform: uppercase;">Additional Message</h4>
              <p style="margin: 0; color: #4a5568; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message || "<em style='color: #a0aec0;'>No additional message provided.</em>"}</p>
            </div>
            
            <div style="margin-top: 35px; text-align: center;">
              <a href="mailto:${email}" style="background-color: #2D6A4F; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; font-size: 14px; display: inline-block;">Reply to Inquiry</a>
            </div>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #a0aec0;">This email was automatically generated from the Plentra Exports website form.</p>
          </div>
        </div>
      `;
    } else if (type === "newsletter") {
      subject = `New Newsletter Subscription`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; color: #333;">
          <div style="background-color: #0F2D1E; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">Plentra Exports</h2>
            <p style="color: #A0AEC0; margin: 5px 0 0 0; font-size: 14px;">Newsletter Subscription</p>
          </div>
          <div style="padding: 30px; background-color: #ffffff; text-align: center;">
            <p style="font-size: 16px; line-height: 1.5;">You have a new subscriber to your newsletter!</p>
            <div style="margin: 20px auto; padding: 15px; background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 5px; display: inline-block;">
              <strong style="color: #2D6A4F; font-size: 18px;">${newsletterEmail}</strong>
            </div>
          </div>
        </div>
      `;
    } else {
      return NextResponse.json({ success: false, error: "Invalid submission type" }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Plentra Exports Website" <${SMTP_USER}>`,
      to: RECEIVER_EMAIL,
      replyTo: email || newsletterEmail,
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
