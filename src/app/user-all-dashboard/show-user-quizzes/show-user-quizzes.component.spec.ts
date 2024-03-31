import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserQuizzesComponent } from './show-user-quizzes.component';

describe('ShowUserQuizzesComponent', () => {
  let component: ShowUserQuizzesComponent;
  let fixture: ComponentFixture<ShowUserQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUserQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
