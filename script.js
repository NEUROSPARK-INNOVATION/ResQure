document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('appear');
            }
        });
    }
    
    
    // Run on initial load
    checkFade();
    
    // Run on scroll
    window.addEventListener('scroll', checkFade);
    
    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 15000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky Navigation
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
});

var main = document.querySelector("#main");
var cursor = document.querySelector("#cursor");

function breakText() {
    var h2 = document.querySelector(".section-header h2");
    var h2Text = h2.textContent;
    var splittedText = h2Text.split("");
    var clutter = "";

    splittedText.forEach(function(elem) {
        if (elem === " ") {
            clutter += `<span style="display: inline-block; width: 10px;"></span>`;
        } else {
            clutter += `<span style="display: inline-block;">${elem}</span>`;
        }
    });

    h2.innerHTML = clutter.trim();
}
// breakText();
 main.addEventListener("mousemove",function(dets){
    gsap.to(cursor,{
        x:dets.clientX,
        y:dets.clientY,
        stagger:-0.1,
        duration: 1.5,  
        // ease: "back.inOut(3)",
        ease:"back.out(1.7)",
    })
 });

var tl = gsap.timeline({});

tl.from(".logo",{
    y:-30,
    opacity:0,
    duration: 1.5,
    delay : 0.3,
    scrub: 4,
    
})
tl.from(".nav-menu li",{
    y:-30,
    opacity:0,
    duration: 1,
    delay : 0,
    stagger:-0.3,
    scrub: 4,
})
gsap.from(".hero-content h1",{
    // x:30,
    y:30,
    opacity:0,
    duration: 1.5,
    delay : 0.3,
    scrub: 4,
})
breakText()
gsap.from(".section-header h2 span",{
    y:30,
    duration: 0.5,
    opacity:0,  
    delay : 1,
    stagger:0.1,
    scrub: 4,
    scrollTrigger:{
        trigger:".section-header",
        start:"top 80%",
        end:"top 50%",
        toggleActions:"play none none reverse",
    }
})
gsap.from(".section-header p",{
    y:30,
    duration: 0.5,
    opacity:0,  
    delay : 1.5,
    scrub: 4,
    scrollTrigger:{
        trigger:".section-header",
        start:"top 80%",
        end:"top 50%",
        toggleActions:"play none none reverse",
    }
})


gsap.from("for image",{
    x:-30,
    duration: 1,
    opacity:0,  
    delay : 1,
    scrub: 4,
    scrollTrigger:{
        trigger:".about-content",
        start:"top 80%",
        end:"top 50%",
        toggleActions:"play none none reverse",

    }
})

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".feature-card").forEach((card, index) => {
    gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        }
    );

    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
            ease: "power3.out",
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1,
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power3.out",
        });
    });
});



