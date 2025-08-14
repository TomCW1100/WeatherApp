This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Weather App Frontend

This frontend is built with Next.js 15 and TypeScript, using the App Router and React 19.
It provides a Widget Management System with features:

Creating widgets

Viewing widget details

Deleting widgets

Dashboard with a grid layout

Widget detail pages

Optimistic UI updates after deletion

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Components](#components)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Styling](#styling)
- [Running the App](#running-the-app)
- [Future Improvements](#future-imporvements)

---

## Tech Stack

Framework: Next.js 15

Language: TypeScript

HTTP Client: Axios

Styling: Tailwind CSS 4 + PostCSS + Autoprefixer

State Management: React useState / useEffect

Routing: Next.js App Router (next/link & useRouter)

---

## Project Structure

```markdown

Project Structurefrontend/
├─ components/
│  ├─ WidgetCard.tsx            # Card component for each created Widget
│  ├─ WidgetCreationForm.tsx    # Form component for creating widgets
├─ pages/
│  ├─ index.tsx                 # Home page / Widget creation
│  ├─ _app.tsx                  # entry Point
│  ├─ widgets/
│  │  ├─ page.tsx               # Widget dashboard
│  │  └─ [id]/page.tsx          # Widget details page
├─ types/
│  └─ weather.d.ts              # Weather TypeScript type
│  └─ widget.d.ts               # Widget TypeScript type
│  └─ widgetCardProps.d.ts      # WidgetCardPropeties TypeScript type
├─ globals.css                  # Tailwind global CSS
├─ package.json
├─ postcss.config.mjs
└─ README.md
```

---

## Pages

Home Page (app/index.tsx)

- Displays WidgetCreationForm for creating a new widget.
- Links to the Widget Dashboard at /widgets.

Widget Dashboard (app/widgets/index.tsx)

- Displays a grid of widgets using WidgetCard.
- Fetches widgets from the backend (GET /api/widgets).
- Handles deletion

Widget Details (app/widgets/[id].tsx)

- Displays a single widget’s details.
- Shows error if widget is not found.
- Allows returning to the dashboard via a link.

---

## Components

WidgetCreationForm

- Handles creating widgets with client-side validation.
- Calls POST /api/widgets/create-widget.
- Shows success/error messages.

WidgetCard
- Displays widget info: location, createdAt, coordinates.
- Buttons:
    - View Details → navigates to widget page.
    - Delete → calls DELETE /api/widgets/:id.
- Uses useState for loading state.

---

## API Integration

| Method | Endpoint                     | Description           |
| ------ | ---------------------------- | --------------------- |
| GET    | `/api/widgets`               | Fetch all widgets     |
| POST   | `/api/widgets/create-widget` | Create a new widget   |
| DELETE | `/api/widgets/:id`           | Delete a widget by ID |
| GET    | `/api/widgets/:id`           | Fetch widget details  |

Axios is used for all HTTP requests.

---

## State Management

- Dashboard widgets: useState in WidgetListPage.
- Form input values: useState in WidgetCreationForm.
- Loading indicators: useState for form submission and card deletion.
- Optimistic deletion: Dashboard updates immediately after successful deletion.

---

## Styling

- Tailwind CSS 4 with PostCSS.
- Responsive grid for widgets.
- Hover and focus effects on buttons.

---

## Running the App

1. Install dependencies

```
cd frontend
npm install
```

2. Run development server

```
npm run dev
```

- Opens at http://localhost:3000.
- Backend must be running at http://localhost:5000.

---

## Future Improvements

- Use react-hook-form + zod/yup for better form validation.
- Add loading skeletons for widgets.
- Support filtering/searching widgets.
- Add animations when deleting a widget.
