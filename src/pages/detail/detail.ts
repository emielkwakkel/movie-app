import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

@IonicPage({
  name: 'detail-page',
  segment: 'detail/:id'
})
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  private imdbID: string = this.navParams.data.id;
  public movie: any;
  public error: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieService: MovieProvider) {
  }

  ionViewDidLoad() {
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

}
