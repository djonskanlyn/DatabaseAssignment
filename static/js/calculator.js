// BMR Calculator

document.addEventListener('DOMContentLoaded', function () { // checks that the DOM has loaded
  document.getElementById("calculator").onsubmit = function(event) { // calls function when submit button clicked 
    event.preventDefault(); // stops the default action of an event happening

      // Clear previous messages (if any)
      document.getElementById("result").innerText = "";
      document.getElementById("age_message").innerText = "";
      document.getElementById("height_message").innerText = "";
      document.getElementById("weight_message").innerText = "";

      // get the variables from the document
      var age     = document.getElementById("age").value;
      var height  = document.getElementById("height").value;
      var weight  = document.getElementById("weight").value;

      let isValid = true; // initialise logical variable as true

      if (age < 16 || age > 90) { // set logical to false if under 16 or over 90
          document.getElementById("age_message").innerText = "Age must be between 16 and 120.";
          isValid = false;
      }

      if (height < 125 || height > 250) { // set logical to false if under 125cm or over 250cm
        document.getElementById("height_message").innerText = "Height must be between 125cm and 250cm.";
        isValid = false;
      }

      if (weight < 40 || weight > 160) { // set logical to false if under 40kg or over 160kg
        document.getElementById("weight_message").innerText = "Weight must be between 40kg and 160kg.";
        isValid = false;
      }

      if (isValid) { // if logical variable still true run calculate BMR function
        calculateBMR(); 
      }
  };
});

function calculateBMR() {

  // get the variables from the document
  const gender  = document.getElementById('gender').value;
  const age     = parseInt(document.getElementById('age').value, 10);
  const height  = parseInt(document.getElementById('height').value, 10);
  const weight  = parseInt(document.getElementById('weight').value, 10);
  let bmr;

  if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  document.getElementById('result').innerText = `Your BMR is ${bmr.toFixed(2)} kcal/day.`; // output messgae

  // Send data to the backend
  fetch('/calculate_bmr', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gender, age, height, weight }),
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
      console.log(data.message);
      alert(data.message); // Optional: Alert message or another way to notify user
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while submitting your data. Please try again.');
  });
}


// function to restore data on page refresh

document.addEventListener('DOMContentLoaded', function() {

  // gender
  if (localStorage.getItem('savedGender')) {
      document.getElementById('gender').value = localStorage.getItem('savedGender');      // restore saved values
  }
  document.getElementById('gender').addEventListener('change', function() {               // listen for changes in the selection
      localStorage.setItem('savedGender', document.getElementById('gender').value);       // save the current value to localStorage
  });

  // age
  if (localStorage.getItem('savedAge')) {
      document.getElementById('age').value = localStorage.getItem('savedAge');            // restore saved values
  }
  document.getElementById('age').addEventListener('change', function() {                  // listen for changes in the selection
      localStorage.setItem('savedAge', document.getElementById('age').value);             // save the current value to localStorage
  });

  // height
  if (localStorage.getItem('savedHeight')) {
      document.getElementById('height').value = localStorage.getItem('savedHeight');      // restore saved values
  }
  document.getElementById('height').addEventListener('change', function() {               // listen for changes in the selection
      localStorage.setItem('savedHeight', document.getElementById('height').value);       // save the current value to localStorage
  });

  // weight
  if (localStorage.getItem('savedWeight')) {
      document.getElementById('weight').value = localStorage.getItem('savedWeight');      // restore saved values
  }
  document.getElementById('weight').addEventListener('change', function() {               // listen for changes in the selection
      localStorage.setItem('savedWeight', document.getElementById('weight').value);       // save the current value to localStorage
  });

});
