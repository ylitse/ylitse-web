import { accounts } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

describe('report', () => {
  const mentee = accounts.mentees[0];
  const mentor = accounts.mentors[0];

  const signUpAndMessageMentor = () => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const sender = {
          id: menteeResponse.body.id,
          loginName: mentee.loginName,
          password: mentee.password,
        };
        const reciever = { id: mentorResponse.body.user_id };

        // send message between users
        api.sendMessage({
          sender,
          reciever,
          content: 'I would like to talk to you',
        });
      });
    });
  };

  beforeEach(() => {
    api.deleteAccounts();
    signUpAndMessageMentor();
  });

  after(() => {
    api.deleteAccounts();
  });

  it('can report mentor succesfully', () => {
    cy.loginUser(mentee.loginName, mentee.password);
    cy.get('[href="/chat"]').click();

    // open report modal
    cy.getByText('Ilmianna', 'button').click();

    cy.getByText('Ilmianna käyttäjä', 'h1').should('be.visible');
    cy.getByText(
      'Ilmianna käyttäjä, jos epäilet tai havaitset mentorin käyttävän palvelua väärin.',
      'p',
    ).should('be.visible');
    cy.getByText('Lähetä', 'button').should('be.disabled');

    cy.fillInputByLabel('Syy ilmiantoon *', 'exampleReason');
    cy.fillInputByLabel(
      'Sähköposti tai puhelinumero yhteydenottoa varten',
      'exampleContactInfo',
    );

    // Send report
    cy.getByText('Lähetä', 'button').should('be.enabled').click();
    cy.wait(500);

    // should show success modal
    cy.getByText('Käyttäjän ilmianto onnistui', 'h3').should('be.visible');
    cy.getByText(
      'SOS-Lapsikylän työntekijä selvittää tilanteen ja ottaa sinuun yhteyttä.',
      'p',
    ).should('be.visible');
  });

  it('will not show report button to mentor', () => {
    cy.loginUser(mentor.loginName, mentor.password);
    cy.get('[href="/chat"]').click();

    // should show other buttons
    cy.getByText('Arkistoi', 'button').should('be.visible');
    cy.getByText('Estä käyttäjä', 'button').should('be.visible');

    cy.getByText('Ilmianna', 'button').should('not.exist');
  });
});
