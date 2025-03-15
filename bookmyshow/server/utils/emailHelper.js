const nodeMailer = require('nodemailer');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

function replaceContent(content, creds) {
    const allKeysArray = Object.keys(creds);
    allKeysArray.forEach(key => {
        content = content.replace(`#(${key})`, creds[key]);
    });
    return content;
}

async function EmailHelper(templateName, receiverEmail, subject, creds) {

    try {

        const templatePath = path.join(__dirname, "email_templates", templateName);
        let content = await fs.promises.readFile(templatePath, 'utf-8');

        const emailDetails = {
            to: receiverEmail,
            from: 'pradeepy1121@gmail.com',
            subject: subject,
            text: `Hi ${creds.name}, this is your otp ${creds.otp}`,
            html: replaceContent(content, creds)
        }


        const transportDetails = {
            host: "smtp.sendgrid.net",
            port: 587,
            auth: {
                user: "apikey",
                pass: SENDGRID_API_KEY
            }
        }


        const transporter = nodeMailer.createTransport(transportDetails);
        await transporter.sendMail(emailDetails);
        console.log("Email sends Successfully.")


    } catch (error) {
        console.log("Error", error);
    }

}

module.exports = { EmailHelper };