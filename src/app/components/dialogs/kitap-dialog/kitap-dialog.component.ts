import { Kitaplar } from './../../../models/Kitaplar';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kitap-dialog',
  templateUrl: './kitap-dialog.component.html',
  styleUrls: ['./kitap-dialog.component.css']
})
export class KitapDialogComponent implements OnInit {


  dialogBaslik: string;
  islem: string;
  yeniKayit: Kitaplar;
  frm: FormGroup;

  constructor(
    public dialog: MatDialogRef<KitapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmbuilder: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kitap Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Kitap Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmbuilder.group({
      kitapYazar: [this.yeniKayit.kitapYazar],
      kitapIsim: [this.yeniKayit.kitapIsim],
      kitapDurum: [this.yeniKayit.kitapDurum],

    });
  }

}
