import { Kutuphane } from 'src/app/models/Kutuphane';
import { Uye } from 'src/app/models/Uye';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from 'src/app/models/Kayit';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-uyeDetay',
  templateUrl: './uyeDetay.component.html',
  styleUrls: ['./uyeDetay.component.css']
})
export class UyeDetayComponent implements OnInit {

  kayitlar: Kayit[];

  uyeId: number;
  kutupId: number;
  secUye: Uye;
  kutupler: Kutuphane[];
  dataSource: any;
  displayedColumns = ['kutuphaneIsim', 'kutuphaneTel', 'kutuphaneMail', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiservis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.KutupListe();
    this.route.params.subscribe(d => {
      if (d) {
        this.uyeId = d.uyeId;
        this.UyeGetir();
        this.KayitListele();
      }
    });

  }

  UyeGetir() {
    this.apiservis.UyeById(this.uyeId).subscribe((d: Uye) => {
      this.secUye = d;
    })
  }

  KayitListele() {
    this.apiservis.KayitUyeKutup(this.uyeId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  KutupListe() {

    this.apiservis.KutuphaneListe().subscribe((d: Kutuphane[]) => {
      this.kutupler = d;
    })
  }

  KutupSec(kutupId: number) {
    this.kutupId = kutupId;
    console.log(kutupId);
  }

  KutupEkle() {

    if (this.kutupId == 0) {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Kütüphane Seçimi Yapınız";
      this.alert.AlertUygula(s);

      return false;
    }

    var kayit: Kayit = new Kayit();
    kayit.kayitKutupId = this.kutupId;
    kayit.kayitUyeId = this.uyeId;



    this.apiservis.KayitEkle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.KayitListele();
      }
    })
  }


  KutupSil(kayit: Kayit) {
    this.dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });

    this.dialogRef.componentInstance.dialogMesaj = kayit.kutupbilgi.kutuphaneIsim + " İsimli Kayıt Silinecektir Onaylıyormusunuz";


    this.dialogRef.afterClosed().subscribe(d => {
      console.log(d);

      if (d) {
        this.apiservis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });

  }
}
