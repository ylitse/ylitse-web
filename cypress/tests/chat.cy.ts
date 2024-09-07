import { accounts } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

describe('chat', () => {
  beforeEach(() => {
    api.deleteAccounts();
    cy.visit('/login/');
  });

  afterEach(() => {
    cy.get('[href="/logout"]').click();
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
    cy.findByText('Hello there', 'p').should('be.visible');
  });

  it('can send message to existing conversation', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    const answer = 'How can I help you';
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
          content: message,
        });
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    // go to chat-page
    cy.get('[href="/chat"]').click();
    cy.findByText(message, 'p').should('be.visible');

    // send message
    cy.get('textarea[placeholder*="Write your message here"]')
      .click()
      .type(answer);
    cy.get('button[aria-label="send"]').click();

    // log in with original-user
    cy.get('[href="/logout"]').click();
    cy.loginUser(mentee.loginName, mentee.password);

    // message came
    cy.get('[href="/chat"]').click();
    cy.findByText(answer, 'p').should('be.visible');
  });

  it('marks unseen messages seen', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
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
          content: message,
        });
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    // see unseen-message-ball
    cy.get('div[aria-label="unseen-messages-dot"]').should('be.visible');
    // go to chat-page and mark message unseen
    cy.get('[href="/chat"]').click();
    cy.findByText(message, 'p').should('be.visible');
    cy.wait(1000);
    cy.get('[href="/mentors"]').click();

    // unseen-message-ball-disappears
    cy.get('div[aria-label="unseen-messages-dot"]').should('not.exist');
  });

  it('wont mark unseen if not visible', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'Huzzah';
    const numberOfMessages = 20;
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

        // send messages to other user
        for (let i = 1; i <= numberOfMessages; i++) {
          api.sendMessage({ sender, reciever, content: `${message} ${i}!` });
        }
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    // go to chat-page
    cy.get('[href="/chat"]').click();

    // should scroll to last message
    cy.findByText(`${message} ${numberOfMessages}!`, 'p').should('be.visible');
    cy.wait(1000);
    cy.get('[href="/mentors"]').click();

    // see unseen-message-ball still
    cy.get('div[aria-label="unseen-messages-dot"]').should('be.visible');
  });

  it('will load all messages if multiple unseen', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'Huzzah';
    const numberOfMessages = 20;
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

        for (let i = 1; i <= numberOfMessages; i++) {
          api.sendMessage({ sender, reciever, content: `${message} ${i}!` });
          //   .then(response => {
          //     cy.task(
          //       'log',
          //       `sent message ${i} with id:${response.id}, timestamp: ${response.created}`,
          //     );
          //   });
          // cy.wait(1500);
        }
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    // go to chat-page
    cy.get('[href="/chat"]').click();

    // should scroll to last message
    cy.findByText(`${message} ${numberOfMessages}!`, 'p').should('be.visible');

    // scroll-up oldest message should be visible
    cy.findByText(`${message} 1!`, 'p').scrollIntoView().should('be.visible');
  });
});
