import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import teams from '../db/teams.json'

const app = new Hono()

app.get('/', (c) => c.json([
	{
		endpoint: '/leaderboard',
		description: 'Return the leaderboard'
	},
	{
		endpoint: '/teams',
		description: 'Return the teams'
	},
	{
		endpoint: '/presidents',
		description: 'Return the presidents'
	}
]))

app.get('/leaderboard', (c) =>  c.json(leaderboard))

app.get('/teams', (c) =>  c.json(teams))

app.get('/presidents', (c) =>  c.json(presidents))

app.get('/presidents/:id', (c) => {
	const id = c.req.param('id')
	const foundPresident = presidents.find(president => president.id === id)
	return foundPresident
		? c.json(foundPresident)
		: c.json({ message: 'President not found'}, 404)
})

app.get('/static/*', serveStatic({ root: './' }))


export default app
