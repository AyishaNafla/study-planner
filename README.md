# Study Planner

A web-based Study Planner application developed using React. It allows users to register and log in, manage their subjects, track study hours, and monitor their study progress through a personalized dashboard. The application includes protected routes, theme customization, form validation, and API data management.

## Features

- **User Authentication:** User registration and login with Redux Toolkit state management and localStorage persistence.
- **User-Specific Subject Management:** Each user can manage their own subjects.
- **Subject CRUD Operations:** Add, view, edit, and delete subjects.
- **Dashboard:** View study statistics and track study progress.
- **Study Hour Tracking:** Set study-hour targets and monitor progress.
- **Search, Filter, and Sort:** Find and organize subjects easily.
- **Protected Routes:** Restrict access to protected pages for unauthenticated users.
- **Theme Customization:** Switch between light and dark themes.
- **Form Validation:** Validate user input and display relevant feedback messages.
- **Loading and Error Handling:** Provide loading indicators, skeleton loading, toast notifications, and error handling.
- **Responsive UI:** Build responsive interfaces using React Bootstrap and Bootstrap.
- **API Data Management:** Use RTK Query to fetch and manage data from JSON Server.

## Technologies Used

### Frontend
- React
- JavaScript
- HTML5
- CSS3
- Bootstrap
- React Bootstrap
- React Router

### State Management
- Redux Toolkit
- React Redux
- RTK Query
- Context API

### API and Data
- JSON Server
- `fetchBaseQuery` for API requests
- localStorage for persisting authentication and user preferences

### Development Tools
- Vite
- ESLint
- Git and GitHub

## Project Structure

```
study-planner/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── redux/
│   ├── App.jsx
│   ├── api.js
│   ├── main.jsx
│   └── ...
├── db.json
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your computer.

### 1. Clone the Repository

```bash
git clone https://github.com/AyishaNafla/study-planner.git
```

### 2. Navigate to the Project Folder

```bash
cd study-planner
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start JSON Server

Open a terminal in the project folder and run:

```bash
npm run server
```

JSON Server runs on port `5000` and provides the API using the local `db.json` file.

Keep this terminal running.

### 5. Start the React Application

Open a second terminal in the project folder and run:

```bash
npm run dev
```

Open the local development URL displayed in the terminal to use the application.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run server` | Starts JSON Server on port 5000. |
| `npm run lint` | Runs ESLint to check the code. |
| `npm run build` | Creates a production build. |
| `npm run preview` | Previews the production build locally. |

## Building for Production

To create an optimized production build, run:

```bash
npm run build
```

The generated files will be placed in the `dist/` directory.

## Data Storage

The application uses JSON Server with `db.json` to store user and subject data during local development. RTK Query manages API requests and cache updates, while localStorage persists authentication state and selected preferences.

**Note:** This project is intended for learning and demonstration. Do not use real passwords or sensitive personal information in the sample database.

## Testing

Run the following command to check the code for linting issues:

```bash
npm run lint
```

Run the production build command to verify that the application can be built:

```bash
npm run build
```

## Project Walkthrough

**Video demonstration:** Add your project walkthrough video link here once it has been recorded and uploaded.

## Author

Developed as a React learning project to practice component-based development, routing, state management, API integration, form validation, and responsive UI design.