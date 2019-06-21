import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';



@Component({
    selector: 'item-component',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
    constructor(private AppService: AppService){

    }
 async ngOnInit(){
     const userId = localStorage.getItem('id')
    await this.AppService.getUserProducts(userId).subscribe((data)=>{
        console.log(data,'dd')
    })
 }  
}
