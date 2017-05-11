import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecipeService} from '../shared/recipe.service';
import {Recipe} from '../shared/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  listFilter: string;

  constructor(private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }

  recipeDetail(recipe: Recipe): void {
    const link = ['/detail', recipe.id];
    this.router.navigate(link);
  }

  recipeEdit(recipe: Recipe): void {
    const link = ['/edit', recipe.id];
    this.router.navigate(link);
  }
  addRecipe(name: string, imageUrl: string, description: string, directions: string, ingredients: any[]) {
    this.recipeService.addRecipe(name, imageUrl, description, directions, ingredients).subscribe(recipe => this.recipes.push(recipe));
  }

  delete(recipe: Recipe): void {
    this.recipeService
      .deleteRecipe(recipe.id)
      .subscribe(() => {
        this.recipes = this.recipes.filter(r => r !== recipe);
      });
    this.router.navigate(['recipes']);
  }

}
