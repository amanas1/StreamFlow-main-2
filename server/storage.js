const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const storage = {

    load(key, defaultValue = []) {
        const filePath = path.join(DATA_DIR, `${key}.json`);
        try {
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(content);
            }
        } catch (error) {
            console.error(`[STORAGE] Error loading ${key}:`, error);
        }
        return defaultValue;
    },

    save(key, data) {
        const filePath = path.join(DATA_DIR, `${key}.json`);
        const tempPath = filePath + '.tmp';

        try {
            const json = JSON.stringify(data, null, 2);
            fs.writeFileSync(tempPath, json, 'utf8');
            fs.renameSync(tempPath, filePath);
        } catch (error) {
            console.error(`[STORAGE] Error saving ${key}:`, error);
        }
    }
};

module.exports = storage;
