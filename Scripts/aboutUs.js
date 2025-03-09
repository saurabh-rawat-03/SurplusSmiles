// Animated Statistics
const stats = document.querySelectorAll('.stat h3');

const animateStats = () => {
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-count');
    let count = 0;
    const increment = target / 100;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        stat.textContent = Math.ceil(count);
        setTimeout(updateCount, 20);
      } else {
        stat.textContent = target;
      }
    };

    updateCount();
  });
};

// Trigger animation when the statistics section is in view
const statisticsSection = document.querySelector('.statistics');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.disconnect();
    }
  });
});

observer.observe(statisticsSection);

// Initialize Swiper for Testimonials Carousel
const swiper = new Swiper('.swiper-container', {
    loop: true, // Enable infinite loop
    autoplay: {
      delay: 3000, // Delay between slides (3 seconds)
      disableOnInteraction: false, // Continue autoplay even when user interacts with the carousel
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });