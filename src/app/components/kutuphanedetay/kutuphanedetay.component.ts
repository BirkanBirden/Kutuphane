import { Uye } from './../../models/Uye';
import { Kutuphane } from './../../models/Kutuphane';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-kutuphanedetay',
  templateUrl: './kutuphanedetay.component.html',
  styleUrls: ['./kutuphanedetay.component.css']
})
export class KutuphanedetayComponent implements OnInit {

  kayitlar: Kayit[];

  uyeId: number;
  kutupId: number;
  secKutup: Kutuphane;
  uyeler: Uye[];
  dataSource: any;
  displayedColumns = ['uyeAdSoyad', 'uyeTelNo', 'uyeMail', 'islemler'];
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
    this.UyeListe();
    this.route.params.subscribe(d => {
      if (d) {
        this.kutupId = d.kutupId;
        this.KutupGetir();
        this.KayitListele();
      }
    });

  }

  KutupGetir() {
    this.apiservis.KutuphaneById(this.kutupId).subscribe((d: Kutuphane) => {
      this.secKutup = d;
    })
  }

  KayitListele() {
    this.apiservis.KayitKutupUye(this.kutupId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  UyeListe() {

    this.apiservis.UyeListe().subscribe((d: Uye[]) => {
      this.uyeler = d;
    })
  }

  UyeSec(uyeId: number) {
    this.uyeId = uyeId;
    console.log(uyeId);
  }

  UyeEkle() {

    if (this.uyeId == 0) {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Üye Seçimi Yapınız";
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


  UyeSil(kayit: Kayit) {
    this.dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });

    this.dialogRef.componentInstance.dialogMesaj = kayit.uyebilgi.uyeAdSoyad + " İsimli Kayıt Silinecektir Onaylıyormusunuz";


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
