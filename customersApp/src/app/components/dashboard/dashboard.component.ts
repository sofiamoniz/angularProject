import { Component, OnInit } from '@angular/core';
import { Table } from '../table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../../ngrx/user/user.module';
import { Store } from '@ngrx/store';
import { UserActions } from '../../ngrx/user/user.actions';
import { map, Observable, startWith } from 'rxjs';
import { UserState } from '../../ngrx/user/user.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Table, MatToolbarModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  users$: Observable<User[]> = this.store
    .select((state: { users: UserState }) => state.users.users)
    .pipe(
      map((users) => users ?? []),
      startWith([]) 
    );

  loading$: Observable<boolean> = this.store
    .select((state: { users: UserState }) => state.users.loading)
    .pipe(
      map((loading) => loading ?? false),
      startWith(false)
    );

  columnsToDisplay = ['firstName', 'lastName', 'birthDate', 'hasContract'];

  columnLabels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    birthDate: 'Birth Date',
    hasContract: 'Has Contract?',
  };

  constructor(private readonly store: Store<{ users: UserState }>) {
    this.getData();
  }

  deleteUser(id: string) {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }

  getData() {
    this.store.dispatch(UserActions.loadUsers());
  }
}
