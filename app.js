const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const config = require('./config');
const sgMail = require('@sendgrid/mail');
const path = require('path');
//access Sendgrid API key 
sgMail.setApiKey(config.SENDGRID_API_KEY);
// Generate a JWT token to authenticate and make Zoom API calls 
const payload = {
    iss: config.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.ZOOM_API_SECRET);
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.send("Power your app with Webhooks!");

});

// Set up a webhook listener for your Webhook Event - in this case we are listening to Webinar Ended event but you can add any events of your choice.
app.post('/', bodyParser.raw({ type: 'application/json' }), (req, res) => {

    let event;

    try {
        event = JSON.parse(req.body);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Check to see if you received the event or not.
    console.log(event)
    if (req.headers.authorization === config.VERIFICATION_TOKEN) {
        res.status(200);

        console.log("Webinar Ended Webhook Recieved.") 

        res.send();
        var uuid = event.payload.object.uuid;
        //Double encode the uuid for validation incase it contains slashes
        var euuid = encodeURIComponent(encodeURIComponent(uuid));

        var options = {
            uri: "https://api.zoom.us/v2/past_webinars/" + euuid + "/absentees",
            auth: {
                'bearer': token
            },
            headers: {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            },
            json: true
        };



        rp(options)
            .then(function (response) {

                var myregistrantobj= response.registrants;
                //console.log("Registrants:", myregistrantobj)
                //fetch only the email addresses from the response and store the addresses in an array
                
                var emailList = []
                for (var i = 0; i < myregistrantobj.length; i++) {
                    //Store emails as an array of strings to match the request body for SendGrid API
                    emailobjs = myregistrantobj[i].email
                    emailList.push(emailobjs);
                    
                }
              
                // check if the emails have been fetched or not by printing to the console
                console.log(emailList);
                
                // Call SendGrid Email API to send the email to participants. You can customize the email content as you like.

                const msg = {

                    to: emailList,
                    from: 'provideyouremailaddresshere@gmail.com',
                    subject: 'We are sorry that we missed you.',
                    text: 'Please, let us know if the timing of these webinars do not work for you. We hope you can join us next time.'

                };
                
                return msg;

            })
            .then(function(msg) {
                sgMail.sendMultiple(msg);
            })
            .then(function(){
                console.log("Email sent.")
            })
            
            .catch(function (err) {
                // API call failed...
                console.log('API call failed, reason ', err);
            });


    } else {

        res.status(403).end('Access forbidden');
        console.log("Invalid Post Request.")
    }
});



app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})
