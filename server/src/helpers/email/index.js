const nodemailer = require('nodemailer');
const { primary } = require('../variables/colors');
const { PRODUCTION } = require('../variables/constants/config');
const {
  CLIENT_URL,
  NODE_ENV,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_LOGIN,
  EMAIL_PASSWORD,
} = require('../../config');

const transport = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: Number(EMAIL_PORT) === 465,
  auth: { user: EMAIL_LOGIN, pass: EMAIL_PASSWORD },
  tls: { rejectUnauthorized: NODE_ENV === PRODUCTION },
});

const sendEmail = async (user) => new Promise((resolve, reject) => {
  transport.sendMail(
    {
      from: `"Dream Shop" <${EMAIL_LOGIN}>`,
      to: user.email,
      subject: 'Odzyskiwanie hasła',
      text: `
    Aby odzyskać hasło do swojego konta, kliknij w poniższy link i postępuj zgodnie z dalszymi instrukcjami.

    Link do zmiany hasła: ${CLIENT_URL}/odzyskaj/${user.reset_password_token}

    Jeżeli jednak to nie Ty wysyłałeś/wysyłałaś prośbę o przywrócenie hasła, zignoruj tę wiadomość i sprawdź swoje konto.
    `,
      html: `
    <p>Aby odzyskać hasło do swojego konta, kliknij w poniższy link i postępuj zgodnie z dalszymi instrukcjami.</p>
    <a href="${CLIENT_URL}/odzyskaj/${user.reset_password_token}" style="color:${primary};" title="Przejdź do strony zmiany hasła">${CLIENT_URL}/odzyskaj/${user.reset_password_token}</a>
    <p>Jeżeli jednak to nie Ty wysyłałeś/wysyłałaś prośbę o przywrócenie hasła, zignoruj tę wiadomość i sprawdź swoje konto.</p>
    `,
    },
    (err, info) => {
      if (err) {
        reject(err);
      }

      resolve(info);
    },
  );
});

module.exports = {
  sendEmail,
};
