## Overview

A react native millicast sample application for integration and test of custom libWebRTC packages

## Requirements and supported platforms

The application is meant to run on Android mobiles, Android TV's and iOS devices

### Environment Set Up

- We recommend using `yarn`, if you don't have it installed execute:

```
npm install --global yarn
```

- For **iOS** bundler is required

```
gem install bundler
```

### Pre-requisites

- Bundler installed
- Yarn installed
- Xcode 15.2
- Cocoapods installed (Tested on versions > 1.14.3)

## Update Stream Name and Account Id to view

Update the `STREAM_NAME` and `ACCOUNT_ID` variable in the `.env` file with your choice of Dolby.io Stream Name and Account ID to view

## How to build and run the Sample App

The steps 1 and 2 are common for all devices.

1. Install the dependencies:

```
yarn cache clean

yarn install
```

2. Start the metro dev server, execute:

```
yarn start
```

#### Run project in iOS:

```
export GITHUB_PERSONAL_ACCESS_TOKEN=<Your personal access token>

cd ios && bundler install

bundle exec pod install --repo-update
```

To run from terminal:

```
yarn ios
```

Note: `YOUR_PERSONAL_ACCESS_TOKEN` gives you access to the private release artifacts in [this](https://github.com/millicast/libwebrtc-react-native/releases) repository

To run from Xcode:

1. Open Xcode.
2. Select `Open a project from a file` and then select `../ios/RNSampleMillicast.xcworkspace`.
3. Select `RNSampleMillicast` target.
4. Run the project.

#### Run project in Android: Using terminal

```
yarn android
```

### This project uses react-native-webrtc with fixes:

This project uses a custom version of react-native-webrtc from the repository -> https://github.com/millicast/react-native-webrtc.
For consuming this fixes in another react native project, the following changes should be done:

Please refer to `package.json` file:

```
"react-native-webrtc": "github:millicast/react-native-webrtc#{commit-hash}"

```
