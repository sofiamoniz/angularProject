
# Customers App - Dashboard for Managing Customers  
**Developed by Sofia Moniz**  

This project was developed using **Angular 17**. It consists of a single-page application that functions as a dashboard for managing customers.  

---

## ✨ Features  
- **User table**: Displays all users in an expandable table with detailed information.  
- **Birthday highlights**: Users who have a birthday in the same month are highlighted with a specific color (each month has an assigned color) and contain a 🎂 emoji next to the birth date.  
- **Search & filter**: Search for users by first and last name, as well as filter them by whether they have a contract.  
- **User deletion**: Remove users from the list.  

---

## 📸 Preview  
![Project Preview](https://private-user-images.githubusercontent.com/44319421/423245184-7b7bd962-1509-4e1d-91f4-996ed615887c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDIxNTQ3NTUsIm5iZiI6MTc0MjE1NDQ1NSwicGF0aCI6Ii80NDMxOTQyMS80MjMyNDUxODQtN2I3YmQ5NjItMTUwOS00ZTFkLTkxZjQtOTk2ZWQ2MTU4ODdjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAzMTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMzE2VDE5NDczNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTkzZjkxYzBhMDcyZTJmMGJhMWZmM2E3MzRkMGZhNTY3MmUxMTVmNDY5MDk2ZDkxZmVjNjQ5OWY2MzYyNDk0YjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.A0GUr192VibZ2yNYc3xE6pRagq8nZ9swjGSx9Lri4OU)

---

## 🏗️ Repository structure  

```plaintext
/customersApp
│── cypress/  
│   │── downloads/       # Folder where downloaded files during tests are stored  
│   │── e2e/             # End-to-end test specifications  
│   │   │── helpers/     # Reusable utility functions for test automation  
│   │── fixtures/        # Mock data for simulating API responses  
│   │── support/         # Custom Cypress commands and global test configurations  
│   │── tsconfig.json    # TypeScript configuration for Cypress tests  
│── src/
│   │── app/
│   │   │── components/        # Reusable UI components
│   │   │── helpers/           # Utility functions and shared helpers
│   │   │── ngrx/              # NgRx state management (actions, reducers, effects, etc.)
│   │   │── app.component.html
│   │   │── app.component.scss
│   │   │── app.component.spec.ts
│   │   │── app.component.ts
│   │   │── app.config.ts       # Application-wide configuration settings
│   │   │── app.routes.ts       # Application route definitions
│   │── assets/                 # Static assets (images, fonts, JSON files)
│   │── main.server.ts          # Server-side entry point
│   │── main.ts                 # Client-side entry point
│   │── index.html              # Main HTML file
│── angular.json                # Angular CLI configuration
│── package.json                # Project dependencies and scripts
│── package-lock.json           # Locked dependencies for reproducible builds
│── tsconfig.json               # TypeScript configuration
│── .editorconfig               # Editor settings and formatting rules
```


## 🛠 Technologies

This project was built using the following technologies:

-   **Angular 17** 
-   **Angular Material** - UI component library
-   **NgRx** - State management
-   **RxJS** - Reactive programming
-   **TypeScript**
-   **SCSS** - Styling
-   **Karma & Jasmine** - Unit testing
-   **Cypress** - End-to-end testing
-   **Git & GitHub** - Version control, following a structured workflow with branches and pull requests. Commits are well-organized and follow a clear naming convention.

----------

## 🚀 How to Run the Project

### 1. Go to the correct folder and then install dependencies

Make sure you have **Node.js** installed and that you are inside the correct folder:
```
cd customersApp
```

Then, run:

```
npm install  
```

### 2. Run the Development Server

Start the application in development mode:

```
ng serve  
```

The app will be available at **http://localhost:4200/**.

----------

## 🤖 How to Run Tests

To execute unit tests:

```
ng test  
```

To run end-to-end (E2E) tests, using cypress:

```
ng e2e  
```


## 🤔 Considerations

This is my first project implemented with Angular, so I decided to approach it based on my experience with React—keeping the project well organized and using a state management technology (in this case, NgRx). 

I believe that, in a real-world scenario, the birthday feature (highlighting each user) should be optional— for example, through a checkbox in the table— as not all users might want it to be visible all the time. Additionally, user management should be improved to allow users to be added and multiple rows to be selected at once.

### 🚧 Current Limitations  
- The application does not yet support adding users or deleting them in batch.  

- ESLint rules have not been implemented yet, which would help with project organization (such as showing warnings for unused imports or enforcing alphabetical order in imports).  

- The first API request is only visible in the DevTools console and does not appear in the Network tab of the browser console. I debugged it and verified that the API call is being dispatched, so I believe this is a cache-related issue. Even though I added the **No-Cache** header to the API requests, I haven't had the opportunity to investigate this problem further.  

- Users' avatars take too long to load due to the links provided by the API, which might cause the E2E tests to time out. To avoid this, please comment out the following lines in **table.component.html**:  

	```html
	<img class="element-avatar" [src]="element.avatar" alt="Avatar" />
	```


### 🌟 Future Improvements  
- The problem with images taking too long to load is critical because, if the dataset contains many users, it will significantly slow down the application. For users, a slow application is as bad as one that doesn’t work. A solution must be found—for example, replacing the image with a default one if it takes longer than a certain time to load.

- Completely separate the logic from the table component.  

- Implement an automatic table refresh interval.  

- Create proper error handling—while NgRx has error variables for each request, they are not yet being used.  

- Improve UI responsiveness for smaller screens—for example, instead of relying on paddings, margins, and `display: flex` in SCSS, a grid system could be implemented.  

- Add i18n to allow translations, letting users choose their preferred language.  

- Ensure an environment independent of the user's Node version by using NVM (Node Version Manager).

- Reduce the bundle size.  

- After adding Cypress to the project, some visual errors appeared in VS Code within unit tests— certain functions are underlined, indicating they don't exist. Even though all tests run successfully and the functions actually exist, this issue should be further investigated, as it might be related to the location where Cypress is looking for tests.

### 🤖 AI Tools  
I used AI tools to improve project organization and save time. I used **ChatGPT** for questions related to Angular and its similarities with React, and the **Codeium** VS Code extension for autocompletion assistance.  

### 📌 Lessons Learned  
- NgRx is very similar to Redux, making state management easier and API calls more organized.  
- Using Cypress for E2E testing helped catch errors efficiently.  
----------
## 📢 Contact

For any questions or suggestions, feel free to reach out:
    
-   **Email**: asofiamoniz@gmail.com
