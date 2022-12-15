import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cake } from 'src/app/model/cake.model';
import { CakeService } from 'src/app/service/cake.service';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {
  cakes: Cake[]= []
  ingredients: string[]= []
  constructor(private cakeService: CakeService) { }

  params = {
    sort: 'name',
    sortDirection: '',
    filter: {
      ingredients: '',
    }
  }

  ngOnInit(): void {
    this.cakeService.getCakes(this.params).subscribe({
      next: (response: Cake[]) => this.cakes = response
    })
    this.cakeService.getIng().subscribe({
      next: (response: any) => this.ingredients = response
    })
    this.cakeService.getFilter(this.params).subscribe({
      next: (response: Cake[]) => this.cakes = response
    })
  }
  
  selValue(event: any) {
    console.log(event.target.value, this.params.filter.ingredients)
    this.params.filter.ingredients = event.target.value;
    this.ngOnInit()
  }
}
