# MediCommunity 🩺

A healthcare web application designed to bring patients and healthcare resources together in one place. MediCommunity provides a user-friendly interface for exploring doctors, accessing health information, managing appointment requests, and engaging with a health-focused community.

## 📸 Website Preview

### Homepage

![MediCommunity Homepage](screenshots/HomePage1.PNG)

## 🌟 Features

- **Homepage:** A welcoming interface for exploring the platform.
- **Doctor Directory:** Browse doctors and search by name, specialty, or department.
- **Appointment Booking:** Submit appointment requests through the website.
- **User Authentication:** Login, registration, and session-aware functionality.
- **Health Tips:** Browse health and wellness information.
- **Community:** Explore community content across multiple sections.

## 🖥️ Website Screenshots

### 1. Home Page

![Homepage](screenshots/HomePage.PNG)

### 2. Doctors

Explore the doctor directory and its search functionality.

![Doctors Page](screenshots/Doctors.PNG)

### 3. Appointments

View the appointment booking interface.

![Appointments Page](screenshots/appointments.PNG)

### 4. Community

The following screenshots show the Community page in order.

![Community - Part 1](screenshots/Community1.PNG)

![Community - Part 2](screenshots/Community2.PNG)

![Community - Part 3](screenshots/Community3.PNG)

![Community - Part 4](screenshots/Community4.PNG)

### 5. Health Tips

Explore the Health Tips page across its three screenshots.

![Health Tips - Part 1](screenshots/HealthTips1.PNG)

![Health Tips - Part 2](screenshots/HealthTips2.PNG)

![Health Tips - Part 3](screenshots/HealthTips3.PNG)

### 6. Login and Registration

**Login**

![Login Page](screenshots/index.PNG)

**Sign Up**

![Sign Up Page](screenshots/signup.PNG)

## 🛠️ Technologies Used

- **HTML5** — Web page structure
- **CSS3** — Styling and responsive layouts
- **JavaScript** — Client-side interactions and dynamic functionality
- **PHP** — Server-side processing and authentication
- **MySQL / MariaDB** — Database management
- **XAMPP** — Local development environment

## 📁 Project Structure

```text
MediCommunity/
├── backgrounds/    # Background images and visual assets
├── images/         # Website images and other visual assets
├── js/             # JavaScript functionality
├── pages/          # Website pages
├── php/            # Server-side PHP scripts
├── screenshots/    # Website screenshots for this README
├── styles/         # CSS stylesheets
├── .gitignore      # Excludes private and generated files
└── README.md       # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Install [XAMPP](https://www.apachefriends.org/) with Apache, PHP, and MySQL/MariaDB.

### Installation

1. Clone the repository into your XAMPP `htdocs` directory:

   ```bash
   git clone https://github.com/Aleen-coder/MediCommunity.git
   ```

2. Start **Apache** and **MySQL** from the XAMPP Control Panel.

3. Configure your local database connection using your private PHP configuration file. Keep database credentials outside the public repository.

4. Create the database required by the application and import the appropriate database schema or SQL backup locally. The database name and tables must match the application's configuration.

5. Open the application in your browser. For example, if the project folder is named `MediCommunity` and Apache uses port `8080`, visit:

   ```text
   http://localhost:8080/MediCommunity/
   ```

   If Apache uses port `80`, the address will usually be:

   ```text
   http://localhost/MediCommunity/
   ```

   Open the relevant page under `pages/` if the project does not have a root-level entry page.

## 🔐 Security Notes

- Database credentials and local connection files should never be committed to GitHub.
- Private database dumps, including `users.sql`, should remain excluded from version control.
- Use test accounts and non-sensitive data during development.
- Validate user input and protect database operations against SQL injection.

## 🔮 Future Improvements

- Enhance accessibility and responsive behavior across devices.
- Expand appointment management and user feedback.
- Strengthen validation, error handling, and security.
- Add further healthcare resources and community features.

## 👩‍💻 Author

**Aleen Amer**

GitHub: [@Aleen-coder](https://github.com/Aleen-coder)

---

*Developed as a healthcare web development project.*
