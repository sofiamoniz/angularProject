import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../../ngrx/user/user.module';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockUsers: User[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Snow',
      birthDate: '2021-12-14T20:25:00.851Z',
      email: 'johnsnow@hotmail.com',
      avatar: 'http://loremflickr.com/640/480/animals',
      hasContract: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default Values', () => {
    it('should have default values', () => {
      expect(component.users).toEqual([]);
      expect(component.loading).toBeFalse();
      expect(component.columnsToDisplay).toEqual([]);
      expect(component.columnLabels).toEqual({});
    });
  });

  describe('Search Filter', () => {
    it('should apply search filter and return expected result', () => {
      component.users = mockUsers;
      component.ngOnChanges({
        users: {
          currentValue: component.users,
          previousValue: [],
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      component.applyFilter({ target: { value: 'john' } } as unknown as Event);

      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0].firstName).toBe('John');
    });
  });

  describe('Events', () => {
    it('should emit confirmDelete event', () => {
      spyOn(component.confirmDelete, 'emit');

      component.confirmDelete.emit('1');

      expect(component.confirmDelete.emit).toHaveBeenCalledWith('1');
    });

    it('should emit refreshData event', () => {
      spyOn(component.refreshData, 'emit');

      component.refreshData.emit();

      expect(component.refreshData.emit).toHaveBeenCalled();
    });
  });
});
