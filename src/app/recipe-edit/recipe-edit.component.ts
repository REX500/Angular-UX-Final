import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Recipe} from '../shared/recipe';
import {Ingredient} from '../shared/ingredient';
import {RecipeService} from '../shared/recipe.service';

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
  edit_mode: boolean = false;

  constructor(fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private recipeService: RecipeService) {
    this.recipeForm = fb.group({
      name: [""],
      imageUrl: [""],
      description: [""],
      directions: [""],
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
    })
  }

  saveIngredients(amount: number, name: string, formIngredients) {
    let ingredient = new Ingredient(name, amount);
    if (name) {
      this.ingredients.push(ingredient);
      formIngredients.reset();
    }
  }

  deleteIngredient(ingredient) {
    this.ingredients = this.ingredients.filter(i => i.name !== ingredient.name)
  }

  onSubmit(value: any): void {
    this.submitted = true;

    let name = value.name;
    let description = value.description;
    let directions = value.directions;
    let imageUrl = value.imageUrl;
    let ingredients = this.ingredients;

    this.recipeService.addRecipe(name, imageUrl, description, directions, ingredients).subscribe();
    this.router.navigate(['recipes']);
  }

  onUpdate(value: any) {
    let newValue = {
      "name": value.name,
      "imageUrl": value.imageUrl,
      "description": value.description,
      "directions": value.directions,
      "ingredients": this.ingredients
    };
    Object.assign(this.selectedRecipe, newValue);
    this.recipeService.updateRecipe(this.selectedRecipe).subscribe();
    this.router.navigate(['recipes']);
  }

}
