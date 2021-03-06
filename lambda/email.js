const SparkPost = require('sparkpost')

const client = new SparkPost(process.env.SPARKPOST)

const successCode = '200'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

exports.handler = function (event, context, callback) {
  console.log(event)
  const data = JSON.parse(event.body)
  const { email, subject, message } = data
  client.transmissions
    .send({
      options: {
        sandbox: true,
      },
      content: {
        from: email,
        subject,
        html: message,
      },
      recipients: [{ address: 'karentatsch@gmail.com' }],
    })
    .then(response => {
      console.log('Mail has been sent successfully!', response)
      callback(null, {
        statusCode: successCode,
        headers,
        body: JSON.stringify(response),
      })
      console.log(response)
    })
    .catch(err => {
      console.log('Whoops! Something went wrong')
      console.log(err)
    })
}