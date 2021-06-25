import { ApiService } from './../../../services/api.service';
import { Kutuphane } from './../../../models/Kutuphane';
import { Saat } from './../../../models/Saat';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-saat-dialog',
  templateUrl: './saat-dialog.component.html',
  styleUrls: ['./saat-dialog.component.css']
})
export class SaatDialogComponent implements OnInit {

  dialogBaslik: string;
  islem: string;
  yeniKayit: Saat;
  frm: FormGroup;
  kutuphaneId: number;
  kutupler: Kutuphane[];

  constructor(
    public dialog: MatDialogRef<SaatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmbuilder: FormBuilder,
    public apiServis: ApiService,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = "Saat Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Saat Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KutupListele();

  }

  FormOlustur() {
    return this.frmbuilder.group({
      SaatDurum: [this.yeniKayit.SaatDurum],
      SaatKisi: [this.yeniKayit.SaatKisi],
      SaatKutupId: [this.yeniKayit.SaatKutupId],
      Saatler: [this.yeniKayit.Saatler],
      kutupbilgi: [this.yeniKayit.kutupbilgi],
    });
  }

  KutupSec(kutuphaneId: number) {
    this.kutuphaneId = kutuphaneId;
  }

  KutupListele() {
    this.apiServis.KutuphaneListe().subscribe((d: Kutuphane[]) => {
      this.kutupler = d;
    });
  }



}
