$(document).ready(function () {
    // Swiper ========================================

    new Swiper(".feedback-slider", {
        loop: true,
        speed: 900,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            // pauseOnMouseEnter: true,
        },
    });

    new Swiper(".blog__slider", {
        spaceBetween: 30,
        initialSlide: 1,
        loop: true,
        slideToClickedSlide: true,
        breakpoints: {
            593: {
                centeredSlides: true,
                slidesPerView: 2,
                spaceBetween: 30,
                loop: false,
            },

            1000: {
                slidesPerView: 3,
                spaceBetween: 40,
                centeredSlides: true,
                loop: false,
            },
        },
        navigation: {
            nextEl: ".blog__nextBtn",
            prevEl: ".blog__prevBtn",
        },
    });

    // new Swiper(".main__slider");

    // Variables ==========================================

    const header = $("header");
    const $hamburger = $(".hamburger");
    const $headerNav = $(".header__nav");

    // Поява drop menu в футері ===========================

    handleDropdownTriger();

    function handleDropdownTriger() {
        let screenSize = $(window).width();
        let fontBase = parseInt($("html").css("font-size"));

        if (screenSize / fontBase < 62.5) {
            // vieport width  / fz root element < (1000px = 62.5rem)
            $(".dropdown-triger")
                .off("click")
                .on("click", function (e) {
                    e.preventDefault();
                    if ($(this).next().css("display") !== "block") {
                        $(this).next().slideDown();
                        $($(this)).addClass("active");
                    } else {
                        $(this).next().slideUp();
                        $($(this)).removeClass("active");
                    }
                });
        } else {
            $(".dropdown-triger").off("click");
            $(".dropdown-menu").css("display", "block");
        }
    }

    $(window).resize(function () {
        handleDropdownTriger();
    });

    // header menu toggle ===================================

    $hamburger.on("click", function () {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            handleMenuHeight();
        } else {
            $headerNav.css("top", "-500%");
        }
    });

    function handleMenuHeight() {
        let height = header.innerHeight();
        $headerNav.css("top", height);
    }

    $(window).on("resize", function () {
        let screenWidth = $(this).width();
        let fontSize = parseInt($("html").css("font-size"));
        if (screenWidth / fontSize < 57.5 && $hamburger.hasClass("active")) {
            handleMenuHeight();
        }
    });

    // Show/hide menu on scroll ================================

    let prevScrollpos = window.pageYOffset;

    $(window).on("scroll", function () {
        let currentScrollPos = window.pageYOffset;
        let height = header.innerHeight();
        let positionNavig = parseInt($headerNav.css("top"));

        if (positionNavig < 0) {
            if (prevScrollpos > currentScrollPos || currentScrollPos <= 10) {
                header.css("top", "0");
            } else {
                header.css("top", -height);
            }
        }
        prevScrollpos = currentScrollPos;
    });
});
