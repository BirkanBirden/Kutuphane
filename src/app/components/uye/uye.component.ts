import { UyeDialogComponent } from './../dialogs/uye-dialog/uye-dialog.component';
import { Uye } from './../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kutuphane } from 'src/app/models/Kutuphane';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KutuphaneDialogComponent } from '../dialogs/kutuphane-dialog/kutuphane-dialog.component';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.css']
})
export class UyeComponent implements OnInit {

  dataSource: any;
  uyeler: Uye[];
  displayedColumns = ['uyeAdSoyad', 'uyeTelNo', 'uyeMail', 'uyeSifre', 'uyeAdmin', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialog: MatDialogRef<UyeDialogComponent>;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService) { }

  ngOnInit() {
    this.UyeListele();
  }

  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uye[]) => {
      this.uyeler = d;
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

  UyeEkle() {
    var yeniKayit: Uye = new Uye;
    this.dialog = this.matDialog.open(UyeDialogComponent, {
      width: '300px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem)
            this.UyeListele();
        });
      }
    })
  }

  Duzenle(kayit: Uye) {
    this.dialog = this.matDialog.open(UyeDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {

        kayit.uyeAdSoyad = d.uyeAdSoyad,
          kayit.uyeAdmin = d.uyeAdmin,
          kayit.uyeMail = d.uyeMail,
          kayit.uyeSifre = d.uyeSifre,
          kayit.uyeTelNo = d.uyeTelNo,


          this.apiServis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.UyeListele();
            }
          })
      }
    });
  }




  Sil(kayit: Uye) {
    this.confirmDialog = this.matDialog.open(ConfirmDialogComponent, {
      width: "600px"
    });

    this.confirmDialog.componentInstance.dialogMesaj = kayit.uyeAdSoyad + "  isimli üye silinecektir onaylıyor musunuz?";
    this.confirmDialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeSil(kayit.uyeId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
    });
  }


}
