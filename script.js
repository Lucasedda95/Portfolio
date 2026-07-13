document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navigation Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link-item');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // 3. Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // 4. Hero Section Typing Effect
  const words = ['Experiences', 'Interfaces', 'Dashboards', 'Websites'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingTextSpan = document.getElementById('typing-text');
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 70 : 150;
    
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1500; // Hold word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();

  // 5. Portfolio Filtering Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Manage active state
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const filterValue = e.target.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Add a smooth scale/fade effect
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  // Set initial project transition styling for smooth filters
  projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, border-color 0.4s ease, box-shadow 0.4s ease';
  });

  // 6. Contact Form submission with simulation
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('contact-form-status');
  const submitBtn = document.getElementById('contact-submit-btn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable button, show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending Message...';
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    // Simulate network delay
    setTimeout(() => {
      // Check validation (basic check)
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (name && email && message) {
        formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        formStatus.textContent = 'Oops! Please fill in all fields correctly.';
        formStatus.classList.add('error');
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }, 1800);
  });

  // 7. Scroll Reveal Animation using IntersectionObserver
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, no need to track it further
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Set reveal CSS directly and track elements
  const elementsToReveal = [
    ...document.querySelectorAll('section .section-header'),
    ...document.querySelectorAll('.about-text'),
    ...document.querySelectorAll('.about-card'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.contact-info'),
    ...document.querySelectorAll('.contact-form')
  ];

  // Inject reveal styles directly
  const style = document.createElement('style');
  style.textContent = `
    .reveal-el {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  elementsToReveal.forEach(el => {
    el.classList.add('reveal-el');
    revealObserver.observe(el);
  });

});
