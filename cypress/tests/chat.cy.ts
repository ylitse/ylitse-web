import { accounts } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

describe('chat', () => {
  before(() => {
    api.deleteAccounts();
  });

  beforeEach(() => {
    cy.visit('/login/');
  });

  it('can start a conversation with mentor', () => {
    const mentee = accounts.mentees[0];
    api.signUpMentee(mentee);
    const mentor = accounts.mentors[0];
    api.signUpMentor(mentor);
    cy.loginUser(mentee.loginName, mentee.password);

    // go to mentors page
    cy.get('[href="/mentors"]').click();
    cy.contains('mentor_paavo').should('be.visible');

    // send message
    cy.findByText('Open card', 'button').scrollIntoView().click();
    cy.findByText('Start conversation', 'button').click();
    cy.get('textarea[placeholder*="Write your message here"]')
      .click()
      .type('Hello there');
    cy.get('button[aria-label="send"]').click();

    // log out
    cy.get('[href="/logout"]').click();
    // log in with mentor-user
    cy.loginUser(mentor.loginName, mentor.password);

    // message came
    cy.get('[href="/chat"]').click();
    cy.findByText("Hello there", "p").should('be.visible')
  });

  xit('can send message to existing conversation', () => {
    const mentee = accounts.mentees[0];
    api.signUpMentee(mentee);
    const mentor = accounts.mentors[0];
    api.signUpMentor(mentor);
    // send message between users

    cy.loginUser(mentee.loginName, mentee.password);

    // go to chat-page
    // send message
    // log out
    // log in with other-user
    // message came
  });

  xit('will show unseen-messages-ball if all unread messages not visible', () => {
    const mentee = accounts.mentees[0];
    api.signUpMentee(mentee);
    const mentor = accounts.mentors[0];
    api.signUpMentor(mentor);
    // send message between users

    cy.loginUser(mentee.loginName, mentee.password);

    // see unseen-message-ball
    // go to chat-page
    // unseen-message-ball-disappears
  });

  xit('will load all messages if multiple unseen', () => {
    const mentee = accounts.mentees[0];
    api.signUpMentee(mentee);
    const mentor = accounts.mentors[0];
    api.signUpMentor(mentor);
    // send 30-messages to other user

    cy.loginUser(mentee.loginName, mentee.password);

    // go to chat-page
    // scroll-fast-up, oldest message should be visible
  });
});
