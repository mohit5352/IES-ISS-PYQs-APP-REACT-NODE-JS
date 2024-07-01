const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

const paperDetailsPath = path.join(__dirname, 'data/paperDetails.json');
let paperDetails = require(paperDetailsPath);

app.use(cors());
app.use(bodyParser.json());

// Endpoints to get the papers data
app.get('/api/paper-details', (req, res) => {
  res.json(paperDetails);
});

// Endpoints to submit the papers data
app.post('/api/paper-details/submit', (req, res) => {
  const paperDetailsPayload = req.body;

  for (paperDetail of paperDetailsPayload) {
    if (!paperDetail.url || !paperDetail.paperName || !paperDetail.year) {
      return res.status(400).json({ error: 'Invalid data for paper detail submission' });
    }
    const exists = paperDetails.paperDetails.some(paper => paper.url === paperDetail.url);

    if (exists) {
      return res.status(400).json({ error: 'This paper already exists.' });
    }

    paperDetails.paperDetails.push(paperDetail);
  }

  // Write the updated data back to the JSON file
  fs.writeFile(paperDetailsPath, JSON.stringify(paperDetails, null, 2), (err) => {
    if (err) {
      console.error('Error updating paper details data', err);
      return res.status(500).json({ error: 'Failed to update paper details' });
    }
    res.status(201).json({ message: 'Paper detail added successfully' });
  });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});