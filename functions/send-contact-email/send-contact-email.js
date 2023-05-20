require('dotenv').config();

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  FROM_EMAIL_ADDRESS,
  CONTACT_TO_EMAIL_ADDRESS,
} = process.env;

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  if (
    !data.subject ||
    !data.message ||
    !data.contactName ||
    !data.contactEmail
  ) {
    return { statusCode: 422, body: 'Name, email, and message are required.' };
  }

  console.log(
    MAILGUN_API_KEY,
    MAILGUN_DOMAIN,
    FROM_EMAIL_ADDRESS,
    CONTACT_TO_EMAIL_ADDRESS,
    data
  );

  const mg = mailgun({
    apiKey: MAILGUN_API_KEY,
    domain: MAILGUN_DOMAIN,
  });

  mg.messages().send(
    {
      from: `Confidence Website <${FROM_EMAIL_ADDRESS}>`,
      to: [CONTACT_TO_EMAIL_ADDRESS],
      'h:Reply-To': data.contactEmail,
      subject: `Novo contato: ${data.subject}`,
      text: `Name: ${data.contactName}\nEmail: ${data.contactEmail}\nMessage:\n${data.message}`,
      html: '',
    },
    (error, body) => {
      if (error) {
        return console.log(error);
      }

      callback(null, {
        statusCode: 200,
        body: 'Mail sent',
      });
    }
  );
};
