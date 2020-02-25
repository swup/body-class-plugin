import Plugin from '@swup/plugin';

export default class BodyClassPlugin extends Plugin {
	name = 'BodyClassPlugin';

	constructor(options) {
		super();

		const defaultOptions = {
			prefix: ''
		};

		this.options = {
			...defaultOptions,
			...options
		};
	}

	mount() {
		this.swup.on('contentReplaced', () => {
			const page = this.swup.cache.getCurrentPage();

			// remove old classes
			document.body.className.split(' ').forEach((className) => {
				if (this.isValidClassName(className)) {
					document.body.classList.remove(className);
				}
			});

			// add new classes
			if (page.pageClass !== '') {
				page.pageClass.split(' ').forEach((className) => {
					if (this.isValidClassName(className)) {
						document.body.classList.add(className);
					}
				});
			}
		});
	}

	isValidClassName(className) {
		return className !== '' && className.indexOf(this.options.prefix) !== -1;
	}
}
