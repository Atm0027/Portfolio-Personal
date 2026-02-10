import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { App } from './app';
// Components
import HomeComponent from './pages/home/home.component';
import PortfolioComponent from './pages/portfolio/portfolio.component';
import ContactComponent from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
// Services
import { PortfolioService } from './services/portfolio.service';
import { StorageService } from './services/storage.service';
import { ThemeService } from './services/theme.service';

@NgModule({
    declarations: [
        App,
        HomeComponent,
        PortfolioComponent,
        ContactComponent,
        HeaderComponent,
        FooterComponent,
        ProjectCardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        PortfolioService,
        StorageService,
        ThemeService
    ],
    bootstrap: [App]
})
export class AppModule { }
