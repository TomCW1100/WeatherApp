# Weather App Backend

This is the backend for the Weather App Dashboard application. It provides APIs to manage widgets and fetch associated weather information.

---

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Logging](#logging)
- [Caching](#caching)

---

## Features

- Create, read, and delete widgets
- Fetch and cache weather information for widget locations
- Geocoding service for converting locations into coordinates
- Structured logging for debugging and monitoring

---

## Folder Structure

```markdown
backend/
├─ cache/
│ └─ weatherCache.js # In-memory cache for weather data
├─ controllers/
│ └─ widgetController.js # Handles HTTP requests and responses for widgets
├─ models/
│ └─ Widget.js # Mongoose model for widgets
├─ routes/
│ └─ WidgetRoutes.js # Express routes for widget APIs
├─ services/
│ ├─ GeocodingService.js # Converts locations to latitude & longitude
│ └─ WidgetService.js # Business logic for widgets and weather data
├─ utils/
│ └─ logger.js # Logger utility using console or winston
├─ .env # Environment variables (DB, etc.)
├─ server.js # Entry point of the backend
└─ package.json
```


---

## Setup & Installation

1. **Clone the repository:**

```bash
git clone https://github.com/TomCW1100/WeatherApp.git
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a .env file in the root directory and define the following: 

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/widgets
```

4. **Running the Server**

```bash
cd backend
```

start the server:

```bash
npm run dev
```

The server will run on the port specified in .env (default: 5000).

---

## API Endpoints

API Endpoints

All endpoints are prefixed with /api/widgets.


GET /api/widgets

Fetch all widgets with coordinates and weather data.


GET /api/widgets/:id

Fetch a specific widget by ID.


POST /api/widgets

Create a new widget.


DELETE /api/widgets/:id

Delete a widget by ID.

---

## Logging

All backend logs are managed using backend/utils/logger.js.
You can extend this to use Winston, Morgan, or any other logging library.

---

## Caching

Weather data is cached in-memory using backend/cache/weatherCache.js to reduce external API calls and improve performance.

---

## Notes

Make sure your MongoDB server is running locally or adjust the MONGO_URI in .env.

This backend is designed to be used with the Weather App Dashboard frontend.
