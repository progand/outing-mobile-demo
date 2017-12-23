# OutingTravel Nativescript Mobile App

This is an app based on [Nativescript](https://www.nativescript.org/) and developed using [TypeScript](https://www.typescriptlang.org/) and [Angular](https://angular.io/). 

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Nativescript CLI](https://docs.nativescript.org/angular/start/quick-setup#step-2-install-the-nativescript-cli)
* [iOS or Android requirements](https://docs.nativescript.org/angular/start/quick-setup#step-3-install-ios-and-android-requirements)

>If you cane across proplems during installation check out [Troubleshooting](https://docs.nativescript.org/angular/start/troubleshooting)

## Installation

* `git clone https://github.com/progand/outing-mobile-demo` this repository
* `cd outing-mobile-demo`
* `npm install`

## Running / Development

### Livesync

Connect your device to developer's computer or setup emulator and run one of the following commands.

```
tns run ios // for iOs
```

or 

```
tns run android // for android
```

These commands deploy not-optimized build to the device or emulator.

### Optimized builds 

You can try optimized build on your device or emulator before publishing. Optimization makes app load faster. However build process is slow and not aimed for development.

```
npm run start-ios-bundle --uglify // for iOs
```

or 

```
npm run start-android-bundle --uglify --snapshot // for android
```

### Publishing

## Publishing for iOS

You can publish a NativeScript app in the App Store the same way you would release a [purely native iOS app](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/Introduction/Introduction.html).

1. Verify that the iOS native project inside your app contains your latest changes and resources by running the following command. 

```
tns prepare ios --release
```

You can build a bundled version of the application for iOS in release with this script:

```
npm run build-ios-bundle -- --release --forDevice --teamId TEAM_ID
```

2. Open the iOS native project in Xcode. Your native project is located at: `{app-name}/platforms/ios/{app-name}.xcodeproj`.
3. [Configure the project for distribution](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html).
4. [Upload the app to iTunes Connect](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/UploadingYourApptoiTunesConnect/UploadingYourApptoiTunesConnect.html).
5. [Submit it to the App Store](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

See [Nativescript documentation](https://docs.nativescript.org/angular/publishing/publishing-ios-apps) for details.

## Publishing for Android

You can publish a NativeScript app in Google Play the same way [you would release a purely native Android app](http://developer.android.com/tools/publishing/publishing_overview.html).

1. Make sure that you have a `.keystore` file to sign your app with. For more information, see [How to create a .keystore file?](http://developer.android.com/tools/publishing/app-signing.html#signing-manually)
2. Build your project in release mode by running the following command: 

```
npm run build-android-bundle -- --release --keyStorePath ~/path/to/keystore --keyStorePassword your-pass --keyStoreAlias your-alias --keyStoreAliasPassword your-alias-pass
```

3. Obtain the release .apk located at `<app_name>/platforms/android/build/outputs/apk/<app_name>-release.apk`.
4. Publish your Android app by uploading the .apk file to the Google Developer Console. For more information, see [How to publish an Android app](http://developer.android.com/distribute/googleplay/start.html)?

Example build command: 

```
npm run build-android-bundle --uglify --snapshot -- --release --key-store-path ~/outing.jks --key-store-password outing --key-store-alias outing --key-store-alias-password outing
```

or (far latest version):

```
tns build android --bundle --env.aot --env.uglify --env.snapshot --release --keyStorePath ~/outing.jks --keyStorePassword outing --keyStoreAlias outing --keyStoreAliasPassword outing
```