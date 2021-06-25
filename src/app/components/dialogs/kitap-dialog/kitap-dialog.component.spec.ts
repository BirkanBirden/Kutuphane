/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KitapDialogComponent } from './kitap-dialog.component';

describe('KitapDialogComponent', () => {
  let component: KitapDialogComponent;
  let fixture: ComponentFixture<KitapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
