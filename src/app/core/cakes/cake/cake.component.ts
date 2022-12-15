import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cake } from 'src/app/model/cake.model';
import { CakeService } from 'src/app/service/cake.service';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  cake: Cake = new Cake()
  constructor(private route: ActivatedRoute,private cakeService: CakeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.cakeService.getCake(params['id']).subscribe({
        next: (response: any) => this.cake = new Cake(response)
      })
    })
  }

}
