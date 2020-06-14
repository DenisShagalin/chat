
### Server
Create .env with the following:
```
EXPRESS_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=

```
Then run
```
npm install
npm run migrate
npm run seed
npm start
```
### Client
Create .env with the following:
```
REACT_APP_API=
REACT_APP_SOCKET_API=
```
Then run
```
npm install
npm run build-cordova
npm run build-sdk
```

Or you can run localy
```
npm start