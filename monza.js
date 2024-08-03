document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello, World!");
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".sectionunderlay-slide", { y: "0" });
  /// initial entrance animations
  const tl = gsap.timeline();
  const heroItems = tl.to(".preloaderslide.preloader", {
    y: "-100%",
    stagger: 0.1,
    duration: 2,
    ease: "expo.out",
    delay: 1,
  });
  tl.from(".hero-decoration, .header-span.hero", {
    y: "200%",
    stagger: 0.07,
    duration: 0.6,
    ease: "expo.out",
    delay: -2,
  });
  gsap.to(".circular.outer", {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: "none",
  });
  gsap.to(".circular.inner", {
    rotation: -360,
    duration: 30,
    repeat: -1,
    ease: "none",
  });

  // top timeline
  gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "+=50px", // End after scrolling X px
      // markers: true,
      toggleActions: "play none none none",

      fastScrollEnd: true,
      preventOverlaps: true,

      onLeave: () => {
        document.querySelector(".header-container").style.mixBlendMode =
          "difference";

        gsap.to(".hero-decoration, .header-span.hero", {
          y: "-250%",
          stagger: 0.08,
          duration: 1,
          delay: 0.05,
          ease: "expo.out",
        });
        gsap.to(".sectionunderlay-slide", {
          y: "-100%",
          stagger: 0.1,
          duration: 3,
          ease: "expo.out",
          delay: 0.2,
        });
      },
      //   onLeave: () => {
      //     gsap.to(".header-span.hero", {
      //       y: "-250%",
      //       stagger: 0.08,
      //       duration: 1,
      //       ease: "expo.out",
      //     });
      //   },
      onEnterBack: () => {
        document.querySelector(".header-container").style.mixBlendMode =
          "normal";

        gsap.to(".hero-decoration, .header-span.hero", {
          y: "0",
          stagger: -0.08,
          duration: 1,
          ease: "expo.out",
        });
        gsap.to(".sectionunderlay-slide", {
          y: "0",
          stagger: -0.1,
          duration: 3,
          ease: "expo.out",
          delay: 0.3,
        });
      },
      //   onLeaveBack: () => {
      //     gsap.to(".header-span.hero", {
      //       y: "-250%",
      //       stagger: 0.08,
      //       duration: 1,
      //       ease: "expo.out",
      //     });
      //   },
    },
  });

  // bottom timeline
  gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "bottom bottom",
      end: "-=50px", // End after scrolling 20px
      // markers: true,
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(".footer-slide", {
          y: "0",
          stagger: 0.1,
          duration: 2,
          ease: "expo.out",
          delay: 0.2,
        });
        gsap.to(".footer-container", {
          y: "0",
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          delay: 1,
        });
      },
      onLeaveBack: () => {
        gsap.to(".footer-slide", {
          y: "100%",
          stagger: -0.1,
          duration: 2,
          ease: "expo.out",
          delay: 0.2,
        });
        gsap.to(".footer-container", {
          y: "100px",
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          delay: 0.1,
        });
      },
    },
  });

  //

  // image gallery slides timeline

  // Image gallery slides timeline
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".image-slide-sectionwrap",
        start: "top bottom", // Adjust this value as needed
        end: "bottom top", // Adjust this value as needed
        scrub: 3, // Synchronize the animation with the scrollbar
        markers: true,
        toggleActions: "play none none none",
      },
    })
    .fromTo("[image-slide-1]", { y: "100px" }, { y: "-100px" })
    .fromTo("[image-slide-2]", { y: "400px" }, { y: "-20px" }, "<")
    .fromTo("[image-slide-3]", { y: "600px" }, { y: "-300px" }, "<")
    .fromTo("[image-slide-4]", { y: "600px" }, { y: "-100px" }, "<")
    .fromTo("[image-slide-5]", { y: "1800px" }, { y: "-450px" }, "<");

  //

  // sticky section

  const sections = document.querySelectorAll(".sticky-section-wrap");

  sections.forEach((section, index) => {
    var body = section.querySelector(".sticky-section-body");
    var hoverLink = section.querySelector("[hover-image]");
    var contentHeight = body.clientHeight;
    console.log(body);
    ScrollTrigger.create({
      trigger: `.sticky-pseudo:nth-child(${index + 1})`,
      start: "top top",
      end: "bottom top",
      // body text
      onEnter: () => {
        gsap.fromTo(
          body,
          { opacity: 0, autoAlpha: 0, height: 0 },
          {
            opacity: 1,
            autoAlpha: 1,
            height: contentHeight,
            duration: 1,
            ease: "expo.out",
          }
        );
        gsap.fromTo(section, { opacity: 0.4 }, { opacity: 1 });
        gsap.fromTo(
          hoverLink,
          { display: "none" },
          { display: "block", delay: 0.1 }
        );
        // hoverLink.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      },
      onLeave: () => {
        gsap.to(body, {
          opacity: 0,
          autoAlpha: 0,
          height: 0,
          duration: 1,
          ease: "expo.out",
        });
        gsap.to(section, { opacity: 0.4 });
        gsap.to(hoverLink, { display: "none" });
        hoverLink.dispatchEvent(
          new MouseEvent("mouseleave", { bubbles: true })
        );
      },
      onEnterBack: () => {
        gsap.to(body, {
          opacity: 1,
          autoAlpha: 1,
          height: contentHeight,
          duration: 1,
          ease: "expo.out",
        });
        gsap.to(section, { opacity: 1 });
        gsap.to(hoverLink, { display: "block", delay: 0.1 });
        hoverLink.dispatchEvent(
          new MouseEvent("mouseenter", { bubbles: true })
        );
      },
      onLeaveBack: () => {
        gsap.to(body, {
          opacity: 0,
          autoAlpha: 0,
          height: 0,
          duration: 1,
          ease: "expo.out",
        });
        gsap.to(section, { opacity: 0.4 });
        gsap.to(hoverLink, { display: "none" });
        hoverLink.dispatchEvent(
          new MouseEvent("mouseleave", { bubbles: true })
        );
      },
    });
  });
  // setTimeout(() => {
  gsap.set(".sticky-section-body", { height: "0" });
  gsap.set("[hover-image]", { display: "none" });
  gsap.set(".sticky-section-wrap", { opacity: 0.4 });

  // sticky section spans
  gsap.from(".section-1-heading", {
    duration: 1,
    opacity: 0,
    y: "250%",
    stagger: 0.08,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".triggercontainer",
      start: "top 60%",
      end: "bottom top",
      markers: true,
      toggleActions: "play none none none",
    },
  });

  //

  gsap.set(".footer-slide", { y: "100%" });
  gsap.set(".footer-container", { y: "100px", opacity: 0 });
  gsap.fromTo(
    ".whatsapp-button-radial",
    { opacity: 0 }, // Start state
    {
      opacity: 1,
      ease: "power4.inOut",
      repeat: -1,
      duration: 2,
      yoyo: true,
    } // End state
  );
});

/// threejs

// const container = document.body;
const container = document.querySelector(".triggercontainer");
const itemsWrapper = document.querySelector(".hoverwrap");
// Preload images
const preloadImages = () => {
  return new Promise((resolve, reject) => {
    imagesLoaded(document.querySelectorAll("img"), resolve);
  });
};
// And then..
preloadImages().then(() => {
  // Remove the loader
  document.body.classList.remove("loading");
  const effect = new RGBShiftEffect(container, itemsWrapper, {
    strength: 0.25,
  });
});

// lenis

// Initialize Lenis with a longer duration for slower scroll effect
const lenis = new Lenis({
  duration: 20, // Increase the duration to slow down the scroll effect (2 seconds)
  easing: (t) => t * t * t, // Optional: Customize the easing function for a smoother effect
});

// Debounce the ScrollTrigger update to reduce performance hits
let scrollTriggerUpdate;
lenis.on("scroll", () => {
  clearTimeout(scrollTriggerUpdate);
  scrollTriggerUpdate = setTimeout(() => {
    ScrollTrigger.update();
  }, 100);
});

// Use requestAnimationFrame directly for smoother animations
const animate = (time) => {
  lenis.raf(time * 1000);
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);

// Adjust gsap.ticker settings if necessary
gsap.ticker.lagSmoothing(500, 1000);

//

// document.addEventListener("DOMContentLoaded", function () {
//   // add timeout
//   setTimeout(function () {
//     // function onLoad(spline) {
//     const obj = spline.findObjectByName("SMALL FINAL");
//     cube.current = obj;
//     console.log(cube.current);
//     //}
//   }, 5000);
// });

// circle text
new CircleType(document.querySelector(".circle-text"));

//

// video rendering
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("videoSource");
  const canvases = document.querySelectorAll(".video-canvas");
  const context = Array.from(canvases).map((canvas) => canvas.getContext("2d"));

  video.addEventListener(
    "play",
    function () {
      draw(video, context, canvases);
    },
    false
  );

  function draw(video, context, canvases) {
    if (video.paused || video.ended) return false;
    context.forEach((ctx, index) => {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const widthAdjustmentPercentage = 0.1; // Adjust this value as needed (e.g., 0.10 for 10%)
      const sliceWidth = video.videoWidth / canvases.length;
      const widthAdjustment = sliceWidth * widthAdjustmentPercentage;

      ctx.drawImage(
        video,
        sliceWidth * index,
        0,
        sliceWidth,
        video.videoHeight,
        0,
        0,
        canvases[index].width,
        canvases[index].height
      );
    });
    requestAnimationFrame(() => draw(video, context, canvases));
  }
});

// logos
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".circle-container");
  const logos = document.querySelectorAll(".logo");
  const total = logos.length;

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Define the semi-major axis (a) and semi-minor axis (b)
  const a = containerWidth / 2 - logos[0].offsetWidth / 2; // Horizontal radius adjusted for logo size
  const b = containerHeight / 2 - logos[0].offsetHeight / 2; // Vertical radius adjusted for logo size

  logos.forEach((logo, index) => {
    const angle = (index / total) * (2 * Math.PI); // Full circle in radians
    const x = a * Math.cos(angle);
    const y = b * Math.sin(angle);

    // Adjust positions based on the size of the logos to center them
    logo.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  });
});

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
// threejs logos

document.addEventListener("DOMContentLoaded", function () {
  const logos = document.querySelectorAll(".logo img");
  const imagesLoaded = Array.from(logos).map(
    (img) =>
      new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
        }
      })
  );

  Promise.all(imagesLoaded).then(() => {
    // hide all logos
    const logos = document.querySelectorAll(".logo img");
    logos.forEach((logo) => {
      logo.style.display = "none";
    });
    initializeScene(logos);
  });
});

function initializeScene(logos) {
  const logoCanvas = document.querySelector(".logo-canvas");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: logoCanvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const textureLoader = new THREE.TextureLoader();
  const logoMeshes = [];

  const container = document.querySelector(".circle-container");
  const total = logos.length;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const a = containerWidth / 2 - logos[0].offsetWidth / 2;
  const b = containerHeight / 2 - logos[0].offsetHeight / 2;

  logos.forEach((logo, index) => {
    const angle = (index / total) * (2 * Math.PI);
    const x = a * Math.cos(angle);
    const y = b * Math.sin(angle);
    const scaleFactor = 0.015;

    // if (!logo.src.includes(".svg")) {
    if (true) {
      console.log(logo.src);
      const logoTexture = textureLoader.load(logo.src);
      const baseHeight = 2.5;
      const aspectRatio = logo.naturalWidth / logo.naturalHeight;
      const depth = 0.0;

      const geometry = new THREE.PlaneGeometry(
        baseHeight * aspectRatio,
        baseHeight,
        depth
      );
      const material = new THREE.ShaderMaterial({
        uniforms: {
          texture: { type: "t", value: logoTexture },
        },
        vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
        fragmentShader: `
    uniform sampler2D texture;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(texture, vUv);
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      gl_FragColor = vec4(vec3(gray), color.a);
    }
  `,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      });

      const logoMesh = new THREE.Mesh(geometry, material);
      logoMesh.geometry.computeBoundingBox();
      logoMesh.position.set(x * scaleFactor, y * scaleFactor, 0);
      scene.add(logoMesh);
      logoMeshes.push(logoMesh);
    } else {
      const loader = new THREE.SVGLoader();
      loader.load(
        logo.src,
        function (data) {
          const paths = data.paths;
          console.log(paths);
          const group = new THREE.Group();

          paths.forEach((path) => {
            // const shapes = path.toShapes(true);
            const shapes = SVGLoader.createShapes(path);

            shapes.forEach((shape) => {
              const extrudeSettings = {
                steps: 2,
                depth: 40, // Adjust depth for the desired 3D effect
                bevelEnabled: true,
              };

              const geometry = new THREE.ExtrudeGeometry(
                shape,
                extrudeSettings
              );
              const material = new THREE.MeshBasicMaterial({
                map: textureLoader.load(
                  "https://uploads-ssl.webflow.com/6674190b466372b1e6a369d5/66a4d67b237ca3594e885dba_Porsche-Logo.png"
                ),
                color: path.userData.style.fill || 0xffffff,
                side: THREE.DoubleSide,
              });

              const mesh = new THREE.Mesh(geometry, material);
              group.add(mesh);
            });
          });

          // Compute the bounding box to scale and center the group
          const boundingBox = new THREE.Box3().setFromObject(group);
          const size = boundingBox.getSize(new THREE.Vector3());
          const center = boundingBox.getCenter(new THREE.Vector3());

          // Manually set the desired size (height) in scene units
          const desiredHeight = 4; // Adjust this value as needed for your scene
          const scale = desiredHeight / size.y;
          group.scale.set(scale, scale, scale);
          group.position.set(
            x * scaleFactor - center.x * scale,
            y * scaleFactor - center.y * scale,
            -center.z * scale
          );

          // group.scale.set(scale, -scale, scale); // Flip the Y-axis to correct inversion

          scene.add(group);
          logoMeshes.push(group);
        },
        undefined,
        function (error) {
          console.error("An error happened during SVG loading:", error);
        }
      );
    }
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  camera.position.z = 10;

  function renderScene() {
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }
  renderScene();

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  window.addEventListener("mousemove", function (e) {
    logoMeshes.forEach((logoMesh) => {
      let bbox = new THREE.Box3();
      if (logoMesh instanceof THREE.Group) {
        logoMesh.children.forEach((child) => {
          const childBbox = new THREE.Box3().setFromObject(child);
          bbox.union(childBbox);
        });
      } else {
        bbox = logoMesh.geometry.boundingBox;
      }

      const center = new THREE.Vector3(
        (bbox.min.x + bbox.max.x) / 2,
        (bbox.min.y + bbox.max.y) / 2,
        (bbox.min.z + bbox.max.z) / 2
      );

      logoMesh.localToWorld(center);
      center.project(camera);

      const centerX = ((center.x + 1) / 2) * window.innerWidth;
      const centerY = (-(center.y - 1) / 2) * window.innerHeight;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Normalize and clamp rotation values
      const maxRotation = Math.PI / 18; // Maximum rotation angle in radians (10 degrees)
      const targetRotationY = clamp(deltaX / 500, -maxRotation, maxRotation);
      const targetRotationX = clamp(deltaY / 500, -maxRotation, maxRotation);

      gsap.to(logoMesh.rotation, {
        y: targetRotationY,
        x: targetRotationX,
        duration: 4,
      });
    });
  });
}
