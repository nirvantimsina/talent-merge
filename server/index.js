// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, '../my-app/db.json');

// Ensure db.json exists and is valid
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ members: [] }, null, 2));
}

// Helper to read/write db.json
function readMembers() {
  if (!fs.existsSync(dbPath)) return [];
  const data = fs.readFileSync(dbPath, 'utf-8');
  try {
    const json = JSON.parse(data);
    if (!Array.isArray(json.members)) json.members = [];
    return json.members;
  } catch {
    return [];
  }
}
function writeMembers(members) {
  // preserve other keys in db.json
  let json = {};
  if (fs.existsSync(dbPath)) {
    try {
      json = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    } catch { json = {}; }
  }
  json.members = members;
  fs.writeFileSync(dbPath, JSON.stringify(json, null, 2));
}

// GET /members - return all members from db.json
app.get('/members', (req, res) => {
  const members = readMembers();
  res.json(members);
});

// POST /members - add a new member to db.json
app.post('/members', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }
  const members = readMembers();
  const newMember = { id: Date.now(), name, role };
  members.push(newMember);
  writeMembers(members);
  res.status(201).json(newMember);
});

// Serve static files from React app (Vite build output)
const distPath = path.join(__dirname, '../my-app/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(404).send('Frontend build not found. Please run "npm run build" in the my-app directory.');
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});