# EventMaster

### Please notice that this repository is the back end rep, you will need to deploy this project in order to run the front end. 
### Url for frontend repository: https://github.com/ceciliawzx/fitchCodeathon
### Please also notice that we used AWS Amplify to deploy the back end code, you will need to follow other deployment instructions if you would like to use your own servers. 


#
## Prequests

#### Before you begin, make sure you have the following prerequisites met:
#### 1. Create your Own AWS account (if you would like to use Amplify like us)
#### 2. Node.js: You can download it from https://nodejs.org/.
#### 3. npm (Node Package Manager): This should come bundled with Node.js.
#### 4. Install Amplify CLI:
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
## PS
#### 1. Please notice that we didn't have any experience with Amplify before this event, so the back-end code in this repository would definitely need improvements. 
#### 2. Only files inside ./amplify would be deployed to amplify. The app.js in the root path is for test. 
#### 3. Please notice that we will delete all endpoints and information used in this repository in several days. 