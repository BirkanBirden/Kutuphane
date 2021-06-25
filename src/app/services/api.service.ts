import { KitKayit } from './../models/KitKayit';
import { SayKayit } from './../models/SayKayit';
import { Saat } from './../models/Saat';
import { Kitaplar } from './../models/Kitaplar';
import { Kayit } from './../models/Kayit';
import { Uye } from './../models/Uye';
import { Kutuphane } from './../models/Kutuphane';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44378/api/";

  constructor(
    public http: HttpClient
  ) { }


  //----------------------Kütüphane Servis Başlıngıcı--------------------------------//

  KutuphaneListe() {
    return this.http.get(this.apiUrl + "kutupliste");
  }

  KutuphaneById(kutupId: number) {
    return this.http.get(this.apiUrl + "kutupbyid/" + kutupId);
  }

  KutuphaneEkle(kutup: Kutuphane) {
    return this.http.post(this.apiUrl + "kutupekle", kutup);
  }

  KutuphaneDuzenle(kutup: Kutuphane) {
    return this.http.put(this.apiUrl + "kutupduzenle", kutup);
  }

  KutuphaneSil(kutupId: number) {
    return this.http.delete(this.apiUrl + "kutuphanesil/" + kutupId);
  }

  //----------------------Kütüphane Servis Bitişi--------------------------------//


  //----------------------Üye Servis Başlangıcı--------------------------------//



  UyeListe() {
    return this.http.get(this.apiUrl + "uyeliste");
  }

  UyeById(uyeId: number) {
    return this.http.get(this.apiUrl + "uyelistebyid/" + uyeId);
  }

  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "uyeekle", uye);
  }

  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "uyeduzenle", uye);
  }

  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "uyesil/" + uyeId);
  }

  //----------------------Üye Servis Bitişi--------------------------------//



  //----------------------Kayıt Servis Başlangıcı--------------------------------//



  KayitListe() {
    return this.http.get(this.apiUrl + "kayitliste");
  }

  KayitById(kayitId: number) {
    return this.http.get(this.apiUrl + "kayitbyid/" + kayitId);
  }

  KayitKutupUye(kutupId: number) {
    return this.http.get(this.apiUrl + "kutuphaneuyeliste/" + kutupId);
  }

  KayitUyeKutup(uyeId: number) {
    return this.http.get(this.apiUrl + "uyekutupliste/" + uyeId);
  }

  KayitEkle(kayit: Kayit) {
    return this.http.post(this.apiUrl + "kayitekle", kayit);
  }

  KayitDuzenle(kayit: Kayit) {
    return this.http.put(this.apiUrl + "kayitduzenle", kayit);
  }

  KayitSil(kayitId: number) {
    return this.http.delete(this.apiUrl + "kayitsil/" + kayitId);
  }


  //----------------------Kayıt Servis Bitişi--------------------------------//  



  //----------------------Kitap Servis Başlangıcı--------------------------------//



  KitapListe() {
    return this.http.get(this.apiUrl + "kitapliste");
  }

  KitapById(kitapId: number) {
    return this.http.get(this.apiUrl + "kitapbyid/" + kitapId);
  }

  KitapEkle(kitap: Kitaplar) {
    return this.http.post(this.apiUrl + "kitapekle", kitap);
  }

  KitapDuzenle(kitap: Kitaplar) {
    return this.http.put(this.apiUrl + "kitapduzenle", kitap);
  }

  KitapSil(kitapId: number) {
    return this.http.delete(this.apiUrl + "kitapsil/" + kitapId);
  }


  //----------------------Kitap Servis Bitişi--------------------------------//  




  //----------------------Saat Servis Başlangıcı--------------------------------//  


  SaatListe() {
    return this.http.get(this.apiUrl + "saatliste");
  }

  SaatById(saatId: number) {
    return this.http.get(this.apiUrl + "saatbyid/" + saatId);
  }

  SaatEkle(saat: Saat) {
    return this.http.post(this.apiUrl + "saatekle", saat);
  }

  SaatDuzenle(saat: Saat) {
    return this.http.put(this.apiUrl + "saatduzenle", saat);
  }

  SaatSil(saatId: number) {
    return this.http.delete(this.apiUrl + "saatsil/" + saatId);
  }


  KutupSaatListe(kutupId: number) {
    return this.http.get(this.apiUrl + "kutupsaatliste/" + kutupId);
  }

  //----------------------Saat kayıt Başlangıcı--------------------------------//  

  // SaatListe() {
  //   return this.http.get(this.apiUrl + "saatliste");
  // }

  // SaatById(saatId: number) {
  //   return this.http.get(this.apiUrl + "saatbyid/" + saatId);
  // }

  KutupSaatEkle(saat: SayKayit) {
    return this.http.post(this.apiUrl + "saykayitekle", saat);
  }

  // SaatDuzenle(saat: Saat) {
  //   return this.http.put(this.apiUrl + "saatduzenle", saat);
  // }

  // SaatSil(saatId: number) {
  //   return this.http.delete(this.apiUrl + "saatsil/" + saatId);
  // }


  // KutupSaatListe(kutupId: number) {
  //   return this.http.get(this.apiUrl + "kutupsaatliste/" + kutupId);
  // }


  //----------------------kitap kayıt Başlangıcı--------------------------------//  

  kitapuyeliste(kitapId: number) {
    return this.http.get(this.apiUrl + "kitapuyeliste/" + kitapId);
  }

  kitkayitekle(kitkayit: KitKayit) {
    return this.http.post(this.apiUrl + "kitkayitekle", kitkayit);
  }

  KitKayitSil(kayitId: number) {
    return this.http.delete(this.apiUrl + "kitkayitsil/" + kayitId);
  }
}


