    // Progress bar animation
    window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".bar").forEach((bar) => {
    const fill = bar.querySelector(".bar-fill");
    const value = bar.querySelector(".progress-value");
    const sweep = fill.querySelector('.sweep');
    const target = +bar.getAttribute("data-progress");
    let current = 0;

    function animateBar() {
      if (current <= target) {
        fill.style.width = `${current}%`;
        value.textContent = `${Math.round(current)}%`;
        // Hide sweep if under 20%
        if (sweep) {
          sweep.style.display = current >= 20 ? 'block' : 'none';
        }
        current += 1;
        requestAnimationFrame(animateBar);
      } else {
        fill.style.width = `${target}%`;
        value.textContent = `${target}%`;
        // Hide sweep if under 20%
        if (sweep) {
          sweep.style.display = target >= 20 ? 'block' : 'none';
        }
        // 100% rounding (from previous answer)
        if (target >= 100) {
          fill.classList.add('full');
        } else {
          fill.classList.remove('full');
        }
      }
    }
    animateBar();
  });
});



    // Hamburger + Mobile Nav
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeX = document.querySelector('.close-x');
    const dropdownBtn = document.querySelector('.mobile-dropdown-btn');
    const mobileDropdown = document.querySelector('.mobile-dropdown');

    function openMenu() {
      hamburger.classList.add('hide');
      mobileNav.classList.add('open');
      mobileNav.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent scrolling behind menu
    }
    function closeMenu() {
      hamburger.classList.remove('hide');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', openMenu);
    closeX.addEventListener('click', closeMenu);

    // Close menu on nav link click (mobile only)
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Books dropdown (mobile)
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = mobileDropdown.classList.toggle('open');
      dropdownBtn.setAttribute('aria-expanded', expanded);
    });

    // Close dropdown when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (mobileDropdown.classList.contains('open')) {
        if (!mobileDropdown.contains(e.target)) {
          mobileDropdown.classList.remove('open');
          dropdownBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Optional: ESC closes mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });

    // Fade-out before navigation
document.querySelectorAll('a').forEach(link => {
  // Only intercept local (same-site, non-anchor) links
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (
      href &&
      !href.startsWith('http') && // not external
      !href.startsWith('#') &&    // not an anchor
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !this.hasAttribute('download')
    ) {
      e.preventDefault();
      const overlay = document.querySelector('.overlay');
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 600); // match CSS transition duration
    }
  });
});

    