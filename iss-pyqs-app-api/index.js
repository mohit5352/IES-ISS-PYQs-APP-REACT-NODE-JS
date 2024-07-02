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

// Endpoints to get the papers data by year and name
app.get('/api/paper-detail', (req, res) => {
  const { year, paperName } = req.query;

  if (!year || !paperName) {
    return res.status(400).send('Missing year or paperName query parameters');
  }

  // const papersData = loadPapersData();

  const filteredPapers = paperDetails.paperDetails.filter(paper =>
    paper.year.toString() === year && paper.paperName.toLowerCase() === paperName.toLowerCase()
  );

  if (filteredPapers.length === 0) {
    return res.status(404).send('Paper not found');
  }

  res.json(filteredPapers[0]);
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

// Endpoints to update specific paper data
app.put('/api/paper-detail/update/:year/:paperName', (req, res) => {
  const { year, paperName } = req.params;
  const paperUpdatePayload = req.body;

  const paperIndex = paperDetails.paperDetails.findIndex(paper => paper.year == year && paper.paperName === paperName);

  if (paperIndex === -1) {
    return res.status(404).json({ message: 'Paper not found' });
  }

  paperDetails.paperDetails[paperIndex] = {
    ...paperDetails.paperDetails[paperIndex],  // Preserve existing fields
    ...paperUpdatePayload  // Update with new fields from payload
  };

  fs.writeFile(paperDetailsPath, JSON.stringify(paperDetails, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(paperDetails.paperDetails[paperIndex]);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});