import { Kutuphane } from './../../../models/Kutuphane';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kutuphane-dialog',
  templateUrl: './kutuphane-dialog.component.html',
  styleUrls: ['./kutuphane-dialog.component.css']
})
export class KutuphaneDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: Kutuphane;
  frm: FormGroup;
  constructor(
    public dialog: MatDialogRef<KutuphaneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmbuilder: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kütüphane Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Kütüphane Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmbuilder.group({
      kutuphaneIsim: [this.yeniKayit.kutuphaneIsim],
      kutuphaneTel: [this.yeniKayit.kutuphaneTel],
      kutuphaneMail: [this.yeniKayit.kutuphaneMail],
      kutuphanesifre: [this.yeniKayit.kutuphanesifre],
    });
  }


}
