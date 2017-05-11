import {Ingredient} from './ingredient';

export class Recipe {
  constructor(public id: number,
              public name: string,
              public imageUrl: string,
              public description: string,
              public directions: string,
              public ingredients: Ingredient[]) {
  }
}
