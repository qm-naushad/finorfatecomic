let isTurning = false;

const container = document.querySelector('.horizontal-scroll');
const slide1 = document.getElementById('slide1');
const slide2 = document.getElementById('slide2');

window.addEventListener('wheel', function(e) {
    if (isTurning) return;

    if (container.scrollLeft === 0 && e.deltaY > 0) {
        isTurning = true;
        slide1.classList.add('turn');
        setTimeout(() => {
            slide1.classList.remove('turn');
            slide1.style.display = 'none';
            slide2.style.zIndex = '1';
            isTurning = false;
        }, 1000);
    } else if (container.scrollLeft === 0 && e.deltaY < 0) {
        // If scrolling back up when at the beginning
        isTurning = true;
        slide2.style.zIndex = '0';
        slide1.style.display = 'block';
        slide1.classList.remove('turn'); // Remove the turn class here
        setTimeout(() => {
            isTurning = false;
        }, 1000);
    }

    // Convert vertical scroll to horizontal scroll
    container.scrollLeft += e.deltaY;
    e.preventDefault();
}, { passive: false });





///////////////////////////////////////////////////////////////////


const bubbleSlides = [document.getElementById('slide1'), document.getElementById('slide2'), document.getElementById('slide3')];
const bubbleImages = [
    'bubble1.png',
    'bubble2.png',
    'bubble3.png',
    'bubble4.png',
    'bubble5.png'
];

function createBubble(slide) {
    const bubble = document.createElement('img');
    bubble.src = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
    bubble.classList.add('bubble');
    
    const randomLeft = Math.random() * 100;
    const randomSize = Math.random() * (150 - 50) + 50;
    const randomDuration = Math.random() * (8 - 4) + 4;

    bubble.style.left = `${randomLeft}vw`;
    bubble.style.width = `${randomSize}px`;
    bubble.style.height = `${randomSize}px`;
    bubble.style.animationDuration = `${randomDuration}s`;

    slide.appendChild(bubble);

    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

setInterval(() => {
    bubbleSlides.forEach(slide => {
        createBubble(slide);
    });
}, 300);


/////////////////////////////////////////////////////////////////////



const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

const leftSlides = [document.getElementById('slide6'), document.getElementById('slide7'), document.getElementById('slide8')];
const rightSlides = [document.getElementById('slide9'), document.getElementById('slide10'), document.getElementById('slide11')];

leftButton.addEventListener('click', () => {
    leftSlides.forEach(slide => {
        slide.style.display = 'inline-block';
    });
    rightSlides.forEach(slide => {
        slide.style.display = 'none';
    });
});

rightButton.addEventListener('click', () => {
    rightSlides.forEach(slide => {
        slide.style.display = 'inline-block';
    });
    leftSlides.forEach(slide => {
        slide.style.display = 'none';
    });
});



function checkSlideVisibility() {
    document.querySelectorAll('.slide').forEach((slide, index) => {
        const audio = slide.querySelector('audio');

        const slideLeft = slide.offsetLeft;
        const slideRight = slideLeft + slide.offsetWidth;
        const viewLeft = container.scrollLeft;
        const viewRight = viewLeft + container.offsetWidth;

        if (slideLeft < viewRight && slideRight > viewLeft) {
            audio.play();
        } else {
            audio.pause();
        }
    });
}

// Call the checkSlideVisibility function whenever the container is scrolled
container.addEventListener('scroll', checkSlideVisibility);

setInterval(checkSlideVisibility, 200);

///////////////////


let isMuted = false;

function toggleMute() {
    const audioElements = document.querySelectorAll("audio");
    const muteBtn = document.getElementById("muteBtn");

    isMuted = !isMuted;

    audioElements.forEach(audio => {
        audio.muted = isMuted;
    });

    if (isMuted) {
        muteBtn.src = "soundoff.png";
    } else {
        muteBtn.src = "soundon.png";
    }
}