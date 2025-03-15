import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UserState } from '../../ngrx/user/user.reducer';
import { DashboardComponent } from './dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserActions } from '../../ngrx/user/user.actions';
import { User } from '../../ngrx/user/user.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore<{ users: UserState }>;

  const initialState: UserState = {
    users: [],
    loading: false,
    error: { deleteUser: false },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NoopAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should dispatch loadUsers on init', () => {
      const dispatchSpy = spyOn(store, 'dispatch');

      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(dispatchSpy).toHaveBeenCalledWith(UserActions.loadUsers());
    });
  });

  describe('State Management', () => {
    it('should update users$ when store state changes', (done) => {
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

      store.setState({
        users: {
          users: mockUsers,
          loading: false,
          error: { deleteUser: false },
        },
      });
      store.refreshState();

      let usersStore;

      component.users$.subscribe((users) => {
        usersStore = users;
      });

      expect(JSON.stringify(usersStore)).toEqual(JSON.stringify(mockUsers));
      done();
    });
  });

  describe('User Actions', () => {
    it('should dispatch deleteUser action', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const userId = '123';

      component.deleteUser(userId);

      expect(dispatchSpy).toHaveBeenCalledWith(
        UserActions.deleteUser({ id: userId })
      );
    });
  });
});
