# Social Media App

## API LINK

[API LINK](https://documenter.getpostman.com/view/21676004/2sA2xmUAuJ)

## Description

It is a project on social media platform where user can signin and login. It allows user to perform CRUD operation on post and like the post.

## Feature

- User Authentication: Users can sign up for a new account and log in securely.
- Post Management: Users can perform CRUD opreation on every posts.
- User can like there post.
- Scalable Database: MongoDB with Mongoose provides a flexible and scalable database solution.

## Techstack

- `Node.js`
- `Express.js`
- `MongoDB`
- `Mongoose`

## Local Setup

### Clone the Repository:

```bash
    git clone git@github.com/yourusername/social-media.git
    cd social-media
```

### Install Dependencies

`npm install`

### Envirnoment Variables:

- Create a .env.local file in the project root.
- Add the following wnvironment variables:

```dotenv
    MONGODB_URI=mongodb://localhost:27017
    DB_NAME=social-media
    PORT=8000

    SECRET_KEY=your-secret-key
    SECRET_KEY_EXPIRY=expiry-time
```

### Run the App:

`npm run dev`

### Open in Browser

`Open your browser and go to http://localhost:8000`
