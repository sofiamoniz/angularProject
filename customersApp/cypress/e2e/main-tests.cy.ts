import { apiUrl } from './helpers/consts';

describe('Main Features', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Filtering and Searching', () => {
    it('should filter contract results correctly', () => {
      // Open filter and select "yes"
      cy.get('.select-filter').click();
      cy.get('mat-option').contains('Yes').click();

      // Verify that only users with contracts are displayed
      cy.get('.mdc-data-table__content .cdk-column-hasContract').each(
        ($cell) => {
          expect($cell.text().trim()).to.equal('Yes');
        }
      );

      // Open filter and select "no"
      cy.get('.select-filter').click();
      cy.get('mat-option').contains('No').click();

      // Verify that only users without contracts are displayed
      cy.get('.mdc-data-table__content .cdk-column-hasContract').each(
        ($cell) => {
          expect($cell.text().trim()).to.equal('No');
        }
      );
    });

    it('should successfully refresh users and search for a specific user', () => {
      // Mock request
      cy.intercept('GET', apiUrl, (req) => {
        req.reply((res) => {
          res.send({
            statusCode: 200,
            body: [
              {
                firstName: 'Mocked',
                lastName: 'User',
                birthDate: '2022-06-10T18:17:48.290Z',
                email: 'mockedUser@hotmail.com',
                avatar: 'http://loremflickr.com/640/480/animals',
                hasContract: false,
                id: '27',
              },
            ],
          });
        });
      }).as('getUsers');

      // Refresh table and trigger the new request
      cy.get('.refresh-button').click();

      // Spinner should be visible while loading, and then replaced by the table
      cy.get('.spinner').should('be.visible');
      cy.wait('@getUsers');
      cy.get('.spinner').should('not.exist');

      // Search for mocked user in table and assert that it exists
      cy.get('input').type('Mocked');
      cy.get('.mat-mdc-table').contains('Mocked');

      cy.get('input').type('None');
      cy.get('.no-data-text').should('exist');
    });
  });

  describe('Pagination', () => {
    it('should navigate between table pages', () => {
      // Scroll to the bottom of the page
      cy.scrollTo('bottom');

      // Verify that there are more than one page (assuming that the API is pre-populated)
      cy.get('.mat-mdc-paginator-range-label')
        .invoke('text')
        .then((firstPageText) => {
          cy.get(
            '.mat-mdc-paginator-container .mat-mdc-paginator-navigation-next'
          ).click();
          cy.get('.mat-mdc-paginator-range-label')
            .invoke('text')
            .then((secondPageText) => {
              expect(firstPageText).not.to.equal(secondPageText);
            });
        });
    });
  });

  describe('Loading State', () => {
    it('should display a loading spinner while fetching data', () => {
      cy.get('.refresh-button').click();
      cy.get('.spinner').should('be.visible');
    });
  });

  describe('Empty State', () => {
    it('should render No data to display string when there are no users ', () => {
      // Mock request
      cy.intercept('GET', apiUrl, (req) => {
        req.reply((res) => {
          res.send({
            statusCode: 200,
            body: [],
          });
        });
      }).as('getUsers');

      // Refresh table and trigger the new request
      cy.get('.refresh-button').click();

      // Spinner should be visible while loading, and then replaced by the table
      cy.get('.spinner').should('be.visible');
      cy.wait('@getUsers');
      cy.get('.spinner').should('not.exist');

      // Search for mocked user in table and assert that it exists
      cy.get('.no-data').should('exist');
    });
  });

  describe('User Management', () => {
    it('should successfully delete user that exists', () => {
      // Real post to API
      cy.request({
        method: 'POST',
        url: apiUrl,
        body: {
          firstName: 'John',
          lastName: 'Snow',
          birthDate: '2021-12-14T20:25:00.851Z',
          email: 'johnsnow@hotmail.com',
          avatar: 'http://loremflickr.com/640/480/animals',
          hasContract: true,
        },
      })
        .its('status')
        .should('eq', 201); // Ensure the user was successfully created

      // Refresh the table to trigger the new request
      cy.get('.refresh-button').click();

      // Search for the user in the input field
      cy.get('input').type('John Snow');

      // Ensure "John Snow" appears in the table
      cy.get('.mat-mdc-table').contains('John Snow').should('be.visible');

      // Find user row and delete it
      cy.get('.mat-mdc-table')
        .contains('John Snow')
        .find('.cdk-column-delete')
        .click();

      // Confirm deletion
      cy.get('.confirm-delete').click();

      // Verify success message
      cy.get('.mat-mdc-snack-bar-label')
        .should('be.visible')
        .and('contain', 'User deleted with success');
    });
  });
});
