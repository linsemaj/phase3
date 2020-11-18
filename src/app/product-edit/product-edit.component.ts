import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: any;
  product: Product = new Product();
  productForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.id).subscribe(result => {
      this.product = result;
      console.log(this.product);
    });
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    } else {
      console.log(this.product)
      this.productService.updateProductById(this.product, this.id).subscribe(result => {
        console.log("Product Updated Successfully.");
        this.router.navigate(["/companies-list"]);
      }, (err) => { console.log(err) })
    }
  }

  goBack() {
    this.location.back();
  }
}
