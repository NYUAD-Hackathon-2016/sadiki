# sadiki

A chat bot for helping refugees settle into new places

## Project structure

### app.js
Very basic application bootstrap. Calls and configures the databse, models, routes and the server itself.

### package.json
Project information and dependencies. In order to add a new dependency, install it by doing `npm install <package> --save`.

### Procfile
Used by heroku when deploying. This file specifies what should be run on each deploy and what type of dyno it will run on.

### config/
Base configuration for the app. Database configuration, secrets, routes and basic server settings go here.

### controllers/
Each controller is in charge of a set of routes. Controllers should expose a handler (function) for each route they handle.

### lib/
External libraries and adapters to them. Utility files also go here.

### models/
Each of mongoose's model gets defined here. Whenever you create a new model, you should add it to the `models/setup.js` file, so that it is accessible throughout the app by doiing `mongoose.model('ModelName')`.

### public/
Files to be used by the front end application.

### scripts/
Utility scripts to be run standalone. In order to seed the database with basic records run `node scripts/seed.js`.

### services/
Single responsibility services that expose only one method. Services are to be used by controllers or scripts.

### views/
Views to be used by the front end application.
