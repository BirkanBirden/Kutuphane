import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Uye } from 'src/app/models/Uye';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public apiServis: ApiService,
  ) { }
  ngOnInit(): void { }


}
