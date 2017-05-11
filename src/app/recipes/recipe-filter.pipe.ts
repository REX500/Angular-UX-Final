import {PipeTransform, Pipe } from '@angular/core';
import {Recipe} from '../shared/recipe';


@Pipe({
  name: 'recipeFilter'
})
export class RecipeFilterPipe implements PipeTransform {

  transform(value: Recipe[], filterBy: string): Recipe[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter((recipe: Recipe) =>
    recipe.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }

}
