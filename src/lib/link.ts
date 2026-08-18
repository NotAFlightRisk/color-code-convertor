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
