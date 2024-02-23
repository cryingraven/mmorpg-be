import express, { Request, Response } from 'express'
import AuthService from '../services/auth'
import { AblyTokenDTO } from '../dto/ably'
import AblyService from '../services/ably'

const router = express.Router()

router.get('/login', async (req: Request, res: Response) => {
	const user = AuthService.generateFakeUser()
	const token = AuthService.generateToken(user.user_id)
	res.send({
		user,
		token,
	})
})

router.post('/ably-token', async (req: Request, res: Response) => {
	try {
		const alby = req.body as AblyTokenDTO

		AuthService.verifyToken(alby.auth_token)
		const user = AuthService.decodeToken(alby.auth_token)

		if (!user) {
			throw new Error('Invalid token')
		}

		const token = await AblyService.requestToken(user.user_id)

		res.send({
			ably_token: token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).send({ error: 'Internal Server Error' })
	}
})

export default router
