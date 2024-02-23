import Ably from 'ably/promises'
import crypto from 'crypto'

export default class AblyService {
	private static _ably = new Ably.Rest({ key: process.env.ABLY_API_KEY || '' })
	constructor() {}

	static get ably() {
		return this._ably
	}

	static async publish(channel: string, message: any) {
		const pub = this._ably.channels.get(channel)
		await pub.publish('message', message)
	}

	static async requestToken(userId: string) {
		const tokenData = await this._ably.auth.requestToken({ clientId: userId })
		return tokenData.token
	}
}
