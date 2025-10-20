import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPointPage } from './edit-point.page';

describe('EditPointPage', () => {
  let component: EditPointPage;
  let fixture: ComponentFixture<EditPointPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
