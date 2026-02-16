const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const dbPath = path.join(__dirname, 'wardrobe.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS clothes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      color TEXT,
      brand TEXT,
      size TEXT,
      season TEXT,
      image_url TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Database table initialized.');
    }
  });
}

// API Routes

// Get all clothes
app.get('/api/clothes', (req, res) => {
  const { category, season } = req.query;
  let query = 'SELECT * FROM clothes';
  const params = [];

  if (category || season) {
    query += ' WHERE';
    const conditions = [];
    if (category) {
      conditions.push(' category = ?');
      params.push(category);
    }
    if (season) {
      conditions.push(' season = ?');
      params.push(season);
    }
    query += conditions.join(' AND');
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get a single clothing item
app.get('/api/clothes/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM clothes WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(row);
  });
});

// Create a new clothing item
app.post('/api/clothes', (req, res) => {
  const { name, category, color, brand, size, season, image_url, notes } = req.body;

  if (!name || !category) {
    res.status(400).json({ error: 'Name and category are required' });
    return;
  }

  const query = `
    INSERT INTO clothes (name, category, color, brand, size, season, image_url, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [name, category, color, brand, size, season, image_url, notes], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ 
      id: this.lastID,
      message: 'Item created successfully'
    });
  });
});

// Update a clothing item
app.put('/api/clothes/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, color, brand, size, season, image_url, notes } = req.body;

  const query = `
    UPDATE clothes 
    SET name = ?, category = ?, color = ?, brand = ?, size = ?, 
        season = ?, image_url = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [name, category, color, brand, size, season, image_url, notes, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json({ message: 'Item updated successfully' });
  });
});

// Delete a clothing item
app.delete('/api/clothes/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM clothes WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Wardrobe API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
