# Documentation

### Description

- TopicLand is a CRUD operations project where users can view a collection of articles in read-only mode. It features a login section that allows users to create an account or log in using Google OAuth or GitHub OAuth. Once logged in, users can create new articles, edit existing ones, or delete them.
- It has been written using the following tools:
    - NodeJs version 20.18.0
    - Express
    - Passport
    - Handlebars template engine
    - MongoDB

### Part 1 Setup instructions

- Clone this repository
- In the main root, create a .env file and provide the following information:
    - DB_CONNECT="connection with database"
    - GITHUB_CLIENT_ID="your client Id"
    - GITHUB_CLIENT_SECRET="your client Secret"
    - GITHUB_CALLBACK_URL="your callback url"
    - GOOGLE_CLIENT_ID="your client Id"
    - GOOGLE_CLIENT_SECRET="your client secrert"
    - GOOGLE_CALLBACK_URL="your callback url"
- Run npm i
- Run npm start

### Part 2 Routes

- routes/Index.js
    - This route handles with all the authentication and the main routing strategy.
    - This route will display the entry-point for the user, which has to log in either locally or using GitHub/Google to modify information.
   
- routes/articles.js
   - This route handles the main CRUD operations with the DataBase to create new Articles with the corresponding data.
   - To perform all the operations, the following Mongoose methods were used. save(), .find(), .findByIdAndUpdate(), and .findByIdAndDelete().

- routes/topics.js
    - This route handles just one CRUD operation with the DataBase to create new Topics that you can selt when you create a new article.
    - To perform all the operations, the following Mongoose methods were used. save().

- routes/users.js
    - This route handles the CRUD operations with the DataBase to create new Users and store its information.

### Part 3 Access Control

- The application allows the user to log in either using their GitHub/Google account or locally.
- If the user is not logged in, the information will be displayed in read mode.
- If the user is logged in, the information would be displayed in edit mode. Thus, the user could create, read, update, edit, and delete data.
- To handle the authentication part, either local or with third parties, the web application uses the passport module. Also, the passport-github2 and passport-google-oauth2 modules are required.


### Part 4 Link to Live Project

- https://topicland.onrender.com/