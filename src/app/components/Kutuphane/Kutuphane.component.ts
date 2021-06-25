
import { KutuphaneDialogComponent } from './../dialogs/kutuphane-dialog/kutuphane-dialog.component';
import { Kutuphane } from './../../models/Kutuphane';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

import { Sonuc } from 'src/app/models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Kutuphane',
  templateUrl: './Kutuphane.component.html',
  styleUrls: ['./Kutuphane.component.css']
})
export class KutuphaneComponent implements OnInit {

  dataSource: any;
  kutuplar: Kutuphane[];
  displayedColumns = ['kutuphaneIsim', 'kutuphaneTel', 'kutuphaneMail', 'kutuphanesifre', 'uyeSayisi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialog: MatDialogRef<KutuphaneDialogComponent>;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService) { }

  ngOnInit() {
    this.KutupListele();
  }

  KutupListele() {
    this.apiServis.KutuphaneListe().subscribe((d: Kutuphane[]) => {
      this.kutuplar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  KutupEkle() {
    var yeniKayit: Kutuphane = new Kutuphane;
    this.dialog = this.matDialog.open(KutuphaneDialogComponent, {
      width: '300px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KutuphaneEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem)
            this.KutupListele();
        });
      }
    })
  }

  Duzenle(kayit: Kutuphane) {
    this.dialog = this.matDialog.open(KutuphaneDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {

        kayit.kutuphaneIsim = d.kutuphaneIsim,
          kayit.kutuphaneMail = d.kutuphaneMail,
          kayit.kutuphanesifre = d.kutuphanesifre,
          kayit.kutuphaneTel = d.kutuphaneTel,


          this.apiServis.KutuphaneDuzenle(kayit).subscribe((s: Sonuc) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.KutupListele();
            }
          })
      }
    });
  }




  Sil(kayit: Kutuphane) {
    this.confirmDialog = this.matDialog.open(ConfirmDialogComponent, {
      width: "600px"
    });

    this.confirmDialog.componentInstance.dialogMesaj = kayit.kutuphaneIsim + "  isimli kütüphane silinecektir onaylıyor musunuz?";
    this.confirmDialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KutuphaneSil(kayit.kutuphaneId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KutupListele();
          }
        });
      }
    });
  }




}
