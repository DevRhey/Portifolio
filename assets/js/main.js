/**
 * MODERN PORTFOLIO - INTERACTIVE FUNCTIONALITY
 * Professional JavaScript with modern ES6+ features
 */

(function() {
  'use strict';

  // ========== CONFIGURATION ==========
  const CONFIG = {
    formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Obtenha seu ID em https://formspree.io
    animationDelay: 100,
    scrollOffset: 80,
    navbarScrollThreshold: 100,
  };

  // ========== UTILITY FUNCTIONS ==========
  const Utils = {
    // Check if user prefers reduced motion
    prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Debounce function for performance
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    // Check if element is in viewport
    isInViewport: (element, offset = 0) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= 0
      );
    },

    // Validate email
    isValidEmail: (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  };

  // ========== NAVBAR ==========
  class Navbar {
    constructor() {
      this.navbar = document.getElementById('navbar');
      this.navToggle = document.getElementById('navToggle');
      this.navMenu = document.getElementById('navMenu');
      this.navLinks = document.querySelectorAll('.nav-link');
      this.lastScrollY = window.scrollY;
      
      if (!this.navbar) return;
      this.init();
    }

    init() {
      this.setupScrollBehavior();
      this.setupMobileMenu();
      this.setupSmoothScroll();
      this.setupScrollSpy();
    }

    setupScrollBehavior() {
      const handleScroll = Utils.throttle(() => {
        const currentScrollY = window.scrollY;

        // Add scrolled class
        if (currentScrollY > 50) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > CONFIG.navbarScrollThreshold) {
          if (currentScrollY > this.lastScrollY && !this.navMenu.classList.contains('active')) {
            this.navbar.classList.add('hidden');
          } else {
            this.navbar.classList.remove('hidden');
          }
        }

        this.lastScrollY = currentScrollY;
      }, 100);

      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupMobileMenu() {
      if (!this.navToggle) return;

      const toggleMenu = () => {
        const isOpen = this.navMenu.classList.contains('active');
        
        this.navMenu.classList.toggle('active');
        this.navToggle.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = isOpen ? '' : 'hidden';
      };

      this.navToggle.addEventListener('click', toggleMenu);

      // Close menu when clicking a link
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (this.navMenu.classList.contains('active')) {
            toggleMenu();
          }
        });
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    }

    setupSmoothScroll() {
      this.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (!href || !href.startsWith('#')) return;

          e.preventDefault();
          const targetId = href.slice(1);
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
            const offsetTop = targetSection.offsetTop - CONFIG.scrollOffset;
            const behavior = Utils.prefersReducedMotion() ? 'auto' : 'smooth';

            window.scrollTo({
              top: offsetTop,
              behavior: behavior
            });

            // Update URL without jumping
            history.pushState(null, null, href);
          }
        });
      });
    }

    setupScrollSpy() {
      if (!('IntersectionObserver' in window)) return;

      const sections = Array.from(this.navLinks)
        .map(link => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            return document.querySelector(href);
          }
          return null;
        })
        .filter(Boolean);

      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            this.navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
              } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(section => observer.observe(section));
    }
  }

  // ========== SCROLL ANIMATIONS ==========
  class ScrollAnimations {
    constructor() {
      this.animatedElements = document.querySelectorAll('[data-animate]');
      if (!this.animatedElements.length) return;
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window && !Utils.prefersReducedMotion()) {
        this.setupIntersectionObserver();
      } else {
        // Fallback: show all elements
        this.animatedElements.forEach(el => el.classList.add('animated'));
      }
    }

    setupIntersectionObserver() {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animated');
            }, index * CONFIG.animationDelay);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.animatedElements.forEach(el => observer.observe(el));
    }
  }

  // ========== PROJECTS ==========
  class ProjectsManager {
    constructor() {
      this.grid = document.getElementById('projectsGrid');
      this.modal = document.getElementById('projectModal');
      this.projects = [];
      
      if (!this.grid || !this.modal) return;
      this.init();
    }

    async init() {
      await this.loadProjects();
      this.setupModal();
    }

    async loadProjects() {
      try {
        const response = await fetch('assets/data/projects.json');
        if (!response.ok) throw new Error('Failed to load projects');
        
        this.projects = await response.json();
        this.renderProjects();
      } catch (error) {
        console.error('Error loading projects:', error);
        this.grid.innerHTML = `
          <div class="error-message">
            <p>Não foi possível carregar os projetos. Tente novamente mais tarde.</p>
          </div>
        `;
      }
    }

    renderProjects() {
      this.grid.innerHTML = '';

      this.projects.forEach((project, index) => {
        const card = this.createProjectCard(project, index);
        this.grid.appendChild(card);
      });
    }

    createProjectCard(project, index) {
      const article = document.createElement('article');
      article.className = 'project-card';
      article.setAttribute('data-animate', '');
      article.setAttribute('role', 'listitem');
      article.style.transitionDelay = `${index * 0.1}s`;

      const image = project.image || 'assets/img/header-banner.svg';
      
      article.innerHTML = `
        <div class="project-image">
          <img src="${image}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.short}</p>
          <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-footer">
            <button class="project-link" data-project-id="${project.id}">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M10 16L16 10M10 16L4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Ver detalhes</span>
            </button>
          </div>
        </div>
      `;

      // Click event
      const button = article.querySelector('[data-project-id]');
      button.addEventListener('click', () => this.openModal(project));

      return article;
    }

    setupModal() {
      const closeBtn = this.modal.querySelector('.modal-close');
      const overlay = this.modal.querySelector('.modal-overlay');

      const closeModal = () => {
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      closeBtn?.addEventListener('click', closeModal);
      overlay?.addEventListener('click', closeModal);

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.getAttribute('aria-hidden') === 'false') {
          closeModal();
        }
      });
    }

    openModal(project) {
      const title = this.modal.querySelector('#modalTitle');
      const description = this.modal.querySelector('#modalDescription');
      const tech = this.modal.querySelector('#modalTech');
      const image = this.modal.querySelector('#modalImage');
      const features = this.modal.querySelector('#modalFeatures');
      const footer = this.modal.querySelector('#modalFooter');

      // Update content
      if (title) title.textContent = project.title;
      if (description) description.textContent = project.details;
      
      if (tech) {
        tech.innerHTML = project.tech.map(t => 
          `<span class="tech-tag">${t}</span>`
        ).join('');
      }

      if (image) {
        const img = project.image || 'assets/img/header-banner.svg';
        image.innerHTML = `<img src="${img}" alt="${project.title}">`;
      }

      // Features (if available)
      if (features && project.features) {
        features.innerHTML = `
          <h4>Funcionalidades</h4>
          <ul>
            ${project.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
        `;
      }

      // Links (if available)
      if (footer) {
        footer.innerHTML = '';
        if (project.github) {
          footer.innerHTML += `
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15.83c-5 1.67-5-2.5-7-3M14.5 18.33V15.5c0-1.08-.33-2-1-2.5 3.33-.37 6.83-1.67 6.83-7.5 0-1.5-.54-2.79-1.41-3.76.14-.88.13-2.27-.41-3.74 0 0-1.16-.38-3.75 1.48a12.82 12.82 0 0 0-6.67 0C5.59-.62 4.43-.24 4.43-.24c-.54 1.47-.55 2.86-.41 3.74A5.43 5.43 0 0 0 2.61 7.26c0 5.79 3.5 7.13 6.83 7.5-.67.5-1 1.42-1 2.5v2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>GitHub</span>
            </a>
          `;
        }
        if (project.demo) {
          footer.innerHTML += `
            <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>Ver Demo</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 10.83L10 15.83L5 10.83M10 4.17V15.83" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          `;
        }
      }

      // Show modal
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const closeButton = this.modal.querySelector('.modal-close');
      if (closeButton) closeButton.focus();
    }
  }

  // ========== CONTACT FORM ==========
  class ContactForm {
    constructor() {
      this.form = document.getElementById('contactForm');
      this.status = document.getElementById('formStatus');
      
      if (!this.form) return;
      this.init();
    }

    init() {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      
      // Real-time validation
      const inputs = this.form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group?.classList.contains('error')) {
            this.validateField(input);
          }
        });
      });
    }

    validateField(field) {
      const group = field.closest('.form-group');
      const error = group?.querySelector('.form-error');
      let isValid = true;
      let message = '';

      // Check if empty
      if (!field.value.trim()) {
        isValid = false;
        message = 'Este campo é obrigatório';
      }
      // Email validation
      else if (field.type === 'email' && !Utils.isValidEmail(field.value)) {
        isValid = false;
        message = 'Por favor, insira um email válido';
      }
      // Min length for message
      else if (field.name === 'message' && field.value.trim().length < 10) {
        isValid = false;
        message = 'A mensagem deve ter pelo menos 10 caracteres';
      }

      if (group) {
        group.classList.toggle('error', !isValid);
        if (error) error.textContent = message;
      }

      return isValid;
    }

    validateForm() {
      const inputs = this.form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    }

    showStatus(message, type = 'success') {
      this.status.textContent = message;
      this.status.className = `form-status ${type}`;
      
      // Auto-hide success message after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          this.status.className = 'form-status';
        }, 5000);
      }
    }

    async handleSubmit(e) {
      e.preventDefault();

      // Validate
      if (!this.validateForm()) {
        this.showStatus('Por favor, corrija os erros no formulário', 'error');
        return;
      }

      // Get form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());

      // If endpoint is configured, send real request
      if (CONFIG.formEndpoint) {
        try {
          const response = await fetch(CONFIG.formEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) throw new Error('Network response was not ok');

          this.showStatus('✓ Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
          this.form.reset();
          
          // Remove error states
          this.form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
          });
        } catch (error) {
          console.error('Form submission error:', error);
          this.showStatus('✗ Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
        }
      } else {
        // Simulate submission for development
        this.showStatus('⚠ Modo de desenvolvimento: Mensagem não enviada. Configure o endpoint.', 'success');
        console.log('Form data:', data);
        
        setTimeout(() => {
          this.form.reset();
          this.form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
          });
        }, 1000);
      }
    }
  }

  // ========== INITIALIZATION ==========
  function init() {
    // Initialize all components
    new Navbar();
    new ScrollAnimations();
    new ProjectsManager();
    new ContactForm();

    // SENAI Modal
    class SenaiModal {
      constructor() {
        this.badge = document.getElementById('senaiBadge');
        this.modal = document.getElementById('senaiModal');
        if (!this.badge || !this.modal) return;
        this.init();
      }

      init() {
        const closeBtn = this.modal.querySelector('.modal-close');
        const overlay = this.modal.querySelector('.modal-overlay');

        const openModal = () => {
          this.modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          const cb = this.modal.querySelector('.modal-close');
          cb?.focus();
        };

        const closeModal = () => {
          this.modal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
          this.badge?.focus();
        };

        this.badge.addEventListener('click', openModal);
        closeBtn?.addEventListener('click', closeModal);
        overlay?.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
          }
        });
      }
    }

    new SenaiModal();

    // Log initialization
    console.log('%c Portfolio Loaded Successfully ', 'background: #f97316; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();