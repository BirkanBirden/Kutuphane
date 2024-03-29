import { UyeSecDialogComponent } from './../dialogs/uyeSec-dialog/uyeSec-dialog.component';
import { Kutuphane } from './../../models/Kutuphane';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Kayit } from 'src/app/models/Kayit';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-uye-liste',
  templateUrl: './uye-liste.component.html',
  styleUrls: ['./uye-liste.component.scss']
})
export class UyeListeComponent implements OnInit {

  kayitlar: Kayit[];
  kutupId: number;
  secKutup: Kutuphane;
  displayedColumns = ['uyeAdSoyad', 'uyeTel', 'uyeMail', 'uyeSifre', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UyeSecDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.kutupId = p.kutuphaneId;
      this.KutupById();
      this.kayitListele();
    });
  }
  kayitListele() {
    this.apiServis.KayitListe().subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  KutupById() {
    this.apiServis.KayitById(this.kutupId).subscribe((d: Kutuphane) => {
      this.secKutup = d;
    });
  }
  Ekle() {
    this.dialogRef = this.matDialog.open(UyeSecDialogComponent, {
      width: '800px'
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitKutupId = this.kutupId;
        kayit.kayitUyeId = d.uyeId;
        this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.kayitListele();
          }
        });
      }

    });

  }
  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });

    this.confirmDialogRef.componentInstance.dialogMesaj = " Kaydı Silmek İstiyormusunuz";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.kayitListele();
          }
        });
      }
    });
  }
}
