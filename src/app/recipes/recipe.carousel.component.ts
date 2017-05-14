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
      {image: 'http://hourloft.com/wp-content/uploads/2016/04/spaghetti-bolognese.jpg',
        text: 'Spaghetti Bolognese. A traditional Italian dish!'},
      {image: 'https://goodtoknow.secure.media.ipcdigital.co.uk/111/00000df38/0a99_orh412w625/Gnocchi-with-parsley-pesto.jpg', text: 'Gnocchi With Parsley And Pesto.'},
      {image: 'http://mangiarebuono.it/wp-content/uploads/2014/05/taralli-pugliesi.jpg', text: 'Taralli With Olive Oil And White Wine'},
      {image: 'http://labadiane-hanoi.com/wp-content/uploads/2014/08/la-badiane-lich-su-banh-sung-bo.jpg', text: 'French Croissant, The Best Way To Start The Morning!'}
    );
  }
}
