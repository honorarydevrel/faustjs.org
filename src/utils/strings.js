export function classNames(...arguments_) {
	const classes = [];

	for (const argument of arguments_) {
		if (!argument) continue;
		const argumentType = typeof argument;
		if (argumentType === "string" || argumentType === "number") {
			classes.push(argument);
		} else if (Array.isArray(argument) && argument.length > 0) {
			const inner = classNames(...argument);
			if (inner) classes.push(inner);
		} else if (argumentType === "object") {
			for (const [key, value] of Object.entries(argument)) {
				if (value) classes.push(key);
			}
		}
	}

	return classes.join(" ");
}

export function normalizeHref(path) {
	return path.endsWith("/") ? path : `${path}/`;
}
