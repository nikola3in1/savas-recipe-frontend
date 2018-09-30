import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getRecipe(){
    // return this.http.get<any>("http://localhost:8080/start");
    return this.http.get<any>("https://savas-recipe-backend.herokuapp.com/start");
  }

  banVisitor(){
    return this.http.get<any>("https://savas-recipe-backend.herokuapp.com/read");
  }
}
