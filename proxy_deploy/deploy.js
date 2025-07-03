import ftp from "basic-ftp";
import path from "path";
import {config} from "dotenv";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config(); // Load variables from .env file

// Define the local directory to upload and the remote base directory.
const localDir = path.join(__dirname, "../proxy");
const remoteDir = process.env.REMOTE_DIR;

console.log(`Initializing preparations to upload from local directory: '${localDir}' to remote directory: '${remoteDir}'`);

async function uploadDirectory() {
    const client = new ftp.Client();
    // Set to true for detailed logging in the console
    client.ftp.verbose = false;

    try {
        // Connect to the FTP server using credentials from the .env file
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: process.env.SECURE === "true", // Use secure connection if specified
        });

        console.log("FTP connection successful");

        // Ensure the target remote directory exists
        await client.ensureDir(remoteDir);
        console.log(`Remote directory '${remoteDir}' is ready`);

        // Clear the remote directory before uploading
        await client.cd(remoteDir);
        console.log(`Changed to remote directory: '${remoteDir}'`);
        console.log(`Clearing contents of remote directory: '${remoteDir}'...`);
        await client.clearWorkingDir();
        console.log(`Cleared contents of remote directory: '${remoteDir}'`);

        // Change back to the root directory to start the upload
        await client.cd("/");
        console.log("Changed back to root directory");

        // Upload the entire directory
        console.log(`Uploading contents from '${localDir}' to '${remoteDir}'...`);
        await client.uploadFromDir(localDir, remoteDir);
        console.log("Upload complete!");

    } catch (err) {
        console.error("FTP Error:", err);
    } finally {
        // Ensure the connection is closed.
        if (!client.closed) {
            client.close();
            console.log("FTP connection closed");
        }
    }
}

// Run the upload process.
await uploadDirectory();
