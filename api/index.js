import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'

const app = new Hono()

app.get('/', (c) => c.json([
	{
		endpoint: '/leaderboard',
		description: 'Return the leaderboard'
	}
]))

app.get('/leaderboard', (c) =>  c.json(leaderboard))

app.get('/static/*', serveStatic({ root: './' }))


export default app
