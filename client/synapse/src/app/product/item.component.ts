import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import {Subscription } from 'rxjs';



@Component({
    selector: 'item-component',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit,OnDestroy {
    public userData;
    private userProductSubscription: Subscription;
    constructor(private AppService: AppService){
    }
 async ngOnInit(){
     const userId = localStorage.getItem('id')
   this.userProductSubscription = await this.AppService.getUserProducts(userId).subscribe((data)=>{
        this.userData = data['data'];
    })
 }
 ngOnDestroy(){
     (this.userProductSubscription)?this.userProductSubscription.unsubscribe():'';
 }  
}
