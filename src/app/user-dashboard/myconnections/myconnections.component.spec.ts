import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyconnectionsComponent } from './myconnections.component';

describe('MyconnectionsComponent', () => {
  let component: MyconnectionsComponent;
  let fixture: ComponentFixture<MyconnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyconnectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyconnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
