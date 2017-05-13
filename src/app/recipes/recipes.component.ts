import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecipeService} from '../shared/recipe.service';
import {Recipe} from '../shared/recipe';
import 'rxjs/add/operator/map';
import {PagerService} from '../shared/index';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  pager: any = {};
  pagedItems: any[];
  private recipes: Recipe[] = [];
  listFilter: string;

  constructor(private recipeService: RecipeService,
              private router: Router, private pagerService: PagerService) {
  }

  ngOnInit(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.setPage(1);
      });
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

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.recipes.length, page);

    // get current page of items
    this.pagedItems = this.recipes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
