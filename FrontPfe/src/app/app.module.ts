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
import { ArticlesComponent } from './pagesDashboard/articles/articles.component';
import { CommandesComponent } from './pagesDashboard/commandes/commandes.component';
import { VendeursComponent } from './pagesDashboard/vendeurs/vendeurs.component';
import { ArticleinfosComponent } from './pagesDashboard/articleinfos/articleinfos.component';
import { DeleteConfirmationDialogComponent } from './pagesDashboard/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddArticleComponent } from './pagesDashboard/add-article/add-article.component';
import { EditArticleComponent } from './pagesDashboard/edit-article/edit-article.component';
import { ClientsComponent } from './pagesDashboard/clients/clients.component';
import { DeleteclientDialogComponent } from './pagesDashboard/deleteclient-dialog/deleteclient-dialog.component';
import { AjoutClienteComponent } from './pagesDashboard/ajout-cliente/ajout-cliente.component';
import { CategoriesComponent } from './pagesDashboard/categories/categories.component';
import { EditQuantitiesComponent } from './pagesDashboard/edit-quantities/edit-quantities.component';
import { DetailsCommandeComponent } from './pagesDashboard/details-commande/details-commande.component';
import { EditcategorymodalComponent } from './component/editcategorymodal/editcategorymodal.component';
import { DeletecategorymodalComponent } from './component/deletecategorymodal/deletecategorymodal.component';
import { AddcategorymodalComponent } from './component/addcategorymodal/addcategorymodal.component';
import { ImageCarouselComponent } from './component/image-carousel/image-carousel.component';
import { AjoutvendeuseComponent } from './pagesDashboard/ajoutvendeuse/ajoutvendeuse.component';

import { UpdateSellerDialogComponent } from './pagesDashboard/update-seller-dialog/update-seller-dialog.component';
import { DeactivateAccountDialogComponent } from './componenet/deactivate-account-dialog/deactivate-account-dialog.component';
import { NgChartsModule } from 'ng2-charts';
import { TableaubordComponent } from './tableaubord/tableaubord.component';

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
    ArticlesComponent,
    CommandesComponent,
    VendeursComponent,
    ArticleinfosComponent,
    DeleteConfirmationDialogComponent,
    AddArticleComponent,
    EditArticleComponent,
    ClientsComponent,
    DeleteclientDialogComponent,
    AjoutClienteComponent,
    CategoriesComponent,
    EditQuantitiesComponent,
    DetailsCommandeComponent,
    EditcategorymodalComponent,
    AddcategorymodalComponent,
    ImageCarouselComponent,
    AjoutvendeuseComponent,
    UpdateSellerDialogComponent,
    DeactivateAccountDialogComponent,
    TableaubordComponent,
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
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
