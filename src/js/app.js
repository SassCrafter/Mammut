import '../sass/style.scss';
import './vendors/locomotiveInit.js';
import { getWindowWidth, getWindowHeight } from './utils';

import Nav from './components/Nav';

const mainNav = new Nav();


export let windowWidth = getWindowWidth();
export let windowHeight = getWindowHeight();


window.addEventListener('resize', () => {
    windowWidth = getWindowWidth();
    windowHeight = getWindowHeight();
})