const input = document.querySelector('#email');
const signIn = document.querySelector('.signin');
const form = document.querySelector('.signin-form');
const headline = document.querySelector('.signin-headline');
const description = document.querySelector('.signin-description');

function successMessage() {
  const email = localStorage.getItem('email');
  headline.textContent = 'Check your inbox';
  description.textContent = `A confirmation link has been sent to ${email}. 
  Click the link and you will be signed in.`;
}

function handleError(error) {
  console.warn(error);
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

export function show() {
  signIn.style.display = 'block';
}

export function hide() {
  signIn.style.display = 'none';
}

export function sendEmail() {
  const email = input.value;

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

export function handleSignIn() {
  let email = localStorage.getItem('email');

  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    if (!email) {
      // User opened the link on a different device. To prevent session
      // fixation attacks, ask the user to provide the associated email again.
      email = prompt('Please provide your email for confirmation.');
    }

    signInWithLink(email, window.location.href);
   }
}

function handleSubmit(event) {
  event.preventDefault();
}

form.addEventListener('submit', handleSubmit, false);

