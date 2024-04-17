import { Handler } from 'swup';
import Plugin from '@swup/plugin';
import { updateClassNames } from './classes.js';

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

	protected updateBodyClass: Handler<'content:replace'> = (visit) => {
		const { prefix } = this.options;
		updateClassNames(document.body, visit.to.document!.body, { prefix });
	};
}
