function setVh() {
  let vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();

// Update the value on window resize
window.addEventListener('resize', setVh);

console.log('Hello, World!');
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
let mm = gsap.matchMedia();

// ScrollTrigger.normalizeScroll(true);

gsap.set('.sectionunderlay-slide', { y: '0' });

const heroSpans = document.querySelectorAll('.header-span.hero');
const isVisible = element => {
  if (!element) return false;
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden') return false;
  return element.parentElement ? isVisible(element.parentElement) : true;
};
const visibleHeroSpans = Array.from(heroSpans).filter(isVisible);
const slides = document.querySelectorAll('.sectionunderlay-slide');
// console.log(visibleHeroSpans);

/// hero initial entrance animations
const tl = gsap.timeline();
tl.to('.preloaderslide.preloader', { y: '-100%', stagger: 0.08, duration: 1.5, ease: 'expo.out', delay: 1 })
  .from(visibleHeroSpans, { y: '200%', stagger: 0.07, duration: 0.8, ease: 'expo.out' }, '-=2')
  .from('.hero-decoration', { y: '200%', stagger: -0.1, duration: 1, ease: 'expo.out', delay: 0 }, '-=1')
  .call(initHeroTimeline);

gsap.to('.circular.outer', { rotation: 360, duration: 30, repeat: -1, ease: 'none' });
gsap.to('.circular.inner', { rotation: -360, duration: 30, repeat: -1, ease: 'none' });

// hero scroll animation
function initHeroTimeline() {
  //   let heroTimeline = gsap.timeline({ defaults: { ease: 'circ' }, paused: true });

  //   heroTimeline
  //     .fromTo(visibleHeroSpans, { y: '0%' }, { y: '-200%', stagger: 0.06, duration: 1 })
  //     .fromTo('.hero-decoration', { y: '0%' }, { y: '-150%', stagger: 0.1, duration: 1.5 }, '<')
  //     .fromTo('.sectionunderlay-slide', { y: '0%' }, { y: '-100%', stagger: 0.1, duration: 2.5 }, '<')
  //     .fromTo('.header-container', { mixBlendMode: 'normal' }, { mixBlendMode: 'difference' }, '<');

  //   const durationMapper = gsap.utils.mapRange(0, 1000, 2, 0.5);

  //   ScrollTrigger.create({
  //     animation: heroTimeline,
  //     trigger: 'body',
  //     start: 'top top',
  //     end: '+=50px',
  //     toggleActions: 'none play reverse none',
  //     fastScrollEnd: true,
  //     preventOverlaps: true,
  //     markers: false,
  //     onToggle({ direction }) {
  //       // // Determine the appropriate easing function for the timeline's playhead
  //       // const easeType = direction === 1 ? 'expo.out' : 'expo.in';
  //       // console.log('Applying Ease:', easeType);
  //       // // Use .tweenTo() to control the timeline's progress with easing
  //       // const targetTime = direction === 1 ? heroTimeline.duration() : 0;
  //       // heroTimeline.tweenTo(targetTime, {
  //       //   ease: easeType,
  //       //   overwrite: true,
  //       //   duration: 1 // Adjust duration as needed
  //       // });
  //     }
  //   });
  // }

  const heroTimeline = gsap
    .timeline({ paused: true })
    .to(visibleHeroSpans, { y: '-200%', stagger: 0.15, duration: 0.3 })
    .to(slides, { yPercent: -100, stagger: 0.2, duration: 1 }, '<')
    .to('.header-container', { mixBlendMode: 'difference' }, '<')
    .to('.hero-decoration', { y: '-300%', stagger: -0.1, duration: 1, delay: 0 }, '<');
  let t;

  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: '+=20px',
    fastScrollEnd: true,
    preventOverlaps: true,
    onLeave: () => {
      t && t.kill();
      t = gsap.to(heroTimeline, {
        duration: 2,
        progress: 1,
        ease: 'power1.out'
      });
    },
    onEnterBack: () => {
      t && t.kill();
      t = gsap.to(heroTimeline, {
        duration: 1.5,
        progress: 0,
        ease: 'power1.out'
      });
    }
  });
  //
}

//

gsap.set('.footer-slide', { y: '100%' });
gsap.set('.footer-container', { y: '100px', opacity: 0 });
gsap.set('.footer-wrapper', { opacity: 0, visibility: 'hidden' });
gsap.fromTo('.whatsapp-button-radial', { opacity: 0 }, { opacity: 1, ease: 'power4.inOut', repeat: -1, duration: 2, yoyo: true });

const footerTl = gsap
  .timeline({ paused: true })
  .to('.footer-slide', { y: '0', stagger: 0.1, duration: 2, ease: 'expo.out', delay: 0.2 })
  .to('.footer-container', { y: '0', opacity: 1, duration: 1, ease: 'expo.out', delay: 1 }, '<')
  .to('.footer-wrapper', { visibility: 'visible', opacity: 1, autoAlpha: true }, '<')
  .to('.grid-container.footer', { visibility: 'visible', opacity: 1, autoAlpha: true }, '<');
let ft;

// bottom timeline
gsap.timeline({
  scrollTrigger: {
    trigger: '.footer-pseudo',
    start: 'top 40%',
    end: '-=50px', // End after scrolling 20px
    // markers: true,
    toggleActions: 'play none none none',
    onEnter: () => {
      ft && ft.kill();
      // gsap.set('.footer-wrapper', { visibility: 'visible', opacity: 1, autoAlpha: true });
      ft = gsap.to(footerTl, {
        duration: 3,
        progress: 1,
        ease: 'power1.out'
      });
    },
    onLeaveBack: () => {
      ft && ft.kill();
      ft = gsap.to(footerTl, {
        duration: 1,
        progress: 0,
        ease: 'power1.out'
      });
      // wait to end

      // gsap.set('.footer-wrapper', { visibility: 'hidden', opacity: 0, autoAlpha: false });
    }
  }
});

// Image gallery slides timeline
mm.add('(max-width: 400px)', () => {
  gsap
    .timeline({
      scrollTrigger: { trigger: '.image-slide-sectionwrap', start: 'top bottom', end: 'bottom top', scrub: 3, markers: false, toggleActions: 'play none none none' }
    })
    .fromTo('[image-slide-1]', { y: '100px' }, { y: '-100px' })
    .fromTo('[image-slide-2]', { y: '200px' }, { y: '-150px' }, '<')
    .fromTo('[image-slide-3]', { y: '300px' }, { y: '-200px' }, '<')
    .fromTo('[image-slide-4]', { y: '600px' }, { y: '-200px' }, '<')
    .fromTo('[image-slide-5]', { y: '400px' }, { y: '-100px' }, '<');
});
mm.add('(min-width: 401px)', () => {
  gsap
    .timeline({
      scrollTrigger: { trigger: '.image-slide-sectionwrap', start: 'top bottom', end: 'bottom top', scrub: 3, markers: false, toggleActions: 'play none none none' }
    })
    .fromTo('[image-slide-1]', { y: '100px' }, { y: '-100px' })
    .fromTo('[image-slide-2]', { y: '500px' }, { y: '-350px' }, '<')
    .fromTo('[image-slide-3]', { y: '600px' }, { y: '-200px' }, '<')
    .fromTo('[image-slide-4]', { y: '600px' }, { y: '-200px' }, '<')
    .fromTo('[image-slide-5]', { y: '850px' }, { y: '-550px' }, '<');
});

// sticky section
const sections = document.querySelectorAll('.sticky-section-wrap');

sections.forEach((section, index) => {
  var body = section.querySelector('.sticky-section-body');
  var hoverLink = section.querySelector('[hover-image]');
  var contentHeight = body.clientHeight;
  // console.log(body);
  ScrollTrigger.create({
    trigger: `.sticky-pseudo:nth-child(${index + 1})`,
    start: 'top top',
    end: 'bottom top',
    // body text
    onEnter: () => {
      gsap.fromTo(body, { opacity: 0, autoAlpha: 0, height: 0 }, { opacity: 1, autoAlpha: 1, height: contentHeight, duration: 0.3, ease: 'sine.out' });
      gsap.fromTo(section, { opacity: 0.4 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(hoverLink, { display: 'none' }, { display: 'block', delay: 0.1 });
      // hoverLink.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    },
    onLeave: () => {
      gsap.to(body, { opacity: 0, autoAlpha: 0, height: 0, duration: 0.3, ease: 'sine.out' });
      gsap.to(section, { opacity: 0.4, duration: 0.3 });
      gsap.to(hoverLink, { display: 'none' });
      hoverLink.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    },
    onEnterBack: () => {
      gsap.to(body, { opacity: 1, autoAlpha: 1, height: contentHeight, duration: 0.3, ease: 'sine.out' });
      gsap.to(section, { opacity: 1, duration: 0.3 });
      gsap.to(hoverLink, { display: 'block', delay: 0.1 });
      hoverLink.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    },
    onLeaveBack: () => {
      gsap.to(body, { opacity: 0, autoAlpha: 0, height: 0, duration: 0.3, ease: 'sine.out' });
      gsap.to(section, { opacity: 0.4, duration: 0.3 });
      gsap.to(hoverLink, { display: 'none' });
      hoverLink.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    }
  });
});

gsap.set('.sticky-section-body', { height: '0' });
gsap.set('[hover-image]', { display: 'none' });
gsap.set('.sticky-section-wrap', { opacity: 0.4 });

// sticky section spans
gsap.from('.section-1-heading', {
  duration: 1,
  opacity: 0,
  y: '250%',
  stagger: 0.08,
  ease: 'expo.out',
  scrollTrigger: {
    trigger: '.triggercontainer',
    start: 'top 60%',
    end: 'bottom top',
    markers: false,
    toggleActions: 'play none none none'
  }
});

/// threejs distorted images on hover
const container = document.querySelector('.triggercontainer');
const itemsWrapper = document.querySelector('.hoverwrap');
// Preload images
const preloadImages = () => {
  return new Promise((resolve, reject) => {
    imagesLoaded(document.querySelectorAll('img'), resolve);
  });
};
preloadImages().then(() => {
  // remove loader
  document.body.classList.remove('loading');
  const effect = new RGBShiftEffect(container, itemsWrapper, {
    strength: 0.25
  });
});

// lenis
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// circle text
new CircleType(document.getElementById('circletext'));

// video rendering
const video = document.getElementById('videoSource');
const canvases = document.querySelectorAll('.video-canvas');
const context = Array.from(canvases).map(canvas => canvas.getContext('2d'));

video.addEventListener(
  'play',
  function () {
    draw(video, context, canvases);
  },
  false
);

function draw(video, context, canvases) {
  requestAnimationFrame(() => draw(video, context, canvases)); // Proper placement for continuous drawing
  if (video.paused || video.ended) return; // Minor change: use 'return;' instead of 'return false;'

  context.forEach((ctx, index) => {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const sliceWidth = video.videoWidth / canvases.length; // Calculate width of each slice
    ctx.drawImage(
      video,
      sliceWidth * index,
      0,
      sliceWidth,
      video.videoHeight, // Source dimensions
      0,
      0,
      canvases[index].width,
      canvases[index].height
    ); // Destination dimensions
  });
}

const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  allowTouchMove: true,
  centeredSlides: true,
  speed: 300,
  scrollbar: { el: '.swiper-scrollbar', draggable: true },
  // freeMode: true,
  // slideToClickedSlide: true,
  on: {
    click: swiper => {
      if (swiper.clickedIndex > swiper.activeIndex) {
        swiper.slideNext();
      } else {
        swiper.slidePrev();
      }
    }
  },
  navigation: { nextEl: '.swiper-btn-next', prevEl: '.swiper-btn-prev' },
  breakpoints: {
    // when window width is >= 320px
    400: {
      slidesPerView: 3
    }
  }
});

// magnetic swiper
const wrappers = document.querySelectorAll('.gallery-image_wrapper');
console.log(wrappers);

wrappers.forEach(wrapper => {
  wrapper.addEventListener('mousemove', function (e) {
    const rect = wrapper.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const moveX = (relX - rect.width / 2) * 0.1; // Adjust the 0.1 value to change the strength of the effect
    const moveY = (relY - rect.height / 2) * 0.1; // Adjust the 0.1 value to change the strength of the effect

    gsap.to(wrapper, { duration: 0.3, x: moveX, y: moveY, ease: 'power2.out' });
  });

  wrapper.addEventListener('mouseleave', function () {
    gsap.to(wrapper, { duration: 0.5, x: 0, y: 0, ease: 'power2.out' });
  });
});
