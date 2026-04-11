document.addEventListener('DOMContentLoaded', function() {

// --- 1. MOBILE MENU TOGGLE ---
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });
}

// --- 2. SWIPER INITIALIZATION ---
// We initialize both your project swiper and your future feedback swiper
var projectSwiper = new Swiper(".mySwiper", {
    pagination: { el: ".swiper-pagination", clickable: true },
    autoplay: { delay: 3000 },
    loop: true
});

 // --- 3. FEEDBACK SWIPER (The New One) ---
    // This is the "Engine" that was missing!
    if (document.querySelector(".feedbackSwiper")) {
        new Swiper(".feedbackSwiper", {
            loop: true,
            speed: 800, // Smooth transition speed
            autoplay: { 
                delay: 4000,
                disableOnInteraction: false 
            },
            pagination: { 
                el: ".swiper-pagination", 
                clickable: true 
            },
            // This ensures it looks good on both phone and laptop
            slidesPerView: 1,
            spaceBetween: 30
        });
    }

// --- 4. COUNTER ANIMATION LOGIC (Re-reads every time) ---
const counters = document.querySelectorAll('.counter');

const countToTarget = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = 100; // Adjust for smoothness
    const inc = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => countToTarget(counter), 20);
    } else {
        counter.innerText = target;
    }
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countToTarget(entry.target);
        } else {
            entry.target.innerText = "0"; // Resets so it counts up again
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => statsObserver.observe(c));
});
// This makes the whole box clickable
document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', function() {
        this.querySelector('.card-inner').classList.toggle('is-flipped');
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Optional flipbook controls – only activate if elements exist
    const nextButton = document.getElementById("next-btn");
    const prevButton = document.getElementById("prev-btn");
    const papers = document.querySelectorAll(".paper");

    if (nextButton && prevButton && papers.length > 0) {
        let currentPage = 0;
        const totalPages = papers.length;

        // Initial z-index setup
        papers.forEach((paper, index) => {
            paper.style.zIndex = totalPages - index;
        });

        function goNextPage() {
            if (currentPage < totalPages) {
                papers[currentPage].classList.add("flipped");
                papers[currentPage].style.zIndex = currentPage + 1;
                currentPage++;
            }
        }

        function goPrevPage() {
            if (currentPage > 0) {
                currentPage--;
                papers[currentPage].classList.remove("flipped");
                papers[currentPage].style.zIndex = totalPages - currentPage;
            }
        }
        nextButton.addEventListener("click", goNextPage);
        prevButton.addEventListener("click", goPrevPage);
    }
    });