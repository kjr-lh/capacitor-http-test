# Capacitor http test

This is an example capacitor app to demo using the http plugin to upload File and FormData objects

# Setup 

Run the server - this has two routes that allow files to be uploaded using files and form data. Files will be saved in `server/uploads`

```shell
cd server
npm i
npm run start
```

Run the app

```shell
cd app
npm i
npm run build
npx cap run android
```

Choose a file using the button in the app (you might need to add a file to the device, e.g. with the camera app)
Use either of the upload buttons to upload the file, and see the console output from the server

The upload code is in `app/src/js/capacitor-welcome.js`
