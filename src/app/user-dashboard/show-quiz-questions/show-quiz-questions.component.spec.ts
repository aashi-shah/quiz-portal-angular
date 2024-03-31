import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuizQuestionsComponent } from './show-quiz-questions.component';

describe('ShowQuizQuestionsComponent', () => {
  let component: ShowQuizQuestionsComponent;
  let fixture: ComponentFixture<ShowQuizQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQuizQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
