import { v4 as uuidv4 } from 'uuid'
import jsonwebtoken from 'jsonwebtoken'

export interface User {
	user_id: string
}

export default class AuthService {
	constructor() {}

	static generateFakeUser() {
		return {
			user_id: uuidv4(),
		}
	}

	static generateToken(userId: string) {
		return jsonwebtoken.sign(
			{ user_id: userId },
			process.env.JWT_SECRET || '',
			{
				expiresIn: '24h',
				jwtid: userId,
				issuer: 'dquark.network',
			}
		)
	}

	static verifyToken(token: string) {
		return jsonwebtoken.verify(token, process.env.JWT_SECRET || '')
	}

	static decodeToken(token: string): User | null {
		return jsonwebtoken.decode(token) as User
	}
}
