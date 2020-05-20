import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { purify } from '@helpers/index';
import { Alerts, Product, ProductCategory, Alert } from '@models/index';
import { ProductsService } from '@services/products.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductComponent implements OnInit, OnDestroy {
  @ViewChild('thumbnailInput') thumbnailInput: any = null;
  @ViewChild('galleryInput') galleryInput: any = null;

  form: FormGroup = null;
  isLoading = true;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  isDisabled = false;
  isSubmitted = false;
  gallery: Array<string | ArrayBuffer> = [];
  thumbnail: string | ArrayBuffer = null;
  categories: ProductCategory[] = [];
  filteredCategories: ProductCategory[] = [];
  subscriptions: Subscription[] = [];

  nameAlerts: Alert[] = [
    { id: '0', message: 'Nazwa produktu jest za krótka.', key: 'minlength' },
    { id: '1', message: 'Nazwa produktu jest za długa.', key: 'maxlength' },
    { id: '2', message: 'Nazwa produktu jest nieprawidłowa.', key: 'pattern' },
    { id: '3', message: 'Musisz podać nazwę produktu.', key: 'required' },
  ];

  categoryAlerts: Alert[] = [
    { id: '0', message: 'Musisz wybrać kategorię.', key: 'required' },
  ];

  priceAlerts: Alert[] = [
    { id: '0', message: 'Cana jest nieprawidłowa.', key: 'pattern' },
    { id: '1', message: 'Musisz podać cenę.', key: 'required' },
  ];

  quantityAlerts: Alert[] = [
    { id: '0', message: 'Liczba dostępnych sztuk jest nieprawidłowa.', key: 'pattern' },
    { id: '1', message: 'Musisz podać liczbę dostępnych sztuk.', key: 'required' },
  ];

  descriptionAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać opis produktu.', key: 'required' },
  ];

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
  ) {
    this.subscriptions.push(this.productsService.getCategories().subscribe((data: ProductCategory[]) => {
      this.categories = data;

      if (data.length) {
        this.filteredCategories = data.filter(
          (category: ProductCategory) => category.category !== 'nowosci' && category.category !== 'bestsellery',
        );
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  async ngOnInit() {
    try {
      const response: ProductCategory[] = await this.productsService.fetchProductCategories();
      this.productsService.setCategories(response);
      if (response.length <= 2) {
        this.setAlerts('Zanim dodasz produkt musisz najpierw utworzyć co najmniej 1 kategorię.');
      }
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

  createForm(categories: ProductCategory[]) {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [
          Validators.pattern(/^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, .%@$!&\(\)+=?/]+$/),
          Validators.minLength(10),
          Validators.maxLength(256),
          Validators.required,
        ],
      }],
      price: ['', {
        validators: [
          Validators.pattern(/^[0-6]{1,10},[0-9]{2} zł$/),
          Validators.required,
        ],
      }],
      quantity: [null, {
        validators: [
          Validators.pattern(/^[0-9]{1,10}$/),
          Validators.required,
        ],
      }],
      description: ['', {
        validators: [
          Validators.minLength(10),
          Validators.maxLength(10000),
          Validators.required,
        ],
      }],
      category: [null, {
        validators: [
          Validators.required,
        ],
      }],
      thumbnail: [''],
      gallery: [],
    });

    this.formControls.category.setValue(categories[0].name, { onlySelf: true });
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

  addThumbnail(files) {
    const images: File[] = files;

    if (!images.length) {
      return;
    }

    this.form.patchValue({
      thumbnail: images[0],
    });

    const imageTypeRegExp = /^image\/(png|jpg|jpeg)$/;

    if (window.FileReader && imageTypeRegExp.test(images[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnail = reader.result;
      };
      reader.readAsDataURL(images[0]);
    }
  }

  addGallery(files) {
    const images = Object.entries(files).map((file) => file[1]);

    if (!images.length) {
      return;
    }

    this.form.patchValue({
      gallery: images,
    });

    const imageTypeRegExp = /^image\/(png|jpg|jpeg)$/;

    const validImages = images.filter((image: File) => {
      return imageTypeRegExp.test(image.type);
    });

    if (window.FileReader && validImages.length) {
      images.forEach((image: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.gallery.push(reader.result);
        };
        reader.readAsDataURL(image);
      });
    }
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  async addProduct() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    const formData: FormData = new FormData();

    formData.append('thumbnail', this.form.value.thumbnail);
    formData.append('gallery', this.form.value.gallery);
    formData.append('name', this.form.value.name);
    formData.append('price', this.form.value.price);
    formData.append('quantity', this.form.value.quantity);
    formData.append('description', this.form.value.description);
    formData.append('category', this.form.value.category);

    try {
      const response: Product = await this.productsService.saveProduct(formData);
      const products: Product[] = await this.productsService.fetchProducts();
      this.productsService.setProducts(products);
      this.setAlerts('', '', 'Pomyślnie dodano produkt.');
      const category: string = this.form.value.category;
      this.form.reset();
      this.formControls.category.setValue(category, { onlySelf: true });
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        if (error.error.message === 'Musisz podać treść.') {
          this.formControls.description.setValue(purify(this.form.value.description), { onlySelf: true });
        }
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
    }
  }

  get formControls() {
    return this.form.controls;
  }
}
