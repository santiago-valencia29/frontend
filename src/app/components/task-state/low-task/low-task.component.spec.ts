import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LowTaskComponent } from './low-task.component';

describe('LowTaskComponent', () => {
  let component: LowTaskComponent;
  let fixture: ComponentFixture<LowTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
