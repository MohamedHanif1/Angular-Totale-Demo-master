import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {


  constructor(private productService:ProductService,
              private router:Router,
              public appState:AppStateService
  ) {

  }

  ngOnInit() {
    this.searchProduct();
    console.log(this.appState.authState.roles)
  }

  searchProduct(){
   /* this.appState.setProductState({
      status:"LOADING"
    })*/
    this.productService.searchProduct(this.appState.productsState.keyword
      ,this.appState.productsState.currentPage,this.appState.productsState.pageSize)

      .subscribe({
        next:(resp)=>{
          let products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);

          //this.appState.productsState.totalProducts=totalProducts;

          let totalPages=
            Math.floor(totalProducts / this.appState.productsState.pageSize);

          if(totalProducts % this.appState.productsState.pageSize !=0){
           ++totalPages;
          }

          this.appState.setProductState({
            products :products,
            totalProducts:totalProducts,
            totalPages:totalPages,
            status:"LOADED"

          })
          //console.log(this.appState.productsState.totalPages);
        },
        error:err => {
          this.appState.setProductState({
            status:"ERROR",
            errorMessage:err
          })
        }})}


  handleCheckProduct(product:Product){
    this.productService.checkProduct(product).subscribe({
    next:updatedProduct=>{
    product.checked=!product.checked;
    }
    })
  }


  handleDeleteProduct(product: Product) {
    if(confirm("Etes vous sure ?"))
    this.productService.deleteProduct(product).subscribe({
        next:value => {
          //this.appState.productsState.products=
            //this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
          this.searchProduct();
        }
      }
    )

  }



  handleGotoPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.searchProduct();

  }

  handleUpdateProduct(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }
}
