import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatOption, MatSelect } from '@angular/material/select';
import { User } from '../../ngrx/user/user.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, formatDate } from '@angular/common';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-table',
  styleUrl: 'table.component.scss',
  templateUrl: 'table.component.html',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelect,
    MatOption,
    MatProgressSpinnerModule,
    CommonModule
  ],
  standalone: true,
})
export class Table implements AfterViewInit, OnChanges {
  @Input() users: User[] = [];
  @Input() loading: boolean = false;
  @Input() columnsToDisplay: string[] = [];
  @Input() columnLabels: Record<string, string> = {};
  dataSource = new MatTableDataSource<User>([]);
  columnsToDisplayWithExpand: string[] = [];
  expandedElement!: User | null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && changes['users'].currentValue) {
      this.assignColorsByBirthMonth();
    }
    if (changes['columnsToDisplay']) {
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    }
    if (changes['loading']) {
      this.loading = changes['loading'].currentValue;
    }
  }

  /** Checks whether an element is expanded. */
  isExpanded(element: User) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: User) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter) => {
      const { name, hasContract } = JSON.parse(filter);

      const matchName = name
        ? data.firstName.toLowerCase().includes(name) ||
          data.lastName.toLowerCase().includes(name)
        : true;

      const matchHasContract =
        hasContract !== '' ? data.hasContract.toString() === hasContract : true;

      return matchName && matchHasContract;
    };
  }

  updateFilter(name: string, hasContract: string) {
    this.dataSource.filter = JSON.stringify({ name, hasContract });
    this.dataSource.paginator?.firstPage();
  }

  applyFilter(event: Event) {
    const name = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const currentFilter = this.dataSource.filter
      ? JSON.parse(this.dataSource.filter)
      : { name: '', hasContract: '' };

    this.updateFilter(name, currentFilter.hasContract);
  }

  applySelectFilter(value: string) {
    const currentFilter = this.dataSource.filter
      ? JSON.parse(this.dataSource.filter)
      : { name: '', hasContract: '' };

    this.updateFilter(currentFilter.name, value);
  }

  private assignColorsByBirthMonth() {
    const colors = [
      '#FFB7A5',   
      '#FFC3C3', 
      '#FFE4A1', 
      '#DCC6E0', 
      '#A7E8F3', 
      '#C4E7B2', 
      '#F5B7D3',  
      '#B0D8FF', 
      '#C3FBD8', 
      '#FFD8A8', 
      '#E5EFC1', 
      '#FFADAD',
    ];
    const monthCount: Record<number, number> = {};
    const monthColors: Record<number, string> = {};

    // Find how many users are born in each month
    this.users.forEach((user) => {
      const birthMonth = new Date(user.birthDate).getMonth();
      monthCount[birthMonth] = (monthCount[birthMonth] || 0) + 1;
    });

    // Assign colors to months with more than one user
    Object.keys(monthCount).forEach((month, index) => {
      if (monthCount[+month] > 1) {
        monthColors[+month] = colors[index % colors.length];
      }
    });

    // Assign colors and emoji to users
    this.users = this.users.map((user) => {
      const birthMonth = new Date(user.birthDate).getMonth();
      const highlightColor = monthColors[birthMonth] || null;
      const birthdayIcon = highlightColor ? '🎂 ' : ''; 

      return {
        ...user,
        birthDate: `${birthdayIcon}${formatDate(
          user.birthDate,
          'mediumDate',
          'en'
        )}`,
        highlightColor,
      };
    });

    this.dataSource.data = this.users;
  }
}
