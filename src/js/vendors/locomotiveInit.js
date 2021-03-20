import LocomotiveScroll from 'locomotive-scroll';
import '../../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
import { scaleValue, getWindowWidth, getWindowHeight } from '../utils';


function heroScroll(args) {
    const windowWidth = getWindowWidth();
    if (windowWidth >= 768 && windowWidth <= 899) return;
    // Current srolled value
    let scrollValue = args.scroll.y;
    if (scrollValue >= 700) scrollValue = 700;
    let opacityVal = scaleValue(scrollValue, [0, 400], [0, 1]);
    const overlay = document.querySelector('.hero__overlay');
    if (windowWidth >= 900) {
        opacityVal = scaleValue(scrollValue, [0,800], [0, 1]);
        const imageWrapper = document.querySelector('.hero__image-wrapper');
        imageWrapper.style.transform = `translate3d(0, -${scaleValue(scrollValue, [0, 1200], [0, 200])}px, 0)`;  
    }
    overlay.style.opacity = opacityVal;
}

function meterScroll(args) {
    if(typeof args.currentElements['meter'] === 'object') {

        const meterEl = args.currentElements['meter'].el.querySelector('.meterImages__meter');
        let progress = args.currentElements['meter'].progress;
        const windowWidth = getWindowWidth();
        const windowHeight = getWindowHeight();
        if (windowWidth <= 768) return;
        const translateVal = scaleValue(progress, [0, 1], [0, windowHeight - 250]);
        meterEl.style.transform = `translateY(${translateVal}px)`;
        console.log(translateVal);

    }
}


function scrollHandler(args) {
    // Hero
    heroScroll(args);

    // Meter
    meterScroll(args);
}

const loco = new LocomotiveScroll({
    el: document.querySelector('.main'),
    offset: [0,0]
    // smooth: true
});

loco.on('scroll', (args) => {
    scrollHandler(args);
});