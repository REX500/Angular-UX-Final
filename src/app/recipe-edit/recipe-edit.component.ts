import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Recipe} from '../shared/recipe';
import {Ingredient} from '../shared/ingredient';
import {RecipeService} from '../shared/recipe.service';
import {RecipesComponent} from '../recipes/recipes.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  ingredients: Ingredient[] = [];
  recipeForm: FormGroup;
  submitted = false;
  selectedRecipe: Recipe;
  id: number;
  edit_mode = false;

  constructor(fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
  private  recipesComp: RecipesComponent) {
    this.recipeForm = fb.group({
      name: [''],
      imageUrl: [''],
      description: [''],
      directions: [''],
      ingredients: this.ingredients
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.hasOwnProperty('id')) {
        this.edit_mode = true;
        this.id = +params['id'];
        this.recipeService.getRecipe(this.id)
          .subscribe(recipe => {
            return this.ingredients = recipe.ingredients, this.selectedRecipe = recipe;
          });
      } else {
        this.edit_mode = false;
        this.selectedRecipe = null;
      }
    });
  }

  saveIngredients(amount: number, name: string, formIngredients) {
    const ingredient = new Ingredient(name, amount);
    if (name) {
      this.ingredients.push(ingredient);
      formIngredients.reset();
    }
  }

  deleteIngredient(ingredient) {
    this.ingredients = this.ingredients.filter(i => i.name !== ingredient.name);
  }

  onSubmit(value: any, event: Event) {


    this.submitted = true;

    const name = value.name;
    const description = value.description;
    const directions = value.directions;
    const imageUrl = value.imageUrl;
    const ingredients = this.ingredients;

    this.recipesComp.addRecipe(name, imageUrl, description, directions, ingredients);

    console.log(event);
    event.preventDefault();
  }

  onUpdate(value: any) {
    const newValue = {
      'name': value.name,
      'imageUrl': value.imageUrl,
      'description': value.description,
      'directions': value.directions,
      'ingredients': this.ingredients
    };
    Object.assign(this.selectedRecipe, newValue);
    this.recipeService.updateRecipe(this.selectedRecipe).subscribe();
    this.router.navigate(['recipes']);
  }

}
