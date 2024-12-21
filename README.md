# Wonderlust

**Wonderlust** is a dynamic web application built using **Node.js**, **EJS**, **HTML**, **CSS**, **Bootstrap**, and integrates **Google Fonts** and **Google Icons**. This project utilizes **MongoDB** as the database and features CRUD operations. Middleware functions and Express.js modules enhance functionality, creating a robust user experience for managing travel listings and reviews.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **User Authentication**: Login and registration using Passport.js with sessions and flash messages.
- **Travel Listings**: Create, read, update, and delete travel listings.
- **Reviews**: Add and manage reviews for listings.
- **Responsive Design**: Styled using Bootstrap for a seamless mobile and desktop experience.
- **Middleware**: Implements custom middleware for validation and authentication.
- **Validation**: Includes Joi for server-side validation of user inputs.
- **Error Handling**: Centralized error handling with custom utilities like `ExpressError`.

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for routing and middleware.
- **MongoDB**: Database for storing users, listings, and reviews.
- **EJS**: Templating engine for rendering dynamic HTML.
- **CSS & Bootstrap**: For styling and responsiveness.
- **Google Fonts & Icons**: For typography and icons.
- **Joi**: Schema description and data validation.

---
## Screenshots

### Home Page
![Home Page](https://github.com/user-attachments/assets/ebd03cc6-ab14-435f-becb-4dd613f28dd5)


### Login Page
![Login Page](https://github.com/user-attachments/assets/1aa9dbf2-93e7-448f-b71c-b2bdeeacf34b)


### Signup Page
![Signup Page](https://github.com/user-attachments/assets/f6b52394-693e-409a-b50d-5259f43cc1f8)


### Listing Page
![Listing Page](https://github.com/user-attachments/assets/9b7fd875-7576-4cf8-812a-d476706f002d)


### Review Page
![Review Page](https://github.com/user-attachments/assets/3950b346-7f16-4949-bb53-575b1c53ac46)


---

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wonderlust.git
   cd wonderlust
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   DB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   ```

4. Start the development server:
   ```bash
   node app.js
   ```

5. Access the application in your browser at:
   ```
   http://localhost:8080/
   ```

---

## Usage
- **Home Page**: Browse travel listings.
- **Add Listings**: Create a new listing with descriptions and images.
- **Review System**: Add reviews to listings (must be logged in).
- **User Account Management**: Register and log in with user accounts.

---

## Folder Structure
```plaintext
wonderlust/
├── models/
│   ├── user.js
│   ├── listing.js
│   ├── review.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   ├── user.js
├── views/
│   ├── partials/
│   ├── layouts/
│   ├── home.ejs
│   ├── listing.ejs
│   ├── review.ejs
├── public/
│   ├── css/
│   ├── js/
├── utils/
│   ├── ExpressError.js
│   ├── wrapAsync.js
├── app.js
├── package.json
├── schema.js
└── README.md
```

---

## Routes

### Listings
- **`GET /listings`**: View all listings.
- **`POST /listings`**: Create a new listing.
- **`PUT /listings/:id`**: Edit a listing.
- **`DELETE /listings/:id`**: Delete a listing.

### Reviews
- **`POST /listings/:id/reviews`**: Add a review.
- **`DELETE /listings/:id/reviews/:reviewId`**: Delete a review.

### Users
- **`GET /register`**: User registration page.
- **`POST /register`**: Register a new user.
- **`GET /login`**: User login page.
- **`POST /login`**: Authenticate and log in a user.
- **`GET /logout`**: Log out the current user.

### Flash Messages
- Flash messages are used to display success or error alerts to users during authentication and other operations.

---

## Contributing
Contributions are welcome! Follow these steps to contribute:

1. Fork this repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! 🌍
