import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTasksComponent } from './complete-tasks.component';

describe('CompleteTasksComponent', () => {
  let component: CompleteTasksComponent;
  let fixture: ComponentFixture<CompleteTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
