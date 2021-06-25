import { Uye } from './../../../models/Uye';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KutuphaneDialogComponent } from '../kutuphane-dialog/kutuphane-dialog.component';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {

  dialogBaslik: string;
  islem: string;
  yeniKayit: Uye;
  frm: FormGroup;

  constructor(
    public dialog: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmbuilder: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = "Üye Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Üye Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmbuilder.group({
      uyeAdSoyad: [this.yeniKayit.uyeAdSoyad],
      uyeMail: [this.yeniKayit.uyeMail],
      uyeSifre: [this.yeniKayit.uyeSifre],
      uyeTelNo: [this.yeniKayit.uyeTelNo],
      uyeAdmin: [this.yeniKayit.uyeAdmin],
    });
  }

}
