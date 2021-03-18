import LocomotiveScroll from 'locomotive-scroll';
import '../../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
import { scaleValue } from '../utils';


const loco = new LocomotiveScroll({
	el: document.querySelector('.main'),
    smooth: true
});

loco.on('scroll', (args) => {
	if(typeof args.currentElements['hero'] === 'object') {
        let progress = args.currentElements['hero'].progress;
        // Scale progress value in range [0, 1];
        let opacityVal = scaleValue(progress, [0.4, 1], [0, 1]);
        const overlay = document.querySelector('.hero__overlay');
        // Make transition faster;
        overlay.style.opacity = opacityVal * 3;
    }
});