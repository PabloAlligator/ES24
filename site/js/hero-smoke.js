'use strict';

(() => {
  const smokeWrap = document.querySelector('.hero-bike-smoke');

  if (!smokeWrap || !window.gsap) return;

  const smokePuffs = gsap.utils.toArray('.hero-bike-smoke__puff');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;

  const startSmoke = () => {
    if (started || !smokePuffs.length) return;
    started = true;

    if (reduceMotion.matches) {
      gsap.set(smokePuffs, { opacity: 0.1 });
      return;
    }

    gsap.set(smokePuffs, {
      transformOrigin: '50% 50%',
      force3D: true,
    });

    // Весь дымовой слой очень медленно «дышит» как единый объём.
    gsap.to(smokeWrap, {
      x: 8,
      y: -6,
      duration: 8.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    smokePuffs.forEach((puff, index) => {
      startSmokeCycle(puff, index * 0.28);
    });
  };

  function startSmokeCycle(puff, delay = 0) {
    const random = gsap.utils.random;

    const isFar =
      puff.classList.contains('hero-bike-smoke__puff--1') ||
      puff.classList.contains('hero-bike-smoke__puff--3') ||
      puff.classList.contains('hero-bike-smoke__puff--6');

    const isFront =
      puff.classList.contains('hero-bike-smoke__puff--7') ||
      puff.classList.contains('hero-bike-smoke__puff--8');

    const run = () => {
      const driftX = isFar
        ? random(-24, 24, 1)
        : isFront
          ? random(-38, 38, 1)
          : random(-32, 32, 1);

      const riseY = isFar
        ? random(50, 82, 1)
        : isFront
          ? random(66, 108, 1)
          : random(58, 98, 1);

      const startScale = isFar
        ? random(0.82, 0.98, 0.01)
        : random(0.74, 0.94, 0.01);

      const middleScaleX = isFar
        ? random(1.02, 1.14, 0.01)
        : random(1.06, 1.22, 0.01);

      const middleScaleY = isFar
        ? random(1.04, 1.18, 0.01)
        : random(1.08, 1.26, 0.01);

      const endScaleX = isFar
        ? random(1.18, 1.4, 0.01)
        : random(1.26, 1.56, 0.01);

      const endScaleY = isFar
        ? random(1.2, 1.46, 0.01)
        : random(1.3, 1.68, 0.01);

      const peakOpacity = isFar
        ? random(0.12, 0.2, 0.01)
        : isFront
          ? random(0.16, 0.25, 0.01)
          : random(0.14, 0.23, 0.01);

      gsap.set(puff, {
        x: random(-9, 9, 1),
        y: random(2, 11, 1),
        scaleX: startScale,
        scaleY: startScale,
        rotation: random(-8, 8, 1),
        opacity: 0,
        borderRadius: `${random(48, 66, 1)}% ${random(
          34,
          52,
          1,
        )}% ${random(48, 66, 1)}% ${random(34, 52, 1)}% / ${random(
          40,
          62,
          1,
        )}% ${random(40, 62, 1)}% ${random(38, 60, 1)}% ${random(38, 60, 1)}%`,
      });

      const tl = gsap.timeline({
        delay,
        onComplete: () => {
          delay = random(0.08, 0.52, 0.01);
          run();
        },
      });

      // Облако появляется, набирает массу и немного поднимается.
      tl.to(puff, {
        x: driftX * 0.34,
        y: -riseY * 0.26,
        scaleX: middleScaleX,
        scaleY: middleScaleY,
        rotation: random(-12, 12, 1),
        opacity: peakOpacity,
        duration: random(1.9, 2.7, 0.1),
        ease: 'sine.out',
      }).to(puff, {
        // Затем парит выше, расползается и растворяется.
        x: driftX,
        y: -riseY,
        scaleX: endScaleX,
        scaleY: endScaleY,
        rotation: random(-17, 17, 1),
        opacity: 0.02,
        borderRadius: `${random(38, 58, 1)}% ${random(
          42,
          64,
          1,
        )}% ${random(36, 58, 1)}% ${random(42, 64, 1)}% / ${random(
          34,
          58,
          1,
        )}% ${random(46, 68, 1)}% ${random(34, 58, 1)}% ${random(42, 66, 1)}%`,
        duration: random(3, 4.8, 0.1),
        ease: 'power1.out',
      });
    };

    run();
  }

  // hero-intro.js управляет моментом запуска постоянной жизни дыма.
  if (window.__heroIntroDone || !window.__heroIntroRegistered) {
    startSmoke();
  } else {
    window.addEventListener('hero:intro-complete', startSmoke, { once: true });
  }
})();
