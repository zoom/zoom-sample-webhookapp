# Sample Zoom Webhook App 

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

This is a sample app that demonstrates how to automate a part of the Webinar communications workflow using Zoom Webhooks, Zoom API and Sendgrid Email API.

**Prerequisites:**
* [Zoom account](https://zoom.us) with Webinar License
* [Zoom Marketplace Account](https://marketplace.zoom.us/docs/guides)
* A Free Trial [SendGrid Twilio Account](https://sendgrid.com/pricing/)

### Workflow

[![Screen-Shot-2020-03-13-at-12-28-36-PM.png](https://i.postimg.cc/zBZ8vZQ2/Screen-Shot-2020-03-13-at-12-28-36-PM.png)](https://postimg.cc/xkRWp7nL)


1. Start a Webinar that has "Registration Required" option enabled and end it.
2. A "Webinar Ended Event" will be sent to your app's Endpoint Notification URL. 
3. After the Webinar ends, the Sample Webhook App will fetch the list of Webinar absentees and send a sample email to the absentees.

### Steps to succesfully run the app locally: 
1. Schedule a Zoom Webinar with "Registration Required" option enabled from [Zoom Web Portal](https://zoom.us/webinar/list). A Zoom Webinar License is required to schedule Zoom Webinars. 

2. Once the Webinar is scheduled, share the Registration Link with others so that they can register for the Webinar.

3. Create a [JWT app](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-jwt-app) in the Zoom App Marketplace. Provide all the information required and your app credentials will be generated. In the features page,add a new [event subscription](https://marketplace.zoom.us/docs/guides/getting-started/app-types/create-jwt-app#features). <br><br>For the **Event notification endpoint URL**, use [ngrok](https://ngrok.com/download) or a similar service to generate a HTTP tunnel. Once you download ngrok, run `./ngrok http 3000.` command in your terminal. Provide the generated url starting with "https" as your Event notification endpoint URL. Under Event Types, click on Webinar and subscribe to the "Webinar Ended" event. Save the subscription and click "Continue". Your JWT app will be activated in your account. From this app, you will need the generated **API Key**, **API Secret** and **Verification Token**. 

[![Screen-Shot-2020-03-13-at-9-15-28-AM.png](https://i.postimg.cc/L659yMrw/Screen-Shot-2020-03-13-at-9-15-28-AM.png)](https://postimg.cc/LndFXG43)

4. Create a free trial [SendGrid Twilio](https://sendgrid.com/pricing/) account. Login to your account, visit their [integration page](https://app.sendgrid.com/guide/integrate/langs/nodejs) and create an **API Key**. You will use this API Key at a later step. 

5. Clone this repository by running this git command in your terminal: `git clone https://github.com/ShrijanaCodes/SampleWebhookApp.git`
6. Install all the dependencies by running `npm install` command in your terminal.
7. Create a .env file and a gitignore file by running this command in your terminal: `touch .env .gitignore`
8. Open the .env file in your editor and include the following variables and their values in this file:
```
APIKey='Provide Your Zoom API Key Generated in Step 2 Here'
APISecret='Provide Your Zoom API Secret Generated in Step 2 Here'
VerificationToken='Provide Your Zoom App Verification Token Generated in Step 2 Here'
SENDGRID_API_KEY='Provide Your SendGrid API Key Generated in Step 4 Here'
```
9. Add the ".env" file to the ".gitignore" file either by using your editor or by running `echo ".env" >> .gitignore` command in your terminal. This way, you will minimize the risk of exposing your credentials as Git will ignore the .env file.

10. In the "app.js" file, provide your email address in the "from" variable located inside the "msg" object. You can also edit the values of the "subject" and "text" fields. 

11. Start the app by running `node app.js` command in your terminal. 

12. Voila! Your app will be up and running on port 3000. While your app is running, start your Scheduled Webinar and end it. Once the Webinar is ended, if any attendee who had registered for the Webinar, did not actually attend the Webinar, they will recieve an automated email after the Webinar Ends.  

In this demo app, we have used Webinar Ended Event, List Absentees API and SendGrid Send Email API. However, you can customize the workflow based on your needs by using any available Zoom APIs and Webhooks. 


**Deliver Happiness with Zoom Services** :grinning:	 **Happy Coding** :innocent:	

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.

