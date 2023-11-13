import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CategoryDetailsComponent } from './pages/category-details/category-details.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { CommandeComponent } from './pages/commande/commande.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccauildashboardComponent } from './pagesDashboard/accauildashboard/accauildashboard.component';
import { StatistiquesComponent } from './pagesDashboard/statistiques/statistiques.component';
import { ClientsComponent } from './pagesDashboard/clients/clients.component';
import { ArticlesComponent } from './pagesDashboard/articles/articles.component';
import { VendeursComponent } from './pagesDashboard/vendeurs/vendeurs.component';
import { CommandesComponent } from './pagesDashboard/commandes/commandes.component';
const routes: Routes = [
  { path: 'acceuil', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'category/:id', component: CategoryDetailsComponent },
  { path: 'article/:idarticle', component: ArticleDetailsComponent },
  { path: 'panier', component: CartComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'commande', component: CommandeComponent },
  { path: 'ordersucess', component: OrderSuccessComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'acceuildashboard', component: AccauildashboardComponent },
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'vendeurs', component: VendeursComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
