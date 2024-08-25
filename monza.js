console.log('Hello, World!');
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

//

// gsap.set('.sectionunderlay-slide', { y: '0' });

// const heroSpans = document.querySelectorAll('.header-span.hero');
// const isVisible = element => {
//   if (!element) return false;
//   const style = window.getComputedStyle(element);
//   if (style.display === 'none' || style.visibility === 'hidden') return false;
//   return element.parentElement ? isVisible(element.parentElement) : true;
// };
// const visibleHeroSpans = Array.from(heroSpans).filter(isVisible);
// console.log(visibleHeroSpans);

// /// hero initial entrance animations
// const tl = gsap.timeline();
// tl.to('.preloaderslide.preloader', { y: '-100%', stagger: 0.08, duration: 1.5, ease: 'expo.out', delay: 1 })
//   .from(visibleHeroSpans, { y: '200%', stagger: 0.07, duration: 0.8, ease: 'expo.out' }, '-=2')
//   .from('.hero-decoration', { y: '200%', stagger: -0.1, duration: 1, ease: 'expo.out', delay: 0 }, '-=1')
//   .call(initHeroTimeline);

// gsap.to('.circular.outer', { rotation: 360, duration: 30, repeat: -1, ease: 'none' });
// gsap.to('.circular.inner', { rotation: -360, duration: 30, repeat: -1, ease: 'none' });

// // hero scroll animation
// function initHeroTimeline() {
//   let heroTimeline = gsap.timeline({ defaults: { ease: 'circ' }, paused: true });

//   heroTimeline
//     .fromTo(visibleHeroSpans, { y: '0%' }, { y: '-200%', stagger: 0.06, duration: 1 })
//     .fromTo('.hero-decoration', { y: '0%' }, { y: '-150%', stagger: 0.1, duration: 1.5 }, '<')
//     .fromTo('.sectionunderlay-slide', { y: '0%' }, { y: '-100%', stagger: 0.1, duration: 2.5 }, '<')
//     .fromTo('.header-container', { mixBlendMode: 'normal' }, { mixBlendMode: 'difference' }, '<');

//   // const durationMapper = gsap.utils.mapRange(0, 1000, 2, 0.5);

//   ScrollTrigger.create({
//     animation: heroTimeline,
//     trigger: 'body',
//     start: 'top top',
//     end: '+=50px',
//     toggleActions: 'none play reverse none',
//     fastScrollEnd: true,
//     preventOverlaps: true,
//     markers: true,
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

// // bottom timeline
// gsap.timeline({
//   scrollTrigger: {
//     trigger: 'body',
//     start: 'bottom bottom',
//     end: '-=50px', // End after scrolling 20px
//     // markers: true,
//     toggleActions: 'play none none none',
//     onEnter: () => {
//       gsap.to('.footer-slide', { y: '0', stagger: 0.1, duration: 2, ease: 'expo.out', delay: 0.2 });
//       gsap.to('.footer-container', { y: '0', opacity: 1, duration: 1, ease: 'expo.out', delay: 1 });
//     },
//     onLeaveBack: () => {
//       gsap.to('.footer-slide', { y: '100%', stagger: -0.1, duration: 2, ease: 'expo.out', delay: 0.2 });
//       gsap.to('.footer-container', { y: '100px', opacity: 0, duration: 1, ease: 'expo.out', delay: 0.1 });
//     }
//   }
// });

// // Image gallery slides timeline
// gsap
//   .timeline({
//     scrollTrigger: { trigger: '.image-slide-sectionwrap', start: 'top bottom', end: 'bottom top', scrub: 3, markers: true, toggleActions: 'play none none none' }
//   })
//   .fromTo('[image-slide-1]', { y: '100px' }, { y: '-100px' })
//   .fromTo('[image-slide-2]', { y: '500px' }, { y: '-350px' }, '<')
//   .fromTo('[image-slide-3]', { y: '600px' }, { y: '-200px' }, '<')
//   .fromTo('[image-slide-4]', { y: '600px' }, { y: '-200px' }, '<')
//   .fromTo('[image-slide-5]', { y: '850px' }, { y: '-550px' }, '<');

//

// sticky section

const sections = document.querySelectorAll('.sticky-section-wrap');

// sections.forEach((section, index) => {
//   var body = section.querySelector('.sticky-section-body');
//   var hoverLink = section.querySelector('[hover-image]');
//   var contentHeight = body.clientHeight;
//   // console.log(body);
//   ScrollTrigger.create({
//     trigger: `.sticky-pseudo:nth-child(${index + 1})`,
//     start: 'top top',
//     end: 'bottom top',
//     // body text
//     onEnter: () => {
//       gsap.fromTo(body, { opacity: 0, autoAlpha: 0, height: 0 }, { opacity: 1, autoAlpha: 1, height: contentHeight, duration: 0.3, ease: 'sine.out' });
//       gsap.fromTo(section, { opacity: 0.4 }, { opacity: 1, duration: 0.3 });
//       gsap.fromTo(hoverLink, { display: 'none' }, { display: 'block', delay: 0.1 });
//       // hoverLink.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
//     },
//     onLeave: () => {
//       gsap.to(body, { opacity: 0, autoAlpha: 0, height: 0, duration: 0.3, ease: 'sine.out' });
//       gsap.to(section, { opacity: 0.4, duration: 0.3 });
//       gsap.to(hoverLink, { display: 'none' });
//       hoverLink.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
//     },
//     onEnterBack: () => {
//       gsap.to(body, { opacity: 1, autoAlpha: 1, height: contentHeight, duration: 0.3, ease: 'sine.out' });
//       gsap.to(section, { opacity: 1, duration: 0.3 });
//       gsap.to(hoverLink, { display: 'block', delay: 0.1 });
//       hoverLink.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
//     },
//     onLeaveBack: () => {
//       gsap.to(body, { opacity: 0, autoAlpha: 0, height: 0, duration: 0.3, ease: 'sine.out' });
//       gsap.to(section, { opacity: 0.4, duration: 0.3 });
//       gsap.to(hoverLink, { display: 'none' });
//       hoverLink.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
//     }
//   });
// });
// // setTimeout(() => {
// gsap.set('.sticky-section-body', { height: '0' });
// gsap.set('[hover-image]', { display: 'none' });
// gsap.set('.sticky-section-wrap', { opacity: 0.4 });

// // sticky section spans
// gsap.from('.section-1-heading', {
//   duration: 1,
//   opacity: 0,
//   y: '250%',
//   stagger: 0.08,
//   ease: 'expo.out',
//   scrollTrigger: {
//     trigger: '.triggercontainer',
//     start: 'top 60%',
//     end: 'bottom top',
//     markers: true,
//     toggleActions: 'play none none none'
//   }
// });

//

// gsap.set('.footer-slide', { y: '100%' });
// gsap.set('.footer-container', { y: '100px', opacity: 0 });
// gsap.fromTo(
//   '.whatsapp-button-radial',
//   { opacity: 0 }, // Start state
//   { opacity: 1, ease: 'power4.inOut', repeat: -1, duration: 2, yoyo: true } // End state
// );

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

// // lenis
// const lenis = new Lenis();
// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }
// requestAnimationFrame(raf);

// circle text
new CircleType(document.getElementById('circletext'));

// // video rendering
// const video = document.getElementById('videoSource');
// const canvases = document.querySelectorAll('.video-canvas');
// const context = Array.from(canvases).map(canvas => canvas.getContext('2d'));

// video.addEventListener(
//   'play',
//   function () {
//     draw(video, context, canvases);
//   },
//   false
// );

// function draw(video, context, canvases) {
//   if (video.paused || video.ended) return false;
//   context.forEach((ctx, index) => {
//     ctx.imageSmoothingEnabled = true;
//     ctx.imageSmoothingQuality = 'high';

//     const widthAdjustmentPercentage = 0.1; // Adjust this value as needed (e.g., 0.10 for 10%)
//     const sliceWidth = video.videoWidth / canvases.length;
//     const widthAdjustment = sliceWidth * widthAdjustmentPercentage;

//     ctx.drawImage(video, sliceWidth * index, 0, sliceWidth, video.videoHeight, 0, 0, canvases[index].width, canvases[index].height);
//   });
//   requestAnimationFrame(() => draw(video, context, canvases));
// }

// // logos

// const container = document.querySelector(".circle-container");
// const logos = document.querySelectorAll(".logo");
// const total = logos.length;

// const containerWidth = container.offsetWidth;
// const containerHeight = container.offsetHeight;

// // Define the semi-major axis (a) and semi-minor axis (b)
// const a = containerWidth / 2 - logos[0].offsetWidth / 2; // Horizontal radius adjusted for logo size
// const b = containerHeight / 2 - logos[0].offsetHeight / 2; // Vertical radius adjusted for logo size

// logos.forEach((logo, index) => {
//   const angle = (index / total) * (2 * Math.PI); // Full circle in radians
//   const x = a * Math.cos(angle);
//   const y = b * Math.sin(angle);

//   // Adjust positions based on the size of the logos to center them
//   logo.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
// });

////

// // logo animation
// document.addEventListener("DOMContentLoaded", function () {
//   const logos = document.querySelectorAll(".logo");

//   window.addEventListener("mousemove", function (e) {
//     logos.forEach((logo) => {
//       const logoRect = logo.getBoundingClientRect();
//       const centerX = logoRect.left + logoRect.width / 2;
//       const centerY = logoRect.top + logoRect.height / 2;

//       // Calculate the distance from the center of the logo to the cursor
//       const deltaX = e.clientX - centerX;
//       const deltaY = e.clientY - centerY;

//       // Calculate skew values: more pronounced skew as the cursor moves further from the logo's center
//       const skewY = deltaX / -30; // Creates a tilt effect as if the logos are facing the cursor
//       const skewX = deltaY / 30; // Optional: Adds a little vertical tilt, remove if not desired

//       // Use GSAP to animate the skew
//       gsap.to(logo, {
//         skewX: skewX,
//         skewY: skewY,
//         duration: 0.5, // Quick reaction time
//         ease: "power1.out",
//         transformOrigin: "center center",
//       });
//     });
//   });

//   // Reset skew on mouse leave
//   window.addEventListener("mouseleave", function () {
//     gsap.to(logos, {
//       skewX: 0,
//       skewY: 0,
//       duration: 0.5,
//       ease: "power1.out",
//     });
//   });
// });

//

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
// const wrappers = document.querySelectorAll('.gallery-image_wrapper');
// console.log(wrappers);

// wrappers.forEach(wrapper => {
//   wrapper.addEventListener('mousemove', function (e) {
//     const rect = wrapper.getBoundingClientRect();
//     const relX = e.clientX - rect.left;
//     const relY = e.clientY - rect.top;

//     const moveX = (relX - rect.width / 2) * 0.1; // Adjust the 0.1 value to change the strength of the effect
//     const moveY = (relY - rect.height / 2) * 0.1; // Adjust the 0.1 value to change the strength of the effect

//     gsap.to(wrapper, { duration: 0.3, x: moveX, y: moveY, ease: 'power2.out' });
//   });

//   wrapper.addEventListener('mouseleave', function () {
//     gsap.to(wrapper, { duration: 0.5, x: 0, y: 0, ease: 'power2.out' });
//   });
// });
