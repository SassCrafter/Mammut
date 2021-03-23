import { gsap } from "gsap";

export function animation(selector, vals) {
    // gsap.set(selector, {y: '50%'});
    // gsap.to(selector, {scale: vals.scale, opacity: vals.opacity});
    gsap.to(selector, {...vals});
}

export function setVals(selector, vals) {
    gsap.set(selector, {...vals});
}