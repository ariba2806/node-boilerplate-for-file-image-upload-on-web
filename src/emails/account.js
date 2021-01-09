// /*
// *****************************************************************************************************
//                                                    NOTE

// In order for mailing service to work, you need to have custom domain, set up sendgrid's sender
// authentication with your domain.
// If the email is in spam folder, make sure your email is verified and the domain is verifid with
// sendgrid.
// See docs for linking custom domain at:
// https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-link-branding/

// *****************************************************************************************************
// */

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'geekysam7@gmail.com',
    subject: '#FinoAllaFine',
    text: `Welcome to app, ${name}.`
  })
}

const sendGoodByeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'geekysam7@gmail.com',
    subject: 'Why?',
    text: `${name} chlo tapri ki chai peene chlte hain, aap pakka wapas sign up kroge.. .`
  })
}


module.exports = {
  sendWelcomeEmail,
  sendGoodByeEmail
}
