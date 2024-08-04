// Register an account

document.addEventListener('DOMContentLoaded', function () { // checks that the DOM has loaded
  document.getElementById("register").onsubmit = function(event) { // calls function when submit button clicked 
    event.preventDefault(); // stops the default action of an event happening

      // Clear previous messages (if any)
      document.getElementById("msg_success").innerText = "";
      document.getElementById("msg_incomplete").innerText = "";
      document.getElementById("msg_email_error").innerText = "";
      document.getElementById("msg_password_inadequate").innerText = "";
      document.getElementById("msg_password_match").innerText = "";

      // get the variables from the document
      var name      = document.getElementById('name').value;
      var email     = document.getElementById('email').value;
      var password1 = document.getElementById('password1').value;
      var password2 = document.getElementById('password2').value;

      let isValid = true; // initialise logical variable as true

      if (!name || !email || !password1 || !password2) { // check that all fields have been populated
          document.getElementById("msg_incomplete").innerText = "All fields are required.";
          isValid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // check that e-mail address is in correct format
        document.getElementById("msg_email_error").innerText = "Email address is not in the correct format.";
        isValid = false;
      }

      if (!isValidPassword(password1)) { // checks password is valid with function
        document.getElementById("msg_password_inadequate").innerText = "Password must have 8 characters, with at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.";
        isValid = false;
      }

      if (password1 !== password2) { // checks first password entered matches repeat password
        document.getElementById("msg_password_match").innerText = "Passwords must match.";
        isValid = false;
      }

      if (isValid) { // if logical variable still true insert success message
        document.getElementById("msg_success").innerText = "Account registered successfully!";
      }
  };
});


// function to check if valid password

function isValidPassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password); // not a normal character
  const isLongEnough = password.length >= 8;

  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLongEnough;
}


// function to show password if box ticked

function showPassword() {
  var x = document.getElementById("password1");
  var y = document.getElementById("password2");
  if (x.type === "password" && y.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}


// function to restore data on page refresh

document.addEventListener('DOMContentLoaded', function() {

  // name
  if (localStorage.getItem('savedName')) {
      document.getElementById('name').value = localStorage.getItem('savedName');                // restore saved values
  }
  document.getElementById('name').addEventListener('change', function() {                       // listen for changes in the selection
      localStorage.setItem('savedName', document.getElementById('name').value);                 // save the current value to localStorage
  });

  // email
  if (localStorage.getItem('savedEmail')) {
      document.getElementById('email').value = localStorage.getItem('savedEmail');              // restore saved values
  }
  document.getElementById('email').addEventListener('change', function() {                      // listen for changes in the selection
      localStorage.setItem('savedEmail', document.getElementById('email').value);               // save the current value to localStorage
  });

  // password1
  if (localStorage.getItem('savedPassword1')) {
      document.getElementById('password1').value = localStorage.getItem('savedPassword1');      // restore saved values
  }
  document.getElementById('password1').addEventListener('change', function() {                  // listen for changes in the selection
      localStorage.setItem('savedPassword1', document.getElementById('password1').value);       // save the current value to localStorage
  });

  // password2
  if (localStorage.getItem('savedPassword2')) {
    document.getElementById('password2').value = localStorage.getItem('savedPassword2');        // restore saved values
  }
  document.getElementById('password2').addEventListener('change', function() {                  // listen for changes in the selection
      localStorage.setItem('savedPassword2', document.getElementById('password2').value);       // save the current value to localStorage
  });

});
    