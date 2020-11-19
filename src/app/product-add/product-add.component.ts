import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  ProductForm: FormGroup;
  submitted = false;
  product: Product = new Product();
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  get f() {
    return this.ProductForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
    } else {
      console.log(this.product)
      this.productService.addProduct(this.product).subscribe(result => {
        console.log("Product Added Successfully.");
        this.router.navigate(["/products"]);
      }, (err) => { console.log(err) })
    }
  }
}
