import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory name (since __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a writable stream to logs.txt in append mode
const logStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' });

const requestLogger = (req, res, next) => {
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url} | IP: ${req.ip} | User-Agent: ${req.headers['user-agent']}\n`;

    logStream.write(logEntry); // Write to file
    console.log(logEntry.trim()); // Optional: log to console

    next(); // Continue to next middleware
};

export default requestLogger;
