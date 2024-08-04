// Favourites

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const detailsRow = this.closest('tr').nextElementSibling; // The details row
            if (detailsRow.style.display === 'none') {
                detailsRow.style.display = ''; // Show details
                this.innerHTML = '&#8722;'; // Change icon to minus
            } else {
                detailsRow.style.display = 'none'; // Hide details
                this.innerHTML = '&#43;'; // Change icon to plus
            }
        });
    });
});