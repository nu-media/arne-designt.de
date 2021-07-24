window.onload = () => {
  const imageHover = document.querySelectorAll('[data-hover]');
  imageHover.forEach(image => {
    image.addEventListener('mouseenter', hoverImageActionStart)
    image.addEventListener('mouseleave', hoverImageActionEnd)
  });

  const animation = document.querySelectorAll('.animation');
  const fade = document.querySelectorAll('.fade');
  window.onscroll = (event) => {
    animation.forEach(elm => {
      if((elm.getBoundingClientRect().top - (window.innerHeight)) < 0 ) {
        elm.classList.add('animate')
      }
    });
    fade.forEach(elm => {
      if((elm.getBoundingClientRect().top - (window.innerHeight)) < 0 ) {
        elm.classList.add('faded')
      }
    });
  }

  const mailLinks = document.querySelectorAll('[data-mail]');
  mailLinks.forEach((link) => {
    link.addEventListener('click', protectedMail);
  })

  if(document.querySelector('.mockupContainer')) {
    const slider = new Slider();
    slider.init();
  }
}

function protectedMail(e) {
  e.preventDefault()
  let target = e.target.dataset.mail;
  let domain = window.location.hostname;
  window.location.href = 'mailto:'+target+'@'+domain;
}

function updatePadding() {
  let elWrapper = document.querySelector('.timeline'),
      end = document.querySelector('.timeline .year.last'),
      total = elWrapper.getBoundingClientRect().height,
      wrapperTop = elWrapper.getBoundingClientRect().top + window.scrollY,
      endTop = end.getBoundingClientRect().top + window.scrollY,
      targetEl = document.querySelector('.timeline .fixedwrapper');

      targetEl.style.paddingBottom = total - (total);
      console.log(window.scrollY, wrapperTop, total, endTop);
}

function hoverImageActionStart(e) {
  let offsetX = e.target.offsetWidth,
      offsetY = e.target.offsetHeight,
      src = e.target.dataset.hover,
      img = document.createElement('img');

  console.log(e, offsetX, offsetY);

  img.src = src;
  img.className = "jsHoverImage";
  img.style.left = (offsetX + 50) + 'px'
  img.style.top = '0px'
  console.log((offsetX * 2) + 'px');
  e.target.append(img);
}

function hoverImageActionEnd(e) {
  document.querySelector('.jsHoverImage').remove();
}

class Slider {
  constructor() {
    this.container = document.querySelector('.mockupContainer');
    this.slides = this.container.querySelectorAll('.mockupSlide');
    this.buttonNext = document.querySelector('.mockupArrow[data-action="next"]');
    this.buttonPrev = document.querySelector('.mockupArrow[data-action="prev"]');
    this.nav = document.querySelector('.mockupNav');
    this.current = 0;
    this.max = this.slides.length - 1;
  }


  cssClasses() {
    let prev = (this.current === 0) ? this.max : this.current - 1;
    let next = (this.current === this.max) ? 0 : this.current + 1;

    this.container.scrollTop = 0;

    this.slides.forEach(slide => {
      slide.classList.remove('prev');
      slide.classList.remove('next');
      slide.classList.remove('active');
    })

    this.slides[this.current].classList.add('active')
    this.slides[prev].classList.add('prev')
    this.slides[next].classList.add('next')

    for(let child of this.nav.children) {
      child.classList.remove('active')
      if(child.dataset.goto == prev) child.classList.add('prev');
      if(child.dataset.goto == next) child.classList.add('next');
      if(child.dataset.goto == this.current) child.classList.add('active');
    }
  }

  next() {
    this.current = (this.current < this.max) ? this.current + 1 : 0;
    this.cssClasses();
  }
  prev() {
    this.current = (this.current > 0) ? this.current - 1 : this.max;
    this.cssClasses();
  }
  goto(e) {
    this.current = parseInt(e.target.dataset.goto);
    this.cssClasses()
  }
  addNav() {
    for(let i = 0; i <= this.max; i++) {
      let navButton = document.createElement('button');
      if(i == 0) navButton.classList.add('active');
      navButton.setAttribute('data-goto', i);
      navButton.addEventListener('click', this.goto.bind(this));
      this.nav.appendChild(navButton);
    }
  }

  init() {
    this.cssClasses();
    this.addNav();
    this.buttonNext.addEventListener('click', this.next.bind(this))
    this.buttonPrev.addEventListener('click', this.prev.bind(this))
  }

}