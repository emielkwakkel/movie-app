import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieProvider {
  constructor(public http: HttpClient) {}

  getMovies(title: string) {
    return this.http.get(`http://www.omdbapi.com/?s=${encodeURI(title)}&apikey=`)
  }
}
