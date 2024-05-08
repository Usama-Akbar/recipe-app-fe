# README.md

## Introduction
This project is a frontend application built with React.js that provides functionalities for user authentication, registration, managing recipes, and interacting with a backend API built with Express.js.

## Installation and Setup
To run the project locally, follow these steps:

1. Clone the repository from the provided source.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Start the frontend server by running `npm start`.
5. Ensure that the frontend server is running at `localhost:3000` or the appropriate address.

## Frontend Structure
The frontend application follows a typical structure for a React.js project. Here's an overview of the key directories and files:

- **src/**: Contains the main source code of the frontend application.
  - **components/**: Contains reusable UI components used throughout the application.
  - **pages/**: Contains different pages of the application, such as Login, Register, Home, etc.
  - **services/**: Contains service files responsible for handling API requests and responses.
  - **utils/**: Contains utility functions used across the application.
  - **App.js**: Entry point of the application.
  - **index.js**: Main file for rendering the React application.

## Functionality
The frontend application provides the following functionality:

- User authentication and registration.
- Accessing the home page upon successful login, displaying all recipes.
- Adding a new recipe through a modal dialog.
- Viewing details of a single recipe, including options to edit or delete it.
- Searching for recipes by name using the search field on the home page.

## Available Endpoints
The backend API provides the following endpoints for interacting with the system:

### Recipe CRUD
- **POST** `/home`: Create a new food recipe.
- **GET** `/home`: Retrieve all food recipe.
- **GET** `/detail/:id`: Retrieve a single food recipe by ID.
- **PUT** `/updateform/:id`: Update a food recipe by ID.
- **DELETE** `/detail/:id`: Delete a food recipe by ID.

### Users Management
- **POST** `/register`: Register a new user.
- **POST** `/`: Log in an existing user.
## Technologies Used
The frontend of the project is built using React.js, while the backend is developed with Express.js. The database used is MongoDB for storing car and user data. Authentication is handled using JWT (JSON Web Tokens), 

