import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  @ViewChild('slides', { static: true }) slides: IonSlides; 

  index = 0;
  isLastSlide: boolean = false;

  slideLength: any = 1;
  slidesNumber: any = [];

  constructor(
    private router: Router,
  ) {
   
    setTimeout(() => {
      this.slides.length().then((data: any) => {
        console.log(data);
        this.slideLength = data;
        this.slidesNumber = [];
        for (let i = 0; i < this.slideLength; i++) {
          this.slidesNumber.push(i);
        }
        console.log(this.slidesNumber);
      });
    }, 1000);

  }

  ngOnInit() {
  }

  slideChanged() {
    this.slides.getActiveIndex().then((data: any) => {
      console.log(data);
      this.index = data;
    });

    this.slides.isEnd().then(data => {
      console.log('is end', data);
      this.isLastSlide = data;
    })
  }

  onNext() {
    this.slides.slideNext();
  }

  onSkip() {
    this.router.navigate(['inicio']);
  }

  onBack() {
    this.slides.slidePrev();
  }

}
