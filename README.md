# YATL
Yet Another Todo List made as an example project
### Technology stack
- Frontend
	- [React](https://reactjs.org/ 'React')
	- [Redux](https://redux.js.org/ 'Redux')
	- [Redux Toolkit](https://redux-toolkit.js.org/ 'Redux Toolkit')
	- [Typescript](https://www.typescriptlang.org/ 'Typescript')
	- [Fontawesome Icons](https://fontawesome.com/ 'Fontawesome Icons')
	- [React Google Login](https://github.com/anthonyjgrove/react-google-login 'React Google Login')
	- [ky](https://github.com/sindresorhus/ky 'ky')
- Backend
	- [Express](https://expressjs.com/ 'Express')
	- [Express-JWT](https://github.com/auth0/express-jwt 'Express-JWT')
	- [Express Validator](https://express-validator.github.io/ 'Express Validator')
	- [Json Web Token](https://github.com/auth0/node-jsonwebtoken 'Json Web Token')
	- [Sequelize](https://sequelize.org/ 'Sequelize')
	- [SQLite3](https://github.com/mapbox/node-sqlite3 'SQLite3')
	- [Typescript](https://www.typescriptlang.org/ 'Typescript')
	- [TS-Node](https://github.com/TypeStrong/ts-node 'TS-Node')

------------

### How to setup
1. Clone this project
2. Config .env files (copy example.env as .env and fill it up)
	- Google Client Id can be taken from https://console.cloud.google.com/apis/credentials. Create new project, add OAuth 2.0 Client and use it's Client Id in both backend `.env` and webapp `.env` (it should be the same). Authorized JavaScript origins are better to have port 3000 because this project is already set up for it.
	- Or you can use my test Google Client Id. Attention: this client id is configured to allow login from `http(s)://localhost:3000` only, so it can't be used on public, only localhost.
  `46404982759-ng6fri63d2kir7mp2mmh01gj9qeg7om9.apps.googleusercontent.com`
3. Start the app
	- (Development) Use `npm start` in root folder to start the backend and `npm start` in /webapp to start webapp. Pay Attention: port in backend `.env` should be 4000 because frontend server configured to forward unkown http requests to `http://localhost:4000` (can be changed in webapp/package.json, proxy field)
	- (Production) Use `npm build` in root folder to build backend production and `npm build` in /webapp to build frontend production. Then in the root folder use `npm start:prod` to start app.
