import { SayKayit } from './../../models/SayKayit';
import { Saat } from './../../models/Saat';
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
  selector: 'app-kutupsaat',
  templateUrl: './kutupsaat.component.html',
  styleUrls: ['./kutupsaat.component.scss']
})
export class KutupsaatComponent implements OnInit {

  sayKayitlar: SayKayit[];

  saatId: number;
  kutupId: number;
  secKutup: Kutuphane;
  saatler: Saat[];
  dataSource: any;
  displayedColumns = ['Saatler', 'SaatKisi', 'SaatDurum', 'kutupbilgi', 'islemler'];
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
    this.SaatListe();
    this.route.params.subscribe(d => {
      if (d) {
        this.kutupId = d.kutupId;
        this.KutupGetir();
        this.KayitListe();
      }
    });

  }

  KutupGetir() {
    this.apiservis.KutuphaneById(this.kutupId).subscribe((d: Kutuphane) => {
      this.secKutup = d;
    })
  }

  KayitListe() {
    this.apiservis.KutupSaatListe(this.kutupId).subscribe((d: SayKayit[]) => {
      this.sayKayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  SaatListe() {

    this.apiservis.SaatListe().subscribe((d: Saat[]) => {
      this.saatler = d;
    })
  }

  SaatSec(saatId: number) {
    this.saatId = saatId;
    console.log(saatId);
  }

  SaatEkle() {

    if (this.saatId == 0) {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "saat Seçimi Yapınız";
      this.alert.AlertUygula(s);

      return false;
    }

    var kayit: SayKayit = new SayKayit();
    kayit.sayKayitKutupId = this.kutupId;
    kayit.sayKayitSaatId = this.saatId;



    this.apiservis.KutupSaatEkle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
      }
    })
  }


  UyeSil(kayit: Kayit) {
    // this.dialogRef = this.matDialog.open(ConfirmDialogComponent, {
    //   width: '500px'
    // });

    // this.dialogRef.componentInstance.dialogMesaj = kayit.uyebilgi.uyeAdSoyad + " İsimli Kayıt Silinecektir Onaylıyormusunuz";


    // this.dialogRef.afterClosed().subscribe(d => {
    //   console.log(d);

    //   if (d) {
    //     this.apiservis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
    //       this.alert.AlertUygula(s);
    //       if (s.islem) {
    //         this.KayitListele();
    //       }
    //     });
    //   }
    // });

  }
}