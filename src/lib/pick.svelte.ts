import type { Color } from 'culori/fn';
import { markUri, parseColor, toCss, toHexValue, type Formatted } from './color';
import { fromHash, fromQuery, toHash, toQuery } from './link';

const START = '#3a7bd5';
const HOLD = 1900;

/** The colour on screen, how it got there, and the link that brings it back. */
export class Pick {
	input = $state(START);
	color = $state<Color>(parseColor(START)!);
	override = $state<number | null>(null);
	picked = $state(false);
	valid = $state(true);

	shown = $derived<Color>(
		this.override === null ? this.color : { ...this.color, alpha: this.override }
	);
	css = $derived(toCss(this.shown));
	hex = $derived(toHexValue(this.shown));
	alpha = $derived(this.shown.alpha ?? 1);
	icon = $derived(markUri(this.picked ? this.shown : undefined));
	link = $derived(this.picked ? `${toQuery('', this.override)}${toHash(this.input)}` : '');

	show = (next: string, remember = true) => {
		this.input = next;
		const parsed = parseColor(next);
		this.valid = parsed !== null;
		if (!parsed) return;
		this.color = parsed;
		this.picked = true;
		this.override = null;
		if (remember) this.stamp();
	};

	tune = (color: Color, text: string) => {
		this.input = text;
		this.color = color;
		this.valid = true;
		this.picked = true;
		this.stamp();
	};

	fade = (alpha: number) => {
		this.override = alpha;
		this.stamp();
	};

	roll = () => {
		const digits = Array.from({ length: 6 }, () =>
			Math.floor(Math.random() * 16).toString(16)
		).join('');
		this.show(`#${digits}`);
	};

	paste = (event: ClipboardEvent) => {
		if (event.target instanceof HTMLInputElement) return;
		const text = event.clipboardData?.getData('text')?.trim();
		if (!text) return;
		event.preventDefault();
		this.show(text);
	};

	restore() {
		const fromLink = fromHash(location.hash).trim();
		if (fromLink) this.show(fromLink, false);
		this.override = fromQuery(location.search);
	}

	private stamp() {
		const url = `${location.pathname}${toQuery(location.search, this.override)}${toHash(this.input)}`;
		history.replaceState(history.state, '', url);
	}
}

/** One click to copy, a word to say it worked, and a line for screen readers either way. */
export class Clip {
	copied = $state<string | null>(null);
	announcement = $state('');
	#timer: ReturnType<typeof setTimeout> | undefined;

	copy = async (entry: Formatted) => {
		try {
			await navigator.clipboard.writeText(entry.value);
		} catch {
			this.announcement = 'Your browser blocked the clipboard, so copy it by hand.';
			return;
		}
		this.copied = entry.id;
		this.announcement = `${entry.label} copied: ${entry.value}`;
		clearTimeout(this.#timer);
		this.#timer = setTimeout(() => (this.copied = null), HOLD);
	};
}
