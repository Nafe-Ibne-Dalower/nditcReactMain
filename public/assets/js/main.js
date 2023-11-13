
(function() {
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
   * Hero Animation
   */
  /**
   * Hero animation effect
   */
  // window.onload = function(){
  //   Particles.init({
  //     selector: '.background',
  //     maxParticles: 150,
  //     connectParticles: 'true',
  //     speed:2,
  //     minDistance: 140,
  //     sizeVariations: 4,
  //     color: '#ffffff'
  //   });
  // }
  var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var particles = [];
var maxParticles = 100;
var size = 2;
var r = size/2;
var clearColor = "rgba(0, 0, 0, .2";
var mouse = {};
mouse.x = w;
mouse.y = h;

function random(min, max){
	return (Math.random() * (max - min)) + min;
}

function getDistance(x1, y1, x2, y2){
	return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}


function resize(){
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight
}

function moveMouse(e){
	mouse.x = e.touches ? e.touches[0].clientX : e.clientX;
	mouse.y = e.touches ? e.touches[0].clientY : e.clientY;
}

function P(){}

P.prototype = {
	
	init: function(){
		this.x = random(0, (w ));
		this.y = h + random(0, 30);
		this.vx = 0;
		this.vy = random(-1, -2);
		this.alpha = 0;
		this.active = false;
	},
	
	draw: function(){
		var hue = (h - this.y) * .6;
		
		ctx.fillStyle = this.active ? "hsla("+(hue+180)+", 100%, 50%, 1)" : "hsla("+hue+", 100%, 50%, .8)";
		ctx.strokeStyle = this.active ? "hsla("+(hue+180)+", 100%, 50%, .5)" : "hsla("+hue+", 100%, 50%, "+this.alpha+")";
		ctx.lineWidth = r/2;
		ctx.globalCompositeOperation = this.active ? "lighter" : "source-over";
		
		ctx.beginPath();
		ctx.arc(this.x + r, this.y + r, r, 0, 2 * Math.PI, false);
		ctx.fill();
		
		for(var i in particles){
			var p = particles[i];
			if(getDistance(this.x, this.y, p.x, p.y) < w/7){
				ctx.beginPath();
				ctx.moveTo(this.x + r, this.y + r);
				ctx.lineTo(p.x + r, p.y + r);
				ctx.stroke();
			}
		}
		
		this.update();
	},
	
	update: function(){
		this.active = (getDistance(this.x, this.y, mouse.x, mouse.y) < 80) ? true : false;
		this.x += this.vx;
		this.y += this.vy;
		this.vx *= 1.15;
		this.alpha += .0005;
		if(this.y < h *3 && Math.random() > 10){
			this.vx = random(-1, 1);
			this.vy -= .005;
		}
		
		if(this.y + 50 < 0){
			this.init();
		}
	}
}



function setup(){
	
	for(var i=0; i<maxParticles; i++){
		(function(x){
			setTimeout(function(){
				var p = new P();
				p.init();
				particles.push(p);
			}, x * 10)
		})(i);
	}
	
	window.addEventListener("resize", resize);
	window.addEventListener("mousemove", moveMouse);
	window.addEventListener("touchstart", moveMouse);
	window.addEventListener("touchmove", moveMouse);
}


function anim(){
	ctx.fillStyle = clearColor;
	ctx.globalCompositeOperation = "source-over";
	ctx.fillRect(0,0,w,h);
	
	for(var i in particles){
		var p = particles[i];
		p.draw();
	}
	window.requestAnimationFrame(anim);
}

setup();

anim();

  /**
   * Hero animation effect
   */
  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 40,
      backDelay: 2000
    });
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
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
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
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
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

  // Preloader

  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }
  
  /**
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
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio video  
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
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
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


// Typing
var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('Welcome...')
    .pauseFor(2300)
    .deleteAll()
    .typeString('Welcome...')
    .start();


  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });