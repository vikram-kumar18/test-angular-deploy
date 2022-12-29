import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentDetailComponent } from './sentiment-detail.component';

describe('SentimentDetailComponent', () => {
  let component: SentimentDetailComponent;
  let fixture: ComponentFixture<SentimentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
