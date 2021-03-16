import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommentsService } from '@services/comments.service';
import { Alerts, Alert, Comment, User } from '@models/index';
import { markdown } from '@helpers/index';
import { SpinnerService } from '@services/spinner.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentsComponent implements OnInit, OnDestroy {
  form: FormGroup = null;
  comments: Comment[] = [];
  isDisabled = false;
  isLoading = true;
  user: User = null;
  isSubmitted = false;
  id: string = null;
  timeout = null;
  subscriptions: Subscription[] = [];
  alerts: Alerts = {
    server: '',
    error: '',
    success: '',
  };

  contentAlerts: Alert[] = [
    { id: '0', message: 'To pole jest wymagane.', key: 'required' },
    {
      id: '1',
      message: 'Liczba słów musi mieć więcej niż 10 znaków.',
      key: 'minlength',
    },
    {
      id: '2',
      message: 'Liczba słów może mieć maksymalnie 5000 znaków.',
      key: 'maxlength',
    },
  ];

  constructor(
    private commentsService: CommentsService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.subscriptions.push(
      this.userService.getUser().subscribe((user: User) => {
        this.user = user;
      }),
    );

    this.subscriptions.push(
      this.commentsService.getComments().subscribe((comments: Comment[]) => {
        if (comments.length) {
          this.comments = comments.map((comment: Comment) => ({
            ...comment,
            purify_content: markdown(comment.purify_content),
          }));
        }
      }),
    );

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.id = params.id;
      }),
    );
  }

  async ngOnInit() {
    this.createForm();

    try {
      const comments: Comment[] = await this.commentsService.fetchComments(
        this.id,
      );

      this.commentsService.setComments(comments);
      this.setLoading();
    } catch (error) {
      if (error.status === 0) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }

      this.setLoading();
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }

  async deleteComment(id: string) {
    try {
      const response: Comment = await this.commentsService.deleteComment(id);
      const comments: Comment[] = await this.commentsService.fetchComments(
        this.id,
      );

      this.commentsService.setComments(comments);
    } catch (error) {
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    }
  }

  async submit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    try {
      const data = {
        ...this.form.value,
        product_id: this.id,
        user_id: this.user && this.user._id ? this.user._id : '',
        author: this.user && this.user.username ? this.user.username : 'Anonim',
        author_image: this.user && this.user.avatar ? this.user.avatar : '',
      };

      const response: Comment = await this.commentsService.saveComment(data);
      const comments: Comment[] = await this.commentsService.fetchComments(
        this.id,
      );

      this.commentsService.setComments(comments);
      this.form.reset();
      this.setAlerts('', '', 'Pomyślnie dodano komentarz.');
    } catch (error) {
      console.log(error);
      if (error.status === 0 || error.status === 404) {
        this.setAlerts('Brak połączenia z serwerem.');
      } else {
        this.setAlerts('', error.error.message);
      }
    } finally {
      this.isDisabled = false;
      this.isSubmitted = false;
      this.timeout = setTimeout(() => {
        this.setAlerts();
      }, 3000);
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      content: [
        '',
        {
          validators: [
            Validators.minLength(10),
            Validators.maxLength(5000),
            Validators.required,
          ],
        },
      ],
    });
  }

  validation(prop: string): boolean {
    return (
      (this.formControls[prop].errors &&
        (this.formControls[prop].dirty || this.formControls[prop].touched)) ||
      (this.formControls[prop].errors && this.isSubmitted)
    );
  }

  computedButtonTitle(): 'Opublikuj komentarz' | 'Publikowanie' {
    return this.isDisabled ? 'Publikowanie' : 'Opublikuj komentarz';
  }

  computedButtonText(): 'Opublikuj' | 'Publikowanie' {
    return this.isDisabled ? 'Publikowanie' : 'Opublikuj';
  }

  setAlerts(server = '', error = '', success = '') {
    this.alerts.server = server;
    this.alerts.error = error;
    this.alerts.success = success;
  }

  setLoading(loading = false) {
    this.isLoading = loading;
    setTimeout(() => {
      this.spinnerService.setLoading(this.isLoading);
    }, 50);
  }

  get formControls() {
    return this.form.controls;
  }
}
