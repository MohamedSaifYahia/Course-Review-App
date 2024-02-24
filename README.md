# Course Review App

## Description
The Course Review App is a comprehensive web application designed to enable students to share and access reviews on various courses they have taken. Built with Node.js and Express, and leveraging MongoDB for data storage, this application provides an intuitive platform for students to contribute insights on course content, teaching quality, and overall experience, aiding peers in making informed decisions about their course selections.

## Features
- **Express.js Backend:** Utilizes Express.js for handling server-side logic, offering a lightweight and flexible approach to build the API endpoints.
- **MongoDB Database Integration:** Employs MongoDB, a NoSQL database, for storing and retrieving course reviews efficiently. The integration is managed through Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment.
- **Dynamic Content Rendering:** Server-side rendered views using Handlebars.js as the templating engine, enabling dynamic content presentation based on the reviews stored in the database.
- **Session Management:** Implements session-based tracking to monitor user interactions and page visits, enhancing the user experience by personalizing content.
- **Environment Variables:** Configures application settings and database connections securely using environment variables, ensuring sensitive information is kept out of the codebase.
- **Static File Serving:** Serves static files like stylesheets directly from the Express.js application, ensuring a seamless user interface.

