export function updateClassNames(el: HTMLElement, newEl: HTMLElement, { prefix = '' } = {}): void {
	const remove = [...el.classList].filter((className) => isValid(className, { prefix }));
	const add = [...newEl.classList].filter((className) => isValid(className, { prefix }));
	el.classList.remove(...remove);
	el.classList.add(...add);
}

function isValid(className: string, { prefix = '' } = {}): boolean {
	return !!className && className.startsWith(prefix);
}
