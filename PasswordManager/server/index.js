const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;

const DATA_FILE = path.join(__dirname, 'passwordData.json');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/get', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read data.' });
  }
});

app.post('/add', (req, res) => {
  try {
    const { website, username, password } = req.body;
    const credentials = JSON.parse(fs.readFileSync(DATA_FILE));
    const id = Date.now().toString();
    credentials.push({ id, website, username, password });
    fs.writeFileSync(DATA_FILE, JSON.stringify(credentials, null, 2));
    res.json({ message: 'Credential added' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add credential.' });
  }
});

app.delete('/delete/:id', (req, res) => {
  try {
    let credentials = JSON.parse(fs.readFileSync(DATA_FILE));
    credentials = credentials.filter(item => item.id !== req.params.id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(credentials, null, 2));
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete.' });
  }
});

app.put('/update/:id', (req, res) => {
  try {
    const { website, username, password } = req.body;
    let credentials = JSON.parse(fs.readFileSync(DATA_FILE));
    const index = credentials.findIndex(item => item.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });

    credentials[index] = { id: req.params.id, website, username, password };
    fs.writeFileSync(DATA_FILE, JSON.stringify(credentials, null, 2));
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
