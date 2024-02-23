import express, { Response, Request } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
	res.send({
		version: '1.0.0',
	})
})

export default router
