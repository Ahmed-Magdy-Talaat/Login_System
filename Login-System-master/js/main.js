var userNameInput = document.getElementById("user-name");
var userEmailInput = document.getElementById("user-email");
var userPasswordInput = document.getElementById("user-password");
var confirmMsg = document.getElementById("confirmMsg");
var signin = document.getElementById("signin");
var signupBtn = document.getElementById("signupBtn");
var tryAgainMsg = document.getElementById("tryAgainMsg");
var userNameAlert = document.getElementById("userNameAlert");
var userEmailAlert = document.getElementById("userEmailAlert");
var userPasswordAlert = document.getElementById("userPasswordAlert");
var userInputs = document.querySelectorAll(".form-control");
var accountExistMsg = document.getElementById("accountExistMsg");
var loginBtn = document.getElementById("loginBtn");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password"); 
var fillMsg = document.getElementById("fillMsg"); 
var wrongMsg = document.getElementById("wrongMsg");
var usersNames = localStorage.getItem("usersSession");
var users = [];

if (localStorage.getItem("ourUsers") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("ourUsers"));
}

function signup() {
  userInputsValidation();
  isExist();
  if (userInputsValidation() == true && isExist() == false) {
    var user = {
      name: userNameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };
    users.push(user); // array of objects = json
    localStorage.setItem("ourUsers", JSON.stringify(users));
    confirmMsg.classList.remove("d-none");
    signin.classList.remove("d-none");
    tryAgainMsg.classList.add("d-none");
  } else {
    tryAgainMsg.classList.remove("d-none");
  }
}

//Validate Sign up Username:
userNameInput.onkeyup = function() {
  var userNameRejex = /^[A-Z][a-z A-z 0-9]{3,}$/;
  if (
    userNameRejex.test(userNameInput.value) == true &&
    userNameInput.value != ""
  ) {
    userNameInput.classList.add("is-valid");
    userNameInput.classList.remove("is-invalid");
    userNameAlert.classList.add("d-none");
    return true;
  } else {
    userNameInput.classList.add("is-invalid");
    userNameInput.classList.remove("is-valid");
    userNameAlert.classList.remove("d-none");
    return false;
  }
}

//Validate Sign up Email Address:
userEmailInput.onkeyup = function() {
  var userEmailRejex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
  if (
    userEmailRejex.test(userEmailInput.value) == true &&
    userEmailInput.value != ""
  ) {
    userEmailInput.classList.add("is-valid");
    userEmailInput.classList.remove("is-invalid");
    userEmailAlert.classList.add("d-none");
    return true;
  } else {
    userEmailInput.classList.add("is-invalid");
    userEmailInput.classList.remove("is-valid");
    userEmailAlert.classList.remove("d-none");
    return false;
  }
}

//Validate Sign up Password:
userPasswordInput.onkeyup = function() {
  var userPassrwordRejex = /^.{5,15}$/;
  if (
    userPassrwordRejex.test(userPasswordInput.value) == true &&
    userPasswordInput.value != ""
  ) {
    userPasswordInput.classList.add("is-valid");
    userPasswordInput.classList.remove("is-invalid");
    userPasswordAlert.classList.add("d-none");
    return true;
  } else {
    userPasswordInput.classList.add("is-invalid");
    userPasswordInput.classList.remove("is-valid");
    userPasswordAlert.classList.remove("d-none");
    return false;
  }
}

function userInputsValidation() {
  userNameInput.onkeyup();
  userEmailInput.onkeyup();
  userPasswordInput.onkeyup();
  if (
    userNameInput.onkeyup() == true &&
    userEmailInput.onkeyup() == true &&
    userPasswordInput.onkeyup() == true
  ) {
    return true;
  } else {
    return false;
  }
}

function isExist() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() == userEmailInput.value.toLowerCase()) {
      userNameInput.classList.remove("is-valid");
      userNameInput.classList.add("is-invalid");

      userEmailInput.classList.remove("is-valid");
      userEmailInput.classList.add("is-invalid");

      userPasswordInput.classList.remove("is-valid");
      userPasswordInput.classList.add("is-invalid");

      accountExistMsg.classList.remove("d-none");
      return true;
    }
  }
  return false;
}

function Login() {
  if (loginEmail.value == "" || loginPassword.value == "") {
    fillMsg.classList.remove("d-none");
    return false;
  }
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email.toLowerCase() == loginEmail.value.toLowerCase() &&
      users[i].password.toLowerCase() == loginPassword.value.toLowerCase()
    ) {
      localStorage.setItem("usersSession", users[i].name);
      loginBtn.setAttribute("href", "welcome.html");
    } else {
      wrongMsg.classList.remove("d-none");
    }
  }
}

//GLOBAL:
//Display Welcome Msg to New User (SIGN UP):
function displayWelcomeUser() {
  document.getElementById("nameOfUser").innerHTML = " Welcome " + usersNames;
}
function Logout() {
  localStorage.removeItem("usersNames");
}
