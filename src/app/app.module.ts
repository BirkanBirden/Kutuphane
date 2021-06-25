import { KitaplisteComponent } from './components/kitapliste/kitapliste.component';
import { KutupsaatComponent } from './components/kutupsaat/kutupsaat.component';
import { UyeDetayComponent } from './components/uyeDetay/uyeDetay.component';
import { KutuphanedetayComponent } from './components/kutuphanedetay/kutuphanedetay.component';
import { SaatDialogComponent } from './components/dialogs/saat-dialog/saat-dialog.component';
import { SaatComponent } from './components/saat/saat.component';
import { KitapDialogComponent } from './components/dialogs/kitap-dialog/kitap-dialog.component';
import { KitapComponent } from './components/kitap/kitap.component';
import { KutupSecDialogComponent } from './components/dialogs/kutupSec-dialog/kutupSec-dialog.component';
import { UyeSecDialogComponent } from './components/dialogs/uyeSec-dialog/uyeSec-dialog.component';
import { UyeListeComponent } from './components/uye-liste/uye-liste.component';
import { RegisterComponent } from './components/register/register.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { UyeComponent } from './components/uye/uye.component';
import { KutuphaneDialogComponent } from './components/dialogs/kutuphane-dialog/kutuphane-dialog.component';
import { KutuphaneComponent } from './components/Kutuphane/Kutuphane.component';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { KutuphaneListeComponent } from './components/kutuphane-liste/kutuphane-liste.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    KutuphaneComponent,
    UyeComponent,
    RegisterComponent,
    UyeListeComponent,
    KutuphaneListeComponent,
    KitapComponent,
    SaatComponent,
    KutuphanedetayComponent,
    UyeDetayComponent,
    KutupsaatComponent,
    KitaplisteComponent,


    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KutuphaneDialogComponent,
    UyeDialogComponent,
    UyeSecDialogComponent,
    KutupSecDialogComponent,
    KitapDialogComponent,
    SaatDialogComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    KutuphaneDialogComponent,
    UyeDialogComponent,
    UyeSecDialogComponent,
    KutupSecDialogComponent,
    KitapDialogComponent,
    SaatDialogComponent,
    KutuphanedetayComponent,
    RegisterComponent,
    KitaplisteComponent

  ],
  providers: [MyAlertService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
