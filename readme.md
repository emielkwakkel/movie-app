In this workshop we are going to build an application to check the IMDB movie database.

# Getting started
Run `ionic start movies blank`. This will generate the project called 'movies' using the Ionic 'blank' template.
Navigate to the movies project folder using `cd movies` and check the result in the browser (`ionic serve --lab`).

# 1. Create navigation menu
## 1.1 Generate pages
Our app will have two main pages.

1. *Search*: search the OMDB movie database
2. *Featured*: list two featured movies

We also need a `tabs` page to host the navigation menu. Using the Ionic CLI it's easy to generate a page for your app.

Run `ionic generate page tabs`. Also run the same command for the `search` and `featured` page. The `generate` command can be alliased with `g`.

## 1.2. Create tab menu
We don't need the home page anymore, so delete the `./src/pages/home` folder. The `tabs` page will be the main view. 

In `./src/app/app.module.ts` you'll have to replace `HomePage` with `TabsPage` in the declarations and entryComponents NgModule array.
In `./src/app/app.component.ts` set the rootPage property to `TabsPage`.

Open `./src/pages/tabs/tabs.html` and update the view to include the navigation bar.
```html
<ion-tabs>
  <ion-tab [root]="tab1Root" tabTitle="Search" tabIcon="search"></ion-tab>
  <ion-tab [root]="tab2Root" tabTitle="Featured" tabIcon="heart"></ion-tab>
</ion-tabs>
```
To view a list of all posible icons have a look at [IonIcons](https://ionicframework.com/docs/ionicons/)

Open `./src/pages/tabs/tabs.ts` and add the references to the pages to the class.
```typescript
  tab1Root: string = 'SearchPage';
  tab2Root: string = 'FeaturedPage';
```

Notice the reference to the page being a string. There will be no need to import the pages as we are going to use IonicPage for navigation. This has two advantages: it allows for deeplinking in the app including passing data via the uri to the view, and it supports lazyloading pages out of the box. We'll have to decorate the featured and search page module to mark the module as an Ionic page.

Open `./src/pages/featured/featured.ts` and add the IonicPage decorator like so:

```typescript
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { FeaturedPage } from './featured';

@IonicPage()
@NgModule({
  declarations: [
    FeaturedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeaturedPage),
  ],
})
export class FeaturedPageModule {}
```

Do the same for `./src/pages/search/search.ts`.

# 3. Add search page
Add `<ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>` to the view.


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
