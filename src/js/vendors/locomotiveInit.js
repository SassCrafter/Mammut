import LocomotiveScroll from 'locomotive-scroll';
import '../../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
import { scaleValue } from '../utils';


const loco = new LocomotiveScroll({
    el: document.querySelector('.main'),
    offset: [0,0]
    // smooth: true
});

loco.on('scroll', (args) => {
    // Current srolled value
    const windowWidth = window.innerWidth;
    if (windowWidth >= 768 && windowWidth <= 899) return;
    let scrollValue = args.scroll.y;
    if (scrollValue >= 700) scrollValue = 700;
    let opacityVal = scaleValue(scrollValue, [0, 400], [0, 1]);
    const overlay = document.querySelector('.hero__overlay');
    if (windowWidth >= 900) {
        opacityVal = scaleValue(scrollValue, [0,800], [0, 1]);
        const imageWrapper = document.querySelector('.hero__image-wrapper');
        console.log(imageWrapper);
        imageWrapper.style.transform = `translate3d(0, -${scaleValue(scrollValue, [0, 1200], [0, 200])}px, 0)`;  
    }
    overlay.style.opacity = opacityVal;
});