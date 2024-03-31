import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuizzesComponent } from './show-quizzes.component';

describe('ShowQuizzesComponent', () => {
  let component: ShowQuizzesComponent;
  let fixture: ComponentFixture<ShowQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
