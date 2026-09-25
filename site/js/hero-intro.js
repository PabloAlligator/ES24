'use strict';

(() => {
  const hero = document.querySelector('.hero');

  window.__heroIntroRegistered = true;
  window.__heroIntroDone = false;

  const finishIntro = () => {
    if (window.__heroIntroDone) return;

    window.__heroIntroDone = true;
    hero?.classList.remove('hero--animating');
    window.dispatchEvent(new CustomEvent('hero:intro-complete'));
  };

  if (!hero || !window.gsap) {
    finishIntro();
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia(
    '(min-width: 1024px) and (pointer: fine)',
  );

  const brand = hero.querySelector('.hero-brand');
  const modelName = hero.querySelector('.hero-model__name');
  const modelDetail = hero.querySelector('.hero-model__detail');
  const slogan = hero.querySelector('.hero-slogan');
  const actions = hero.querySelector('.hero-content__actions');
  const advantageBlocks = gsap.utils.toArray('.hero-adventages__block', hero);
  const obzor = hero.querySelector('.hero-obzor');
  const mobileBenefits = gsap.utils.toArray('.hero-mobile-benefits__item', hero);

  const rail = hero.querySelector('.hero-rail');
  const railPages = gsap.utils.toArray('.hero-rail__page', hero);
  const railLabels = gsap.utils.toArray('.hero-rail__labels span', hero);
  const manifestText = hero.querySelector('.hero-manifest__text');

  const mountains = hero.querySelector('.hero-backdrop__mountains');
  const slashBlack = hero.querySelector('.hero-backdrop__slash--black');
  const slashAcid = hero.querySelector('.hero-backdrop__slash--acid');
  const mountainPanel = hero.querySelector('.hero-backdrop__mountain-panel');
  const riderPanel = hero.querySelector('.hero-backdrop__rider-panel');
  const lowerCut = hero.querySelector('.hero-backdrop__lower-cut');
  const lowerInfo = hero.querySelector('.hero-backdrop__lower-info');

  const rocks = hero.querySelector('.hero-rocks');
  const bike = hero.querySelector('.hero-bike');
  const smoke = hero.querySelector('.hero-bike-smoke');

  hero.classList.add('hero--animating');

  const setupInitialState = () => {
    gsap.set(mountains, {
      scale: 1.055,
      y: 12,
      transformOrigin: '50% 62%',
      force3D: true,
    });

    gsap.set(slashBlack, {
      xPercent: 28,
      yPercent: -13,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(slashAcid, {
      scaleY: 0,
      autoAlpha: 0,
      transformOrigin: '50% 0%',
      force3D: true,
    });

    gsap.set(mountainPanel, {
      x: 34,
      y: -12,
      scale: 0.96,
      autoAlpha: 0,
      transformOrigin: '50% 50%',
      force3D: true,
    });

    gsap.set(riderPanel, {
      xPercent: 28,
      yPercent: 15,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(lowerCut, {
      xPercent: 26,
      yPercent: 18,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(lowerInfo, {
      x: 28,
      y: 12,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(brand, { x: -38, autoAlpha: 0, force3D: true });
    gsap.set(modelName, { x: -62, autoAlpha: 0, force3D: true });
    gsap.set(modelDetail, { y: 30, autoAlpha: 0, force3D: true });

    gsap.set(rocks, {
      y: 25,
      scale: 1.025,
      autoAlpha: 0,
      transformOrigin: '50% 100%',
      force3D: true,
    });

    gsap.set(bike, {
      x: 72,
      y: 34,
      scale: 0.94,
      rotation: 1.1,
      autoAlpha: 0,
      transformOrigin: '52% 74%',
      force3D: true,
    });

    gsap.set(smoke, { autoAlpha: 0 });

    gsap.set([slogan, actions, obzor], {
      y: 18,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(advantageBlocks, {
      y: 15,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(mobileBenefits, {
      y: 12,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(railPages, {
      x: -10,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(railLabels, {
      x: -8,
      autoAlpha: 0,
      force3D: true,
    });

    gsap.set(manifestText, {
      x: 12,
      autoAlpha: 0,
      force3D: true,
    });
  };

  const revealWithoutMotion = () => {
    hero.classList.add(
      'hero--content-line-visible',
      'hero--rail-line-visible',
      'hero--manifest-line-visible',
      'hero--panel-line-visible',
      'hero--lower-line-visible',
    );

    gsap.set(
      [
        mountains,
        slashBlack,
        slashAcid,
        mountainPanel,
        riderPanel,
        lowerCut,
        lowerInfo,
        brand,
        modelName,
        modelDetail,
        rocks,
        bike,
        smoke,
        slogan,
        actions,
        obzor,
        manifestText,
        ...advantageBlocks,
        ...mobileBenefits,
        ...railPages,
        ...railLabels,
      ],
      { clearProps: 'transform,opacity,visibility,filter' },
    );

    finishIntro();
  };

  const startParallax = () => {
    if (reduceMotion.matches || !finePointer.matches || !bike) {
      return;
    }

    const bikeX = gsap.quickTo(bike, 'x', {
      duration: 0.8,
      ease: 'power3.out',
    });

    const bikeY = gsap.quickTo(bike, 'y', {
      duration: 0.8,
      ease: 'power3.out',
    });

    const reset = () => {
      bikeX(0);
      bikeY(0);
    };

    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();

      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      bikeX(nx * 4);
      bikeY(ny * 2.5);
    });

    hero.addEventListener('pointerleave', reset);
  };

  const playIntro = () => {
    if (reduceMotion.matches) {
      revealWithoutMotion();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        // Гарантируем абсолютно точные финальные координаты из SCSS.
        gsap.set(
          [
            slashBlack,
            slashAcid,
            mountainPanel,
            riderPanel,
            lowerCut,
            lowerInfo,
            brand,
            modelName,
            modelDetail,
            rocks,
            bike,
            slogan,
            actions,
            obzor,
            manifestText,
            ...advantageBlocks,
            ...mobileBenefits,
            ...railPages,
            ...railLabels,
          ],
          { clearProps: 'transform,opacity,visibility' },
        );

        // Фоновый scale уже завершён — оставляем transform свободным для parallax.
        gsap.set(mountains, { clearProps: 'transform' });
        gsap.set(smoke, { clearProps: 'opacity,visibility' });

        finishIntro();
        startParallax();
      },
    });

    // 1. Фон — очень медленный preload-scale.
    tl.to(
      mountains,
      {
        scale: 1,
        y: 0,
        duration: 2.8,
        ease: 'power2.out',
      },
      0,
    );

    // 2. Правые графические детали собираются в сцену.
    tl.to(
      slashBlack,
      { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 0.82 },
      0.12,
    )
      .to(
        slashAcid,
        {
          scaleY: 1,
          autoAlpha: 1,
          duration: 0.72,
          ease: 'power2.out',
        },
        0.25,
      )
      .to(
        mountainPanel,
        {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 1.12,
          ease: 'power3.out',
        },
        0.34,
      )
      .to(
        riderPanel,
        { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 0.92 },
        0.5,
      )
      .to(
        lowerCut,
        { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 0.78 },
        0.76,
      )
      .to(lowerInfo, { x: 0, y: 0, autoAlpha: 1, duration: 0.66 }, 1.08);

    tl.call(() => hero.classList.add('hero--panel-line-visible'), [], 0.88);
    tl.call(() => hero.classList.add('hero--lower-line-visible'), [], 1.18);

    // 3. Крупная типографика.
    tl.to(brand, { x: 0, autoAlpha: 1, duration: 0.74 }, 0.4)
      .to(modelName, { x: 0, autoAlpha: 1, duration: 0.9 }, 0.48)
      .to(modelDetail, { y: 0, autoAlpha: 1, duration: 0.72 }, 0.66);

    // 4. Поверхность формируется чуть раньше посадки байка.
    tl.to(
      rocks,
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.92,
        ease: 'power3.out',
      },
      0.84,
    );

    // 5. Мотоцикл мягко садится в итоговую точку.
    tl.to(
      bike,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        autoAlpha: 1,
        duration: 1.28,
        ease: 'power4.out',
      },
      0.96,
    );

    // 6. Дым становится видимым, сами puff-циклы запускаются после intro.
    tl.to(smoke, { autoAlpha: 1, duration: 0.62, ease: 'sine.out' }, 1.3);

    // 7. Контент: слоган → CTA → характеристики → обзор.
    tl.to(slogan, { y: 0, autoAlpha: 1, duration: 0.58 }, 1.28);
    tl.call(() => hero.classList.add('hero--content-line-visible'), [], 1.42);
    tl.to(actions, { y: 0, autoAlpha: 1, duration: 0.56 }, 1.43)
      .to(
        advantageBlocks,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        },
        1.58,
      )
      .to(obzor, { y: 0, autoAlpha: 1, duration: 0.54 }, 2.0)
      .to(
        mobileBenefits,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.42,
          stagger: 0.07,
          ease: 'power2.out',
        },
        1.92,
      );

    // 8. Rail и правый manifest — периферия появляется после главной сцены.
    tl.call(() => hero.classList.add('hero--rail-line-visible'), [], 1.66);
    tl.to(railPages[0], { x: 0, autoAlpha: 1, duration: 0.34 }, 1.74)
      .to(
        railPages.slice(1),
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.32,
          stagger: 0.09,
        },
        1.85,
      )
      .to(
        railLabels,
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.34,
          stagger: 0.07,
        },
        2.02,
      );

    tl.call(() => hero.classList.add('hero--manifest-line-visible'), [], 1.86);
    tl.to(manifestText, { x: 0, autoAlpha: 1, duration: 0.5 }, 1.94);

    // 9. Один короткий акцент у кислотного 300.
    tl.to(
      modelDetail,
      {
        filter: 'saturate(1.3) contrast(1.22) brightness(1.28)',
        duration: 0.32,
        ease: 'sine.out',
      },
      2.22,
    ).to(
      modelDetail,
      {
        filter: 'saturate(1.3) contrast(1.22) brightness(1.07)',
        duration: 0.48,
        ease: 'sine.inOut',
      },
      2.54,
    );
  };

  setupInitialState();

  if (document.readyState === 'complete') {
    requestAnimationFrame(playIntro);
  } else {
    window.addEventListener('load', () => requestAnimationFrame(playIntro), {
      once: true,
    });
  }
})();
