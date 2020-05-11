import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { products } from '@helpers/fakeAPI';
import { Product } from '@models/index';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-browse-product',
  templateUrl: './browse-product.component.html',
  styleUrls: ['./browse-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BrowseProductComponent implements OnInit {
  @ViewChild('deleteButton') deleteButton: any = null;

  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  productToDelete: Product = null;
  products: Product[] = [];

  constructor(private spinnerService: SpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    setTimeout(() => {
      this.products = products;
      this.createForm();
      this.isLoading = false;
      this.spinnerService.setLoading(this.isLoading);
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
