import '../sass/style.scss';
import './vendors/locomotiveInit.js';
import ScrollSlider from './components/ScrollSlider';
import { getWindowWidth, getWindowHeight } from './utils';

import Nav from './components/Nav';

const mainNav = new Nav();

export const slider = new ScrollSlider();


export let windowWidth = getWindowWidth();
export let windowHeight = getWindowHeight();


window.addEventListener('resize', () => {
    windowWidth = getWindowWidth();
    windowHeight = getWindowHeight();
    slider.updateslideWidthAndHeight();
})
