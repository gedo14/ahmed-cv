/* =========================================
   AHMED HLA — WEBSITE JAVASCRIPT
========================================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("back-to-top");
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(".reveal");
const currentYear = document.getElementById("current-year");


/* =========================
   CURRENT YEAR
========================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================
   MOBILE MENU
========================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

}


/* =========================
   CLOSE MENU AFTER CLICK
========================= */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


/* =========================
   HEADER + BACK TO TOP
========================= */

function handleScroll() {

    const scrollPosition = window.scrollY;


    // Navbar background
    if (scrollPosition > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    // Back to top button
    if (scrollPosition > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }


    updateActiveNavigation();

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);


/* =========================
   ACTIVE NAVIGATION
========================= */

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");


        if (
            target ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================
   BACK TO TOP
========================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================
   SCROLL REVEAL
========================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin:
                "0px 0px -40px 0px"
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   HERO LOAD ANIMATION
========================= */

window.addEventListener(
    "load",
    () => {

        document
            .querySelectorAll(".hero .reveal")
            .forEach(element => {

                setTimeout(() => {

                    element.classList.add(
                        "active"
                    );

                }, 150);

            });

    }
);


/* =========================
   MAGNETIC BUTTON EFFECT
========================= */

const primaryButtons =
    document.querySelectorAll(
        ".btn-primary"
    );


primaryButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `translate(
                    ${x * 0.08}px,
                    ${y * 0.08}px
                )`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* =========================
   SOCIAL ICON TILT
========================= */

const socialButtons =
    document.querySelectorAll(
        ".social, .contact-socials a"
    );


socialButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateY =
                ((x / rect.width) - 0.5) *
                12;


            const rotateX =
                ((y / rect.height) - 0.5) *
                -12;


            button.style.transform =
                `perspective(400px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* =========================
   HERO PARALLAX
========================= */

const heroImage =
    document.querySelector(
        ".hero-image-wrapper"
    );


window.addEventListener(
    "mousemove",
    event => {

        if (
            !heroImage ||
            window.innerWidth < 900
        ) {
            return;
        }


        const x =
            (
                event.clientX /
                window.innerWidth -
                0.5
            ) * 8;


        const y =
            (
                event.clientY /
                window.innerHeight -
                0.5
            ) * 8;


        heroImage.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);


/* =========================
   ESC KEY
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            navLinks.classList.remove(
                "open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    }
);


/* =========================
   INITIALIZE
========================= */

handleScroll();