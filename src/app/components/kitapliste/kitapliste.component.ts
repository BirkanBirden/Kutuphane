
import { Kitaplar } from './../../models/Kitaplar';
import { KitKayit } from './../../models/KitKayit';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from 'src/app/models/Kayit';
import { Kutuphane } from 'src/app/models/Kutuphane';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-kitapliste',
  templateUrl: './kitapliste.component.html',
  styleUrls: ['./kitapliste.component.scss']
})
export class KitaplisteComponent implements OnInit {

  kayitlar: KitKayit[];

  uyeId: number;
  kitapId: number;
  kutupId: number;
  secKitap: Kitaplar;
  uyeler: Uye[];
  kutuplar: Kutuphane[];
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
        this.kitapId = d.kitapId;
        this.KitapGetir();
        this.KayitListele();
      }
    });

  }

  KitapGetir() {
    this.apiservis.KitapById(this.kitapId).subscribe((d: Kitaplar) => {
      this.secKitap = d;
    })
  }

  KayitListele() {
    this.apiservis.kitapuyeliste(this.kitapId).subscribe((d: KitKayit[]) => {
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

    var kayit: KitKayit = new KitKayit();
    kayit.kitKayitKutupId = this.kutupId;
    kayit.kitKayitUyeId = this.uyeId;
    kayit.kitKayitKitapId = this.kitapId;



    this.apiservis.kitkayitekle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.KayitListele();
      }
    })
  }


  UyeSil(kayit: KitKayit) {
    this.dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });

    this.dialogRef.componentInstance.dialogMesaj = kayit.uyebilgi.uyeAdSoyad + " İsimli Kayıt Silinecektir Onaylıyormusunuz";


    this.dialogRef.afterClosed().subscribe(d => {
      console.log(d);

      if (d) {
        this.apiservis.KitKayitSil(kayit.kitKayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });

  }

}
