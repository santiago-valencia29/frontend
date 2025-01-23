import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeanTaskComponent } from './mean-task.component';

describe('MeanTaskComponent', () => {
  let component: MeanTaskComponent;
  let fixture: ComponentFixture<MeanTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeanTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeanTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
