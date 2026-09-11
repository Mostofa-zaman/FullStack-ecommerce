const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function sendVerificationEmail(email,token){
    try {
  const info = await transporter.sendMail({
    from: 'mostofazaman1234@gmail.com', // sender address
    to: email, // list of recipients
    subject: "Verify your email", // subject line
    text: `Please click the following link to verify your email: http://localhost:3000/verify-email?token=${token}`, // plain text body
    html: `<p>Please click the following link to verify your email: <a href="http://localhost:3000/verify-email?token=${token}">Click here</a></p>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

module.exports = {sendVerificationEmail}