/* =========================================
   1. MOBILE MENU TOGGLE
   ========================================= */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.right = '0';
        navLinks.style.background = '#0056b3';
        navLinks.style.width = '100%';
        navLinks.style.padding = '20px';
    });
}

/* =========================================
   2. HOME CAROUSEL LOGIC
   ========================================= */
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

if (carouselSlide) {
    let counter = 0;
    const size = 100;

    function updateSlide() {
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + '%)';
    }

    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) counter = -1;
        counter++;
        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) counter = carouselImages.length;
        counter--;
        updateSlide();
    });

    setInterval(() => {
        if (counter >= carouselImages.length - 1) counter = -1;
        counter++;
        updateSlide();
    }, 5000);
}

/* =========================================
   3. BOOKING LOGIC
   ========================================= */
function bookNow(doctorName) {
    localStorage.setItem('selectedDoctor', doctorName);
    window.location.href = 'booking.html';
}

const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    const savedDoctor = localStorage.getItem('selectedDoctor');
    const doctorSelect = document.getElementById('doctorSelect');

    if (savedDoctor && doctorSelect) {
        doctorSelect.value = savedDoctor;
    }

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const pName = document.getElementById('pName').value;
        const pDoctor = document.getElementById('doctorSelect').value;
        const pDate = document.getElementById('pDate').value;
        const pTime = document.getElementById('pTime').value;

        const selectedDate = new Date(pDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert('Error: You cannot select a past date.');
            return;
        }

        const appointment = {
            name: pName,
            doctor: pDoctor,
            date: pDate,
            time: pTime
        };

        localStorage.setItem('appointmentDetails', JSON.stringify(appointment));
        window.location.href = 'confirmation.html';
    });
}

/* =========================================
   4. CONFIRMATION DISPLAY
   ========================================= */
const confDetails = document.getElementById('confDetails');
if (confDetails) {
    const dataString = localStorage.getItem('appointmentDetails');
    if (dataString) {
        const data = JSON.parse(dataString);
        document.getElementById('confName').innerText = data.name;
        document.getElementById('confDoc').innerText = data.doctor;
        document.getElementById('confDateTime').innerText = `${data.date} at ${data.time}`;
    } else {
        window.location.href = 'index.html';
    }
}

/* =========================================
   5. CONTACT FORM
   ========================================= */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message Sent Successfully!');
        contactForm.reset();
    });
}
