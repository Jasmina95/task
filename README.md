# Task

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Description

This project is solved using MERN stack. Please find below explanation to provided solution.

I am well aware that the provided solution is not as it is supposed to be. I have spent some time researching, and if I am right then the search functionality should have been solved using strategy pattern. This is however beyond my current knowledge and everything we have done within Paragon education. So, to provide one solution that will cover as much requirements as possible, implemented are two search functions (toggle component is provided to switch between them). One (specified as "WORD") uses a text index added to Mongoose schema definition. This one does not consider input as a phrase but rather filters all documents that contain at least one of them, but at the same time doesn't filter anything as long as the entered word doesn't make sense in english language. This way, it is made sure that based on different words more filtered movies will be returned to the end user. The oher solution (specified as "PHRASE") matches the entire phrase, which is why more likely only movies with matching title will be returned. Both search functionalities are fired only after checking if some of the keywords that match phrases like "after 2015", "at least 3 stars" are not present. If such a phrase is recognized, then corresponding filtering is performed. This part is unfortunately hard-coded, because of the reasons mentioned above.

Rating part of the task is available only for logged in users, for which "Rate Movies" link in header component becomes visible that navigates user to the list of all available movies and tv shows. This list shows only rating provided by the specific user, while movie card components on home page shows average rating.

## Built With

- React.js
- Node.js
- Express.js
- MongoDB
- Material-UI

## To get a local copy up and running follow these simple steps:

1. Clone the repo

### `https://github.com/Jasmina95/task.git`

2. Install NPM packages

### `npm install`

3. In the server folder add .env file with following information: 

- PORT='port'
- JWT_SECRET='YOUR_secret_key'
- MONGO='Your mongoUri'

4. Start the project by running following command in the server folder

### `npm run dev`

5. If problems occur, run frontend and backend separately. Use

### `npm run server`

to run the backend in the server folder, and

and

### `npm start`

in the client folder to start the frontend.

6. In order to seed database navigate to seedDB folder and run

### `node seedDB.js`

inside console.

7. For testing purposes use following credentials:

   - Email: esmir@task.com, password: changeMe!
   - Email: lejla@task.com, passowrd: changeMe!,
   - Email: lamija@task.com, password: changeMe!

or create new user on your own using provided sign up functionality.
