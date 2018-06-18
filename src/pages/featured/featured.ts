import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

@IonicPage()
@Component({
  selector: 'page-featured',
  templateUrl: 'featured.html',
})
export class FeaturedPage {
  private movie1Id: string = 'tt0758758';
  private movie2Id: string = 'tt6306064';
  public movie1: any;
  public movie2: any;
  public error: any;

  constructor(public navCtrl: NavController, public movieService: MovieProvider) {
  }

  ionViewDidLoad() {
    this.movieService.getMovie(this.movie1Id).subscribe(
      (data: any) => {
        this.movie1 = data;
      },
      (error) => {
        console.error('error', error);
        this.error = error;
      }
    );

    this.movieService.getMovie(this.movie2Id).subscribe(
      (data: any) => {
        this.movie2 = data;
      },
      (error) => {
        console.error('error', error);
        this.error = error;
      }
    );
  }

}
