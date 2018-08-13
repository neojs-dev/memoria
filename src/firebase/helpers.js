export function getCurrentUserId() {
  const user = firebase.auth().currentUser;
  return user.uid;
}
