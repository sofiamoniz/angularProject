import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DeleteButtonComponent,
  DialogContent,
} from './delete-button.component';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Dialog Actions', () => {
    it('should open dialog', () => {
      spyOn(component.dialog, 'open');

      const fakeEvent = new MouseEvent('click');
      component.openDialog(fakeEvent, '200ms', '200ms');

      expect(component.dialog.open).toHaveBeenCalledWith(
        DialogContent,
        jasmine.objectContaining({
          width: '250px',
          enterAnimationDuration: '200ms',
          exitAnimationDuration: '200ms',
        })
      );
    });
  });

  describe('Delete Event', () => {
    it('should emit delete event', () => {
      spyOn(component.delete, 'emit');

      component.delete.emit();

      expect(component.delete.emit).toHaveBeenCalled();
    });
  });
});
