//////////////////////BUNNER SLIDER /////////////////////////////////

const swiper = new Swiper('.main-banner__slider', {
    // Optional parameters
    speed: 600,
    direction: 'vertical',
    loop: true,
    loopAdditionalSlides: 0,
    spaceBetween: 0,
    grabCursor: true,
    slidesPerView: "auto",
    effect: "coverflow",
    initialSlide: 4,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 10,
        stretch: 0,
        scale: 1,
        depth: 30,
        modifier: 1.25,
        slideShadows: false,
    },
    mousewheel: {
        eventsTarget: ".main-banner__slider",
        sensitivy: 2,
    },
    slideToClickedSlide: true,
    loopPreventsSlide: true,

});


swiper.on('slideChange', function () {
    const activeSlide = swiper.slides[swiper.activeIndex].querySelector('.slide-content').innerText;

    document.querySelector('.slide-content-copy').innerText = activeSlide;
    document.querySelector('.main-banner__slider__overlay').style.width = document.querySelector('.slide-content-copy').clientWidth + 40 + "px";

});

//////////////////////PARALLAX/////////////////////////////////

let parallax = document.querySelectorAll('.scene__parallax');
parallax.forEach(item => {
    let parallaxInstance = new Parallax(item, {
        scalarX: 3,
        frictionX: 0.2
    });
})

//////////////////////SWIPER/////////////////////////////////

var swiperLabel = new Swiper(".main-banner__bottom", {
    slidesPerView: 'auto',
    spaceBetween: 70,
    mousewheel: true,
    // freeMode: true,
    loop: true,
    centeredSlides: true,
});

var reviewSwiper = new Swiper(".main-rewievs__slider", {
    slidesPerView: 1,
    spaceBetween: 40,
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    },
    breakpoints: {
        // when window width is >= 
        800: {
            slidesPerView: 1.7
        }
    },
});
var reviewSwiper = new Swiper(".awards__slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
        el: ".swiper-pagination",
        clicable: true,
    },
    breakpoints: {
        // when window width is >= 
        1100: {
            slidesPerView: 3
        },
        500: {
            slidesPerView: 2
        }
    },
});

///////////////////////////////PREFERENCE SLIDER//////////////////////////
let slidePreference = document.querySelectorAll('.preference-slide');

function addF(el, arr) {
    if (el.nextElementSibling) {
        el.nextElementSibling.classList.add('active');

    } else {
        arr[0].classList.add('active');
    }
    el.classList.remove('active', 'move');

}

function indexAdd(targetEl, arr) {
    if (targetEl.nextElementSibling) {
        targetEl.nextElementSibling.style.zIndex = +targetEl.style.zIndex + 1
    } else {
        arr[0].style.zIndex = +arr[arr.length - 1].style.zIndex + 1
    }
}

function animationAdd(targetEl) {
    targetEl.classList.add('move');
}

function addIndex(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[arr.length - (i + 1)].style.zIndex = i;
    }

}

addIndex(slidePreference);

[...slidePreference].forEach(item => {
    item.addEventListener('click', function () {
        const thisSlide = this;

        animationAdd(thisSlide);
        indexAdd(thisSlide, slidePreference);
        setTimeout(addF, 1000, thisSlide, slidePreference);
    })
})

document.querySelector('.preference-slider__btn').addEventListener('click', function () {
    let activeSlide = document.querySelector('.preference-slide.active');

    animationAdd(activeSlide);
    indexAdd(activeSlide, slidePreference)
    setTimeout(addF, 1000, activeSlide, slidePreference);
})
///////////////////////////////technology SLIDER//////////////////////////

let slideTec = document.querySelectorAll('.technology__slide');

addIndex(slideTec);
[...slideTec].forEach(item => {
    item.addEventListener('click', function () {

        console.log(this)
        animationAdd(this);
        indexAdd(this, slideTec);
        setTimeout(addF, 300, this, slideTec);
    })
})
document.querySelector('.technology__slider-button').addEventListener('click', function () {
    let activeSlide = document.querySelector('.technology__slide.active');

    animationAdd(activeSlide);
    indexAdd(activeSlide, slideTec)
    setTimeout(addF, 1000, activeSlide, slideTec);
})
/////////////sticky/////////////////////////

const boxInNav = document.querySelector('.js-menu-fixed');
const boxToTop = offset(boxInNav).top;
const nav = document.querySelector('.page-nav');
const navContainer = document.querySelector('.preference');



function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    }
}

function fixedNav(scroll) {
    let distanse = boxToTop - scroll
    if (distanse <= 150) {
        nav.classList.add('fixed');
        navContainer.classList.add('page-nav--empty')
    } else {
        nav.classList.remove('fixed');
        navContainer.classList.remove('page-nav--empty')
    }
}

function fixedStop(scroll) {
    const heightWindow = document.documentElement.clientHeight;
    const boxEnd = document.querySelector('.js-stop-fixed');
    const boxToEnd = offset(boxEnd).top;

    let distanseStop = heightWindow / 2 + scroll;
    if (nav.classList.contains('fixed')) {
        if (distanseStop >= boxToEnd) {
            nav.classList.remove('fixed');
            navContainer.classList.remove('page-nav--empty')
        }
    }
}




////////////////////animated nav fixed header////////

let pageSections = document.querySelectorAll('.js-scroll-sections'),
    pageLink = document.querySelectorAll('.page-nav__list-link'),
    header = document.querySelector('.header'),
    headerHeight = header.getBoundingClientRect().height;


function animateNavItem(sections, link, scroll) {
    sections.forEach(item => {
        let topSections = offset(item).top;
        if (scroll >= topSections - 150) {
            link.forEach(link => {
                let href = link.getAttribute('href');
                let id = item.getAttribute('id')

                if (href == `#${id}`) {
                    link.classList.add('active')
                } else {
                    link.classList.remove('active')
                }
            })
        }
    })
}

animateNavItem(pageSections, pageLink)


window.addEventListener('scroll', () => {
    const scroll = Math.round(window.scrollY);

    fixedHeader(header, scroll)
    fixedNav(scroll)
    fixedStop(scroll)
    animateNavItem(pageSections, pageLink, scroll)
})

document.querySelectorAll('.page-nav__list-item').forEach(item => {
    item.addEventListener('click', animateNavItem(pageSections, pageLink))
})
///////////////////////////////header fixed///////////////
function fixedHeader(header, scroll) {
    if (scroll > 10) {
        header.classList.add('fixed');
        document.querySelector('.body').style.paddingTop = `${headerHeight}px`;
    } else {
        header.classList.remove('fixed');
        document.querySelector('.body').style.paddingTop = 0;
    }
}
////////////////////////////плавный скролл//////////////////
function scrollToTop(elTop) {
    window.scrollTo({
        elTop,
        behavior: 'smooth'
    });
}

document.querySelectorAll('.page-nav__list-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        let id = this.getAttribute('href');
        let top = +offset(document.querySelector(id)).top - 100;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
        console.log('click')
    })
})
////////////////////////////animated menu//////////////////
document.querySelector('.burger__menu').addEventListener('click', function () {
    this.classList.toggle('opened');
    document.querySelector('.header__menu').classList.toggle('open');
})
document.querySelector('.header__drop-down').addEventListener('click', function () {
    this.classList.toggle('opened');
    document.querySelector('.drop-down__menu').classList.toggle('opened');
})
/////////validate



new JustValidate('.connect__form', {
    rules: {
        address: {
            required: true,
            minLength: 2,
        },
        tel: {
            required: true,
            minLength: 5,
        },

    },
    messages: {
        address: {
            required: 'Введите адрес Вашего сайта',
            minLength: 'Поле должно содержать минимум 2 символа'
        },
        tel: {
            required: 'Укажите ваш телефон',
            minLength: 'Поле должно содержать минимум 5 символов'
        },
    },
    colorWrong: '#7943A4'
});