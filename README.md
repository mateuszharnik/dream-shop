# Dream Shop

E-commerce written in MongoDB, Express.js, Angular and Node.js (MEAN stack). You can't see this website on the internet but you can see the demo [here](https://www.youtube.com/watch?v=Sz-_cAv_plY). This project was made by me in 100%.

## Prerequisites

1. [NodeJS](https://nodejs.org/en/download/) - Make sure you have NodeJS version 12.16.2
1. [Yarn](https://classic.yarnpkg.com/en/) - You have at least Yarn version 1.22.10
1. [MongoDB](https://www.mongodb.com/) - Please install MongoDB version 4.4.4
1. [AngularCLI](https://angular.io/cli) - Install using this command:

   ```sh
   $ yarn add @angular/cli@11.2.2
   ```

## After you install all [Prerequisites](#prerequisites)

1. Clone this repository using command bellow:

   ```sh
   $ git clone https://github.com/mateuszharnik/dream-shop.git
   ```

1. Go to the client folder and install all dependencies:

   ```sh
   $ cd dream-shop/client
   $ yarn install
   ```

1. Next back to the root folder then go to the server folder and install all dependencies:

   ```sh
   $ cd..
   $ cd server
   $ yarn install
   ```

1. In the server folder copy `.env.example` file and rename it to `.env`:

   ```sh
   $ cp .env.example .env
   ```

1. Seed the database with empty or example data using command:

   ```sh
   $ yarn seed

   or

   $ yarn seed-example
   ```

## Environment variables

You only need to set required environment variables which are included below.

```sh
# Enviroment
NODE_ENV = "development"

# Client
CLIENT_URL = "http://localhost:4200"
CLIENT_PORT = 4200

# Server
SERVER_URL = "http://localhost:3000"
SERVER_PORT = 3000

# Database
DB_URL = "localhost/dream-shop"

# Secret
SECRET = "keyboard_cat"

# Admin credentials
ADMIN_EMAIL = "email"
ADMIN_PASSWORD = "password"
```

## How to run ?

To run this project you need to run two commands.

1. To run client go to the `dream-shop/client` and run command `yarn start`
1. To run server go to the `dream-shop/server` and run command `yarn dev`

## Screenshots

![Main page](https://github.com/mateuszharnik/dream-shop/blob/master/screenshots/main.gif?raw=true)

![Product page](https://github.com/mateuszharnik/dream-shop/blob/master/screenshots/product.gif?raw=true)

![Cart page](https://github.com/mateuszharnik/dream-shop/blob/master/screenshots/cart.gif?raw=true)

![Login page](https://github.com/mateuszharnik/dream-shop/blob/master/screenshots/login.gif?raw=true)

![Admin page](https://github.com/mateuszharnik/dream-shop/blob/master/screenshots/admin.gif?raw=true)

![Orders page](https://github.com/mateuszharnik/dream-shop/blob/master/screenshots/orders.gif?raw=true)

## Acknowledgments

[Open source libraries used in this project](https://github.com/mateuszharnik/dream-shop/wiki/Open-Source-Libraries)

## License

[MIT License](https://github.com/mateuszharnik/dream-shop/blob/production/LICENSE.md)
