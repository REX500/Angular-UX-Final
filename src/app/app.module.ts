import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeService} from './shared/recipe.service';
import {Routing} from './app.routing';
import {RecipeFilterPipe} from './recipes/recipe-filter.pipe';
import {PagerService} from './shared/pager.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipesComponent,
    RecipeFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing
  ],
  providers: [RecipeService, RecipesComponent, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
