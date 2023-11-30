export function extractLast10Digits(inputString: string): string {
	return inputString.slice(Math.max(inputString.length - 10, 0));
}
