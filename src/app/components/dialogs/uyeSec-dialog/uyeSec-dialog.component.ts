import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-uyeSec-dialog',
  templateUrl: './uyeSec-dialog.component.html',
  styleUrls: ['./uyeSec-dialog.component.scss']
})
export class UyeSecDialogComponent implements OnInit {

  uyeler: Uye[];

  dataSource: any;
  displayedColumns = ['uyeAdSoyad', 'uyeTel', 'uyeMail', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public dialogRef: MatDialogRef<UyeSecDialogComponent>
  ) { }

  ngOnInit() {
    this.UyeListele();
  }

  UyeListele() {
    this.apiServis.UyeListe().subscribe((d: Uye[]) => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  UyeFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  UyeSec(uye: Uye) {
    this.dialogRef.close(uye);
  }

}
