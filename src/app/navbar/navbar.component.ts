import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions:Array<any> =[
    {title:"Home",route:"/admin/home",icon:"house"},
    {title:"New product",route:"/admin/newProduct",icon:"safe"},
    {title:"Products",route:"/admin/products",icon:"search"},
  ];
  currentAction:any;

  //public isLoading:boolean=false;
  constructor(public appstate:AppStateService,
              public loadingService:LoadingService,
              public router:Router) {

    /*this.loadingService.isLoading$.subscribe({
      next:(value)=>{
        this.isLoading=value;
      }
    })*/
  }
  setCurrentAction(action:any){
    this.currentAction=action;
  }

  login() {
    this.router.navigateByUrl("/login");

  }

  logout() {
    this.appstate.authState={};
    this.router.navigateByUrl("/login");
  }
}
