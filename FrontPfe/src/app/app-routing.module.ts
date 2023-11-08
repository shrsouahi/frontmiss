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
const routes: Routes = [
  { path: 'acceuil', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'category/:id', component: CategoryDetailsComponent },
  { path: 'article/:idarticle', component: ArticleDetailsComponent },
  { path: 'panier', component: CartComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'commande', component: CommandeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
