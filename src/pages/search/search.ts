import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public title: string;
  public movies: any;
  public error: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public movie: MovieProvider) {
  }

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
}
