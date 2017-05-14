import {Component} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './recipe.carousel.html'
})
export class RecipeCarouselComponent {
  // The time to show the next photo
  private NextPhotoInterval: number = 3000;
  // Looping or not
  private noLoopSlides: boolean = false;
  // Photos
  private slides: Array<any> = [];

  constructor() {
    this.addNewSlide();
  }

  private addNewSlide() {
    this.slides.push(
      {image: 'http://images.meredith.com/recipecom/images/home/recipeBG2740x920.jpg.pagespeed.ce.xBgItY8Iod.jpg',
        text: 'Wonderful vegetables'},
      {image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg', text: 'BMW 2'},
      {image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car3.jpg', text: 'BMW 3'},
      {image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car4.jpg', text: 'BMW 4'}
    );
  }
}
