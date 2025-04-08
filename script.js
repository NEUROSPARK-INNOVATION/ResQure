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
// var cursor = document.querySelector("#cursor");

function breakText() {
    var h2 = document.querySelector(".section-header h2");
    var h2Text = h2.textContent;
    var splittedText = h2Text.split("");
    var clutter = "";

    splittedText.forEach(function(elem) {
        if (elem === " ") {
            clutter += `<span style="display: inline-block;">&nbsp;</span>`; // Single gap between words
        } else {
            clutter += `<span style="display: inline-block;">${elem}</span>`; // No gap between letters
        }
    });

    h2.innerHTML = clutter.trim();
}
breakText();


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
    delay : -1,
    stagger:-0.3,
    scrub: 4,
})
gsap.from(".hero-content h1", {
    y: 30,
    opacity: 0,
    duration: 1.5,
    delay: 0.3,
    scrub: 4,
});

gsap.from(".hero-content p",{
    y:-40,
    duration: 1,
    opacity:0,  
    delay : 1.5,
    scrub: 4,
})

// gsap.from("#position-buttonLeft", {
//     x: -100, // Element comes from the left
//     opacity: 0, // Starts with opacity 0
//     duration: 2.5, // Animation duration
//     // delay: 0.5, // Delay before the animation starts
//     ease: "power1.inOut", // Smooth easing
//     scrub: 4, // Smooth scroll effect
//     // delay: 1, // Delay before the animation starts
    
// });

// gsap.from("#position-buttonRight", {
//     x: 100, // Element comes from the left
//     opacity: 0, // Starts with opacity 0
//     duration: 2.5, // Animation duration
//     // delay: 1.5, // Delay before the animation starts
//     ease: "power1.inOut", // Smooth easing
//     scrub: 4, // Smooth scroll effect
//     // delay: 1, // Delay before the animation starts
   
// });

breakText()
gsap.from(".section-header h2 span",{
    y:30,
    duration: 0.5,
    opacity:0,  
    delay : 1,
    stagger:0.1,
    scrub: 4,
    ease:"slow(0.7,0.7,false)",
    scrollTrigger:{
        trigger:".section-header",
        start:"top 70%",
        end:"top 50%",
        toggleActions:"play none none reverse",
        // markers:true,
    }
})
gsap.from(".section-header p",{
    y:-40,
    duration: 1,
    opacity:0,  
    delay : 1.5,
    scrub: 4, 
    scrollTrigger:{
        trigger:".section-header",
        start:"top 70%",
        end:"top 50%",
        toggleActions:"play none none reverse",
    }
})







// gsap.registerPlugin(ScrollTrigger);

// gsap.registerPlugin(ScrollTrigger);

// document.querySelectorAll(".feature-card").forEach((card, index) => {
//     gsap.fromTo(
//         card,
//         { y: 50, opacity: 0 },
//         {
//             y: 0,
//             opacity: 1,
//             duration: 0.6,
//             ease: "power3.inOut",
//             scrollTrigger: {
//                 trigger: card,
//                 start: "top 85%",
//                 toggleActions: "play none none none",
//             },
//         }
//     );

//     card.addEventListener("mouseenter", () => {
//         gsap.to(card, {
//             scale: 1.05,
//             boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
//             duration: 0.3,
//             ease: "power3.inOut",
//         });
//     });

//     card.addEventListener("mouseleave", () => {
//         gsap.to(card, {
//             scale: 1,
//             boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
//             duration: 0.3,
//             ease: "power3.inOut",
//         });
//     });
// });

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".feature-card").forEach((card, index) => {
    // Scroll animation for feature cards with line-by-line uprising effect
    gsap.fromTo(
        card,
        { y: 200, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
                
            },
            delay: index * 0.2, // Delay for uprising effect
        }
    );

    // Hover animation for feature cards
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 1.1,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#FBECF8", // Change color on hover
            duration: 0.3,
            ease: "power3.inOut",
        });

        // Change h3 color when mouse enters the card
        const h3 = card.querySelector("h3");
        if (h3) {
            h3.style.color = "#E83E8C";
        }
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1,
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "", // Reset color on mouse leave
            duration: 0.3,
            ease: "power3.inOut",
        });

        // Reset h3 color when mouse leaves the card
        const h3 = card.querySelector("h3");
        if (h3) {
            h3.style.color = "black";
        }
    });
});

// Scroll animation for the features grid container
gsap.fromTo(
    ".features-grid",
    { y: 50, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%",
            toggleActions: "play none none reverse", // Allows toggling when scrolling back
        },
    }
);

function breakText2() {
    var h2Elements = document.querySelectorAll(".preview-text h2");
    h2Elements.forEach(h2 => {
        var h2Text = h2.textContent;
        var splittedText = h2Text.split("");
        var clutter = "";

        splittedText.forEach(function(elem) {
            if (elem === " ") {
                clutter += `<span style="display: inline-block;">&nbsp;</span>`; // Single gap between words
            } else {
                clutter += `<span style="display: inline-block;">${elem}</span>`; // No gap between letters
            }
        });

        h2.innerHTML = clutter.trim();
    });
}
 breakText2();

// Ensure GSAP and ScrollTrigger are loaded
if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);

    // Create animations for each h2 in sequence
    document.querySelectorAll(".preview-text").forEach((section, index) => {
        const h2Spans = section.querySelectorAll("h2 span");

        if (h2Spans.length > 0) {
            gsap.from(h2Spans, {
                x: 30,
                duration: 0.5,
                opacity: 0,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "top 50%",
                    toggleActions: "play none none reverse",
                    markers: false // Set to true for debugging
                }
            });
        }
    });
} else {
    console.error("GSAP or ScrollTrigger is not loaded. Please include the GSAP library.");
}



// Ensure GSAP and ScrollTrigger are loaded
if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);

    // Animate h3 and p tags inside .preview-text
    document.querySelectorAll(".preview-text").forEach((section) => {
        const h3Elements = section.querySelectorAll("h3");
        const pElements = section.querySelectorAll("p");

        // Animate h3 tags
        if (h3Elements.length > 0) {
            gsap.from(h3Elements, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "expoScale(0.5,7,none)",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "top 60%",
                    toggleActions: "play none none reverse", // Reset animation when leaving the viewport
                },
            });
        }

        // Animate p tags with a delay of 0.5 after h3 animation
        if (pElements.length > 0) {
            gsap.from(pElements, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5, // Delay after h3 animation
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "top 60%",
                    toggleActions: "play none none reverse", // Reset animation when leaving the viewport
                },
            });
        }
    });
} else {
    console.error("GSAP or ScrollTrigger is not loaded. Please include the GSAP library.");
}

// Ensure GSAP and ScrollTrigger are loaded
if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);

    // Animate .preview-image elements line by line
    document.querySelectorAll(".preview-image img").forEach((image, index) => {
        gsap.from(image, {
            x: 200, // Image comes from the right
            opacity: 0, // Starts with opacity 0
            duration: 1, // Animation duration
            ease: "power3.out", // Smooth easing
            scrollTrigger: {
                trigger: image, // Trigger animation when the image enters the viewport
                start: "top 70%", // Start animation when the top of the image is 80% from the top of the viewport
                end: "top 60%", // End animation when the top of the image is 60% from the top of the viewport
                toggleActions: "play none none reverse", // Reset animation when leaving the viewport
            },
        });
    });
} else {
    console.error("GSAP or ScrollTrigger is not loaded. Please include the GSAP library.");
}

// gsap.from(".preview-image img", {
//     x: 100, // Image comes from the right
//     opacity: 0, // Starts with opacity 0
//     duration: 0.8, // Animation duration
//     ease: "power3.out", // Smooth easing
//     scrollTrigger: {
//         trigger: ".preview-image", // Trigger animation when the image enters the viewport
//         start: "top 80%", // Start animation when the top of the image is 80% from the top of the viewport
//         end: "top 60%", // End animation when the top of the image is 60% from the top of the viewport
//         toggleActions: "play none none reset", // Reset animation when leaving the viewport
//     },
// });





  document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem("email"); // or whatever key you used
    const signupSlot = document.getElementById("signup-slot");

    if (email) {
      // Replace Sign Up with a circular icon leading to dashboard
      signupSlot.innerHTML = `
        <a href="/dashboard/index.html" title="Go to Dashboard" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background-color: #3B82F6; color: white; font-size: 18px;">
          <img src="/assets/sarah.png">
        </a>
      `;
    }
  });




//   mobile

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active'); // Toggle nav menu visibility
        });
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active'); // Close menu after clicking a link
        });
    });

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

    // Sticky Navigation for mobile screens
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

