import { SaatDialogComponent } from './../dialogs/saat-dialog/saat-dialog.component';
import { Saat } from './../../models/Saat';
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
  selector: 'app-saat',
  templateUrl: './saat.component.html',
  styleUrls: ['./saat.component.css']
})
export class SaatComponent implements OnInit {

  dataSource: any;
  kutupId: number;
  saatler: Saat[];
  displayedColumns = ['Saatler', 'SaatKisi', 'SaatDurum', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialog: MatDialogRef<SaatDialogComponent>;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService) { }

  ngOnInit() {
    this.SaatListele();
  }

  SaatListele() {
    this.apiServis.SaatListe().subscribe((d: Saat[]) => {
      this.saatler = d;
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

  SaatEkle() {
    var yeniKayit: Saat = new Saat;
    this.dialog = this.matDialog.open(SaatDialogComponent, {
      width: '300px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SaatEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem)
            this.SaatListele();
        });
      }
    })
  }


  Duzenle(kayit: Saat) {
    this.dialog = this.matDialog.open(SaatDialogComponent, {
      width: '300px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialog.afterClosed().subscribe(d => {
      if (d) {

        kayit.SaatDurum = d.SaatDurum,
          kayit.SaatKisi = d.SaatKisi,
          kayit.Saatler = d.Saatler,
          kayit.kutupbilgi = d.kutupbilgi,


          this.apiServis.SaatDuzenle(kayit).subscribe((s: Sonuc) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.SaatListele();
            }
          })
      }
    });
  }




  Sil(kayit: Saat) {
    this.confirmDialog = this.matDialog.open(ConfirmDialogComponent, {
      width: "600px"
    });

    this.confirmDialog.componentInstance.dialogMesaj = kayit.Saatler + "   silinecektir onaylıyor musunuz?";
    this.confirmDialog.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.SaatSil(kayit.SaatId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SaatListele();
          }
        });
      }
    });
  }
}
