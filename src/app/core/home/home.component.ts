import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/model/slide.model';
import { CakeService } from 'src/app/service/cake.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides: Slide[] = []
  constructor(private cakeService: CakeService) { }

  ngOnInit(): void {
    this.cakeService.getSlide().subscribe({
      next: (response: Slide[]) => this.slides = response
    })
  }

}
