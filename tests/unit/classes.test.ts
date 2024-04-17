import { describe, expect, it } from 'vitest';
import { updateClassNames } from '../../src/classes.js';

const createElement = (className: string = '', { tagName = 'div' } = {}) => {
	const el = document.createElement(tagName);
	el.className = className;
	return el;
};

const mergeClasses = (
	currentClassName: string,
	incomingClassName: string,
	options: Parameters<typeof updateClassNames>[2] = {}
) => {
	const current = createElement(currentClassName);
	const incoming = createElement(incomingClassName);
	updateClassNames(current, incoming, options);
	return current;
};

describe('updateClassNames', () => {
	describe('class names', () => {
		it('adds a single class', () => {
			const el = mergeClasses('', 'a');
			expect(el.className).toBe('a');
		});

		it('removes a single class', () => {
			const el = mergeClasses('a', '');
			expect(el.className).toBe('');
		});

		it('clears out classname', () => {
			const el = mergeClasses('a b c', '');
			expect(el.className).toBe('');
		});

		it('builds up classname', () => {
			const el = mergeClasses('', 'a b c');
			expect(el.className).toBe('a b c');
		});

		it('only keeps classes present in new element', () => {
			const el = mergeClasses('a b c', 'd');
			expect(el.className).toBe('d');
		});

		it('keeps classes present in both elements', () => {
			const el = mergeClasses('a b c', 'b e');
			expect(el.className).toBe('b e');
		});
	});

	describe('filtering', () => {
		it('only adds classes matching the prefix', () => {
			const el = mergeClasses('a b c', 'd pre-e f', { prefix: 'pre-' });
			expect(el.className).toBe('a b c pre-e');
		});

		it('only removes classes matching the prefix', () => {
			const el = mergeClasses('a b pre-c', 'd e', { prefix: 'pre-' });
			expect(el.className).toBe('a b');
		});
	});
});
