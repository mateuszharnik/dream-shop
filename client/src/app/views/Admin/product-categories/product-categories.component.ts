import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoriesValidator, trackID } from '@helpers/index';
import { Alert, Alerts, DeleteResponse, ProductCategory } from '@models/index';
import { CategoriesModals } from '@models/modals';
import { ProductsService } from '@services/products.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';
import jump from 'jump.js';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCategoriesComponent implements OnInit, OnDestroy {
  @ViewChild('deleteButton') deleteButton: any = null;

  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  trackID = null;
  filteredCategories: ProductCategory[] = [];
  categories: ProductCategory[] = [];
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  modals: CategoriesModals = {
    deleteCategories: [],
    deleteCategory: null,
  };

  nameAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać kategorie.', key: 'required' },
    { id: '1', message: 'Kategoria może zawierać tylko litery i spacje.', key: 'pattern' },
    { id: '2', message: 'Kategoria jest za krótka.', key: 'minlength' },
    { id: '3', message: 'Kategoria jest za długa.', key: 'maxlength' },
    { id: '4', message: 'Taka kategoria już istnieje.', key: 'exsist' },
    { id: '5', message: 'Nie możesz utworzyć takiej kategorii.', key: 'default' },
  ];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
  ) {
    this.trackID = trackID;

    this.subscriptions.push(this.productsService.getCategories().subscribe((data: ProductCategory[]) => {
      this.categories = data;

      if (data.length) {
        this.filteredCategories = data.filter(
          (category: ProductCategory) => category.category !== 'nowosci' && category.category !== 'bestsellery',
        );
      }
    }));
  }

  async ngOnInit() {
    try {
      const response: ProductCategory[] = await this.productsService.fetchProductCategories();
      this.productsService.setCategories(response);
      this.createForm(this.categories);
      this.setLoading();
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.createForm(this.categories);
      this.setLoading();
    }
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  createForm(categories: ProductCategory[]) {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^([a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ]*\s?)+[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ]$/),
          Validators.required,
        ],
      }],
    },
      {
        validators: [
          categoriesValidator('name', categories),
        ],
      });
  }

  validation(prop: string): boolean {
    return (
      this.formControls[prop].errors && (this.formControls[prop].dirty || this.formControls[prop].touched))
      || (this.formControls[prop].errors && this.isSubmitted
      );
  }

  buttonTitle(): 'Zapisz zmiany' | 'Zapisywanie zmian' {
    return this.isDisabled ? 'Zapisywanie zmian' : 'Zapisz zmiany';
  }

  buttonText(): 'Zapisz' | 'Zapisywanie' {
    return this.isDisabled ? 'Zapisywanie' : 'Zapisz';
  }

  deleteButtonTitle(): 'Usuń adres email' | 'Usuwanie adresu email' {
    return this.isDisabled ? 'Usuwanie adresu email' : 'Usuń adres email';
  }

  deleteButtonText(): 'Usuń' | 'Usuwanie' {
    return this.isDisabled ? 'Usuwanie' : 'Usuń';
  }

  async addCategory() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const response: ProductCategory = await this.productsService.saveProductCategory(this.form.value);
      const categories: ProductCategory[] = await this.productsService.fetchProductCategories();
      this.productsService.setCategories(categories);
      this.createForm(categories);
      this.setAlerts('', '', 'Pomyślnie dodano kategorię.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.form.reset();
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  async deleteCategory(id: string) {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const deleteResponse: ProductCategory = await this.productsService.deleteProductCategory(id);
      const categories: ProductCategory[] = await this.productsService.fetchProductCategories();
      this.productsService.setCategories(categories);
      this.createForm(categories);
      this.setAlerts('', '', 'Pomyślnie usunięto kategorię.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteCategory');
      this.isDisabled = false;
      this.isSubmitted = false;
      jump('.admin-page', {
        duration: 1000,
      });
    }
  }

  async deleteCategories() {
    this.isSubmitted = true;
    this.isDisabled = true;

    try {
      const deleteResponse: DeleteResponse = await this.productsService.deleteProductCategories();
      const categories: ProductCategory[] = await this.productsService.fetchProductCategories();
      this.productsService.setCategories(categories);
      this.createForm(categories);
      this.setAlerts('', '', 'Pomyślnie usunięto wszystkie kategorie.');
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.closeModal('deleteCategories');
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  openModal(category: ProductCategory) {
    if (this.modals.deleteCategory || this.modals.deleteCategories.length) {
      return;
    }

    if (category) {
      this.modals.deleteCategory = category;
    } else {
      this.modals.deleteCategories = this.categories;
    }

    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.deleteButton.button.nativeElement.focus();
    }, 50);
  }

  closeModal(key: 'deleteCategory' | 'deleteCategories') {
    if (key === 'deleteCategory') {
      this.modals.deleteCategory = null;
      return;
    }

    this.modals.deleteCategories = [];
  }

  get formControls() {
    return this.form.controls;
  }
}
