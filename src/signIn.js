const form = document.querySelector('.signin-form');
const signIn = document.querySelector('.signin');
const input = document.querySelector('#email');
const headline = document.querySelector('.signin-headline');
const description = document.querySelector('.signin-description');

let emailConfirmation = false;

function successMessage() {
  const email = localStorage.getItem('email');
  headline.textContent = 'Check your inbox';
  description.textContent = `A confirmation link has been sent to ${email}. 
  Click the link and you will be signed in.`;
}

function emailConfirmationMessage() {
  headline.textContent = 'Email confirmation';
  description.textContent = `Please provide the email you'd like to sign-in 
  with for confirmation.`;
}

function handleError(error) {
  console.warn(error);
}

function showForm() {
  signIn.style.display = 'block';
}

function hideForm() {
  signIn.style.display = 'none';
}

function sendEmail(email) {
  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };

  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      localStorage.setItem('email', email);
      input.value = '';
      successMessage();
    })
    .catch(handleError);
}

function signInWithLink(email, link) {
  firebase
  .auth()
  .signInWithEmailLink(email, link)
  .then(result => {
    // Remove the sign-in link parameters
    if (history && history.replaceState) {
      window.history.replaceState(
        {},
        document.title,
        link.split('?')[0],
      );
    }

    localStorage.removeItem('email');
  })
  .catch(handleError);
} 

export function handleSignInWithLink() {
  const email = input.value;

  if (!emailConfirmation) {
    sendEmail(email);
  } else {
    signInWithLink(email, window.location.href);
  }
}

export function handleSignIn() {
  const email = localStorage.getItem('email');

  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    if (!email) {
      // User opened the link on a different device. To prevent session
      // fixation attacks, ask the user to provide the associated email again.
      emailConfirmation = true;
      emailConfirmationMessage();
    }
    
    if (!emailConfirmation) {
      signInWithLink(email, window.location.href);
    }
   }
}

export function handleAuthState() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      hideForm();
    } else {
      showForm();
    }
  });
}

function handleSubmit(event) {
  event.preventDefault();
}

form.addEventListener('submit', handleSubmit, false);

