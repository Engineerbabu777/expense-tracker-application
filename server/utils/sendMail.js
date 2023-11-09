import nodemailer from 'nodemailer'

export const resetPasswordMail = async (email, token) => {
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
    text: `Follow the link to reset your password: http://localhost:4444/resetPassword/${token}`
  }

  // SEND EMAIL!
  try {
    console.log('Sending mail...')
    const email = await transporter.sendMail(mailOptions)
    console.log('mail sent')
    console.log('Email Data', email)
  } catch (error) {
    console.log('Error while sending email!')
  }
}

export const expenseVoilationMail = async (
  email,
  categoryDATA,
  limitExceedsAmount
) => {
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
    subject: 'Monthly Budget Limit Breach',
    text: `You have exceeded the monthly limit for the month(
      ${categoryDATA.month}, ${categoryDATA.year})
     by ${limitExceedsAmount} of category name as ${categoryDATA?.categoryId?.categoryName}`
  }

  // SEND EMAIL!
  try {
    console.log('Sending mail...')
    const email = await transporter.sendMail(mailOptions)
    console.log('mail sent')
    console.log('Email Data', email)
    return email
  } catch (error) {
    console.log('Error while sending email!')
  }
}

export const userAccountDeactivationMail = async (email, token) => {
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
    subject: 'Your account is deactivated',
    text: `Follow the link to to activate your account: http://localhost:4444/api/user/activate/${token} . you won't be able to activate it after 30 days`
  }

  // SEND EMAIL!
  try {
    console.log('Sending mail...')
    const email = await transporter.sendMail(mailOptions)
    console.log('mail sent')
    console.log('Email Data', email)
  } catch (error) {
    console.log('Error while sending email!')
  }
}
