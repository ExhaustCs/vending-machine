/* eslint-disable brace-style */
/* eslint-disable comma-dangle */
const express = require('express');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const app = express();

require('dotenv').config();

const db = require('./db/db.js');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Customer routes:

// Get all items
app.get('/api/customer/items', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM items ORDER BY description ASC'
    );
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        items: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'fail', error });
  }
});

// Purchase an item
app.post('/api/customer/items/:itemId/purchases', async (req, res) => {
  try {
    // Get parameters from request
    const { itemId } = req.params;
    const { money } = req.body;

    // Form the response object
    const responseObject = {
      status: '',
      data: {},
    };

    // Retrieve the entry matching the parameter id
    const getItem = await db.query('SELECT * FROM items WHERE id = $1', [
      itemId,
    ]);
    const { cost, description } = getItem.rows[0];

    // Retrieve the available money
    const getTotalMoney = await db.query('SELECT total_money FROM purchases');
    // eslint-disable-next-line radix
    const totalMoney = parseInt(getTotalMoney.rows[0].total_money);
    console.log(totalMoney);

    if (totalMoney <= 1) {
      console.log('out of order :(');
      responseObject.status = 'fail';
      responseObject.data = 'Out Of Order';
      return res.status(500).json(responseObject);
    }

    // Update the transaction
    const updateMoney = await db.query(
      'UPDATE purchases SET money_given = $1, money_needed = $2  RETURNING *',
      [money, cost]
    );

    // const { money_given, money_required, total_money } = updateMoney.rows[0];
    const change = money - cost;

    // Setting the response object
    // Show when customer does not give enough money
    if (change < 0) {
      responseObject.status = 'fail';
      responseObject.data = {
        money_given: money,
        money_required: cost,
      };
    }

    // Show when the customer gives more than needed.
    else if (change > 0) {
      responseObject.status = 'success';
      responseObject.data = {
        money_given: money,
        money_required: cost,
        change,
      };
    }

    // Show when the customer gives the exact amount needed;
    else {
      responseObject.status = 'success';
      responseObject.data = {
        money_given: money,
      };
    }

    // Update items quantity, save the purchase, and update the total money count

    if (responseObject.status === 'success') {
      // eslint-disable-next-line no-unused-vars
      await db.query(
        'UPDATE items SET quantity = quantity - 1 WHERE id = $1 RETURNING *',
        [itemId]
      );

      // eslint-disable-next-line no-unused-vars
      await db.query(
        'INSERT INTO purchase_history (description) VALUES ($1) RETURNING *',
        [description]
      );

      // eslint-disable-next-line no-unused-vars
      await db.query(
        'UPDATE purchases SET total_money = ((total_money - $1) + $2)',
        [money, change]
      );
    }

    res.status(200).json(responseObject);
  } catch (error) {
    res.status(500).send({ status: 'fail', data: 'item not found' });
  }
});

// Vendor routes

// Get all purchases from an item
app.get('/api/vendor/purchases', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM purchase_history');

    res.json({
      status: 'success',
      data: results.rows,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      status: 'fail',
      data: error,
    });
  }
});

// See the current  money
app.get('/api/vendor/money', async (req, res) => {
  try {
    const results = await db.query('SELECT total_money FROM purchases');

    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        items: results.rows[0],
      },
    });
  } catch (error) {
    // console.error(error);

    res.status(500).send({ status: 'fail', error });
  }
});

// Update item (description, cost, quantity )
app.put('/api/vendor/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { description, cost, quantity } = req.body;

    const results = await db.query(
      'UPDATE items SET description = $1, cost = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [description, cost, quantity, itemId]
    );

    res.json({
      status: 'success',
      data: results.rows[0],
    });
  } catch (error) {
    // console.error(error);
    res.json({
      status: 'fail',
      data: error,
    });
  }
});

// Add a new item
app.post('/api/vendor/items', async (req, res) => {
  try {
    const { description, cost, quantity } = req.body;

    const results = await db.query(
      'INSERT INTO items (description, cost, quantity) VALUES ($1, $2, $3) RETURNING *',
      [description, cost, quantity]
    );

    res.json({
      status: 'success',
      data: results.rows[0],
    });
  } catch (error) {
    // console.error(error);

    res.status(406).json({ status: 'fail', error: error.detail });
  }
});

module.exports = app;
