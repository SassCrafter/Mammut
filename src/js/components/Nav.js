import { toggleClass, toggleClasses } from '../utils';

export default class Nav {
    constructor() {
        this.toggleClass = 'open';
        this.init();
    }

    init() {
        this.nav = document.querySelector('.nav');
        this.toggler = this.nav.querySelector('.nav__button');
        this.menu = this.nav.querySelector('.nav__content');
        this.backdrop = document.querySelector('.menu-backdrop');
        this.toggler.addEventListener('click', this.togglerClickHandler.bind(this));
    }

    togglerClickHandler() {
        toggleClasses([this.nav, this.toggler, this.menu, this.backdrop], this.toggleClass);
    }
}