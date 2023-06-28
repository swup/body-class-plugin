import Plugin from '@swup/plugin';

export default class BodyClassPlugin extends Plugin {
	name = 'BodyClassPlugin';
	requires = { swup: '>=4' };
	defaults = {
		prefix: ''
	};

	constructor(options) {
		super();
		this.options = { ...this.defaults, ...options };
	}

	mount() {
		this.swup.hooks.on('replaceContent', (context, { page: { html } }) => {
			const doc = new DOMParser().parseFromString(html, 'text/html');
			const body = doc.querySelector('body');
			this.updateClassNames(body);
		});
	}

	updateClassNames(body) {
		// remove old classes
		document.body.classList.forEach((className) => {
			if (this.isValidClassName(className)) {
				document.body.classList.remove(className);
			}
		});

		// add new classes
		body.classList.forEach((className) => {
			if (this.isValidClassName(className)) {
				document.body.classList.add(className);
			}
		});
	}

	isValidClassName(className) {
		return className && className.startsWith(this.options.prefix);
	}
}
