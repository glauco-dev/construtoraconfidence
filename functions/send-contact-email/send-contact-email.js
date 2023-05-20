const fetch = require("node-fetch");

exports.handler = async (event, context, callback)  => {
  const data = JSON.parse(event.body);
  if (
    !data.subject ||
    !data.message ||
    !data.contactName ||
    !data.contactEmail
  ) {
    return { statusCode: 422, body: 'Name, email, and message are required.' };
  }

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email
  await fetch(`${process.env.URL}/.netlify/functions/emails/contact`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
    },
    method: "POST",
    body: JSON.stringify({
      from: data.contactEmail,
      to: "contato@construtoraconfidence.com",
      subject: data.subject,
      parameters: {
        contactName: data.contactName,
        message: data.message,
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Email de contato enviado!"),
  };
};
