import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssJsFilesComponent } from './css-js-files.component';

describe('CssJsFilesComponent', () => {
  let component: CssJsFilesComponent;
  let fixture: ComponentFixture<CssJsFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssJsFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssJsFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
