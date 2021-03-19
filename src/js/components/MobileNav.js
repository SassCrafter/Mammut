import { toggleClass, toggleClasses } from '../utils';

export default class MobileNav {
    constructor() {
        this.toggleClass = 'open';
        this.init();
    }

    init() {
        this.nav = document.querySelector('.mobile-nav');
        this.toggler = this.nav.querySelector('.mobile-nav__button');
        this.menu = this.nav.querySelector('.mobile-nav__content');
        this.backdrop = document.querySelector('.menu-backdrop');
        this.toggler.addEventListener('click', this.togglerClickHandler.bind(this));
    }

    togglerClickHandler() {
        toggleClasses([this.nav, this.toggler, this.menu, this.backdrop], this.toggleClass);
    }
}