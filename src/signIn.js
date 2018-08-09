const form = document.querySelector('.signin-form');
const signIn = document.querySelector('.signin');
const input = document.querySelector('#email');

function successMessage() {
  const headline = document.querySelector('.signin-headline');
  const description = document.querySelector('.signin-description');
  const email = localStorage.getItem('email');

  headline.textContent = 'Check your inbox';
  description.textContent = `A confirmation link has been sent to ${email}. 
  Click the link and you will be signed in.`;
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

export function sendEmail(event) {
  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };

  const email = input.value;

  firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      localStorage.setItem('email', email);
      successMessage();
    })
    .catch(handleError);
}

export function handleSignIn() {
  let email = localStorage.getItem('email');

  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    if (!email) {
      // User opened the link on a different device. To prevent session
      // fixation attacks, ask the  user to provide the associated email again.
      // For example:
      email = window.prompt(
        "Please provide the email you'd like to sign-in with for confirmation.",
      );
    }

    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then(result => {
        // Remove the sign-in link parameters
        if (history && history.replaceState) {
          window.history.replaceState(
            {},
            document.title,
            window.location.href.split('?')[0],
          );
        }

        localStorage.removeItem('email');
      })
      .catch(handleError);
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
