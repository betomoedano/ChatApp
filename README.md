![Miniature](https://user-images.githubusercontent.com/43630417/167732465-f02c0dea-48db-4e23-ab26-90ca69115251.png)
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
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  databaseURL: Constants.expoConfig.extra.databaseURL,
  //   @deprecated is deprecated Constants.manifest
};
```

Run the project

```
expo start
```

Congratulations 🎉 Now you have a functional Chat App working locally

Subscribe to [my channel](https://youtube.com/c/BetoMoedano)

## Known issues

Expo SDK and libreries are always updating their versions and deprecating others. before installing the libreries run.

```
yarn add expo@latest
```

Next you can run:

```
    npx expo install --fix
```

Older versions of `react-native-gifted-chat` have a some issues. make sure you have the latest.

```
npx expo install react-native-gifted-chat@latest
```

Expo will show you what dependencies need to be updated. Install the dependencies expo suggest you. It is possible that there is cache and you have to run.

```
yarn start --reset-cache
```

## Support My Work

If you find this project helpful and want to support my work, the best way is by enrolling in one of my courses:

- **React Native Course**: [codewithbeto.dev/learn](https://codewithbeto.dev/learn)
- **React with TypeScript Course**: [codewithbeto.dev/learnReact](https://codewithbeto.dev/learnReact)
- **Git & GitHub Course**: [codewithbeto.dev/learnGit](https://codewithbeto.dev/learnGit)

For other ways to support my work, please consider:

- **Become a Code with Beto channel member**: [YouTube Membership](https://www.youtube.com/channel/UCh247h68vszOMA_OWpGEa5g/join)
- **GitHub Sponsors**: [Sponsor Me](https://github.com/sponsors/betomoedano)

You can also support me by using my referral links:

- Get an exclusive 40% discount on CodeCrafters: [Referral Link](https://app.codecrafters.io/join?via=betomoedano)
- Get a 10% discount on Vexo Analytics with code "BETO10": [Vexo](https://vexo.co)
- Sign up for Robinhood and we'll both pick our own gift stock 🎁: [Robinhood](https://join.robinhood.com/albertm-8254f5)
- Get 500 MB of Dropbox storage: [Dropbox](https://www.dropbox.com/referrals/AAC52bYrrPqp8FZ7K5gxa-I74wecLpiQuB4?src=global9)

Your support helps me keep creating amazing projects!


## Connect with Me

- **Website**: [Code With Beto](https://codewithbeto.dev)
- **X (formerly Twitter)**: [@betomoedano](https://x.com/betomoedano)
- **GitHub**: [betomoedano](https://github.com/betomoedano)
- **LinkedIn**: [Beto Moedano](https://www.linkedin.com/in/betomoedano/)
- **Discord**: [Join Our Community](https://discord.com/invite/G2RnuUD8)
- **Medium**: [@betomoedano01](https://medium.com/@betomoedano01)
- **Figma**: [betomoedano](https://www.figma.com/@betomoedano)
