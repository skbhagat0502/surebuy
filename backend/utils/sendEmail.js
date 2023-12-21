import nodeMailer from "nodemailer";
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_SERVICE,
  SMTP_PORT,
  SMTP_MAIL,
} from "../constants.js";

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    service: SMTP_SERVICE,
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    html: options.message.html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
