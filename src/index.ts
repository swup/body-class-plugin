import { Handler } from 'swup';
import Plugin from '@swup/plugin';

type Options = {
	/** If set, only classes beginning with this string will be added/removed. */
	prefix: string;
};

export default class SwupBodyClassPlugin extends Plugin {
	name = 'SwupBodyClassPlugin';

	requires = { swup: '>=4.6' };

	defaults: Options = {
		prefix: ''
	};
	options: Options;

	constructor(options: Partial<Options> = {}) {
		super();
		this.options = { ...this.defaults, ...options };
	}

	mount() {
		this.on('content:replace', this.updateBodyClass);
	}

	updateBodyClass: Handler<'content:replace'> = (visit, { page: { html } }) => {
		this.updateClassNames(document.body, this.getBodyElement(html));
	};

	getBodyElement(html: string): HTMLElement {
		const doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.querySelector<HTMLElement>('body')!;
	}

	updateClassNames(el: HTMLElement, newEl: HTMLElement) {
		const remove = [...el.classList].filter((className) => this.isValidClassName(className));
		const add = [...newEl.classList].filter((className) => this.isValidClassName(className));
		el.classList.remove(...remove);
		el.classList.add(...add);
	}

	isValidClassName(className: string) {
		return className && className.startsWith(this.options.prefix);
	}
}
