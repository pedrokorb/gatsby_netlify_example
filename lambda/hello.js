const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);


// For more info, check https://docs.netlify.com/functions/build-with-javascript
module.exports.handler = async function(event, context, callback) {
  console.log(event)
  client.transmissions
    .send({
      content: {
        from: 'pedro.korb@gmail.com',
        subject: "TESTE",
        html: '<html><body><p>Send an email</p></html></body>'
      },
      recipients: [{ address: 'pedro.korb@gmail.com' }]
    })
    .then(data => {
      callback(null, {
        statusCode: 200,
        body: 'So far so good'
      })
    })
}

// Now you are ready to access this API from anywhere in your Gatsby app! For example, in any event handler or lifecycle method, insert:
// fetch("/.netlify/functions/hello")
//    .then(response => response.json())
//    .then(console.log)
// For more info see: https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/#static-dynamic-is-a-spectrum
