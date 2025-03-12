import { Component } from '@angular/core';
import { Table } from './Table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Table],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }