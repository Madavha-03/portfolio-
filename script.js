// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── ACTIVE NAV LINK ON SCROLL ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 120; // Offset for nav bar
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Run on load

  // ── SMOOTH SCROLLING FOR NAV LINKS ──
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70; // Account for nav height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ── SCROLL REVEAL ANIMATION ──
  const reveals = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  
  reveals.forEach(el => revealObserver.observe(el));

  // ── CONTACT FORM SUBMIT ──
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('successMsg');
  
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      const name = document.getElementById('fName')?.value.trim() || '';
      const email = document.getElementById('fEmail')?.value.trim() || '';
      const subject = document.getElementById('fSubject')?.value.trim() || '';
      const message = document.getElementById('fMessage')?.value.trim() || '';
      
      if (!name || !email || !message) {
        alert('Please fill in your name, email and message.');
        return;
      }
      
      // Show success message
      if (successMsg) {
        successMsg.style.display = 'block';
        
        // Clear form
        document.getElementById('fName').value = '';
        document.getElementById('fEmail').value = '';
        document.getElementById('fSubject').value = '';
        document.getElementById('fMessage').value = '';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    });
  }

  // ── ADD PHOTO UPLOAD FUNCTIONALITY (OPTIONAL) ──
  const photoPlaceholder = document.querySelector('.hero-photo-placeholder');
  if (photoPlaceholder) {
    photoPlaceholder.addEventListener('click', function() {
      // Create file input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      
      fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            // Create img element
            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = 'Madavha Livhuwani';
            img.className = 'hero-photo';
            
            // Replace placeholder with image
            photoPlaceholder.parentNode.replaceChild(img, photoPlaceholder);
          };
          reader.readAsDataURL(file);
        }
      };
      
      fileInput.click();
    });
  }
  
});