/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const paypal = require('paypal-rest-sdk');
const engines = require('consolidate');
const { render } = require('ejs');

// PayPal configuration
paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Configure view engine for EJS
app.engine('ejs', engines.ejs);
app.set('views', './views'); // Update the path if necessary
app.set('view engine', 'ejs');

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/**********************
 * Example get method *
 **********************/

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cancel', (req, res) => {
  // res.send("Payment Cancelled");
  res.render('cancel');
});

app.post('/paypal', (req, res) => {
  var { price, currency } = req.body;

  // Validate the received price and currency
  if (!price || !currency) {
    // Handle the error
    return res.status(400).send('Price and currency are required!');
  }

  var create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url:
        'https://pbwix5epd8.execute-api.eu-west-2.amazonaws.com/dev/success',
      cancel_url:
        'https://pbwix5epd8.execute-api.eu-west-2.amazonaws.com/dev/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'event',
              sku: 'event',
              price: price,
              currency: currency,
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: currency,
          total: price,
        },
        description: 'This is the payment description.',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log('Create Payment Response');
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
});

app.get('/success', (req, res) => {
  // res.send("Payment Successful!");

  var payerId = req.query.PayerID;
  var paymentId = req.query.paymentId;

  var execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '1.00',
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log('Get Payment Response');
        console.log(JSON.stringify(payment));
        res.render('success');
      }
    }
  );
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
