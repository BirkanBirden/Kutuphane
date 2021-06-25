import { KitaplisteComponent } from './components/kitapliste/kitapliste.component';
import { KutupsaatComponent } from './components/kutupsaat/kutupsaat.component';
import { UyeDetayComponent } from './components/uyeDetay/uyeDetay.component';
import { KutuphanedetayComponent } from './components/kutuphanedetay/kutuphanedetay.component';
import { SaatComponent } from './components/saat/saat.component';
import { KitapComponent } from './components/kitap/kitap.component';
import { KutuphaneListeComponent } from './components/kutuphane-liste/kutuphane-liste.component';

import { UyeComponent } from './components/uye/uye.component';
import { KutuphaneComponent } from './components/Kutuphane/Kutuphane.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kutuphane', component: KutuphaneComponent },
  { path: 'uye', component: UyeComponent },
  { path: 'kitap', component: KitapComponent },
  { path: 'saat', component: SaatComponent },
  { path: 'saatdetay/:kutupId', component: KutupsaatComponent },
  { path: 'kutupdetay/:kutupId', component: KutuphanedetayComponent },
  { path: 'uyedetay/:uyeId', component: UyeDetayComponent },
  { path: 'kutupliste/:uyeId', component: KutuphaneListeComponent },
  { path: 'kitapliste/:kitapId', component: KitaplisteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
