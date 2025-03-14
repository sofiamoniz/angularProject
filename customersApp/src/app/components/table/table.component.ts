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
import { CommonModule } from '@angular/common';
import { assignColorsByBirthMonth } from '../../helpers/functions';

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
      assignColorsByBirthMonth(this.users, this.dataSource);
    }
    if (changes['columnsToDisplay']) {
      this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'delete', 'expand'];
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
}
