# Teamtailor Candidate Data Export App

This project is a Node.js application that interacts with the Teamtailor API to fetch candidate data along with their job applications and exports the data as a CSV file. The app also includes a simple frontend built using Svelte, which is served by the Express backend.

---

## Features

- Fetch candidates and their job applications using Teamtailor's JSON:API-compliant endpoints.
- Handle paginated API responses to fetch all candidate data.
- Generate a CSV file with candidate and job application details.
- A frontend interface to trigger the CSV download.

---

## Prerequisites

Before running the app, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A valid API key for the [Teamtailor API](https://developers.teamtailor.com/).

---

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/phormula/teamtailor-csv-app.git
   cd teamtailor-csv-app

   ```

2. Install dependencies for the backend:

   ```bash
   npm install

   ```

3. Navigate to the frontend directory and install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   cd ..

   ```

4. Replace your_api_key_here in `.env.example` (and rename to `.env`) with your Teamtailor API key.

## Running the App

1. Build the Frontend:

- Navigate to the frontend directory and build the app:

  ```bash
  cd frontend
  npm run build
  cd ..

  ```

- The build files will be placed in the `./public` directory.

2. Serve the app by running in the root directory:
   ```bash
   npm run dev
   ```

- By default, the app runs at http://localhost:3000. Unless an environment variable is added as `PORT`

## Build for production

```bash
npm run build
```
