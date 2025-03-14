import { Component, OnInit } from '@angular/core';
import { Table } from '../table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../../ngrx/user/user.module';
import { Store } from '@ngrx/store';
import { UserActions } from '../../ngrx/user/user.actions';
import { Observable } from 'rxjs';
import { UserState } from '../../ngrx/user/user.reducer';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Table, MatToolbarModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent{
  users$: Observable<User[]> = this.store.select((state: { users: UserState }) => state.users.users);

  constructor(private readonly store: Store<{ users: UserState }>) {
    this.store.dispatch(UserActions.loadUsers());
  }
}
