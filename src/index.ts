import { Handler } from 'swup';
import Plugin from '@swup/plugin';
import { updateClassNames } from './classes.js';
import { updateAttributes } from './attributes.js';

type Options = {
	/** If set, only classes beginning with this string will be added/removed. */
	prefix: string;
	/** Additional body attributes to update, besides the classname. */
	attributes: (string | RegExp)[];
};

export default class SwupBodyClassPlugin extends Plugin {
	name = 'SwupBodyClassPlugin';

	requires = { swup: '>=4.6' };

	defaults: Options = {
		prefix: '',
		attributes: []
	};
	options: Options;

	constructor(options: Partial<Options> = {}) {
		super();
		this.options = { ...this.defaults, ...options };
	}

	mount() {
		this.on('content:replace', this.update);
	}

	protected update: Handler<'content:replace'> = (visit) => {
		const { prefix, attributes } = this.options;
		updateClassNames(document.body, visit.to.document!.body, { prefix });
		if (attributes?.length) {
			updateAttributes(document.body, visit.to.document!.body, attributes);
		}
	};
}
