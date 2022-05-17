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
        clickable: true,
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

addIndex(slidePreference);

[...slidePreference].forEach(item => {
    item.addEventListener('click', function () {
        const thisSlide = this;

        animationAdd(thisSlide);
        indexAdd(thisSlide, slidePreference);
        setTimeout(addF, 1000, thisSlide, slidePreference);
    })
})

try {
    document.querySelector('.preference-slider__btn').addEventListener('click', function () {
        let activeSlide = document.querySelector('.preference-slide.active');

        animationAdd(activeSlide);
        indexAdd(activeSlide, slidePreference)
        setTimeout(addF, 1000, activeSlide, slidePreference);
    })
} catch {}


function addIndex(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[arr.length - (i + 1)].style.zIndex = i;
    }

}
///////////////////////////////technology SLIDER//////////////////////////
try {
    let slideTec = document.querySelectorAll('.technology__slide');

    addIndex(slideTec);
    [...slideTec].forEach(item => {
        item.addEventListener('click', function () {
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
} catch {}

/////////////sticky/////////////////////////

const boxInNav = document.querySelector('.js-menu-fixed');
const boxToTop = offset(boxInNav).top;
const nav = document.querySelector('.page-nav');
const navContainer = nav.nextElementSibling;


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

////////effect button/////////////////////////////////

// document.querySelectorAll('.js-animated-button').forEach(button => {
//     button.addEventListener('mouseover', function (e) {
//         let
//             size = Math.max(this.offsetWidth, this.offsetHeight),
//             x = e.offsetX - size / 2,
//             y = e.offsetY - size / 2,
//             wave = this.querySelector('.wave');
//         if (!wave) {
//             wave = document.createElement('span')
//             wave.className = 'wave'
//         }
//         wave.style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px`
//         this.appendChild(wave)
//     })
// })

document.querySelectorAll('.js-animated-button').forEach(el => {
    el.addEventListener('mouseover', function (e) {
        let
            size = Math.max(this.offsetWidth, this.offsetHeight),
            x = e.offsetX - size / 2,
            y = e.offsetY - size / 2,
            wave = this.querySelector('.wave')

        // Create an element if it doesn't exist
        if (!wave) {
            wave = document.createElement('span')
            wave.className = 'wave'
        }


        wave.style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px`
        this.appendChild(wave)
    })
})
////////////////////////

const subtitle = document.querySelectorAll('.services__item-suptitle');

for (let index = 0; index < subtitle.length; index++) {
    console.log(subtitle[index])
    if (subtitle[index].innerText.length > 14) {
        subtitle[index].style.cssText = 'font-size:41px'
    }
}
///////////////////

// build tween
// var tween = TweenMax.to("#animate", 100, {
//     autoAlpha: 0,
//     perspective: 55,
//     rotationY: 90,
//     ease: Power0.easeNone
// });
const accTitiles = document.querySelectorAll('.seo-include__button');
const accText = document.querySelectorAll('.panel.open');
accTitiles.forEach(item => {
    item.addEventListener('click', function () {
        let panel = this.nextElementSibling;
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            panel.classList.remove('open');
        } else {
            this.classList.add('active');
            panel.classList.add('open');
        }
    })
})
//////////////////////select//////////////////////////////
document.querySelectorAll('.card').forEach((elSelectParent) => {
    selected(elSelectParent)
})




function selected(elSelectParent) {
    const elSelectNative = elSelectParent.getElementsByClassName("js-selectNative")[0];
    const elSelectCustom = elSelectParent.getElementsByClassName("js-selectCustom")[0];
    const elSelectCustomBox = elSelectCustom.children[0];
    const elSelectCustomOpts = elSelectCustom.children[1];
    const customOptsList = Array.from(elSelectCustomOpts.children);
    const optionsCount = customOptsList.length;
    const defaultLabel = elSelectCustomBox.getAttribute("data-value");


    let optionChecked = "";
    let optionHoveredIndex = -1;


    // Toggle custom select visibility when clicking the box
    elSelectCustomBox.addEventListener("click", (e) => {
        const isClosed = !elSelectCustom.classList.contains("isActive");

        if (isClosed) {
            openSelectCustom();
        } else {
            closeSelectCustom();
        }
    });

    function openSelectCustom() {
        elSelectCustom.classList.add("isActive");
        // Remove aria-hidden in case this was opened by a user
        // who uses AT (e.g. Screen Reader) and a mouse at the same time.
        elSelectCustom.setAttribute("aria-hidden", false);

        if (optionChecked) {
            const optionCheckedIndex = customOptsList.findIndex(
                (el) => el.getAttribute("data-value") === optionChecked
            );
            updateCustomSelectHovered(optionCheckedIndex);
        }

        // Add related event listeners
        document.addEventListener("click", watchClickOutside);
        document.addEventListener("keydown", supportKeyboardNavigation);
    }

    function closeSelectCustom() {
        elSelectCustom.classList.remove("isActive");

        elSelectCustom.setAttribute("aria-hidden", true);

        updateCustomSelectHovered(-1);

        // Remove related event listeners
        document.removeEventListener("click", watchClickOutside);
        document.removeEventListener("keydown", supportKeyboardNavigation);
    }

    function updateCustomSelectHovered(newIndex) {
        const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
        const option = elSelectCustomOpts.children[newIndex];

        if (prevOption) {
            prevOption.classList.remove("isHover");
        }
        if (option) {
            option.classList.add("isHover");
        }

        optionHoveredIndex = newIndex;
    }

    function updateCustomSelectChecked(value, text) {
        const prevValue = optionChecked;

        const elPrevOption = elSelectCustomOpts.querySelector(
            `[data-value="${prevValue}"`
        );
        const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

        if (elPrevOption) {
            elPrevOption.classList.remove("isActive");
        }

        if (elOption) {
            elOption.classList.add("isActive");
        }

        elSelectCustomBox.textContent = text;
        optionChecked = value;
    }

    function watchClickOutside(e) {
        const didClickedOutside = !elSelectCustom.contains(event.target);
        if (didClickedOutside) {
            closeSelectCustom();
        }
    }

    function supportKeyboardNavigation(e) {
        // press down -> go next
        if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
            let index = optionHoveredIndex;
            e.preventDefault(); // prevent page scrolling
            updateCustomSelectHovered(optionHoveredIndex + 1);
        }

        // press up -> go previous
        if (event.keyCode === 38 && optionHoveredIndex > 0) {
            e.preventDefault(); // prevent page scrolling
            updateCustomSelectHovered(optionHoveredIndex - 1);
        }

        // press Enter or space -> select the option
        if (event.keyCode === 13 || event.keyCode === 32) {
            e.preventDefault();

            const option = elSelectCustomOpts.children[optionHoveredIndex];
            const value = option && option.getAttribute("data-value");

            if (value) {
                elSelectNative.value = value;
                updateCustomSelectChecked(value, option.textContent);
            }
            closeSelectCustom();
        }

        // press ESC -> close selectCustom
        if (event.keyCode === 27) {
            closeSelectCustom();
        }
    }

    // Update selectCustom value when selectNative is changed.
    elSelectNative.addEventListener("change", (e) => {
        const value = e.target.value;
        const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
            `[data-value="${value}"]`
        )[0];

        updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
    });

    // Update selectCustom value when an option is clicked or hovered
    customOptsList.forEach(function (elOption, index) {
        elOption.addEventListener("click", (e) => {
            const value = e.target.getAttribute("data-value");

            // Sync native select to have the same value
            elSelectNative.value = value;
            updateCustomSelectChecked(value, e.target.textContent);
            closeSelectCustom();
        });

        elOption.addEventListener("mouseenter", (e) => {
            updateCustomSelectHovered(index);
        });

        // TODO: Toggle these event listeners based on selectCustom visibility
    });
}


//////////////////////end select////////////////////////////////////////////////

const tl1 = gsap.to('.logo-bunner', {
    opacity: 0,
    duration: .5,
    ease: 'slow'
});

const tl = gsap.timeline();
tl.delay(1)


tl.to('.main-bunner__title', {
    left: 0,
    duration: .5,
    ease: "power2.out"
});
tl.to('.main-bunner__text', {
    bottom: 0,
    duration: .5,
    opacity: 1,
    ease: 'slow'
});
tl.to('.main-banner__slider', {
    opacity: 1,
    duration: .5,
    ease: 'slow'
}, "<")
tl.to('.header', {
    left: 0,
    ease: "power2.out"
})

const buttons = gsap.to('.main-bunner__btn-box', {
    opacity: 1,
    duration: .5,
})
var currentDelay = buttons.delay();
buttons.delay(2);

const tl2 = gsap.to('.main-banner__bottom', {
    opacity: 1,
    duration: .5
})

ScrollTrigger.create({
        animation: tl2,
        trigger: '.main-banner',
        start: 'top top',
        end: 'bottom',
        scrub: true,
    }

)

const animSections = document.querySelectorAll('.js-scroll-anim')

animSections.forEach(item => {
    const tl3 = gsap.to(item, {
        opacity: 0,
        //scaleY: .3,
        duration: .3,
        scrollTrigger: {
            trigger: item,
            start: 'top top',
            scrub: true
        },
        markers: true
    })
})

// const tl4 = gsap.to('.awards__slider', {
//     right: 0,
//     ease: "power2.out",
//     duration: .5,
// })

// ScrollTrigger.create({
//         animation: tl4,
//         trigger: '.awardas__inner',
//         start: 'top 20%',
//         toggleActions: 'restart revese none none'
//     }

// )

const tl5 = gsap.timeline();
tl5.fromTo('.all-project', {
    y: '200px',

}, {
    y: '0px',

})


ScrollTrigger.create({
    animation: tl5,
    trigger: '.all-project',
    duration: .5,
    start: 'top bottom',
    end: 'top center',
    // start: topAnimation,
    scrub: true,

    // toggleActions: 'play none none none'
    //pin: true
});