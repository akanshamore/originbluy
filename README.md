# OpenBluy - _Media Capture and Session_

## Features

- Session Management through JWT tokens
- Capture and Preview Media
- Secure Storage of Media in AWS S3 Bucket
- Delete Media


## Tech

OpenBluy uses a number of open source projects to work properly:

- [expo] - Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.!
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]



## Installation  ( Backend)

OpenBluy requires [Node.js](https://nodejs.org/) v20+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd openbluy
cd backend
yarn install
yarn dev
```

Mongo and AWS S3 config credentials are defined in .env file 

```sh
Backend is hosted on render. https://originbluy.onrender.com and Mondo DB is hosted on Mongo Atlas. 
```





### Client Setup ( Expo App )  👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   cd frontend
   yarn install
   ```

2. Start the app

   ```bash
    yarn start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).