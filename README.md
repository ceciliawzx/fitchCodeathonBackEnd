# EventMaster

### Please notice that this repository is the back end rep, you will need to deploy this project in order to run the front end. 
### Url for frontend repository: https://github.com/ceciliawzx/fitchCodeathon
### Please also notice that we used AWS Amplify to deploy the back end code, you will need to follow other deployment instructions if you would like to use your own servers. 


#
## Prequests

#### Before you begin, make sure you have the following prerequisites met:
#### 1. Create your Own AWS account (if you would like to use Amplify like us)
#### 2. Install Amplify CLI:
```bash
npm install -g @aws-amplify/cli
```


#
## Getting Started
#### 1. Clone the repository to your local machine:
```bash
git clone git@github.com:ceciliawzx/fitchCodeathonBackEnd.git
```
#### 2. Navigate to the project directory:
```bash
cd fitchCodeathonBackEnd
```
#### 3. Install project dependencies:
```bash
npm install
```
#### 4. Initialize the Amplify project locally:
```bash
amplify init
```
#### 5. Import the backend environment from the amplify/ directory (if you would like to use Amplify):
```bash
amplify pull
```
#### 6. Configure the backend resources and settings as needed in your environment.
#### Specifically, you will have to set the PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in the environment variables. This is VERY important, as they directly decide who will receive the payments.

#### 7. Deploy the backend to your AWS:
```bash
amplify push
```

#
## Configuring the App
#### Specifically, you will need to change all the endpoints and resources used in this project to your real urls and resources:
#### 1. Change the endpoint for your database (wordpress) in EventList.jsx
#### 2. Change the default urls for topImages and default_image in EventList.jsx
#### 3. Change the endpoint for Paypal server in TicketDetail (This is very important!! You will want to ensure you can receive money from customers. To learn more about deploying the Paypal server, please refer to the README in the backend repository mentioned at the top.)
#### 4. Change all information about emails in TicketDetail (serviceID, templateID, templateOrgId, userID...)
#### 5. Change all tests pictures in this repository.
#### 6. We accessed database data based on the event schema we designed, you will need to change all references related to event to match your real schema. 


#
## Running the App Locally
#### 1. Start the Expo development server:
```bash
npm start
```
#### 2. You should be able to see a QR code. Scanning the QR code will navigate you to the Expo Go App, and you should be able to see the correct content. Please ensure you have Expo Go App installed in your mobile device before this step. 
#### 3. Alternatively, if you are using mac and have XCode installed, you can press 'i' to start an iPhone simulator on your computer.


#
## Deploying the App
#### 1. Configure your preferred hosting service (e.g., AWS Amplify, Netlify, or Vercel) to host the app's backend server and frontend assets.
#### 2. Build the production version of the app:
```bash
npm run build
```
#### 3. Deploy the built app to your hosting service.
#### 4. Please ensure you have updated the necessary environment variables for the deployed app, such as API endpoints and authentication keys.


#
## PS
#### 1. Please notice that we didn't have any experience with Amplify before this event, so the back-end code in this repository would definitely need improvements. 
#### 2. Only files inside ./amplify would be deployed to amplify. The app.js in the root path is for test. 
#### 3. Please notice that we will delete all endpoints and information used in this repository in several days. 