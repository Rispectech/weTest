# weTest

Foobar is a simple app for taking a test and getting a score out of it .

## Installation

Use the npm manager to install the project

```bash
git clone https://github.com/Rispectech/weTest.git
```

After cloning the project, please go into the server, install the dependencies, and then start in the mode you want it to be

also before starting the server , make sure to include an .env file for jwt secrets

.env.example

```bash
JWT_ACCESS_SECRET=8

JWT_REFRESH_SECRET=6
```

```bash
cd server
npm i
npm run dev
npm run start
```

dev comment to start the server with nodemon with watch setup otherwise for normal startup use start command

After starting the server, go to the web directory, install the dependencies and start the frontend

```bash
cd ..
cd web
npm i
npm run start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
