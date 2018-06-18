import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieProvider {
  constructor(public http: HttpClient) {}

  getMovies(title: string) {
    return this.http.get(`http://www.omdbapi.com/?s=${encodeURI(title)}&apikey=6c3a2d45`)
  }

  getMovie(imdbID: string) {
    return this.http.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=6c3a2d45`)
  }
}
