// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
 // Carousel Functionality
const carouselContainer = document.querySelector('.carousel-container');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const totalSlides = carouselSlides.length;

// Function to move to a specific slide
function moveToSlide(index) {
    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }
    carouselContainer.style.transform = `translateX(${-index * 100}%)`;
    currentIndex = index;
}

// Automatic sliding
let autoSlideInterval = setInterval(() => {
    moveToSlide(currentIndex + 1);
}, 3500);

// Pause auto-sliding on hover
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 3000);
});

// Manual navigation
prevBtn.addEventListener('click', () => {
    moveToSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    moveToSlide(currentIndex + 1);
});
  
  // Map Initialization
  const map = L.map('map-container').setView([28.5937, 78.5629], 5); // Centered on India
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);
  
  // Add markers for restaurants and NGOs
  const locations = [
    { name: 'Headquarter', coords: [30.400495710175814, 78.07904923286792] }, // Mumbai
    // { name: 'NGO 1', coords: [28.7041, 77.1025] }, // Delhi
    // { name: 'Restaurant 2', coords: [12.9716, 77.5946] }, // Bangalore
  ];
  
  locations.forEach(location => {
    L.marker(location.coords).addTo(map)
      .bindPopup(location.name);
  });


  // Prevent the user from going back to the previous page
  history.pushState(null, document.title, location.href);
  window.addEventListener('popstate', function (event) {
      history.pushState(null, document.title, location.href);
  });