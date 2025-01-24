# Dynamic Form in Reactjs

## Overview
This project is a **Dynamic Form** built using **React**. It allows you to dynamically generate forms based on a provided JSON schema. The form includes built-in validation using **react-hook-form** and **Yup**.

### Key Features
- Dynamically generate forms based on a JSON schema.
- Built-in validation for fields (required, minLength, maxLength, etc.).
- Support for multiple field types (text, email, password, file, etc.).
- Reset and submit functionality.
---

## Installation and Setup

This project is created using Vite and installed few dependencies:
- npm create vite react-fomr --template
- npm install react-hook-form @hookform/resolvers yup
- npm install bootstrap


### Prerequisites
Make sure you have the following installed:
- **Node.js** v18
- you can install node by using nvm install, first install the nvm(node package manager) and run (nvm install 18.12.0)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd react-form
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Application
```bash
npm run dev
```
The application will run on `http://localhost:5173`.


---

### JSON Schema Example
Here’s an example JSON schema for generating a registration form:

```json
{
  "formTitle": "User Registration Form",
  "formDescription": "Please fill out the form to register.",
  "fields": [
    {
      "id": "username",
      "type": "text",
      "label": "Username",
      "required": true,
      "placeholder": "Enter your username",
      "validation": {
        "minLength": 3,
        "maxLength": 20
      }
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "Enter your email",
      "validation": {
        "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "password",
      "type": "password",
      "label": "Password",
      "required": true,
      "placeholder": "Enter a secure password",
      "validation": {
        "minLength": 8,
        "message": "Password must be at least 8 characters long"
      }
    },
    {
      "id": "gender",
      "type": "radio",
      "label": "Gender",
      "required": true,
      "options": [
        { "value": "male", "label": "Male" },
        { "value": "female", "label": "Female" },
        { "value": "other", "label": "Other" }
      ]
    }
  ]
}
```

### Steps to Use
1. Place your schema in the `json/schema.json` file.
2. The form will automatically render based on the provided schema.
3. Submit the form to see the captured data in the console.

---

## Components

### Form.jsx
This component:
- This will renders the form based on the schema provided in the json/schema.json.
- Handles validation funtionality using Yup and react-hook-form.
- Includes submit and reset functionalities.

### FormField.jsx
This component:
- Dynamically renders form fields (text, radio, etc.).
- Displays validation error messages.
- Displays the fields that are mandatory next to the field label


---

## Limitations
**File Uploads**: File uploads are rendered but do not include logic for handling file data.


