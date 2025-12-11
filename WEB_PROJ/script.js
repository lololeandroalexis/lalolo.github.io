// script.js - Handles donation button clicks and slideshow functionality

// Slideshow variables and functions
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}

// Wait for the DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  const donateButtons = document.querySelectorAll('.donate-btn');
  const receiptModal = document.getElementById('receiptModal');
  const cancelConfirmModal = document.getElementById('cancelConfirmModal');
  const receiptBody = document.getElementById('receiptBody');
  const proceedDonateBtn = document.getElementById('proceedDonateBtn');
  const cancelDonateBtn = document.getElementById('cancelDonateBtn');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmReturnBtn = document.getElementById('confirmReturnBtn');

  let currentDonation = null;

  function openModal(modal) {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  donateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const seed = btn.getAttribute('data-seed');
      const price = btn.getAttribute('data-price');
      currentDonation = { seed, price };
      // Build receipt body with a "where donations go" short description
      const whereGoes = {
        'Mangrove Seeds': 'Restoration of coastal mangrove belts to prevent erosion and support fisheries.',
        'Rainforest Seeds': 'Replanting degraded rainforest patches and supporting local biodiversity.',
        'Grassland Seeds': 'Restoring grassland corridors for wildlife and pollinators.',
        'Urban Garden Seeds': 'Funding community gardens in cities to improve air quality and local food.',
        'Narra Seeds': 'Combating desertification and restoring soil health in arid zones.',
        'Alpine Seeds': 'Supporting mountain ecosystem recovery and erosion control.'
      };
      receiptBody.innerHTML = `
        <p><strong>Seed:</strong> ${seed}</p>
        <p><strong>Amount:</strong> $${price}</p>
        <p><strong>Where donation goes:</strong> ${whereGoes[seed] || 'Support for local restoration projects.'}</p>
      `;
      openModal(receiptModal);
    });
  });

  proceedDonateBtn.addEventListener('click', () => {
    closeModal(receiptModal);
    // final pop-up message
    alert('Thank you for donating.');
    // Optionally, here you would call your backend / payment API
    currentDonation = null;
  });

  cancelDonateBtn.addEventListener('click', () => {
    // show second confirmation modal
    closeModal(receiptModal);
    openModal(cancelConfirmModal);
  });

  confirmCancelBtn.addEventListener('click', () => {
    closeModal(cancelConfirmModal);
    // final cancellation message (kept simple)
    alert('Donation canceled.');
    currentDonation = null;
  });

  confirmReturnBtn.addEventListener('click', () => {
    closeModal(cancelConfirmModal);
    // proceed as donation (thank you)
    alert('Thank you for donating.');
    currentDonation = null;
  });

  // Close modals when clicking outside the content
  [receiptModal, cancelConfirmModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });
});
