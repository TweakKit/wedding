/* ==========================================
   HERO SLIDER
   ========================================== */
const heroSlider = {
  slides: document.querySelectorAll('.hero-slide'),
  counter: document.getElementById('heroCounter'),
  current: 0,
  total: 0,
  interval: null,
  delay: 5000,

  init() {
    this.total = this.slides.length;
    if (this.total === 0) return;
    this.startAutoPlay();
    document.getElementById('heroNext').addEventListener('click', () => this.next());
    document.getElementById('heroPrev').addEventListener('click', () => this.prev());
  },

  goTo(index) {
    this.slides[this.current].classList.remove('active');
    this.current = (index + this.total) % this.total;
    this.slides[this.current].classList.add('active');
    this.updateCounter();
  },

  next() {
    this.goTo(this.current + 1);
    this.resetAutoPlay();
  },

  prev() {
    this.goTo(this.current - 1);
    this.resetAutoPlay();
  },

  updateCounter() {
    const num = String(this.current + 1).padStart(2, '0');
    const total = String(this.total).padStart(2, '0');
    this.counter.textContent = `${num} of ${total}`;
  },

  startAutoPlay() {
    this.interval = setInterval(() => this.goTo(this.current + 1), this.delay);
  },

  resetAutoPlay() {
    clearInterval(this.interval);
    this.startAutoPlay();
  }
};

/* ==========================================
   MENU TOGGLE
   ========================================== */
const menu = {
  overlay: document.getElementById('menuOverlay'),
  openBtn: document.getElementById('menuToggle'),
  closeBtn: document.getElementById('menuClose'),

  init() {
    this.openBtn.addEventListener('click', () => this.open());
    this.closeBtn.addEventListener('click', () => this.close());

    // Close menu when clicking a link
    this.overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });
  },

  open() {
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/* ==========================================
   HEADER SCROLL EFFECT
   ========================================== */
const header = {
  el: document.querySelector('.header'),

  init() {
    window.addEventListener('scroll', () => this.onScroll());
  },

  onScroll() {
    if (window.scrollY > 100) {
      this.el.classList.add('scrolled');
    } else {
      this.el.classList.remove('scrolled');
    }
  }
};

/* ==========================================
   LIGHTBOX
   ========================================== */
const lightbox = {
  el: document.getElementById('lightbox'),
  img: document.getElementById('lightboxImg'),
  items: [],
  current: 0,

  init() {
    // Support both real images and placeholder divs
    this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.open(index));
    });

    document.getElementById('lightboxClose').addEventListener('click', () => this.close());
    document.getElementById('lightboxNext').addEventListener('click', () => this.next());
    document.getElementById('lightboxPrev').addEventListener('click', () => this.prev());

    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.el.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });
  },

  showItem(index) {
    const item = this.galleryItems[index];
    const img = item.querySelector('img');
    const placeholder = item.querySelector('.placeholder-img');

    if (img) {
      this.img.src = img.src;
      this.img.alt = img.alt;
      this.img.style.display = 'block';
    } else if (placeholder) {
      // For placeholders, create a canvas-based image
      const label = placeholder.getAttribute('data-label') || 'Photo';
      const style = getComputedStyle(placeholder);
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 800, 600);
      grad.addColorStop(0, '#a08872');
      grad.addColorStop(1, '#6b5d50');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 800, 600);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '32px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 400, 300);
      this.img.src = canvas.toDataURL();
      this.img.alt = label;
      this.img.style.display = 'block';
    }
  },

  open(index) {
    this.current = index;
    this.showItem(index);
    this.el.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.el.classList.remove('active');
    document.body.style.overflow = '';
  },

  next() {
    this.current = (this.current + 1) % this.galleryItems.length;
    this.showItem(this.current);
  },

  prev() {
    this.current = (this.current - 1 + this.galleryItems.length) % this.galleryItems.length;
    this.showItem(this.current);
  }
};

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */
const scrollAnimations = {
  init() {
    // Add fade-in class to animatable elements
    const selectors = [
      '.section-label',
      '.section-title',
      '.section-description',
      '.featured-image',
      '.featured-text',
      '.gallery-item',
      '.video-item',
      '.story-text',
      '.story-image',
      '.nav-link-item',
      '.contact-info',
      '.btn'
    ];

    document.querySelectorAll(selectors.join(',')).forEach(el => {
      el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }
};

/* ==========================================
   TO TOP BUTTON
   ========================================== */
const toTop = {
  init() {
    document.getElementById('toTop').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

/* ==========================================
   INIT
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  heroSlider.init();
  menu.init();
  header.init();
  lightbox.init();
  scrollAnimations.init();
  toTop.init();
});
