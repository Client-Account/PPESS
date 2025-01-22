/**
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()



const cardData = [
  {
    icon: "bi-compass-fill",
    title: "GPS RTK and PPK",
    description: "Harness advanced GPS Real-Time Kinematic (RTK) and Post-Processing Kinematic (PPK) systems for centimeter-level accuracy in geospatial data collection, enabling precise mapping and land surveys even in challenging environments.",
  },
  {
    icon: "bi-bezier2",
    title: "Auto Level/Dumpy Level",
    description: "Utilize robust and reliable auto-level instruments designed for high-precision leveling tasks. These tools are ideal for determining elevation differences in construction and infrastructure projects with utmost accuracy.",
  },
  {
    icon: "bi-slash-lg",
    title: "Rental of Instruments",
    description: "Access a wide range of surveying instruments, including total stations, GPS units, and laser scanners, for short-term or long-term projects. Our rental services ensure you get the latest tools without significant capital investment.",
  },
  {
    icon: "bi-archive-fill",
    title: "Level Surveys",
    description: "Perform meticulous level surveys to determine elevation changes across terrains, ensuring accurate data for construction, road development, and other civil engineering projects.",
  },
  {
    icon: "bi-lightning-charge",
    title: "Laser Scanner",
    description: "Leverage state-of-the-art laser scanning technology to capture precise 3D point cloud data for detailed modeling, structural analysis, and as-built documentation across various industries.",
  },
  {
    icon: "bi-airplane-engines-fill",
    title: "Total Stations",
    description: "Employ versatile total stations for measuring angles and distances with unparalleled accuracy, making them essential tools for complex land surveys, layout designs, and engineering projects.",
  },
  {
    icon: "bi-map",
    title: "Topographic Surveys",
    description: "Map natural and man-made features with precision. Topographic surveys provide critical data on terrain contours, elevations, and structures, serving as a foundation for planning and development.",
  },
  {
    icon: "bi-tools",
    title: "Geodetic Surveys",
    description: "Undertake geodetic surveys that account for Earth's curvature, ensuring accurate measurements for large-scale infrastructure projects, boundary determinations, and geospatial analysis.",
  },
  {
    icon: "bi-tree-fill",
    title: "Environmental Surveys",
    description: "Evaluate environmental conditions comprehensively to ensure project designs meet sustainability standards, environmental regulations, and ecological balance requirements.",
  },
  {
    icon: "bi-building",
    title: "Construction Layout",
    description: "Facilitate precise placement of structural components, utilities, and infrastructure on-site by aligning design blueprints with on-ground realities through accurate construction layout services.",
  },
  {
    icon: "bi-ruler",
    title: "Boundary Surveys",
    description: "Define property lines accurately to prevent disputes and establish legal ownership. Our boundary surveys provide clarity and detailed documentation for land division and acquisition.",
  },
  {
    icon: "bi-palette-fill",
    title: "Architectural Surveys",
    description: "Generate comprehensive measurements and detailed documentation for existing structures. These surveys are crucial for renovations, restorations, and architectural redesigns.",
  },
  {
    icon: "bi-layers",
    title: "Hydrographic Surveys",
    description: "Measure water bodies with precision, including depth, underwater features, and flow characteristics. Hydrographic surveys are vital for maritime navigation, dredging, and ecological studies.",
  },
  {
    icon: "bi-wind",
    title: "Wind Turbine Surveys",
    description: "Conduct site assessments, wind flow analyses, and structural inspections to optimize the design, placement, and performance of wind energy systems, ensuring sustainable energy production.",
  },
  {
    icon: "bi-globe2",
    title: "Drone Mapping",
    description: "Leverage cutting-edge drone technology to capture high-resolution aerial imagery and create accurate maps of inaccessible or hazardous areas, revolutionizing land surveying and inspections.",
  },
  {
    icon: "bi-sun",
    title: "Solar Site Surveys",
    description: "Analyze potential locations for solar panel installations, taking into account sun exposure, terrain, and environmental factors to ensure maximum energy generation and efficiency.",
  },
  {
    icon: "bi-water",
    title: "Flood Risk Assessment",
    description: "Identify and analyze areas vulnerable to flooding through detailed assessments, helping communities develop robust mitigation strategies and disaster preparedness plans.",
  },
  {
    icon: "bi-triangle",
    title: "Slope Stability Surveys",
    description: "Assess terrain stability to prevent landslides and ensure safe construction practices. These surveys are essential for projects in hilly or mountainous regions.",
  },
  {
    icon: "bi-camera-video",
    title: "Photogrammetry",
    description: "Transform aerial and ground-level photographs into detailed 3D models for use in urban planning, land surveys, and construction projects. Photogrammetry ensures accuracy and clarity.",
  },
  {
    icon: "bi-house-door",
    title: "Land Parcel Surveys",
    description: "Divide, allocate, and document land parcels with precision for various uses, including residential, commercial, and agricultural purposes, ensuring compliance with local regulations.",
  },
];


const cardsPerPage = 9;
let currentPage = 1;

const cardContainer = document.getElementById("card-container");
const seeMoreBtn = document.getElementById("see-more-btn");

function renderCards() {
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToRender = cardData.slice(startIndex, endIndex);

  cardsToRender.forEach((card) => {
    const cardHTML = `
      <div class="col-lg-4 col-md-6">
        <div class="icon-box">
          <div class="icon"><i class="${card.icon}"></i></div>
          <h4 class="title"><a href="#">${card.title}</a></h4>
          <p class="description">${card.description}</p>
        </div>
      </div>
    `;
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  });

  if (endIndex >= cardData.length) {
    seeMoreBtn.style.display = "none";
  }
}

seeMoreBtn.addEventListener("click", () => {
  currentPage++;
  renderCards();
});

// Initial render
renderCards();