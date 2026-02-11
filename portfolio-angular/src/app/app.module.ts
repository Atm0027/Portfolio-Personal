import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// Pages
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';
// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
// Services
import { PortfolioService } from './services/portfolio.service';
import { StorageService } from './services/storage.service';
import { ThemeService } from './services/theme.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PortfolioComponent,
        ContactComponent,
        HeaderComponent,
        FooterComponent,
        ProjectCardComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        PortfolioService,
        StorageService,
        ThemeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
