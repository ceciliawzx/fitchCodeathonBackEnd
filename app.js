const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
var paypal = require('paypal-rest-sdk');
const { render } = require('ejs');

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'AY1zn0okbDaWTyZEIt9kJbesEFo_5OalLUA6UK0gNIBpaerZLWeM0jx06j_L0uY1OTRqr18yfvTT4cvA',
  client_secret:
    'EEmpwCAwAknUwD8i86m9iWC87COqWhCBF2YXPd8c2fdSPcWCYktYLQVjvXD7rmdEOv_u9rG0Wy6YW6vX',
});

const app = express();

app.engine('ejs', engines.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
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
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
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

app.get('/cancel', (req, res) => {
  // res.send("Payment Cancelled");
  res.render('cancel');
});

app.listen(3000, () => {
  console.log('Server is running!');
});
