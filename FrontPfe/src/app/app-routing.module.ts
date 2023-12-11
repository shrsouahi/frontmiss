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
import { ArticlesComponent } from './pagesDashboard/articles/articles.component';
import { VendeursComponent } from './pagesDashboard/vendeurs/vendeurs.component';
import { CommandesComponent } from './pagesDashboard/commandes/commandes.component';
import { ArticleinfosComponent } from './pagesDashboard/articleinfos/articleinfos.component';
import { AddArticleComponent } from './pagesDashboard/add-article/add-article.component';
import { EditArticleComponent } from './pagesDashboard/edit-article/edit-article.component';
import { ClientsComponent } from './pagesDashboard/clients/clients.component';
import { AjoutClienteComponent } from './pagesDashboard/ajout-cliente/ajout-cliente.component';
import { CategoriesComponent } from './pagesDashboard/categories/categories.component';
import { EditQuantitiesComponent } from './pagesDashboard/edit-quantities/edit-quantities.component';
import { DetailsCommandeComponent } from './pagesDashboard/details-commande/details-commande.component';
import { AjoutvendeuseComponent } from './pagesDashboard/ajoutvendeuse/ajoutvendeuse.component';
import { AproposComponent } from './pagesfooter/apropos/apropos.component';
import { ContactComponent } from './pagesfooter/contact/contact.component';
import { LivraisonComponent } from './pagesfooter/livraison/livraison.component';
import { RetoursComponent } from './pagesfooter/retours/retours.component';
import { ConfidentialiteComponent } from './pagesfooter/confidentialite/confidentialite.component';
import { FaqComponent } from './pagesfooter/faq/faq.component';
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
  { path: 'articleinfos/:idArticle', component: ArticleinfosComponent },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'edit-article/:idArticle', component: EditArticleComponent },
  { path: 'ajout-cliente', component: AjoutClienteComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'quantities/:idArticle', component: EditQuantitiesComponent },
  { path: 'commande-details/:idCommande', component: DetailsCommandeComponent },
  { path: 'ajout-vendeuse', component: AjoutvendeuseComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'livraison', component: LivraisonComponent },
  { path: 'retours', component: RetoursComponent },
  { path: 'confidentialite', component: ConfidentialiteComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
