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


let parallax = document.querySelectorAll('.scene__parallax');
parallax.forEach(item => {
    let parallaxInstance = new Parallax(item, {
        scalarX: 3,
        frictionX: 0.2
    });
})



var swiperLabel = new Swiper(".main-banner__bottom", {
    slidesPerView: 'auto',
    spaceBetween: 70,
    mousewheel: true,
    // freeMode: true,
    loop: true,
    centeredSlides: true,
});
// var swiperPreference = new Swiper(".preference-slider", {
//     effect: "creative",
//     creativeEffect: {
//         prev: {
//             shadow: true,
//             translate: ["-20%", 0, -1],
//         },
//         next: {
//             translate: ["100%", 0, 0],
//         },
//     },
//     grabCursor: true,
//     pagination: {
//         el: ".swiper-pagination",
//         type: "fraction",
//     },
//     // navigation: {
//     //     nextEl: ".swiper-button-next",
//     //     prevEl: ".swiper-button-prev",
//     // },
// });
let slidePreference = document.querySelectorAll('.preference-slide');
for (let i = 1; i <= slidePreference.length; i++) {
    slidePreference[slidePreference.length - i].style.zIndex = i;
}

slidePreference.forEach(slide => {

    slide.addEventListener('click', function () {
        console.log('click')
        this.classList.add('move');
        const thisSlide = this;

        function addF(el) {
            if (el.nextElementSibling) {
                el.nextElementSibling.classList.add('active');

            } else {
                el.closest('.preference-slider').firstElementChild.classList.add('active');

            }
            el.classList.remove('active', 'move');
            el.style.zIndex = el.style.zIndex - (slidePreference.length - 1)

        }
        setTimeout(addF, 1000, thisSlide);

    })
})