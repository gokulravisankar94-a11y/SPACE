/* =========================================================
   SPACE EXPLORER - script.js
   Sections:
   1. Data (planets, facts, quiz)
   2. Helpers
   3. Animated starfield (canvas)
   4. Navigation
   5. Planet cards + modal
   6. Animated solar system
   7. Random space facts
   8. Space quiz
   9. Scroll reveal + start-up
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. DATA
     --------------------------------------------------------- */

  // ring: adds the ring illustration (Saturn, Uranus).
  // orbit / period / size: visual settings for the (not to scale) solar system.
  const PLANETS = [
    {
      id: 'mercury', name: 'Mercury', tagline: 'The swift messenger',
      short: 'The smallest planet and the closest to the Sun, with extreme temperature swings.',
      description: 'Mercury is a small, cratered, rocky world that races around the Sun faster than any other planet. With almost no atmosphere to trap heat, its sunlit side bakes while its night side freezes.',
      diameter: '4,879 km', distance: '57.9 million km (0.39 AU)', orbitalPeriod: '88 Earth days',
      day: '59 Earth days (one rotation)', moons: 'None', temp: '-180 to 430 \u00B0C',
      facts: [
        'Mercury is the smallest planet in the solar system, only slightly larger than Earth\'s Moon.',
        'Water ice has been found in permanently shadowed craters near its poles, even though it is the closest planet to the Sun.',
        'One Mercury year (88 Earth days) is shorter than one Mercury solar day (about 176 Earth days).'
      ],
      orbit: 17, period: 7, size: 10
    },
    {
      id: 'venus', name: 'Venus', tagline: 'The veiled furnace',
      short: 'A cloud-wrapped world with a crushing atmosphere and the hottest surface of all.',
      description: 'Venus is similar to Earth in size, but its thick carbon dioxide atmosphere creates a runaway greenhouse effect. Its surface is hot enough to melt lead, and its clouds contain sulfuric acid.',
      diameter: '12,104 km', distance: '108.2 million km (0.72 AU)', orbitalPeriod: '224.7 Earth days',
      day: '243 Earth days (one rotation)', moons: 'None', temp: 'about 465 \u00B0C',
      facts: [
        'Venus is hotter than Mercury, making it the hottest planet in the solar system.',
        'A day on Venus (one rotation) is longer than its year.',
        'Venus spins backwards compared with most planets, so the Sun rises in the west.'
      ],
      orbit: 25, period: 11, size: 16
    },
    {
      id: 'earth', name: 'Earth', tagline: 'The blue marble',
      short: 'Our home, and the only place we know of with life and liquid oceans on its surface.',
      description: 'Earth is the third planet from the Sun and the only world known to host life. Liquid water covers about 71% of its surface, and a protective atmosphere and magnetic field shield living things.',
      diameter: '12,742 km', distance: '149.6 million km (1 AU)', orbitalPeriod: '365.25 days',
      day: '24 hours', moons: '1 (the Moon)', temp: 'average about 15 \u00B0C',
      facts: [
        'About 71% of Earth\'s surface is covered by water.',
        'Earth is not a perfect sphere: it bulges slightly at the equator because it spins.',
        'The Moon is drifting away from Earth by about 3.8 centimetres every year.'
      ],
      orbit: 34, period: 15, size: 17
    },
    {
      id: 'mars', name: 'Mars', tagline: 'The red planet',
      short: 'A cold, dusty desert world with giant volcanoes and the biggest canyon system known.',
      description: 'Mars is a cold desert planet whose rusty iron-rich dust gives it a red colour. It has polar ice caps, ancient dry river valleys, and robots exploring its surface in search of signs of past life.',
      diameter: '6,779 km', distance: '227.9 million km (1.52 AU)', orbitalPeriod: '687 Earth days',
      day: '24 h 37 min', moons: '2 (Phobos and Deimos)', temp: 'average about -65 \u00B0C',
      facts: [
        'Olympus Mons on Mars is the tallest known volcano in the solar system, about 22 km high, roughly 2.5 times the height of Mount Everest.',
        'Valles Marineris is a canyon system more than 4,000 km long.',
        'Sunsets on Mars look blue because of how fine dust scatters light.'
      ],
      orbit: 43, period: 20, size: 13
    },
    {
      id: 'jupiter', name: 'Jupiter', tagline: 'The giant king',
      short: 'The largest planet, a gas giant with powerful storms and dozens of moons.',
      description: 'Jupiter is a gas giant made mostly of hydrogen and helium. It is more than twice as massive as all the other planets combined, and its swirling bands hide some of the strongest storms in the solar system.',
      diameter: '139,820 km', distance: '778.5 million km (5.2 AU)', orbitalPeriod: '11.9 Earth years',
      day: 'about 10 hours', moons: '90+ known', temp: 'about -110 \u00B0C (cloud tops)',
      facts: [
        'The Great Red Spot is a giant storm wider than Earth that has been observed for well over a century.',
        'Jupiter\'s moon Ganymede is the largest moon in the solar system, bigger than the planet Mercury.',
        'Jupiter spins faster than any other planet, completing a rotation in about 10 hours.'
      ],
      orbit: 57, period: 32, size: 34
    },
    {
      id: 'saturn', name: 'Saturn', tagline: 'The ringed jewel',
      short: 'Famous for its spectacular rings made of countless pieces of ice and rock.',
      description: 'Saturn is a gas giant best known for its bright, wide ring system. Its rings are made mostly of water ice, and the planet is so light for its size that it would float in a big enough bathtub.',
      diameter: '116,460 km', distance: '1.43 billion km (9.58 AU)', orbitalPeriod: '29.4 Earth years',
      day: 'about 10.7 hours', moons: '270+ known', temp: 'about -140 \u00B0C (cloud tops)',
      facts: [
        'Saturn\'s average density is lower than water.',
        'The main rings stretch hundreds of thousands of kilometres across but are often only about ten metres thick.',
        'Saturn\'s moon Titan has a thick atmosphere and lakes of liquid methane and ethane.'
      ],
      orbit: 70, period: 44, size: 28, ring: true
    },
    {
      id: 'uranus', name: 'Uranus', tagline: 'The sideways ice giant',
      short: 'An icy blue-green giant that rolls around the Sun tilted on its side.',
      description: 'Uranus is an ice giant with a pale cyan colour from methane in its atmosphere. It is tipped over at about 98 degrees, so it seems to roll along its orbit and experiences extreme seasons.',
      diameter: '50,724 km', distance: '2.87 billion km (19.2 AU)', orbitalPeriod: '84 Earth years',
      day: 'about 17 hours', moons: '28+ known', temp: 'about -195 \u00B0C',
      facts: [
        'Uranus was the first planet discovered with a telescope, by William Herschel in 1781.',
        'Its axis is tilted about 98 degrees, so each pole gets roughly 42 years of sunlight followed by 42 years of darkness.',
        'Uranus has the coldest planetary atmosphere measured in the solar system, near -224 \u00B0C.'
      ],
      orbit: 83, period: 58, size: 20, ring: true
    },
    {
      id: 'neptune', name: 'Neptune', tagline: 'The windy deep blue',
      short: 'The most distant planet, a deep-blue ice giant with supersonic winds.',
      description: 'Neptune is the farthest known major planet from the Sun. Its deep blue colour and fierce storms make it a dynamic world, even though it receives very little sunlight.',
      diameter: '49,244 km', distance: '4.5 billion km (30.1 AU)', orbitalPeriod: '164.8 Earth years',
      day: 'about 16 hours', moons: '16 known', temp: 'about -200 \u00B0C',
      facts: [
        'Neptune was found in 1846 after mathematicians predicted its position from irregularities in Uranus\'s orbit.',
        'Its winds can reach roughly 2,000 km/h, among the fastest in the solar system.',
        'Only one spacecraft, Voyager 2 in 1989, has ever visited Neptune.'
      ],
      orbit: 96, period: 72, size: 19
    }
  ];

  const FACTS = [
    { tag: 'Venus', text: 'A day on Venus is longer than its year: it takes about 243 Earth days to rotate once but only about 225 to orbit the Sun.' },
    { tag: 'Sun', text: 'The Sun holds about 99.8% of all the mass in the solar system.' },
    { tag: 'Light', text: 'Sunlight takes about 8 minutes and 20 seconds to travel from the Sun to Earth.' },
    { tag: 'Mars', text: 'Olympus Mons on Mars is the tallest known volcano in the solar system, roughly two and a half times the height of Mount Everest.' },
    { tag: 'Saturn', text: 'Saturn is so light for its size that its average density is lower than that of water.' },
    { tag: 'Moon', text: 'There is no wind or weather on the Moon, so astronaut footprints there could last for millions of years.' },
    { tag: 'Universe', text: 'The observable universe is about 93 billion light-years across.' },
    { tag: 'Milky Way', text: 'Our Milky Way galaxy contains somewhere between 100 and 400 billion stars.' },
    { tag: 'Uranus', text: 'Uranus is tilted about 98 degrees, so it orbits the Sun almost on its side.' },
    { tag: 'Neptune', text: 'Winds on Neptune can reach about 2,000 kilometres per hour, some of the fastest in the solar system.' },
    { tag: 'Venus', text: 'Venus is the hottest planet, with a surface temperature of around 465 \u00B0C, even though Mercury is closer to the Sun.' },
    { tag: 'Sound', text: 'Space is almost a perfect vacuum, so sound cannot travel through it. Astronauts need radios to talk to one another.' },
    { tag: 'Mercury', text: 'Mercury has water ice in permanently shadowed craters at its poles, despite being the closest planet to the Sun.' },
    { tag: 'Voyager 1', text: 'Voyager 1, launched in 1977, entered interstellar space in 2012 and is now more than 24 billion kilometres from Earth.' },
    { tag: 'Jupiter', text: 'Jupiter\'s Great Red Spot is a storm wider than Earth that has been observed for well over 150 years.' },
    { tag: 'Saturn', text: 'Saturn has well over 200 known moons, more than any other planet in the solar system.' },
    { tag: 'Earth', text: 'Earth is not a perfect sphere. It bulges at the equator, making it about 43 km wider there than from pole to pole.' },
    { tag: 'Sun', text: 'The Sun is so large that about 1.3 million Earths could fit inside it.' },
    { tag: 'Moon', text: 'The Moon is slowly moving away from Earth at about 3.8 centimetres each year.' },
    { tag: 'Neutron stars', text: 'A teaspoon of neutron-star material would weigh billions of tons on Earth.' }
  ];

  const QUIZ = [
    { q: 'Which planet is the largest in our solar system?',
      options: ['Jupiter', 'Saturn', 'Neptune', 'Earth'], answer: 0,
      why: 'Jupiter is about 140,000 km across, more than 11 times the width of Earth.' },
    { q: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Mercury', 'Jupiter'], answer: 1,
      why: 'Iron-rich dust on Mars rusts, giving the surface its reddish colour.' },
    { q: 'Which planet has the hottest surface, at around 465 \u00B0C?',
      options: ['Mercury', 'Mars', 'Venus', 'Jupiter'], answer: 2,
      why: 'Venus\'s thick carbon dioxide atmosphere traps heat in a runaway greenhouse effect.' },
    { q: 'Which planet is famous for its bright, wide system of rings?',
      options: ['Mars', 'Saturn', 'Venus', 'Mercury'], answer: 1,
      why: 'Saturn\'s rings are made mostly of water ice and are the most visible in the solar system.' },
    { q: 'What is the closest star to Earth?',
      options: ['Proxima Centauri', 'Sirius', 'The Sun', 'Polaris'], answer: 2,
      why: 'The Sun is about 150 million km away. The next closest star, Proxima Centauri, is about 4.2 light-years away.' },
    { q: 'Which planet rotates on its side, tilted about 98 degrees?',
      options: ['Neptune', 'Saturn', 'Mars', 'Uranus'], answer: 3,
      why: 'Uranus is tipped over, so it rolls around the Sun rather than spinning upright.' },
    { q: 'About how long does sunlight take to reach Earth?',
      options: ['About 8 seconds', 'About 8 minutes', 'About 8 hours', 'About 8 days'], answer: 1,
      why: 'Light travels about 300,000 km every second, and the Sun is about 150 million km away.' },
    { q: 'What is the name of the galaxy that contains our solar system?',
      options: ['Andromeda', 'Triangulum', 'Whirlpool', 'Milky Way'], answer: 3,
      why: 'We live in the Milky Way, a spiral galaxy with hundreds of billions of stars.' },
    { q: 'Which planet is the farthest from the Sun?',
      options: ['Neptune', 'Uranus', 'Saturn', 'Jupiter'], answer: 0,
      why: 'Neptune orbits about 4.5 billion km from the Sun, roughly 30 times farther than Earth.' },
    { q: 'Who was the first person to walk on the Moon, in 1969?',
      options: ['Buzz Aldrin', 'Yuri Gagarin', 'Neil Armstrong', 'John Glenn'], answer: 2,
      why: 'Neil Armstrong stepped onto the Moon on 20 July 1969 during Apollo 11, followed by Buzz Aldrin.' }
  ];

  /* ---------------------------------------------------------
     2. HELPERS
     --------------------------------------------------------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const reducedMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  // Returns the HTML for a CSS-drawn planet illustration.
  function planetArt(p) {
    return '<span class="planet p-' + p.id + (p.ring ? ' ring' : '') + '"><span class="globe"></span></span>';
  }

  // Fisher-Yates shuffle (returns a new array)
  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ---------------------------------------------------------
     3. ANIMATED STARFIELD (canvas)
     --------------------------------------------------------- */
  function initStarfield() {
    const canvas = $('#starfield');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    if (!ctx) return; // no canvas support: the CSS background still looks fine

    const COLORS = ['255,255,255', '200,220,255', '170,240,255', '210,190,255'];
    let width = 0, height = 0, dpr = 1;
    let stars = [];
    let shooting = null;
    let nextShot = 4000;
    let last = 0;
    let rafId = 0;
    let resizeTimer = 0;

    function makeStar() {
      const depth = Math.random();                   // 0 = far away, 1 = close
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.3 + depth * 1.3,
        depth: 0.15 + depth * 0.85,
        base: 0.35 + Math.random() * 0.65,
        speed: 0.6 + Math.random() * 2.2,            // twinkle speed
        phase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Hundreds of stars, scaled to the screen size
      const count = Math.max(180, Math.min(520, Math.round((width * height) / 4200)));
      stars = Array.from({ length: count }, makeStar);
      if (reducedMotion.matches) draw(0, 0); // static picture
    }

    function draw(time, dt) {
      ctx.clearRect(0, 0, width, height);
      const scrollY = window.pageYOffset || 0;

      for (const s of stars) {
        if (dt) s.y += s.depth * 6 * dt;              // slow drift downwards
        if (s.y > height + 4) { s.y = -4; s.x = Math.random() * width; }

        // Parallax: closer stars move more as the page scrolls
        let y = (s.y - scrollY * s.depth * 0.12) % height;
        if (y < 0) y += height;

        const twinkle = 0.65 + 0.35 * Math.sin(time * 0.001 * s.speed + s.phase);
        const alpha = s.base * twinkle;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + s.color + ',' + alpha.toFixed(3) + ')';
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow around the biggest stars
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.fillStyle = 'rgba(' + s.color + ',' + (alpha * 0.16).toFixed(3) + ')';
          ctx.arc(s.x, y, s.r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (shooting) drawShootingStar(dt);
    }

    function drawShootingStar(dt) {
      const sh = shooting;
      sh.x += sh.vx * dt;
      sh.y += sh.vy * dt;
      sh.life -= dt;
      const a = Math.max(0, sh.life / sh.maxLife);
      const tx = sh.x - sh.vx * 0.12;
      const ty = sh.y - sh.vy * 0.12;
      const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
      grad.addColorStop(0, 'rgba(255,255,255,' + a + ')');
      grad.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sh.x, sh.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      if (sh.life <= 0) shooting = null;
    }

    function spawnShootingStar() {
      const fromLeft = Math.random() > 0.5;
      shooting = {
        x: fromLeft ? Math.random() * width * 0.4 : width * (0.6 + Math.random() * 0.4),
        y: Math.random() * height * 0.4,
        vx: (fromLeft ? 1 : -1) * (500 + Math.random() * 300),
        vy: 220 + Math.random() * 160,
        life: 0.9, maxLife: 0.9
      };
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05); // seconds, capped after tab switches
      last = now;
      nextShot -= dt * 1000;
      if (!shooting && nextShot <= 0) {
        spawnShootingStar();
        nextShot = 6000 + Math.random() * 8000;
      }
      draw(now, dt);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(rafId);
      if (reducedMotion.matches) { shooting = null; draw(0, 0); return; }
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    }

    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', start);
    // Static stars redraw on scroll when motion is reduced (for parallax)
    window.addEventListener('scroll', function () {
      if (reducedMotion.matches) draw(0, 0);
    }, { passive: true });

    resize();
    start();
  }

  /* ---------------------------------------------------------
     4. NAVIGATION
     --------------------------------------------------------- */
  function initNavigation() {
    const header = $('#siteHeader');
    const toggle = $('#navToggle');
    const menu = $('#navLinks');
    const links = $$('.nav-link');

    // Mobile menu open / close
    function setMenu(open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    links.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) setMenu(false); });

    // Solid header after scrolling
    function onScroll() { header.classList.toggle('scrolled', window.scrollY > 20); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Highlight the link of the section currently in view
    const sections = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
    function markActive(id) {
      links.forEach(function (a) {
        const on = a.getAttribute('href') === '#' + id;
        a.classList.toggle('active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) markActive(en.target.id); });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { obs.observe(s); });
    } else {
      markActive('home');
    }
  }

  /* ---------------------------------------------------------
     5. PLANET CARDS + MODAL
     --------------------------------------------------------- */
  const modal = $('#modal');
  let lastFocused = null;

  function buildPlanetCards() {
    const grid = $('#planetGrid');
    PLANETS.forEach(function (p) {
      const card = document.createElement('article');
      card.className = 'planet-card reveal accent-' + p.id;
      card.innerHTML =
        '<div class="planet-art">' + planetArt(p) + '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<p>' + p.short + '</p>' +
        '<button class="btn btn-primary btn-sm" type="button" aria-label="Explore ' + p.name + '">EXPLORE</button>';
      const btn = $('button', card);
      btn.addEventListener('click', function () { openModal(p.id, btn); });
      grid.appendChild(card);
    });
  }

  function openModal(id, trigger) {
    const p = PLANETS.find(function (x) { return x.id === id; });
    if (!p) return;
    lastFocused = trigger || document.activeElement;

    $('#modalArt').innerHTML = planetArt(p);
    $('#modalTagline').textContent = p.tagline;
    $('#modalTitle').textContent = p.name;
    $('#modalDesc').textContent = p.description;

    const stats = [
      ['Diameter', p.diameter],
      ['Distance from the Sun', p.distance],
      ['Orbital period', p.orbitalPeriod],
      ['Length of day', p.day],
      ['Moons', p.moons],
      ['Temperature', p.temp]
    ];
    $('#modalStats').innerHTML = stats.map(function (s) {
      return '<div class="stat"><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd></div>';
    }).join('');
    $('#modalFacts').innerHTML = p.facts.map(function (f) { return '<li>' + f + '</li>'; }).join('');

    modal.hidden = false;
    document.body.classList.add('no-scroll');
    $('.modal-panel', modal).scrollTop = 0;
    $('#modalClose').focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function initModal() {
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalBackdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') { closeModal(); return; }
      // Keep keyboard focus inside the dialog
      if (e.key === 'Tab') {
        const focusable = $$('button, [href]', modal).filter(function (el) { return !el.disabled; });
        if (!focusable.length) return;
        const first = focusable[0], lastEl = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------------------------------------------------
     6. ANIMATED SOLAR SYSTEM
     --------------------------------------------------------- */
  function buildSolarSystem() {
    const system = $('#system');
    const legend = $('#legend');

    let html = '<div class="sun" aria-hidden="true"></div>';
    PLANETS.forEach(function (p) {
      // Negative delay starts each planet at a different angle
      const delay = -(Math.random() * p.period).toFixed(2);
      html +=
        '<div class="orbit" style="--orbit:' + p.orbit + '%;--period:' + p.period + 's;--delay:' + delay + 's;">' +
          '<button class="body" type="button" style="--d:' + p.size + ';" title="' + p.name + '" aria-label="Explore ' + p.name + '" data-planet="' + p.id + '">' +
            planetArt(p) +
          '</button>' +
        '</div>';
    });
    system.innerHTML = html;

    // Clicking a planet in the animation opens its modal
    $$('.body', system).forEach(function (b) {
      b.addEventListener('click', function () { openModal(b.getAttribute('data-planet'), b); });
    });

    // Legend buttons (also useful on small touch screens)
    PLANETS.forEach(function (p) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'legend-btn';
      b.innerHTML = planetArt(p) + '<span>' + p.name + '</span>';
      b.addEventListener('click', function () { openModal(p.id, b); });
      legend.appendChild(b);
    });

    // Pause / resume
    const toggle = $('#toggleOrbit');
    function setPaused(paused) {
      system.classList.toggle('paused', paused);
      toggle.textContent = paused ? 'RESUME' : 'PAUSE';
      toggle.setAttribute('aria-pressed', String(paused));
    }
    toggle.addEventListener('click', function () { setPaused(!system.classList.contains('paused')); });

    // Start paused for visitors who prefer reduced motion
    setPaused(reducedMotion.matches);
    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener('change', function (e) { setPaused(e.matches); });
    }
  }

  /* ---------------------------------------------------------
     7. RANDOM SPACE FACTS
     --------------------------------------------------------- */
  function initFacts() {
    const text = $('#factText');
    const tag = $('#factTag');
    const count = $('#factCount');
    const btn = $('#factBtn');
    let lastIndex = -1;
    let shown = 0;

    count.textContent = FACTS.length + ' facts in the collection';

    btn.addEventListener('click', function () {
      // Pick a random fact that differs from the previous one
      let i;
      do { i = Math.floor(Math.random() * FACTS.length); } while (i === lastIndex && FACTS.length > 1);
      lastIndex = i;
      shown++;

      tag.textContent = FACTS[i].tag;
      text.textContent = FACTS[i].text;
      count.textContent = 'Facts discovered this visit: ' + shown + ' \u00B7 ' + FACTS.length + ' in the collection';

      // Restart the fade-in animation
      text.classList.remove('swap');
      void text.offsetWidth;
      text.classList.add('swap');
      btn.textContent = 'DISCOVER ANOTHER FACT';
    });
  }

  /* ---------------------------------------------------------
     8. SPACE QUIZ
     --------------------------------------------------------- */
  function initQuiz() {
    const els = {
      play: $('#quizPlay'), result: $('#quizResult'),
      progressText: $('#quizProgressText'), score: $('#quizScore'),
      progress: $('#quizProgress'), bar: $('#quizBar'),
      question: $('#quizQuestion'), options: $('#quizOptions'),
      feedback: $('#quizFeedback'), next: $('#quizNext'),
      finalScore: $('#finalScore'), finalTitle: $('#finalTitle'), finalMsg: $('#finalMsg'),
      again: $('#playAgain')
    };

    let order = [];      // shuffled question list for this round
    let index = 0;
    let score = 0;
    let answered = false;

    function startQuiz() {
      order = shuffle(QUIZ);
      index = 0;
      score = 0;
      els.result.hidden = true;
      els.play.hidden = false;
      showQuestion();
    }

    function updateProgress() {
      const total = order.length;
      // The bar shows how many questions are finished
      const done = answered ? index + 1 : index;
      els.progressText.textContent = 'Question ' + (index + 1) + ' of ' + total;
      els.score.textContent = score;
      els.bar.style.width = (done / total * 100) + '%';
      els.progress.setAttribute('aria-valuenow', String(done));
      els.progress.setAttribute('aria-valuemax', String(total));
    }

    function showQuestion() {
      answered = false;
      const item = order[index];
      // Shuffle the answers but remember which one is correct
      const opts = shuffle(item.options.map(function (label, i) { return { label: label, correct: i === item.answer }; }));

      els.question.textContent = item.q;
      els.feedback.textContent = '';
      els.feedback.className = 'quiz-feedback';
      els.next.hidden = true;
      els.options.innerHTML = '';

      opts.forEach(function (o, n) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'quiz-option';
        b.textContent = String.fromCharCode(65 + n) + '.  ' + o.label;
        b.dataset.correct = o.correct ? '1' : '0';
        b.addEventListener('click', function () { choose(b, item); });
        els.options.appendChild(b);
      });
      updateProgress();
    }

    function choose(btn, item) {
      if (answered) return;
      answered = true;
      const isCorrect = btn.dataset.correct === '1';
      if (isCorrect) score++;

      $$('.quiz-option', els.options).forEach(function (b) {
        b.disabled = true;
        if (b.dataset.correct === '1') b.classList.add('correct');
        else if (b === btn) b.classList.add('wrong');
        else b.classList.add('dim');
      });

      els.feedback.className = 'quiz-feedback ' + (isCorrect ? 'good' : 'bad');
      els.feedback.innerHTML = '<span class="verdict">' + (isCorrect ? 'Correct!' : 'Not quite.') + '</span>';
      els.feedback.appendChild(document.createTextNode(item.why));

      els.next.textContent = index === order.length - 1 ? 'SEE RESULTS' : 'NEXT QUESTION';
      els.next.hidden = false;
      els.next.focus({ preventScroll: true });
      updateProgress();
    }

    function showResults() {
      const total = order.length;
      els.play.hidden = true;
      els.result.hidden = false;
      els.finalScore.textContent = score + '/' + total;

      let title, msg;
      if (score === total) { title = 'Perfect Mission!'; msg = 'Flawless. You know the cosmos like a seasoned astronaut.'; }
      else if (score >= 8) { title = 'Stellar Work!'; msg = 'Outstanding. You have an impressive grasp of astronomy.'; }
      else if (score >= 6) { title = 'Great Flight!'; msg = 'Well done. You know your way around the solar system.'; }
      else if (score >= 4) { title = 'Good Start, Cadet!'; msg = 'Not bad. Explore the planets again and try for a higher score.'; }
      else { title = 'Keep Exploring!'; msg = 'Every astronaut starts somewhere. Browse the planets and facts, then try again.'; }
      els.finalTitle.textContent = title;
      els.finalMsg.textContent = msg;
      els.again.focus({ preventScroll: true });
    }

    els.next.addEventListener('click', function () {
      if (index < order.length - 1) { index++; showQuestion(); }
      else showResults();
    });
    els.again.addEventListener('click', startQuiz);

    startQuiz();
  }

  /* ---------------------------------------------------------
     9. SCROLL REVEAL + START-UP
     --------------------------------------------------------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          const el = en.target;
          el.classList.add('in');
          obs.unobserve(el);
          // Clear the stagger delay afterwards so hover effects stay instant
          if (el.style.transitionDelay) setTimeout(function () { el.style.transitionDelay = ''; }, 1400);
        }
      });
    }, { threshold: 0.12 });
    // Small stagger for the planet cards
    items.forEach(function (el, i) {
      if (el.classList.contains('planet-card')) el.style.transitionDelay = ((i % 4) * 80) + 'ms';
      obs.observe(el);
    });
  }

  function init() {
    initStarfield();
    initNavigation();
    buildPlanetCards();
    initModal();
    buildSolarSystem();
    initFacts();
    initQuiz();
    initReveal();
    $('#year').textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
