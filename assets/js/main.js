/* Sagar Ghimire - portfolio v2 */
(function () {
  'use strict';

  /* ---------- nav: scrolled state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu && toggle && menu.classList.contains('open')) {
      menu.classList.remove('open'); toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.focus();
    }
  });
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    if (link.getAttribute('href') === (location.pathname.split('/').pop() || 'index.html')) {
      link.classList.add('active'); link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- count-up stats ---------- */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var started = false;
    function run(observer) {
      if (started) return; started = true;
      var t0 = null, dur = 1300;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        p = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * p) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      if (observer) observer.unobserve(el);
    }
    if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) run(so); });
      }, { threshold: 0.4 });
      so.observe(el);
    } else { run(null); }
  });

  /* Copy an email without claiming success when clipboard access fails. */
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    var originalLabel = button.textContent;
    var resetTimer;

    button.addEventListener('click', async function () {
      var text = button.getAttribute('data-copy');
      var copied = false;
      clearTimeout(resetTimer);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch (error) {
          // Insecure contexts and denied permissions use the fallback below.
        }
      }

      if (!copied) {
        var field = document.createElement('textarea');
        var previousFocus = document.activeElement;
        field.value = text;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        try {
          copied = document.execCommand('copy');
        } catch (error) {
          copied = false;
        }
        field.remove();
        if (previousFocus) previousFocus.focus();
      }

      button.textContent = copied ? 'Email copied ✓' : 'Please select and copy the email';
      button.classList.toggle('done', copied);
      resetTimer = setTimeout(function () {
        button.textContent = originalLabel;
        button.classList.remove('done');
      }, 2500);
    });
  });

  /* Project enquiry: a local draft, never a pretend form submission. */
  var enquiry = document.querySelector('.enquiry-form');
  if (enquiry) enquiry.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = enquiry.elements.name.value.trim();
    var type = enquiry.elements.type.value;
    var message = enquiry.elements.message.value.trim();
    if (!message) { enquiry.elements.message.setCustomValidity('Tell me a little about the project.'); enquiry.elements.message.reportValidity(); return; }
    var body = 'Hi Sagar,\n\n' + message + (name ? '\n\nThanks,\n' + name : '');
    var draft = enquiry.querySelector('.draft-fallback');
    draft.hidden = false;
    enquiry.querySelector('#enquiry-draft').value = 'Subject: Project enquiry — ' + type + '\n\n' + body;
    enquiry.querySelector('.draft-status').textContent = 'Your draft is ready. Continue in your email app, or copy the message below.';
    window.location.href = 'mailto:sagar.code.88@gmail.com?subject=' + encodeURIComponent('Project enquiry — ' + type) + '&body=' + encodeURIComponent(body);
  });
  if (enquiry) {
    enquiry.elements.message.addEventListener('input', function () {
      this.setCustomValidity('');
    });
    enquiry.hidden = false;
  }

  document.addEventListener('keydown', function (event) {
    var connect = document.querySelector('.quick-connect');
    if (event.key === 'Escape' && connect && connect.open) {
      connect.open = false; connect.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', function (event) {
    var connect = document.querySelector('.quick-connect');
    if (connect && connect.open && !connect.contains(event.target)) connect.open = false;
  });

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
