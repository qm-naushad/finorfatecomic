const container = document.querySelector('.horizontal-scroll');

window.addEventListener('mousewheel', function(e) {
    // Convert vertical scroll to horizontal scroll
    container.scrollLeft += e.deltaY;
    e.preventDefault();
}, { passive: false });
