'use strict';

const smokeWrap = document.querySelector('.hero-bike-smoke');
const smokePuffs = gsap.utils.toArray('.hero-bike-smoke__puff');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (smokeWrap && smokePuffs.length && window.gsap) {
  if (reduceMotion.matches) {
    gsap.set(smokePuffs, { opacity: 0.16 });
  } else {
    gsap.set(smokePuffs, {
      transformOrigin: '50% 50%',
      force3D: true,
    });

    // общий слой очень медленно "дышит"
    gsap.to(smokeWrap, {
      x: 9,
      y: -7,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    smokePuffs.forEach((puff, index) => {
      startSmokeCycle(puff, index * 0.32);
    });
  }
}

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
      ? random(-26, 26, 1)
      : isFront
        ? random(-46, 46, 1)
        : random(-38, 38, 1);

    const riseY = isFar
      ? random(48, 82, 1)
      : isFront
        ? random(70, 118, 1)
        : random(58, 102, 1);

    const startScale = isFar
      ? random(0.82, 0.98, 0.01)
      : random(0.72, 0.94, 0.01);

    const middleScaleX = isFar
      ? random(1.02, 1.14, 0.01)
      : random(1.06, 1.24, 0.01);

    const middleScaleY = isFar
      ? random(1.04, 1.18, 0.01)
      : random(1.08, 1.28, 0.01);

    const endScaleX = isFar
      ? random(1.18, 1.42, 0.01)
      : random(1.28, 1.62, 0.01);

    const endScaleY = isFar
      ? random(1.2, 1.48, 0.01)
      : random(1.34, 1.75, 0.01);

    const peakOpacity = isFar
      ? random(0.12, 0.2, 0.01)
      : isFront
        ? random(0.16, 0.26, 0.01)
        : random(0.14, 0.24, 0.01);

    gsap.set(puff, {
      x: random(-10, 10, 1),
      y: random(2, 12, 1),
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
        delay = random(0.05, 0.45, 0.01);
        run();
      },
    });

    // появляется и набирает объём
    tl.to(puff, {
      x: driftX * 0.34,
      y: -riseY * 0.26,
      scaleX: middleScaleX,
      scaleY: middleScaleY,
      rotation: random(-12, 12, 1),
      opacity: peakOpacity,
      duration: random(1.8, 2.6, 0.1),
      ease: 'sine.out',
    })
      // всплывает и расползается
      .to(puff, {
        x: driftX,
        y: -riseY,
        scaleX: endScaleX,
        scaleY: endScaleY,
        rotation: random(-18, 18, 1),
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
        duration: random(2.8, 4.6, 0.1),
        ease: 'power1.out',
      });
  };

  run();
}
