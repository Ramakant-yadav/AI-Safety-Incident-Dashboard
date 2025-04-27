const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS, and incidents.json)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle new incidents
app.post('/api/incidents', async (req, res) => {
  try {
    const newIncident = req.body;

    // Validate the incoming data
    if (!newIncident.title || !newIncident.description || !newIncident.severity || !newIncident.date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Read the existing incidents from incidents.json
    const filePath = path.join(__dirname, 'public', 'incidents.json');
    let incidents = [];

    try {
      const data = await fs.readFile(filePath, 'utf8');
      incidents = JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error; // Handle errors other than file not found
      }
      // If file doesn't exist, start with an empty array
    }

    // Append the new incident
    incidents.push(newIncident);

    // Write the updated incidents back to incidents.json
    await fs.writeFile(filePath, JSON.stringify(incidents, null, 2));

    res.status(201).json({ message: 'Incident added successfully' });
  } catch (error) {
    console.error('Error saving incident:', error);
    res.status(500).json({ error: 'Failed to save incident' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});