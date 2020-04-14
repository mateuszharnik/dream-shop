import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SpinnerService } from '@services/spinner.service';
import { products } from '@helpers/fakeAPI';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Product } from '@models/index';

@Component({
  selector: 'app-browse-product',
  templateUrl: './browse-product.component.html',
  styleUrls: ['./browse-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BrowseProductComponent implements OnInit {
  @ViewChild ('deleteButton') deleteButton: any = null;

  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  productToDelete: Product = null;
  products: Product[] = [];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.products = products;
      this.isLoading = false;
      this.toggleSpinner();
      this.createForm();
    }, 1000);
  }

  createForm() {
    this.form = this.formBuilder.group({});
  }

  computedButtonTitle(): 'Usuń produkt' | 'Usuwanie produktu' {
    return this.isDisabled ? 'Usuwanie produktu' : 'Usuń produkt';
  }

  computedButtonText(): 'Usuń' | 'Usuwanie' {
    return this.isDisabled ? 'Usuwanie' : 'Usuń';
  }

  computedProductEditLink(id: string): string {
    return `${id}/edytuj`;
  }

  submit() {
    this.isSubmitted = true;

    this.isDisabled = true;
  }

  toggleSpinner(isLoading = false) {
    if (this.spinnerService.getLoadingValue()) {
      this.spinnerService.setLoading(isLoading);
    }
  }

  openModal(product: Product) {
    if (!this.productToDelete) {
      this.productToDelete = product;
      this.setFocus();
    }
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  closeModal() {
    this.productToDelete = null;
  }

  get formControls() {
    return this.form.controls;
  }
}
