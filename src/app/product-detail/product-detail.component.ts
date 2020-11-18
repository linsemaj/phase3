import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

 
  id: any;
  product: Product = new Product();

  constructor(private productService: ProductService,
    private _route: ActivatedRoute, private _router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.id).subscribe(result => {
      this.product = result;
      console.log(this.product);
    })
  }

  deleteProductById(id: any) {
    this.productService.deleteProductById(id).subscribe((result) => {
      console.log('Product Deleted Successfully..')
      this._location.back();
    })
  }

  goBack(): void {
    this._location.back();
  }
}
