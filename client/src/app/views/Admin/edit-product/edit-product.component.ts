import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { imageValidator, trackID } from '@helpers/index';
import {
  Alert,
  Alerts,
  Product,
  ProductCategory,
  ProductCategoryWithPagination,
  ProductWithPagination,
} from '@models/index';
import { ProductsService } from '@services/products.service';
import { SpinnerService } from '@services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditProductComponent implements OnInit, OnDestroy {
  @ViewChild('thumbnailInput') thumbnailInput: any = null;
  @ViewChild('galleryInput') galleryInput: any = null;

  form: FormGroup = null;
  isLoading = true;
  isDisabled = false;
  isSubmitted = false;
  trackID = null;
  id: string = null;
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };
  product: Product = null;
  gallery: Array<string | ArrayBuffer> = [];
  thumbnail: string | ArrayBuffer = null;
  categories: ProductCategory[] = [];
  filteredCategories: ProductCategory[] = [];
  subscriptions: Subscription[] = [];

  thumbnailAlerts: Alert[] = [
    { id: '0', message: 'Plik nie może przekraczać 5 MB.', key: 'maxsize' },
    { id: '1', message: 'Typ pliku jest niepoprawny.', key: 'type' },
    { id: '2', message: 'Musisz dodać zdjęcie główne.', key: 'required' },
  ];

  nameAlerts: Alert[] = [
    { id: '0', message: 'Nazwa produktu jest za krótka.', key: 'minlength' },
    { id: '1', message: 'Nazwa produktu jest za długa.', key: 'maxlength' },
    { id: '2', message: 'Nazwa produktu jest nieprawidłowa.', key: 'pattern' },
    { id: '3', message: 'Musisz podać nazwę produktu.', key: 'required' },
  ];

  companyNameAlerts: Alert[] = [
    { id: '0', message: 'Nazwa firmy jest za krótka.', key: 'minlength' },
    { id: '1', message: 'Nazwa firmy jest za długa.', key: 'maxlength' },
    { id: '3', message: 'Musisz podać nazwę firmy.', key: 'required' },
  ];

  categoryAlerts: Alert[] = [
    { id: '0', message: 'Musisz wybrać kategorię.', key: 'required' },
  ];

  priceAlerts: Alert[] = [
    { id: '0', message: 'Cana jest nieprawidłowa.', key: 'pattern' },
    { id: '1', message: 'Musisz podać cenę.', key: 'required' },
  ];

  quantityAlerts: Alert[] = [
    {
      id: '0',
      message: 'Liczba dostępnych sztuk jest nieprawidłowa.',
      key: 'pattern',
    },
    {
      id: '1',
      message: 'Musisz podać liczbę dostępnych sztuk.',
      key: 'required',
    },
  ];

  descriptionAlerts: Alert[] = [
    { id: '0', message: 'Musisz podać opis produktu.', key: 'required' },
  ];

  constructor(
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private productsService: ProductsService,
    private activateRoute: ActivatedRoute,
  ) {
    this.trackID = trackID;

    this.subscriptions.push(
      this.productsService
        .getCategories()
        .subscribe((data: ProductCategoryWithPagination) => {
          const { categories = [] } = data || {};

          this.categories = categories;

          if (categories.length) {
            this.filteredCategories = categories.filter(
              (category: ProductCategory) =>
                category.category !== 'nowosci' &&
                category.category !== 'bestsellery',
            );
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;

    try {
      const response: ProductCategoryWithPagination = await this.productsService.fetchProductCategories();
      this.categories = response.categories;
      this.product = await this.productsService.fetchProduct(this.id);
      this.productsService.setCategories(response);

      if (response.categories.length <= 2) {
        this.setAlerts(
          'Zanim dodasz produkt musisz najpierw utworzyć co najmniej 1 kategorię.,',
        );
      }

      this.createForm(this.product, this.categories);
      this.setLoading();
    } catch (error) {
      if (error.status === 404) {
        this.router.navigate(['/404']);
        return;
      } else if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.createForm(this.product, this.categories);
      this.setLoading();
    }
  }

  createForm(product: Product, categories: ProductCategory[]) {
    const name: string = product && product.name ? product.name : '';
    const companyName: string =
      product && product.company_name ? product.company_name : '';
    const price: string = product && product.price ? product.price : '';
    const quantity: string | number =
      product && product.quantity ? product.quantity : null;
    const description: string =
      product && product.description ? product.description : '';
    const category: string | number =
      product && product.category ? product.category : null;
    const thumbnail: string =
      product && product.thumbnail ? product.thumbnail : '';
    const gallery: string[] = product && product.gallery ? product.gallery : [];

    this.form = this.formBuilder.group(
      {
        name: [
          name,
          {
            validators: [
              Validators.pattern(
                /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, .%@$!&\(\)+=?/]+$/,
              ),
              Validators.minLength(10),
              Validators.maxLength(256),
              Validators.required,
            ],
          },
        ],
        company_name: [
          companyName,
          {
            validators: [
              Validators.minLength(3),
              Validators.maxLength(512),
              Validators.required,
            ],
          },
        ],
        price: [
          price,
          {
            validators: [
              Validators.pattern(/^(0|[1-9][0-9]{0,8}),[0-9]{2} zł$/),
              Validators.required,
            ],
          },
        ],
        quantity: [
          quantity,
          {
            validators: [
              Validators.pattern(/^[0-9]{1,10}$/),
              Validators.required,
            ],
          },
        ],
        description: [
          description,
          {
            validators: [
              Validators.minLength(10),
              Validators.maxLength(10000),
              Validators.required,
            ],
          },
        ],
        category: [
          category,
          {
            validators: [Validators.required],
          },
        ],
        thumbnail: [
          thumbnail,
          {
            validators: [Validators.required],
          },
        ],
        gallery: [gallery],
      },
      {
        validators: [imageValidator('thumbnail')],
      },
    );

    let index: number = null;

    categories.forEach((value: ProductCategory, i: number) => {
      if (category === value.category) {
        index = i;
      }
    });

    this.formControls.category.setValue(categories[index].name, {
      onlySelf: true,
    });

    if (thumbnail) {
      this.thumbnail = thumbnail;
    }

    if (gallery.length) {
      this.gallery = gallery;
    }
  }

  removeImage(index: number) {
    const newGallery = [...this.form.value.gallery];
    newGallery.splice(index, 1);
    this.gallery.splice(index, 1);

    this.form.patchValue({
      gallery: newGallery,
    });
  }

  validation(prop: string): boolean {
    if (prop === 'thumbnail') {
      return this.formControls[prop].errors && this.isSubmitted;
    }

    return (
      (this.formControls[prop].errors &&
        (this.formControls[prop].dirty || this.formControls[prop].touched)) ||
      (this.formControls[prop].errors && this.isSubmitted)
    );
  }

  setTouched(prop: string) {
    this.formControls[prop].markAsTouched();
  }

  thumbnailTitle(value: boolean): 'Dodaj' | 'Zmień' {
    return value ? 'Zmień' : 'Dodaj';
  }

  buttonTitle(): 'Zapisz zmiany' | 'Zapisywanie zmian' {
    return this.isDisabled ? 'Zapisywanie zmian' : 'Zapisz zmiany';
  }

  buttonText(): 'Zapisz' | 'Zapisywanie' {
    return this.isDisabled ? 'Zapisywanie' : 'Zapisz';
  }

  addThumbnail(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const images: FileList = target.files;

    if (!images.length) {
      return;
    }

    this.form.patchValue({
      thumbnail: images[0],
    });

    const imageTypeRegExp: RegExp = /^image\/(png|jpg|jpeg)$/;

    if (window.FileReader && imageTypeRegExp.test(images[0].type)) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        this.thumbnail = reader.result;
      };
      reader.readAsDataURL(images[0]);
    }
  }

  addGallery(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const images: File[] = Object.entries(target.files).map((file) => file[1]);

    if (!images.length) {
      return;
    }

    this.form.patchValue({
      gallery: [...this.form.value.gallery, ...images],
    });

    const imageTypeRegExp: RegExp = /^image\/(png|jpg|jpeg)$/;

    const validImages: File[] = images.filter((image: File): boolean =>
      imageTypeRegExp.test(image.type),
    );

    if (window.FileReader && validImages.length) {
      images.forEach((image: File) => {
        const reader: FileReader = new FileReader();
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

  async updateProduct() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    const formData: FormData = new FormData();

    formData.append('thumbnail', this.form.value.thumbnail);
    formData.append('name', this.form.value.name);
    formData.append('company_name', this.form.value.company_name);
    formData.append('price', this.form.value.price);
    formData.append('quantity', this.form.value.quantity);
    formData.append('description', this.form.value.description);
    formData.append('category_name', this.form.value.category);
    this.form.value.gallery.forEach((file) => formData.append('gallery', file));

    try {
      this.product = await this.productsService.updateProduct(
        this.id,
        formData,
      );

      const products: ProductWithPagination = await this.productsService.fetchProducts();
      this.productsService.setProducts(products.products);
      this.setAlerts('', '', 'Pomyślnie zaktualizowano produkt.');
      this.gallery = this.product.gallery;
      this.galleryInput.nativeElement.value = '';
      this.thumbnail = this.product.thumbnail;
      this.thumbnailInput.nativeElement.value = '';

      this.form.patchValue({
        gallery: this.product.gallery,
        thumbnail: this.product.thumbnail,
      });
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        if (error.error.message === 'Musisz podać treść.') {
          this.formControls.description.setValue(
            this.form.value.description,
            { onlySelf: true },
          );
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
