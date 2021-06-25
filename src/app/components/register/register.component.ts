import { ApiService } from './../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { KutuphaneDialogComponent } from '../dialogs/kutuphane-dialog/kutuphane-dialog.component';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: Uye;
  frm: FormGroup;

  constructor(
    public dialog: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmbuilder: FormBuilder,
    public matDialog: MatDialog,
    public apiServis: ApiService,
    public alert: MyAlertService
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kayıt Ol";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Bilgilerini düzenle";
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

    });
  }

  UyeEkle() {
    var yeniKayit: Uye = new Uye;
    this.dialog = this.matDialog.open(RegisterComponent, {
      width: '300px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) { }
        });
      }
    })
  }

}