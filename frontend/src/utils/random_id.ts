import {bool} from "@polkadot/types";

const ID_LENGTH = 5;
export function generateRandomId(isReply: boolean): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let randomId = `${isReply ? 'R' : 'P'}-`;

	for (let i = 0; i < ID_LENGTH; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		randomId += characters.charAt(randomIndex);
	}

	return randomId;
}
