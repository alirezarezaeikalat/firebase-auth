import { db } from "./firestore.js";
//
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

// setup guides

const setupGuides = (docs) => {
  let html = "";
  if(docs.length){
    docs.forEach(doc => {
      const guide = doc.data();
      const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white"><span>${guide.content}</span></div>
      </li>
    `;
      html += li;
      guideList.innerHTML = html;
    });
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
}

const setupUI = (user) => {
  if (user) {
    if(user.admin) {
      adminItems.forEach(item =>{
        item.style.display = "block";
      });
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `<div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle UI elements
    loggedInLinks.forEach(link => link.style.display = "block");
    loggedOutLinks.forEach(link => link.style.display = "none");
  } else {
    // hide account info
    accountDetails.innerHTML = '';
    // toggle UI elements
    loggedInLinks.forEach(link => link.style.display = "none");
    loggedOutLinks.forEach(link => link.style.display = "block");
    adminItems.forEach(item => {
      item.style.display = "none";
    });
  }
}
// Materialize
$(document).ready(function () {
  $(".sidenav").sidenav();
  $('.modal').modal();
  $('.collapsible').collapsible();
});

export { setupGuides, setupUI };