# Chat App using React Native Expo and Firebase

- See a video tutorial showing how to clone this repository 👉🏼 [https://www.youtube.com/watch?v=iHrTQDHq1WI&t=385s](https://www.youtube.com/watch?v=iHrTQDHq1WI&t=385s)

- Check out the Tutorial 👉🏼 [https://www.youtube.com/watch?v=B6bKBiljKxU&t=323s](https://www.youtube.com/watch?v=B6bKBiljKxU&t=323s)

## How to clone

Clone the repo

```
git clone https://github.com/betomoedano/ChatApp.git
```

cd into the just created project and install dependencies with yarn

```
cd ChatApp && yarn
```

Add your firebase backend config in the `firebase.js` file

```
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL
};
```

Run the project

```
expo start
```

Congratulations 🎉 Now you have a functional Chat App working locally

Subscribe to [my channel](https://youtube.com/c/BetoMoedano)
![Miniature](https://user-images.githubusercontent.com/43630417/167732465-f02c0dea-48db-4e23-ab26-90ca69115251.png)

## Known issues

Expo SDK and libreries are always updating their versions and deprecating others. before installing the libreries run.

```
yarn add expo@latest
```

Next you can run:

```
npx expo install
```

Older versions of `react-native-gifted-chat` have a some issues. make sure you have the latest.

```
npx expo install react-native-gifted-chat@latest
```

Expo will show you what dependencies need to be updated. Install the dependencies expo suggest you. It is possible that there is cache and you have to run.

```
yarn start --reset-cache
```
