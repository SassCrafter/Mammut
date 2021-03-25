import { animation } from '../animations';
import { scaleValue } from '../utils';
import { windowWidth } from '../app';

export default class ScrollSlider {
    constructor() {
        this.init();
    }


    updateslideWidthAndHeight() {
        if (this.slides.length < 1) return;
        this.getDimensions();
        this.heightEl.style.height = this.calcHeight() + 'px';
    }


    calcHeight() {
        if (windowWidth <= 899) return this.slideWidth * this.slides.length * 0.8;
        return this.slideWidth * this.slides.length * 0.55;
    }


    updateSlidePosition(progress) {
        console.log('Scroll slider: ', progress);
        animation(this.slidesContainer, {x: -scaleValue(progress, [0, 1], [0, this.calcHeight() * 1.2])})
    }

    getDimensions() {
        this.slides = this.scrollSlider.querySelectorAll('.scrollSlider__slide');
        this.slideHeight = this.slides[0].offsetHeight;
        this.slideWidth = this.slides[0].offsetWidth;
        this.heightEl = this.scrollSlider.querySelector('.scrollSlider-height');
    }

    init() {
        this.scrollSlider = document.querySelector('.scrollSlider');
        if (!this.scrollSlider) return;
        this.slidesContainer = this.scrollSlider.querySelector('.scrollSlider__slides');
        this.getDimensions();
        this.heightEl.style.height = this.calcHeight() + 'px';
    }
}