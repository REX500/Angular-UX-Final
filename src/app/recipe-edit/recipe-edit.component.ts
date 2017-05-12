import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  ingredientsForm: FormGroup;
  submitted = false;
  submittedIngredientForm = false;
  submittedUpdateForm = false;
  selectedRecipe: Recipe;
  id: number;
  edit_mode = false;

  constructor(fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private  recipesComp: RecipesComponent) {
    this.recipeForm = fb.group({
      name: ['', <any>Validators.required],
      imageUrl: ['', <any>Validators.required],
      description: ['', <any>Validators.required],
      directions: ['', <any>Validators.required],
      ingredients: [this.ingredients]
    });
    this.ingredientsForm = fb.group({
      amount: ['', <any>Validators.required],
      name: ['', <any>Validators.required]
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

  saveIngredients(value: any, isValid: boolean, formIngredients) {
    this.submittedIngredientForm = true;
    if (isValid) {
      const ingredient = new Ingredient(value.name, value.amount);
      if (value.name) {
        this.ingredients.push(ingredient);
        formIngredients.reset();
        this.submittedIngredientForm = false;
      }
    }
  }

  deleteIngredient(ingredient) {
    this.ingredients = this.ingredients.filter(i => i.name !== ingredient.name);
  }

  onSubmit(value: any, isValid: boolean, event: Event) {
    this.submitted = true;
    if (isValid) {
      const name = value.name;
      const description = value.description;
      const directions = value.directions;
      const imageUrl = value.imageUrl;
      const ingredients = this.ingredients;

      this.recipesComp.addRecipe(name, imageUrl, description, directions, ingredients);
      event.preventDefault();
      this.router.navigate(['recipes']);
    }
  }

  onUpdate(value: any, isValid: boolean) {
    this.submittedUpdateForm = true;
    if (isValid) {

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
}
