import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    {
        path: 'recipes',
        component: RecipesComponent
    },
    {
        path: 'detail/:id',
        component: RecipeDetailComponent
    },
    {
        path: 'new',
        component: RecipeEditComponent
    },
    {
        path: 'edit/:id',
        component: RecipeEditComponent
    },
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
