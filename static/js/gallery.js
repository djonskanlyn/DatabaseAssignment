// Gallery

let slideIndex = 1; // sets slide index to first slide
showSlides(slideIndex); // calls the first slide when page loads

// function for next/previous buttons (n can be positive or negative)
function plusSlides(n) {
  showSlides(slideIndex += n); 
}

// function to dsiplay selected thumb
function currentSlide(n) {
  showSlides(slideIndex = n);
}


function showSlides(n) {
  let i;

  let slides        = document.getElementsByClassName("galleryPics"); // define slides as the galleryPics class
  let thumbs        = document.getElementsByClassName("thumb"); // define thumbs as the thumb class
  let captions      = document.getElementById("caption"); // define captionst as the caption class

  // ensures slideshow is cyclical if n is greater than number of slides
  if (n > slides.length) {
    slideIndex = 1;
    }

  // ensures slideshow is cyclical if n is less than number of slides
  if (n < 1) {
    slideIndex = (slides.length);
    }
  
  // sets slides to hidden
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // removes active class from thumbs
  for (i = 0; i < thumbs.length; i++) {
    thumbs[i].className = thumbs[i].className.replace("active", "");
  }

  slides[slideIndex-1].style.display = "block"; // display correct slide
  
  thumbs[slideIndex-1].className += "active"; // display correct thumb
  
  captions.innerHTML = thumbs[slideIndex-1].alt; // updates caption
}