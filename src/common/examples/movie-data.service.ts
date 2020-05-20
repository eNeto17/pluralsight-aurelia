import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

const baseUrl: string = 'json/movies.json';

@inject(HttpClient)
export class MovieData {
  private data: any[];

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(baseUrl)
      .then(res => res.content);
  }

  getById(id: number) {
    return this.httpClient.get(baseUrl)
      .then(res => res.content.movies.find(movie => movie.id == id));
  }
}
