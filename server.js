// Ensure that 'index.js' exports the 'app' if you're importing it in another file.
const express = require('express');
const app = express();

app.use(express.json());  // Middleware to parse JSON bodies

const validateNumbers = (num1, num2) => {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return { status: 'error', message: 'Invalid data types' };
  }
  if (num1 > 1000000 || num2 > 1000000) {
    return { status: 'error', message: 'Overflow' };
  }
  if (num1 < -1000000 || num2 < -1000000) {
    return { status: 'error', message: 'Underflow' };
  }
  return null;
};

app.get('/', (req, res) => {
  res.send( 'Hello World' );
});

app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateNumbers(num1, num2);
  if (error) return res.json(error);

  const sum = num1 + num2;
  if (sum > 1000000) return res.json({ status: 'error', message: 'Overflow' });
  if (sum < -1000000) return res.json({ status: 'error', message: 'Underflow' });

  res.json({ status: 'success', message: 'the sum of given two numbers', sum });
});

app.post('/sub', (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateNumbers(num1, num2);
  if (error) return res.json(error);

  const difference = num1 - num2;
  if (difference > 1000000) return res.json({ status: 'error', message: 'Overflow' });
  if (difference < -1000000) return res.json({ status: 'error', message: 'Underflow' });

  res.json({ status: 'success', message: 'the difference of given two numbers', difference });
});

app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateNumbers(num1, num2);
  if (error) return res.json(error);

  const result = num1 * num2;
  if (result > 1000000) return res.json({ status: 'error', message: 'Overflow' });
  if (result < -1000000) return res.json({ status: 'error', message: 'Underflow' });

  res.json({ status: 'success', message: 'The product of given numbers', result });
});

app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  const error = validateNumbers(num1, num2);
  if (error) return res.json(error);
  if (num2 === 0) return res.json({ status: 'error', message: 'Cannot divide by zero' });

  const result = num1 / num2;
  if (result > 1000000) return res.json({ status: 'error', message: 'Overflow' });
  if (result < -1000000) return res.json({ status: 'error', message: 'Underflow' });

  res.json({ status: 'success', message: 'The division of given numbers', result });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;  // Exporting the app for importing elsewhere
