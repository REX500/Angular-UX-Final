import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Recipe} from './recipe';
import {Observable} from "rxjs";

@Injectable()

export class RecipeService {

  private recipesUrl = 'http://localhost:3000/recipes';

  private headers = new Headers({'Content-Type': 'application/json'});

  private static handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  private static extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  constructor(private http: Http) {
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get(this.recipesUrl)
      .map(RecipeService.extractData)
  }

  addRecipe(name: string, imageUrl: string, description: string, directions: string, ingredients: any[]): Observable<Recipe> {
    return this.http
      .post(this.recipesUrl, JSON.stringify({
        name: name,
        imageUrl: imageUrl,
        description: description,
        directions: directions,
        ingredients: ingredients
      }), {headers: this.headers})
      .map(RecipeService.extractData)

  }

  getRecipe(id: number): Observable<Recipe> {
    return this.getRecipes()
      .map(recipes => recipes.find(recipe => recipe.id === id));
  }

  deleteRecipe(id: number): Observable<void> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(RecipeService.extractData)
      .catch(RecipeService.handleError);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const url = `${this.recipesUrl}/${recipe.id}`;
    return this.http.put(url, JSON.stringify(recipe), {headers: this.headers})
      .map(RecipeService.extractData)
      .catch(RecipeService.handleError);
  }

}
