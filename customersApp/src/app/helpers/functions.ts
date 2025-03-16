import { formatDate } from '@angular/common';
import { User } from '../ngrx/user/user.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export function assignColorsByBirthMonth(
  users: User[],
  dataSource: MatTableDataSource<User, MatPaginator>
) {
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

  /* Find how many users are born in each month */
  users.forEach((user) => {
    const birthMonth = new Date(user.birthDate).getMonth();
    monthCount[birthMonth] = (monthCount[birthMonth] || 0) + 1;
  });

  /* Assign colors to months with more than one user */
  Object.keys(monthCount).forEach((month, index) => {
    if (monthCount[+month] > 1) {
      monthColors[+month] = colors[index % colors.length];
    }
  });

  /* Assign colors and emoji to users */
  users = users.map((user) => {
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

  dataSource.data = users;
}
