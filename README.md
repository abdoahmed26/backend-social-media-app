# 🎨 **Social Media API**

A Social Media APIs implemented with (Node.js, Express.js, MongoDB)


## ✨ Follow Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin&labelColor=blue)](https://www.linkedin.com/in/abdo-ahmed-67185a28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
 [![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github&labelColor=black)](https://github.com/abdoahmed26)


## 📋 Table of content
- [Installation](#Installation)
- [Usage](#Usage)
- [Tech Stack](#Tech-Stack)
- [Features](#Features)
- [Documentation](#Documentation)

## 📥 Installation

1- **Clone the repo**

```bash
    git clone https://github.com/abdoahmed26/backend-social-media-app.git
    cd backend-social-media-app
```
2- **Install dependencies**

```bash
    npm install
```
3- **Setup environment variables**
    ```env
        DATABASE_URL = your database url

        JWT_SCRET_KEY = random value

        PORT = your port ex(5000)
    ```

## Usage

```bash
    npm run dev
```

## Tech Stack
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Multer**: Middleware for handling multipart/form-data,   primarily used for file uploads.
- **Express Validator**: Middleware for server-side validation.
- **Compression**: Middleware to compress response bodies.
- **Dotenv**: Module to load environment variables from a .env file.
- **CORS**: Middleware to enable CORS.
- **Bcrypt**: Library to hash passwords.
- **Nodemailer**: Library for sending email
- **Jsonwebtoken**: Library for sign and verify token 


## ⚙ Features

- **👤 User Management** 
    - user can register new account or use  his google account
    - user can login 
    - user can update his (personal infos, email, profile image, password)
    - user can reset his password in case of forgotten 
- **📄 Post Management**
    - user can (create, update, delete) his his own post
    - user can like/unlike post
    - user can get post feed based on his friends posts and heighest rech posts
    - user can get other users who liked his post
- **📝 Comment Management**
    - user can (add, delete, update) comment on post
    - user can get comments on specific post 
    - user can like/unlike on a comment
    - user can reply on a comment
    - user can get comment replies
    - user can get other users who liked his comment

## Documentation

**[Documentation](https://documenter.getpostman.com/view/31014616/2sAXxWbVSW)**