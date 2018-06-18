In this workshop we are going to build an application to check the IMDB movie database.

# Getting started
Run `ionic start movies blank`. This will generate the project called 'movies' using the Ionic 'blank' template.
Navigate to the movies project folder using `cd movies` and check the result in the browser (`ionic serve --lab`).


# 1. Create navigation menu
## 1.1 Generate pages
Our app will have two main pages and a *movie detail* page.

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
To view a list of all posible icons have a look at [IonIcons](https://ionicframework.com/docs/ionicons/), more information on tabs can be found at the [docs](https://ionicframework.com/docs/components/#tabs-icon-text).

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

# 2. Search and retrieve data from the API
## 2.1. Create a movie provider (service)
A provider (also known as service) is used to centralise logic for use in multiple components. Exactly something we need for handling calls to the OMDB api. We can use the Ionic CLI to generate a provider for us.

Run `ionic generate provider movie` and open the generated `./src/providers/movie/movie.ts` file. Don't worry about adding the provider to the app module, this is already done by the CLI.
As you can see `HttpClient` is injected by default in the generated provider, but you'll have to manually import `HttpClientModule` to the app module and add it to the `imports` array.

The information will be based on IMDB data provided by a publicly available OMDB api. Documentation can be found at http://www.omdbapi.com. Create a [free api key here](http://www.omdbapi.com/apikey.aspx). During the workshop you will receive an api key which is also capable of retrieving poster images.

Add a `getMovies` function to the `MovieProvider`. For the detail page that we are going to build we'll need a `getMovie` function, which loads a single movie based on an ID. Add this function to the `MovieProvider` as well.

```typescript
getMovies(title: string) {
    return this.http.get(`http://www.omdbapi.com/?s=${encodeURI(title)}&apikey=[key]`)
}

getMovie(imdbID: string) {
  return this.http.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=[key]`)
}
```

## 2.2 Update the search component
Open `./src/pages/search/search.html` and update the view.

Remove the `padding` attribute from the `ion-content` element to have the searchbar fill the entire width of the screen.

To add the searchbar and list of found movies update `ion-content` as follows:
```html
<ion-content>
  <ion-searchbar (ionInput)="searchMovies(title)" [(ngModel)]="title"></ion-searchbar>
  <ion-list>
    <ion-item *ngFor="let movie of movies">
      <ion-thumbnail item-start>
        <img [src]="movie.Poster">
      </ion-thumbnail>
      <h2>{{movie.Title}}</h2>
      <p>Type: {{movie.Type}} - Year: {{movie.Year}}</p>
    </ion-item>
  </ion-list>
</ion-content>
```
Documentation of [Ionic Searchbar](https://ionicframework.com/docs/components/#searchbar) and [Ionic List](https://ionicframework.com/docs/components/#lists).

Open `./src/pages/search/search.ts` and add the searchMovies function. Make sure to import the `MovieProvider` and inject it into the constructor for dependency injection.

```typescript
  searchMovies(title: string) {
    this.movie.getMovies(title).subscribe(
      (movies: any) => {
        this.movies = movies.Search
      },
      error => {
        console.error('error', error);
        this.error = error
      });
  }
```

## 2.3 Make it fancy!
There are several improvements waiting for you to implement. Use the Ionic documentation and above examples to work these out! Start with implementing an [Ionic loading spinner](https://ionicframework.com/docs/components/#loading) and handling errors using [Ionic toast](https://ionicframework.com/docs/components/#toast).

# 3 Detail page
## 3.1 Link to detail page
Start by generating a page called `detail` using the Ionic CLI.

Open `./src/pages/search/search.ts` and add a function to navigate to the detail page.

```typescript
pushPage(id: string) {
  this.navCtrl.push('detail-page', {
    'id': id
  })
}
```

In the `search.html` view make sure to handle the click event on the `ion-item` element.

```html
<ion-item *ngFor="let movie of movies" (click)="pushPage(movie.imdbID)">
  ...
</ion-item>
```

## 3.2 Setup detail page
Open `./src/pages/detail/detail.ts`. The detail page will receive an id of the IMDB movie to display data of using the uri. To setup IonicPage to receive an ID we'll have to pass an object to the `IonicPage` decorator.

```javascript
@IonicPage({
  name: 'detail-page',
  segment: 'detail/:id'
})
```

Within the `DetailPage` class add an `imdbId` property and get the id using navParams.

```typescript
private imdbID: string = this.navParams.data.id;
```

The moment the page is loaded we'll have to use this ID to get the movie using `MovieProvider.getMovie(id)`.

```typescript
ionViewDidLoad() {
  // Return undefined if page is loaded without supplying an ID
  if (!this.imdbID) return;

  this.movieService.getMovie(this.imdbID).subscribe(
    (data: any) => {
      this.movie = data;
    },
    (error) => {
      console.error('error', error);
      this.error = error;
    }
  )
}
```

Make sure to add the `movie` and `error` property in the class. To focus on Ionic functionality during this workshop you can type them as `any`, but adding an interface will be a bonus!

We are going to use an [Ionic Card](https://ionicframework.com/docs/components/#cards) to display data of a movie. This movie card can be reused on the `featured` page where we highlight two movies. In order to share this view across pages we are going to create a `movie-card` component.

Run `ionic generate component movie-card` to generate the component. You'll find it in the `./src/components/movie-card` folder.

Open `./src/components/movie-card/movie-card.ts` and add an Input decorator to get specific Movie details.
```typescript
export class MovieCardComponent {
  @Input() movie: any;
}
```

Open `./src/components/movie-card/movie-card.html` and update the view as follows:
```html
<ion-card *ngIf="movie">
  <ion-item>
    <ion-avatar item-start>
      <ion-icon name="film" large></ion-icon>
    </ion-avatar>
    <h2>{{movie.Title}}</h2>
    <p>
      Genre: {{movie.Genre}}
      <br> Released: {{movie.Released}}
      <br> Runtime: {{movie.Runtime}}
    </p>
  </ion-item>

  <img [src]="movie.Poster">

  <ion-card-content>
    <p>{{movie.Plot}}</p>
  </ion-card-content>

  <ion-row>
    <ion-col>
      <button ion-button icon-start clear small>
        <ion-icon name="thumbs-up"></ion-icon>
        <div>{{movie.imdbRating}} rating</div>
      </button>
    </ion-col>
    <ion-col>
      <button ion-button icon-start clear small>
        <ion-icon name="text"></ion-icon>
        <div>{{movie.imdbVotes}} votes</div>
      </button>
    </ion-col>
    <ion-col center text-center>
      <ion-note>
        {{movie.Runtime}} runtime
      </ion-note>
    </ion-col>
  </ion-row>
</ion-card>
```
This will display all needed movie data if present.

Open `./src/components/movie-card/movie-card.scss` and update the style to make the avatar icon bigger:
```css
movie-card {
    ion-avatar ion-icon {
        font-size: 50px;
    }
}
```

You are almost ready to use the `movie-card` component in the `details` page. We'll have to `import { IonicModule } from 'ionic-angular';` and supply `IonicModule` to the `imports` array of `./src/components/components.module.ts`. This will make sure all the Ionic goodieness will be available.

The `movie-card` component is ready for use. All we have to do now is import the `ComponentsModule` in the `DetailsModule` and add the component to the detail view.

```typescript
import { ComponentsModule } from '../../components/components.module';
```

Open `./src/pages/detail/detail.html` and add the movie card component in the `ion-content` element.

```html
<movie-card [movie]="movie"></movie-card>
```

# iOS & Android
We'll have to use the Cordova CLI, wrapped by the Ionic CLI (`ionic cordova ...`) to add the iOS (if on MacOS) and Android platforms to the project.

Before we get to it we'll have to name our app in the main config file (`./config.xml`). On line 2 rename the widget element id propery from `io.ionic.starter` to an unique identifier. On line 3 rename the name property to `MoviesApp`.

## iOS (MacOS only)
Make sure to have Xcode installed. You can download it from [here](https://developer.apple.com/xcode/)

Run `ionic cordova platform add ios`. 

Notice the platforms/ios folder generated in the root of your project. The platforms folder can be easily regenerated in a later stage, so you don't need to commit any of these files to GIT. Cordova will add plugins to add basic native functionality. Once the command finished running you'll have to build the project ion order to set it up using Xcode.

Run `ionic cordova build ios`.

This will build the project and wrap it in the cordova shell.

Open `MoviesApp.xcodeproj` with Xcode. In the main top bar select an iPhone model emulator, or a connected iOS device. By pressing the play button the project will be run on the selected (emulated) device. In the left toolbar click on the root element `MoviesApp project`, in the `General` tab.  In the signing you'll be able to use your Apple Developers ID to sign the app.

## Android
Make sure to have Android Studio installed. You can download it from [here](https://developer.android.com/studio/)

Run `ionic cordova platform add android`. The platforms/android folder will be generated, just like the iOS platform folder.
Run `ionic cordova build android` to build the Android project. 


## Emulate
If you just want to emulate the app, you can directly open the emulator. 

Run `ionic cordova emulate ios|android`

Add `--livereload` to listen for changes in your project. 
Add `--target "[target]"` to specify a specific target device to emulate on. To list all posible targets run `ionic cordova emulate --list`.

Example: `ionic cordova emulate ios --livereload --target "iPhone-X, 11.4"`

Full documentation on emulate can be found here: https://ionicframework.com/docs/cli/cordova/emulate/

# Troubleshooting
## Node-sass errors
Run `npm rebuild node-sass --force` If you run into errors like these:
```
Error: Missing binding /movies/node_modules/node-sass/vendor/darwin-x64-48/binding.node
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 6.x
```
