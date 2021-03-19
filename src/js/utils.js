export function scaleValue(value, from, to) {
	var scale = (to[1] - to[0]) / (from[1] - from[0]);
	var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
	return (capped * scale + to[0]);
}

export const toggleClass = (el, className) => el.classList.toggle(className);
export const addClass = (el, className) => el.classList.add(className);
export const removeClass = (el, className) => el.classList.remove(className);

export function toggleClasses(els, classNames) {
	els.forEach((el) => {
		classNames.split(' ').forEach((className) => {
			toggleClass(el, className);
		});
	});
}
export function addClasses(els, classNames) {
	els.forEach((el) => {
		classNames.split(' ').forEach((className) => {
			addClass(el, className);
		});
	});
}
export function removeClasses(els, classNames) {
	els.forEach((el) => {
		classNames.split(' ').forEach((className) => {
			removeClass(el, className);
		});
	});
}