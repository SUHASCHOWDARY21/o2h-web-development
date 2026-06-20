# Project Management Portal - Developer Documentation

A full-stack, mobile-friendly project workspace portal application designed to organize, list, filter, and modify tasks.

---

## 1. Directory Layout

```
project-management-portal/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB database config
│   ├── controllers/
│   │   └── taskController.js # CRUD API handlers
│   ├── models/
│   │   └── Task.js          # Task collection Schema and Validations
│   ├── routes/
│   │   └── taskRoutes.js    # Direct Express task routing mapping
│   ├── .env                 # Server PORT and Database URI
│   ├── package.json         # Node server packages and running scripts
│   └── server.js            # Node/Express main server config
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js       # App header containing logo and dark mode toggle
│   │   │   ├── TaskCard.js     # Single task item block
│   │   │   └── StatsSection.js # Dashboard total/pending metrics section
│   │   ├── pages/
│   │   │   ├── Dashboard.js    # Task list view, filter pills, search input
│   │   │   └── AddTask.js      # Task creation form validation page
│   │   ├── services/
│   │   │   └── api.js          # Network hooks to Axios client
│   │   ├── App.css             # CSS variables mapping and custom theme states
│   │   ├── App.js              # Router path switch definitions
│   │   ├── index.css           # Global typography style sheet
│   │   └── main.jsx            # React root mounter script
│   │
│   ├── index.html           # Main markup wrapper
│   ├── package.json         # Client packages and Vite options
│   └── vite.config.js       # Vite configuration file
│
└── README.md                # System documentation
```

---

## 2. File-by-File Explanations

### Backend Codebase

#### 1. Config Database Connection (`backend/config/db.js`)
Handles Mongoose bootstrap setup. Reads the connection string `MONGODB_URI` from the environment configuration and opens a database channel.
- File Path: [db.js](file:///c:/o2h/project-management-portal/backend/config/db.js)

#### 2. Models Task Entity Schema (`backend/models/Task.js`)
Determines the layout of Task documents.
- `title`: String, required, trims inputs.
- `description`: String, required, validates a minimum of 20 characters.
- `status`: String, defaults to `Pending`. Values are locked using Mongoose enum options (`Pending`, `In Progress`, `Completed`).
- `createdAt`: Date, defaults to current time stamp.
- File Path: [Task.js](file:///c:/o2h/project-management-portal/backend/models/Task.js)

#### 3. Controller Actions (`backend/controllers/taskController.js`)
Houses Express request handlers for all task REST endpoints:
- `getTasks`: Filters tasks based on status queries and regex-searches titles and descriptions. Resolves MongoDB aggregate groups to fetch total status statistics.
- `createTask`: Validates request inputs (e.g. description length) and creates a task document.
- `updateTask`: Performs document checks, updates titles/descriptions/statuses, and saves revisions.
- `deleteTask`: Checks if the ID is valid and removes the document from MongoDB.
- File Path: [taskController.js](file:///c:/o2h/project-management-portal/backend/controllers/taskController.js)

#### 4. Route Map Endpoints (`backend/routes/taskRoutes.js`)
Links endpoint paths directly to controller handlers:
- `GET /tasks` -> `getTasks`
- `POST /tasks` -> `createTask`
- `PUT /tasks/:id` -> `updateTask`
- `DELETE /tasks/:id` -> `deleteTask`
- File Path: [taskRoutes.js](file:///c:/o2h/project-management-portal/backend/routes/taskRoutes.js)

#### 5. Entry point Bootstrapper (`backend/server.js`)
Sets up the Express app instance. Binds JSON loaders, enables cross-origin resource sharing (CORS) so the React app can request resources, registers task routes, and sets up global error middlewares.
- File Path: [server.js](file:///c:/o2h/project-management-portal/backend/server.js)

---

### Frontend Codebase

#### 1. Axios Interface Service (`frontend/src/services/api.js`)
Configures a centralized Axios client targeting the Node API server (`http://localhost:5000`). Exports direct asynchronous functions matching backend REST queries.
- File Path: [api.js](file:///c:/o2h/project-management-portal/frontend/src/services/api.js)

#### 2. Main Router Container (`frontend/src/App.js`)
Uses React Router DOM to map frontend page targets:
- `/` renders the dashboard list.
- `/add-task` renders the creation form.
- File Path: [App.js](file:///c:/o2h/project-management-portal/frontend/src/App.js)

#### 3. Navigation Bar Header (`frontend/src/components/Navbar.js`)
Contains site branding, navigation links, and a Dark Mode toggle button. Toggling sets the global `data-theme` attribute on the root html element and stores the setting in local storage.
- File Path: [Navbar.js](file:///c:/o2h/project-management-portal/frontend/src/components/Navbar.js)

#### 4. Statistics Block (`frontend/src/components/StatsSection.js`)
Renders four dashboard boxes (Total, Pending, In Progress, Completed counts) at the top of the dashboard.
- File Path: [StatsSection.js](file:///c:/o2h/project-management-portal/frontend/src/components/StatsSection.js)

#### 5. Individual Task Card (`frontend/src/components/TaskCard.js`)
Displays a task card with:
- Title, status badge, formatted creation date, description.
- Action controls: "Start" (Pending -> In Progress), "Complete" (Pending/In Progress -> Completed), and "Delete".
- File Path: [TaskCard.js](file:///c:/o2h/project-management-portal/frontend/src/components/TaskCard.js)

#### 6. Dashboard Workspace (`frontend/src/pages/Dashboard.js`)
Queries the backend, controls the task lists view, updates filters, executes searches, and manages loading indicators and empty states.
- File Path: [Dashboard.js](file:///c:/o2h/project-management-portal/frontend/src/pages/Dashboard.js)

#### 7. Task Publication Form (`frontend/src/pages/AddTask.js`)
Presents validation checks for user inputs, shows alert banners upon success, and redirects users to the dashboard.
- File Path: [AddTask.js](file:///c:/o2h/project-management-portal/frontend/src/pages/AddTask.js)

---

## 3. Local Installation & Run Commands

Ensure you have a MongoDB instance running locally.

### Step 1: Clone or Open Workspace
Open the project root directory in **Visual Studio Code**:
```bash
cd project-management-portal
```

### Step 2: Install and Start Backend
Open a terminal in VS Code and run the following to install packages and start the backend:
```bash
cd backend
npm install
npm run dev
```
The backend server runs on `http://localhost:5000`.

### Step 3: Install and Start Frontend
Open a second terminal window in VS Code and run the following to install packages and start the React client:
```bash
cd frontend
npm install
npm run dev
```
The Vite development server runs on `http://localhost:5173`. Open this URL in your web browser.

---

## 4. GitHub Deployment Instructions

To upload this codebase to your GitHub account, run these commands in your project root terminal:

```bash
# Initialize local git repository
git init

# Add all files to staging index
git add .

# Create initial commit
git commit -m "feat: complete full stack project management portal"

# Create a main branch
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push code to main branch
git push -u origin main
```
