import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialDesignModule } from './material-design/material-design.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarComponent } from './menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { CategoryDetailsComponent } from './pages/category-details/category-details.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { EditProfileModalComponent } from './component/edit-profile-modal/edit-profile-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPasswordModalComponent } from './component/edit-password-modal/edit-password-modal.component';
import { EditAddressModalComponent } from './component/edit-adresse-modal/edit-adresse-modal.component';
import { CommandeComponent } from './pages/commande/commande.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccauildashboardComponent } from './pagesDashboard/accauildashboard/accauildashboard.component';
import { StatistiquesComponent } from './pagesDashboard/statistiques/statistiques.component';
import { ClientsComponent } from './pagesDashboard/clients/clients.component';
import { ArticlesComponent } from './pagesDashboard/articles/articles.component';
import { CommandesComponent } from './pagesDashboard/commandes/commandes.component';
import { VendeursComponent } from './pagesDashboard/vendeurs/vendeurs.component';
import { ArticleinfosComponent } from './pagesDashboard/articleinfos/articleinfos.component';
import { DeleteConfirmationDialogComponent } from './pagesDashboard/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddArticleComponent } from './pagesDashboard/add-article/add-article.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    CategoryDetailsComponent,
    ArticleDetailsComponent,
    CartComponent,
    ProfilComponent,
    EditProfileModalComponent,
    EditPasswordModalComponent,
    EditAddressModalComponent,
    CommandeComponent,
    OrderSuccessComponent,
    DashboardComponent,
    AccauildashboardComponent,
    StatistiquesComponent,
    ClientsComponent,
    ArticlesComponent,
    CommandesComponent,
    VendeursComponent,
    ArticleinfosComponent,
    DeleteConfirmationDialogComponent,
    AddArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialDesignModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    FlexLayoutModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
