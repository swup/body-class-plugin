import Plugin from '@swup/plugin';

export default class SwupBodyClassPlugin extends Plugin {
	name = 'SwupBodyClassPlugin';

	requires = { swup: '>=4' };

	defaults = {
		prefix: ''
	};

	constructor(options = {}) {
		super();
		this.options = { ...this.defaults, ...options };
	}

	mount() {
		this.swup.hooks.on('replaceContent', (context, { page: { html } }) => {
			this.updateClassNames(document.body, this.getBodyElement(html));
		});
	}

	getBodyElement(html) {
		const doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.querySelector('body');
	}

	updateClassNames(el, newEl) {
		const remove = [...el.classList].filter((className) => this.isValidClassName(className));
		const add = [...newEl.classList].filter((className) => this.isValidClassName(className));
		el.classList.remove(...remove);
		el.classList.add(...add);
	}

	isValidClassName(className) {
		return className && className.startsWith(this.options.prefix);
	}
}
