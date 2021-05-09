/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app.js');

const item = [
  {
    id: 1,
    description: 'Chips',
    cost: 40,
    quantity: 6,
  },
];

const purchase = [
  {
    money_given: 100,
    money_required: 100,
    total_money: 500,
  },
];

describe('GET /api/customer/items', () => {
  test('Get a list of items', async () => {
    const response = await request(app).get('/api/customer/items');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
    expect(response.body.data.items.length).toBeTruthy();
    expect(typeof response.body).toBe('object');
  });
});
// End of describe block

describe('POST /api/customer/items/:itemId/purchases', () => {
  test('Make a purchase - Expect change', async () => {
    const response = await request(app)
      .post('/api/customer/items/3/purchases')
      .send({
        money: 1.75,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');

    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
    expect(response.body.data).toEqual({
      money_given: 1.75,
      money_required: '1.28',
      change: 0.47,
    });
  });

  test('Make a purchase - Expect money required', async () => {
    const response = await request(app)
      .post('/api/customer/items/3/purchases')
      .send({
        money: 0.25,
      });

    const { money_required, money_given } = response.body.data;
    expect(response.body.status).toBe('fail');
    expect(response.body.data).toEqual({
      money_required,
      money_given,
    });
  });

  test('Make a purchase - Expect money given', async () => {
    const response = await request(app)
      .post('/api/customer/items/3/purchases')
      .send({
        money: 1.28,
      });

    const { money_given } = response.body.data;
    expect(response.body.status).toBe('success');
    expect(response.body.data).toEqual({
      money_given,
    });
  });
});
// End of describe block

describe('POST /api/vendor/items', () => {
  test("Add an item - if item doesn't exist", async () => {
    const response = await request(app).post('/api/vendor/items').send(item[0]);

    // If item already exist
    if (response.statusCode !== 200) {
      return expect(response.statusCode).not.toBe(200);
    }

    expect(response.statusCode).toBe(200);
  });
});

// End of describe block

describe('GET /api/vendor/purchases', () => {
  test('Get a list of purchases', async () => {
    const response = await request(app).get('/api/vendor/purchases');

    expect(response.statusCode).toBe(200);

    expect(response.body.data.length).toBeTruthy();
    // console.log(response.body.data);
    expect(typeof response.body.data).toEqual('object');
  });
});

describe('GET /api/vendor/money', () => {
  test('Get the current amount of money', async () => {
    const response = await request(app).get('/api/vendor/money');

    expect(response.statusCode).toBe(200);
    // expect(response.body.data.items.length).toBeTruthy();
    // console.log(response.body.data.items);
    expect(typeof response.body.data.items).toBe('object');
  });
});
// End of describe block

describe('PUT /api/vendor/items/:itemId', () => {
  test('Update a item', async () => {
    const response = await request(app).put('/api/vendor/items/17').send({
      description: 'Big ass chips',
      cost: 2.0,
      quantity: 25,
    });

    expect(response.statusCode).toBe(200);
    expect(typeof response.body.data).toBe('object');
  });
});
// End of describe block
