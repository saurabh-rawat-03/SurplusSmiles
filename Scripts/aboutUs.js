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

// Duplicate testimonial cards for seamless looping
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonials = testimonialsTrack.querySelectorAll('.testimonial-card');

// Clone the cards and append them to the track
testimonials.forEach(card => {
    const clone = card.cloneNode(true);
    testimonialsTrack.appendChild(clone);
});