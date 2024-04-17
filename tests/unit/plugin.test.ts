import { vitest, describe, expect, it, beforeEach, afterEach } from 'vitest';
import Swup, { Visit } from 'swup';

import SwupBodyClassPlugin from '../../src/index.js';

vitest.mock('../../src/classes.js');

const page = { page: { html: '', url: '/' } };

describe('SwupBodyClassPlugin', () => {
	let swup: Swup;
	let plugin: SwupBodyClassPlugin;
	let visit: Visit;

	beforeEach(() => {
		swup = new Swup();
		plugin = new SwupBodyClassPlugin();
		swup.use(plugin);
		// @ts-ignore - createVisit is marked internal
		visit = swup.createVisit({ url: '/' });
		visit.to.document = new window.DOMParser().parseFromString(
			'<html><head></head><body></body></html>',
			'text/html'
		);
	});

	afterEach(() => {
		swup.unuse(plugin);
		swup.destroy();
	});

	it('merges user options', async () => {
		const plugin = new SwupBodyClassPlugin({ prefix: 'pre-' });
		expect(plugin.options).toMatchObject({ prefix: 'pre-' });
	});

	it('updates body classname from content:replace hook handler', async () => {
		const classes = await import('../../src/classes.js');
		const spy = vitest.spyOn(classes, 'updateClassNames');
		// classes.updateClassNames = vitest.fn()
		// 	.mockImplementation(() => ({ removed: [], added: [] }));

		await swup.hooks.call('content:replace', visit, page);

		expect(spy).toHaveBeenCalledOnce();
		expect(spy).toHaveBeenCalledWith(document.body, visit.to.document!.body, {
			prefix: plugin.options.prefix
		});
	});
});
