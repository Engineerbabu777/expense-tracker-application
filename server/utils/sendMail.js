
import nodemailer from 'nodemailer';

export const resetPasswordMail = async(email, token) => {

  console.log('ENTRING')
  const transporter = nodemailer.createTransport({
    // CONFIGURATION!
    service: 'gmail',
    auth: {
      user: 'projectbase999@gmail.com',
      pass: 'yjrf hpvb zoyd ijmd'
    }
  })

  // COMPOSE THE EMAIL MESSAGE!
  const mailOptions = {
    from: 'projectbase999@gmail.com',
    to: email,
    subject: 'Reset Your Password',
    text: `Follow the link to reset your password: http://localhost:3000/resetPassword/${token}`
  }

  // SEND EMAIL!
  try {
    console.log('Sending mail...');
     const email = await transporter.sendMail(mailOptions);
     console.log('mail sent');

  } catch (error) {
    console.log('Error while sending email!');
  }
}
