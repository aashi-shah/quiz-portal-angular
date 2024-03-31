import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllUserDetailsComponent } from './show-all-user-details.component';

describe('ShowAllUserDetailsComponent', () => {
  let component: ShowAllUserDetailsComponent;
  let fixture: ComponentFixture<ShowAllUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllUserDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
