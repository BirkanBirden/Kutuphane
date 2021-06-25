import { KutupSecDialogComponent } from './../dialogs/kutupSec-dialog/kutupSec-dialog.component';
import { Uye } from './../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from 'src/app/models/Kayit';
import { Kutuphane } from 'src/app/models/Kutuphane';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeSecDialogComponent } from '../dialogs/uyeSec-dialog/uyeSec-dialog.component';

@Component({
  selector: 'app-kutuphane-liste',
  templateUrl: './kutuphane-liste.component.html',
  styleUrls: ['./kutuphane-liste.component.scss']
})
export class KutuphaneListeComponent implements OnInit {

  kayitlar: Kayit[];
  uyeId: number;
  secUye: Uye;
  displayedColumns = ['kutuphaneIsim', 'kutuphaneTel', 'kutuphaneMail', , 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<KutupSecDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.uyeId = p.uyeId;
      this.UyeById();
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
  UyeById() {
    this.apiServis.KayitById(this.uyeId).subscribe((d: Uye) => {
      this.secUye = d;
    });
  }
  Ekle() {
    this.dialogRef = this.matDialog.open(KutupSecDialogComponent, {
      width: '800px'
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitKutupId = d.kutupId;
        kayit.kayitUyeId = this.uyeId;
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
