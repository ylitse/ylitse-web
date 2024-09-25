import { accounts } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

describe('home', () => {
  beforeEach(() => {
    api.deleteAccounts();
    cy.visit('/login/');
    cy.switchLanguage('fi');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('displays right content for fresh mentee', () => {
    const mentee = accounts.mentees[0];
    api.signUpMentee(mentee);
    const mentor = accounts.mentors[0];
    api.signUpMentor(mentor);
    cy.loginUser(mentee.loginName, mentee.password);

    cy.findByText('Ylitse MentorApp', 'h1').should('be.visible');
    cy.findByText(
      'Ylitse MentorApp -vertaismentoripalvelussa mentorit auttavat sinua henkilökohtaisessa tilanteessasi luottamuksellisesti. Voit valita sopivan mentorin ongelmasi perusteella ja saada apua ajasta ja paikasta riippumatta.',
      'p',
    ).should('be.visible');

    cy.findByText('Aloita etsimällä mentori', 'h2').should('be.visible');
    // assure that find mentor button works
    cy.findByText('Etsi mentori', 'button').click();
    cy.url().should('match', /mentors/);

    // return to home page
    cy.visit('/');

    cy.findByText('Tiedotteet', 'h2').should('be.visible');
    cy.findByText('Käsitteet', 'h2').should('be.visible');

    // assure that the newest mentor is displayed
    cy.findByText('Uusimmat mentorit', 'h2').should('be.visible');
    cy.findByText(mentor.displayName, 'h2').should('be.visible');
    cy.contains('Tarinani').should('be.visible');
    cy.contains(mentor.story).should('be.visible');
    cy.contains('Puhun näitä kieliä').should('be.visible');

    mentor.languages.forEach(lang => cy.contains(lang).should('be.visible'));
    mentor.skills.forEach(skill =>
      cy.contains(skill, { matchCase: false }).should('be.visible'),
    );

    cy.findByText('Vertaistukea nuorille ja aikuisille', 'h2').should(
      'be.visible',
    );
    // assure that find more mentors button works
    cy.findByText('Löydä lisää mentoreita', 'button').click();
    cy.url().should('match', /mentors/);
  });

  it('displays right content for mentee that has been chatting', () => {
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

    cy.loginUser(mentee.loginName, mentee.password);

    cy.findByText('Ylitse MentorApp', 'h1').should('be.visible');

    cy.findByText('Aloita etsimällä mentori', 'h2').should('not.exist');
    cy.findByText('Keskustele mentoreiden kanssa', 'h2').should('be.visible');

    // assure that go to chat button works
    cy.findByText('Siirry chattiin', 'button').click();
    cy.url().should('match', /chat/);
    cy.findByText(mentor.displayName, 'h2').should('be.visible');
  });

  it('displays right content for mentor', () => {
    const mentor = accounts.mentors[0];
    api.signUpMentor(mentor);
    cy.loginUser(mentor.loginName, mentor.password);

    cy.findByText('Ylitse MentorApp', 'h1').should('be.visible');

    cy.findByText('Keskustele aktoreiden kanssa', 'h2').should('be.visible');

    // assure that go to chat button works
    cy.findByText('Siirry chattiin', 'button').click();
    cy.url().should('match', /chat/);
    cy.findByText('Sinulla ei ole vielä keskusteluja', 'p').should(
      'be.visible',
    );
  });

  // TODO: This does not work because of mentee name bug on Chat page
  xit('will display notification if there is unseen messages', () => {
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

    cy.findByText('Ylitse MentorApp', 'h1').should('be.visible');

    cy.findByText('Keskustele aktoreiden kanssa', 'h2').should('not.exist');
    cy.findByText('Sinulla on lukemattomia viestejä', 'h2').should(
      'be.visible',
    );

    // assure that go to chat button works
    cy.findByText('Siirry chattiin', 'button').click();
    cy.url().should('match', /chat/);
    cy.findByText(mentee.displayName, 'h2').should('be.visible');
  });

  it('will not display notification if there is unseen messages in an archived chat', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const menteeId = menteeResponse.body.id;
        const mentorId = mentorResponse.body.user_id;

        const menteeSender = {
          id: menteeId,
          loginName: mentee.loginName,
          password: mentee.password,
        };

        const mentorSender = {
          id: mentorId,
          loginName: mentor.loginName,
          password: mentor.password,
        };

        const mentorReciever = { id: mentorId };

        // send message between users
        api
          .sendMessage({
            sender: menteeSender,
            reciever: mentorReciever,
            content: message,
          })
          .then(() =>
            // archive conversation
            api.updateChatStatus({
              sender: mentorSender,
              buddyId: menteeId,
              status: 'archived',
            }),
          );
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    cy.findByText('Ylitse MentorApp', 'h1').should('be.visible');

    cy.findByText('Sinulla on lukemattomia viestejä', 'h2').should('not.exist');
    cy.findByText('Keskustele aktoreiden kanssa', 'h2').should('be.visible');
  });

  it('will not display notification if there is unseen messages in a blocked chat', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const menteeId = menteeResponse.body.id;
        const mentorId = mentorResponse.body.user_id;

        const menteeSender = {
          id: menteeId,
          loginName: mentee.loginName,
          password: mentee.password,
        };

        const mentorSender = {
          id: mentorId,
          loginName: mentor.loginName,
          password: mentor.password,
        };

        const mentorReciever = { id: mentorId };

        // send message between users
        api
          .sendMessage({
            sender: menteeSender,
            reciever: mentorReciever,
            content: message,
          })
          .then(() =>
            // archive conversation
            api.updateChatStatus({
              sender: mentorSender,
              buddyId: menteeId,
              status: 'banned',
            }),
          );
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    cy.findByText('Ylitse MentorApp', 'h1').should('be.visible');

    cy.findByText('Sinulla on lukemattomia viestejä', 'h2').should('not.exist');
    cy.findByText('Keskustele aktoreiden kanssa', 'h2').should('be.visible');
  });
});
