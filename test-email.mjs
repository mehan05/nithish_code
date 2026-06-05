import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

async function testEmail() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RECEIVER_EMAIL } = process.env;

  console.log("Checking credentials...");
  console.log("Host:", SMTP_HOST);
  console.log("Port:", SMTP_PORT);
  console.log("User:", SMTP_USER);
  console.log("Pass (first 4 chars):", SMTP_PASS ? SMTP_PASS.substring(0,4) + '...' : 'MISSING');
  console.log("Receiver:", RECEIVER_EMAIL);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    console.log("Attempting to connect and send test email...");
    const info = await transporter.sendMail({
      from: `"Test Bot" <${SMTP_USER}>`,
      to: RECEIVER_EMAIL,
      subject: "Test Email Setup",
      text: "If you receive this, Nodemailer is working perfectly!",
    });
    console.log("Success! Email sent. Message ID:", info.messageId);
  } catch (err) {
    console.error("Failed to send email. Detailed Error:");
    console.error(err);
  }
}

testEmail();
