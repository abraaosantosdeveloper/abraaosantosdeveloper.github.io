class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation ? (link.style.animation ="") : (link.style.animation = `navLinkFade 0.5s ease forwards ${ index /7+0.3}s`)
            link.classList.toggle(this.activeClass);
            link.addEventListener("click", this.handleClick);
        });
    }

    handleClick() {
        this.animateLinks();
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
        if(this.mobileMenu){
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li"
);

mobileNavbar.init();


document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the target element (the #about section)
    const target = document.getElementById('home');

    // Calculate the offset to scroll to, ensuring it's not too close to the top
    const offset = target.offsetTop - 100; // Adjust the offset as needed

    // Scroll to the target with a smooth animation
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
});
document.getElementById('about-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the target element (the #about section)
    const target = document.getElementById('about');

    // Calculate the offset to scroll to, ensuring it's not too close to the top
    const offset = target.offsetTop - 50; // Adjust the offset as needed

    // Scroll to the target with a smooth animation
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
});
document.getElementById('buttonGetStarted').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the target element (the #about section)
    const target = document.getElementById('about');

    // Calculate the offset to scroll to, ensuring it's not too close to the top
    const offset = target.offsetTop - 50; // Adjust the offset as needed

    // Scroll to the target with a smooth animation
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
});
document.getElementById('portfolio-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the target element (the #about section)
    const target = document.getElementById('portfolio');

    // Calculate the offset to scroll to, ensuring it's not too close to the top
    const offset = target.offsetTop - 50; // Adjust the offset as needed

    // Scroll to the target with a smooth animation
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
});
document.getElementById('contact-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the target element (the #about section)
    const target = document.getElementById('contact');

    // Calculate the offset to scroll to, ensuring it's not too close to the top
    const offset = target.offsetTop - 50; // Adjust the offset as needed

    // Scroll to the target with a smooth animation
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
});
