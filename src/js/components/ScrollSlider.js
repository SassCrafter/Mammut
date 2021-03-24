import { animation } from '../animations';
import { scaleValue } from '../utils';
import { windowWidth } from '../app';

export default class ScrollSlider {
    constructor() {
        this.init();
    }


    updateslideWidthAndHeight() {
        if (this.slides?.length < 1) return;
        this.getDimensions();
        this.heightEl.style.height = this.calcHeight() + 'px';
    }



    calcHeight() {
        this.height = this.slideHeight * this.slides.length;
        return this.height;
    }

    getTranslateVal() {
        if (windowWidth < 900) {
            this.translateVal = this.slideWidth * (this.slides.length);
        } else {
            this.translateVal = this.slideWidth * (this.slides.length - 1);
        }
        return this.translateVal;
    }

    updateSlidePos(progress) {
        console.log(progress);
        if (progress < 0.8) {
            console.log(this.getTranslateVal());
            animation(this.slidesContainer, {x: -scaleValue(progress, [0.19, 1], [0, this.getTranslateVal()])});
        }
    }

    getDimensions() {
        this.slides = this.scrollSlider.querySelectorAll('.scrollSlider__slide');
        this.slideHeight = this.slides[0].offsetHeight;
        this.slideWidth = this.slides[0].offsetWidth;
        this.heightEl = this.scrollSlider.querySelector('.scrollSlider-height');
    }

    init() {
        this.scrollSlider = document.querySelector('.scrollSlider');
        this.slidesContainer = this.scrollSlider.querySelector('.scrollSlider__slides');
        this.getDimensions();
        this.heightEl.style.height = this.calcHeight() + 'px';
    }
}