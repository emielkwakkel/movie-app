In this workshop we are going to build an application to check the IMDB movie database.

# Getting started
Run `ionic start movies blank`. This will generate the project called 'movies' using the Ionic 'blank' template.
Navigate to the movies project folder using `cd movies` and check the result in the browser (`ionic serve --lab`).

# 1. Editing the home page
Welcome

# 2. Add search page
Using the Ionic CLI it's easy to generate a page for your app.

Run `ionic generate page search`. `generate` can be alliased with `g`.

Run `<ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>`


# iOS & Android
We'll have to use the Cordova CLI, wrapped by the Ionic CLI (`ionic cordova ...`) to add the iOS (if on MacOS) and Android platforms to the project.

Before we get to it we'll have to name our app in the main config file (`./config.xml`). On line 2 rename the widget element id propery from `io.ionic.starter` to an unique identifier. On line 3 rename the name property to `MoviesApp`.

## iOS (MacOS only)
Make sure to have Xcode installed. You can download it from here: https://developer.apple.com/xcode/

Run `ionic cordova platform add ios`. 

Notice the platforms/ios folder generated in the root of your project. The platforms folder can be easily regenerated in a later stage, so you don't need to commit any of these files to GIT. Cordova will add plugins to add basic native functionality. Once the command finished running you'll have to build the project ion order to set it up using Xcode.

Run `ionic cordova build ios`.

This will build the project and wrap it in the cordova shell.

Open `MoviesApp.xcodeproj` with Xcode. In the main top bar select an iPhone model emulator, or a connected iOS device. By pressing the play button the project will be run on the selected (emulated) device. In the left toolbar click on the root element `MoviesApp project`, in the `General` tab.  In the signing you'll be able to use your Apple Developers ID to sign the app.

## Android
Make sure to have Android Studio installed. You can download it from here: https://developer.android.com/studio/

Run `ionic cordova platform add android`. The platforms/android folder will be generated, just like the iOS platform folder.
Run `ionic cordova build android` to build the Android project. 


## Emulate
If you just want to emulate the app, you can directly open the emulator. 

Run `ionic cordova emulate ios|android`

Add `--livereload` to listen for changes in your project. 
Add `--target "[target]"` to specify a specific target device to emulate on. To list all posible targets run `ionic cordova emulate --list`.

Example: `ionic cordova emulate ios --livereload --target "iPhone-X, 11.4"`

Full documentation on emulate can be found here: https://ionicframework.com/docs/cli/cordova/emulate/
