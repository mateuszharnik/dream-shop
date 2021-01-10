import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterContactComponent } from '@components/Footer/footer-contact/footer-contact.component';
import { FooterNavigationComponent } from '@components/Footer/footer-navigation/footer-navigation.component';
import { FooterComponent } from '@components/Footer/footer/footer.component';
import { SocialMediaComponent } from '@components/Footer/social-media/social-media.component';
import { HeaderComponent } from '@components/header/header.component';
import { LogoComponent } from '@components/logo/logo.component';
import { CartButtonComponent } from '@components/Navbar/cart-button/cart-button.component';
import { NavigationItemComponent } from '@components/Navbar/navigation-item/navigation-item.component';
import { NavigationComponent } from '@components/Navbar/navigation/navigation.component';
import { SearchBarComponent } from '@components/Navbar/search-bar/search-bar.component';
import { NewsletterComponent } from '@components/newsletter/newsletter.component';
import { ScrollTopButtonComponent } from '@components/scroll-top-button/scroll-top-button.component';
import { SlideComponent } from '@components/slide/slide.component';
import { SliderComponent } from '@components/slider/slider.component';
import { SwiperSliderComponent } from '@components/swiper-slider/swiper-slider.component';
import { NavigationDesktopComponent } from '@components/Navbar/navigation-desktop/navigation-desktop.component';
import { MatchMediaService } from '@services/match-media.service';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@webpage/home/home.component';
import { ShowcaseComponent } from '@webpage/showcase/showcase.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowcaseComponent,
    LogoComponent,
    CartButtonComponent,
    SearchBarComponent,
    NavigationComponent,
    NavigationItemComponent,
    ScrollTopButtonComponent,
    HeaderComponent,
    FooterComponent,
    SocialMediaComponent,
    FooterNavigationComponent,
    FooterContactComponent,
    SliderComponent,
    SlideComponent,
    NewsletterComponent,
    SwiperSliderComponent,
    NavigationDesktopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SwiperModule,
  ],
  providers: [MatchMediaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
