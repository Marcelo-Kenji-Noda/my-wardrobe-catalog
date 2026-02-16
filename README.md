# My Wardrobe Catalog 👔

A modern web application to organize and manage your clothing collection. Built with React frontend and Node.js backend, featuring a mobile-responsive design.

## Features

- 📱 **Mobile-Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 👕 **Clothing Management** - Add, edit, and delete clothing items
- 🏷️ **Categorization** - Organize items by category (Tops, Bottoms, Dresses, Outerwear, Shoes, Accessories)
- 🌦️ **Season Filtering** - Filter items by season (Spring, Summer, Fall, Winter, All Season)
- 🎨 **Rich Details** - Track color, brand, size, images, and notes for each item
- 💾 **SQLite Database** - Easy-to-manage local database with no external server required
- 🔍 **Smart Filtering** - Filter by category and season to quickly find what you need

## Tech Stack

### Frontend
- **React** - UI library for building interactive components
- **Vite** - Fast build tool and development server
- **CSS3** - Modern, responsive styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework for API endpoints
- **SQLite** - Lightweight, serverless database
- **CORS** - Cross-origin resource sharing support

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Marcelo-Kenji-Noda/my-wardrobe-catalog.git
cd my-wardrobe-catalog
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

You need to run both the backend and frontend servers.

### Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Click "**+ Add Item**" to add a new clothing item
3. Fill in the details:
   - **Name** (required) - e.g., "Blue Jeans"
   - **Category** (required) - Select from predefined categories
   - **Color** - e.g., "Blue"
   - **Brand** - e.g., "Levi's"
   - **Size** - e.g., "M", "32x34"
   - **Season** - Select the appropriate season
   - **Image URL** - Optional image link
   - **Notes** - Any additional information
4. Use the filters to view items by category or season
5. Click **Edit** to modify an item or **Delete** to remove it

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/clothes` - Get all clothing items (supports `?category=` and `?season=` query params)
- `GET /api/clothes/:id` - Get a specific item
- `POST /api/clothes` - Create a new item
- `PUT /api/clothes/:id` - Update an existing item
- `DELETE /api/clothes/:id` - Delete an item
- `GET /api/health` - Health check endpoint

## Database Schema

The SQLite database includes a `clothes` table with the following fields:

| Field       | Type    | Description                |
|-------------|---------|----------------------------|
| id          | INTEGER | Primary key (auto-increment) |
| name        | TEXT    | Item name (required)       |
| category    | TEXT    | Item category (required)   |
| color       | TEXT    | Item color                 |
| brand       | TEXT    | Brand name                 |
| size        | TEXT    | Size information           |
| season      | TEXT    | Season (Spring/Summer/Fall/Winter/All Season) |
| image_url   | TEXT    | URL to item image          |
| notes       | TEXT    | Additional notes           |
| created_at  | DATETIME| Creation timestamp         |
| updated_at  | DATETIME| Last update timestamp      |

## Mobile Web App

The application is designed with mobile-first principles and is fully responsive:

- Works on all screen sizes
- Touch-friendly interface
- Optimized layout for mobile devices
- Can be added to home screen on mobile devices

To use as a mobile web app:
1. Open the app in your mobile browser
2. Use your browser's "Add to Home Screen" feature
3. The app will behave like a native mobile app

## Project Structure

```
my-wardrobe-catalog/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── package.json        # Backend dependencies
│   └── wardrobe.db         # SQLite database (created on first run)
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── App.css         # Styling
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
└── README.md               # This file
```

## Future Enhancements

- User authentication and multi-user support
- Cloud storage for images
- Outfit planning and combination suggestions
- Search functionality
- Export/import wardrobe data
- Progressive Web App (PWA) features for offline support
- Statistics and insights about your wardrobe

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!
