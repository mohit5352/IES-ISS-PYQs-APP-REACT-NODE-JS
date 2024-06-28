const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Import the JSON data
const paperDetails = require('./data/paperDetails.json');

app.use(cors());
// Route to serve the JSON data
app.get('/api/paper-details', (req, res) => {
  res.json(paperDetails);
});

// app.get('/', (req, res) => {
//   res.send('Hello World from backend server!');
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});