import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfoComponent } from './sfo.component';

describe('SfoComponent', () => {
  let component: SfoComponent;
  let fixture: ComponentFixture<SfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
