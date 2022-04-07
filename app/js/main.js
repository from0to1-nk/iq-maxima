// function removeClass() {
//     modificate = document.querySelectorAll('.js-mini');
//     modificate.forEach(element => {
//         element.classList.remove('js-mini');
//     });

// }

// function addClass() {
//     let prevSlide = document.querySelector('.main-banner__slide.swiper-slide-prev');
//     let nextSlide = document.querySelector('.main-banner__slide.swiper-slide-next');
//     let firstSlide = prevSlide.previousElementSibling;
//     let lastSlide = nextSlide.nextElementSibling.nextElementSibling.nextElementSibling;
//     let lastlast = lastSlide.nextElementSibling

//     firstSlide.classList.add('js-mini');
//     console.log(lastlast)
//     lastSlide.classList.add('js-mini')
// }

// function animate() {
//     slides = document.querySelectorAll('.main-banner__slide');
//     slides.forEach(element => {
//         element.classList.add('js-animate');
//     });

// }

// bunnerSwiper.on('slideChange', function () {
//     removeClass()
//     addClass()
//     animate()


// });

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
const technologySwiper = new Swiper('.technology__slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',

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

for (let i = 0; i < slidePreference.length; i++) {
    slidePreference[slidePreference.length - (i + 1)].style.zIndex = i;
}

[...slidePreference].forEach(item => {
    item.addEventListener('click', function () {
        const thisSlide = this;

        animationAdd(thisSlide);
        indexAdd(thisSlide, slidePreference);
        setTimeout(addF, 1000, thisSlide, slidePreference);
    })
})

document.querySelector('.slider-button').addEventListener('click', function () {
    let activeSlide = document.querySelector('.preference-slide.active');

    animationAdd(activeSlide);
    indexAdd(activeSlide, slidePreference)
    setTimeout(addF, 1000, activeSlide, slidePreference);
})