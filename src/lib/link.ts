/** The colour rides in the hash, so a link carries whatever was pasted, format and all. */
export const toHash = (value: string) => `#${encodeURIComponent(value.replace(/^#/, ''))}`;

/** Reads one back, tolerating the bare percent signs a hand-written link tends to carry. */
export function fromHash(hash: string) {
	const value = hash.replace(/^#/, '');
	try {
		return decodeURIComponent(value.replace(/%(?![0-9a-f]{2})/gi, '%25'));
	} catch {
		return value;
	}
}

/** An alpha off the slider belongs to nobody's pasted value, so it travels beside it. */
export function toQuery(search: string, alpha: number | null) {
	const query = new URLSearchParams(search);
	if (alpha === null) query.delete('a');
	else query.set('a', String(alpha));
	const rest = query.toString();
	return rest === '' ? '' : `?${rest}`;
}

/** Reads one back, ignoring anything that isn't a number the slider could have set. */
export function fromQuery(search: string) {
	const value = new URLSearchParams(search).get('a')?.trim() ?? '';
	const alpha = Number(value);
	return value !== '' && alpha >= 0 && alpha <= 1 ? alpha : null;
}
