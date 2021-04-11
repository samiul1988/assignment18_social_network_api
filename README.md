## Assignment 18: Social Network API
---
### Topic
MongoDB and Mongoose

### User Story (Obtained from the assignment description)

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

### Acceptance Criteria (Obtained from the assignment description)

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## My Actions and Notes

* The project was developed from scratch.
* Basic considerations were as follows:
    * Following packages were used: ```express```, ```mongoose```, ```sequelize```, ```dotenv```, ```bcrypt```, ```express-session``` and  ```connect-session-sequelize```
    * Application's folder structure follows MVC paradigm
    * Application was deployed to Heroku
    * For each model, I attempted to create all CRUD apis, some of which return json as response, and some were used in homepage and dashboard page routes to render appropriate views
    * If the authenticated user is idle for 10 mins, then he/she is automatically signed out and returned to homepage
    * I also set the session cookie to be expired in 5 hours
    * I added features so that if the user is logged in, then he/she can delete his/her own comments from any post 

### Demo Run
![Demo Run](./assets/images/assignment14_demo.gif)

### Link of Walkthrough Video
[walthrough Video](https://assignment14-tech-blog.herokuapp.com/)
