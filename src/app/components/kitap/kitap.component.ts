import { KitapDialogComponent } from './../dialogs/kitap-dialog/kitap-dialog.component';
import { Kitaplar } from './../../models/Kitaplar';
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
  selector: 'app-kitap',
  templateUrl: './kitap.component.html',
  styleUrls: ['./kitap.component.css']
})
export class KitapComponent implements OnInit {

  dataSource: any;
  kitaplar: Kitaplar[];
  displayedColumns = ['kitapIsim', 'kitapYazar', 'kitapDurum', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialog: MatDialogRef<KitapDialogComponent>;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService) { }

  ngOnInit() {
    this.KitapListele();
  }

  KitapListele() {
    this.apiServis.KitapListe().subscribe((d: Kitaplar[]) => {
      this.kitaplar = d;
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

  KitapEkle() {
    var yeniKayit: Kitaplar = new Kitaplar;
    this.dialog = this.matDialog.open(KitapDialogComponent, {
      width: '300px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KitapEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem)
            this.KitapListele();
        });
      }
    })
  }

  Duzenle(kayit: Kitaplar) {
    this.dialog = this.matDialog.open(KitapDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {

        kayit.kitapDurum = d.kitapDurum,
          kayit.kitapIsim = d.kitapIsim,
          kayit.kitapKutupId = d.kitapKutupId,
          kayit.kitapYazar = d.kitapYazar,


          this.apiServis.KitapDuzenle(kayit).subscribe((s: Sonuc) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.KitapListele();
            }
          })
      }
    });
  }




  Sil(kayit: Kitaplar) {
    this.confirmDialog = this.matDialog.open(ConfirmDialogComponent, {
      width: "600px"
    });

    this.confirmDialog.componentInstance.dialogMesaj = kayit.kitapIsim + "  isimli kitap silinecektir onaylıyor musunuz?";
    this.confirmDialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KitapSil(kayit.kitapId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KitapListele();
          }
        });
      }
    });
  }


}
