import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import HomeComponent from './pages/home/home.component';
import PortfolioComponent from './pages/portfolio/portfolio.component';
import ContactComponent from './components/contact/contact.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección por defecto
    { path: '**', redirectTo: '/home' } // Ruta wildcard para errores 404
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
