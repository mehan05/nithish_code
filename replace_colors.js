const fs = require('fs');
const path = require('path');

const colorMap = {
    '#1B4332': '#1B4332',
    '#1B4332': '#1B4332',
    '#0F2D1E': '#0F2D1E',
    '#0F2D1E': '#0F2D1E',
    '#2D6A4F': '#2D6A4F',
    '#2D6A4F': '#2D6A4F',
    '#40916C': '#40916C',
    '#40916C': '#40916C',
    '#D8F3DC': '#D8F3DC',
    '#D8F3DC': '#D8F3DC',
    '#F7F9F7': '#F7F9F7',
    '#F7F9F7': '#F7F9F7',
    '#2D6A4F': '#2D6A4F',
    '#2D6A4F': '#2D6A4F',
    '#1B4332': '#1B4332',
    '#1B4332': '#1B4332',
    '#2D6A4F': '#2D6A4F',
    '#2D6A4F': '#2D6A4F',
    '#FFFFFF': '#FFFFFF',
    '#FFFFFF': '#FFFFFF',
};

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (/\.(tsx|ts|css|js|jsx)$/.test(file)) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('p:\\nithish_project\\code');

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;
        for (const [oldColor, newColor] of Object.entries(colorMap)) {
            const regex = new RegExp(oldColor, 'g');
            newContent = newContent.replace(regex, newColor);
        }
        
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    } catch (e) {
        console.error(`Failed ${file}: ${e}`);
    }
});
