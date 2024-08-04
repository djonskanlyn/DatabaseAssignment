// FAQs

var faqs = document.getElementsByClassName("accordion"); // declare variable of all elements in accordion class
var i; // initialise empty variable

for (i = 0; i < faqs.length; i++) { // loop over elements stired in faqs
  faqs[i].addEventListener("click", function() { // listen out for click event
    this.classList.toggle("active"); // toggle between active / "non-active"
    var panel = this.nextElementSibling; // defines the panel as the very next element
    if (panel.style.maxHeight) { // if panel open;
      panel.style.maxHeight = null; // close it
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px"; // otherwise, set height to minimum required to view contents
    }
  });
}