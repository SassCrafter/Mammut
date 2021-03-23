import '../sass/style.scss';
import './vendors/locomotiveInit.js';
import { getWindowWidth, getWindowHeight } from './utils';

import Nav from './components/Nav';

const mainNav = new Nav();


export let windowWidth = getWindowWidth();
export let windowHeight = getWindowHeight();

const scrollSlider = document.querySelector('.scrollSlider');
const slides = scrollSlider.querySelectorAll('.scrollSlider__slide');
const sliderHeight = slides[0].offsetHeight;
console.log(sliderHeight);
scrollSlider.querySelector('.scrollSlider-height').style.height = sliderHeight * slides.length + 'px';

window.addEventListener('resize', () => {
    windowWidth = getWindowWidth();
    windowHeight = getWindowHeight();
})
