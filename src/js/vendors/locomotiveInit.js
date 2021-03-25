import LocomotiveScroll from 'locomotive-scroll';
import '../../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
import { slider } from '../app';
import { scaleValue, getWindowWidth, getWindowHeight, addClasses, removeClasses } from '../utils';
import { animation, setVals } from '../animations';
import { windowWidth, windowHeight } from '../app';




function heroScroll(args) {
    // const windowWidth = getWindowWidth();
    if (windowWidth >= 768 && windowWidth <= 899) return;
    // Current srolled value
    let scrollValue = args.scroll.y;
    if (scrollValue >= 700) scrollValue = 700;
    let opacityVal = scaleValue(scrollValue, [0, 400], [0, 1]);
    const overlay = document.querySelector('.hero__overlay');
    if (windowWidth >= 900) {
        opacityVal = scaleValue(scrollValue, [0,800], [0, 1]);
        const imageWrapper = document.querySelector('.hero__image-wrapper');
        animation(imageWrapper, {y: -scaleValue(scrollValue, [0, 1200], [0, 200])})
    }
    overlay.style.opacity = opacityVal;
}

function meterScroll(args) {
    if(typeof args.currentElements['meter'] === 'object') {

        const meterEl = args.currentElements['meter'].el.querySelector('.meterImages__meter');
        let progress = args.currentElements['meter'].progress;
        // const windowWidth = getWindowWidth();
        // const windowHeight = getWindowHeight();
        let maxTranslate = windowHeight - 250;
        if (windowWidth <= 768) return;
        if (windowWidth >= 1200) maxTranslate = windowHeight - 400;
        const translateVal = scaleValue(progress, [0, 1], [-50, maxTranslate]);
        // meterEl.style.transform = `translateY(${translateVal}px)`;
        animation(meterEl, {y: translateVal});

    }
}

function productScroll(args, id) {
    if(typeof args.currentElements[id] === 'object' ) {

        const { progress, el} = args.currentElements[id];
        const bgClass = el.dataset.bgClass || '';
        const imgEls = el.querySelectorAll('.product__image');
        const stickyImg = el.querySelector('.product__sticky-img');
        const stickyBg = el.querySelector('.product__sticky-bg');
        const stickyListItems = el.querySelectorAll('.product__sticky-item');
        if (windowWidth < 900) {
            if (progress <= 0.04) {
                imgEls[0].style.opacity = 1;
                // imgEls[1].style.transform = 'translateZ(0,0,0) scale(1)';
                setVals(imgEls[1], {scale: 1, y: 0, opacity: 1});
                return;
            }
            if (progress > 0.04 && progress < 0.1) {
                imgEls[0].style.opacity = 0;
                animation(imgEls[1], {opacity: scaleValue(progress, [0.05, 0.1], [1, 0])});

            }
            if (progress > 0.25 && progress < 0.75) {
                animation(imgEls[1], {y: '50%', scale: scaleValue(progress, [0.25, 0.75], [0.4, 2]), opacity: scaleValue(progress, [0.25, 0.35], [0, 1])})
                addClasses([stickyBg], `${bgClass} scrolled`);
                if (bgClass === 'video-bg') {
                    stickyBg.querySelector('video')?.play();
                }
            } else if (progress < 0.25 && progress > 0.1) {
                setVals(imgEls[1], {y: 0, scale: 1});
                removeClasses([stickyBg], `${bgClass} scrolled`);
            }

            stickyListItems.forEach(item => {
                const visibleAt = item.dataset.visibleAt?.split(',');
                let secondVal = visibleAt[1];
                if (+visibleAt[1] === 1) {
                    secondVal = 0.8;
                }
                if (progress >= visibleAt[0] && progress < visibleAt[1]) {
                    animation(item, {opacity: scaleValue(progress, [visibleAt[0], secondVal], [0,1])})
                } else {
                    animation(item, {opacity: 0})
                }
            })

        } else {
            if (progress > 0.03 && progress < 0.2) {
                imgEls[0].style.opacity = 0;
                animation(imgEls[1], {x: `${scaleValue(progress, [0.04, 0.2], [0, windowWidth / 2 - imgEls[1].offsetWidth])}px`, y: `${scaleValue(progress, [0.04, 0.2], [0, 50])}%`});
            }

            if (progress >= 0.2 && progress < 0.5) {
                addClasses([stickyBg], `${bgClass} scrolled`);
                if (bgClass === 'video-bg') {
                    stickyBg.querySelector('video')?.play();
                }
                animation(imgEls[1], {scale: scaleValue(progress, [0.18, .5], [1, 2])});
            } else if (progress < 0.2) {
                removeClasses([stickyBg], `${bgClass} scrolled`);
            }

            stickyListItems.forEach(item => {
                const visibleAt = item.dataset.visibleAt?.split(',');
                let secondVal = visibleAt[1];
                if (+visibleAt[1] === 1) {
                    secondVal = 0.8;
                }
                if (progress >= visibleAt[0] && progress < visibleAt[1]) {
                    animation(item, {opacity: scaleValue(progress, [visibleAt[0], secondVal], [0,1])})
                } else {
                    animation(item, {opacity: 0})
                }
            })

            if (progress > 0.5) {
                animation(imgEls[1], {x: `${scaleValue(progress, [0.04, 0.2], [0, windowWidth / 2 - imgEls[1].offsetWidth])}px`})
            }
        }

    }
}


function scaleImg(args, id) {
  if (typeof args.currentElements[id] === 'object') {
    const progress = args.currentElements[id].progress;
    const animateEl = args.currentElements[id].el?.querySelector('img');
    const scale = scaleValue(progress, [0,1], [1, 1.2]);
    animation(animateEl, {scale: scale});
  }
}


function scrollSlider(args) {
  if (typeof args.currentElements['scrollSlider'] === 'object') {
    const progress = args.currentElements['scrollSlider'].progress;
    slider.updateSlidePosition(progress);
  }
}


function scrollHandler(args) {
    // Hero
    heroScroll(args);

    // Meter
    meterScroll(args);

    // Product
    productScroll(args, 'jacket');

    // Scale image
    scaleImg(args, 'scaleImg-mounts');

    // Scroll slider
    scrollSlider(args);

    //  Mount scale img
    scaleImg(args, 'scaleImg-mount');
    
    // Norwand product
    productScroll(args, 'norwand');
}

const loco = new LocomotiveScroll({
    el: document.querySelector('.main'),
    offset: [0,0]
    // smooth: true
});

loco.on('scroll', (args) => {
    scrollHandler(args);
});
