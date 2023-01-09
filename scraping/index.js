import * as cheerio from 'cheerio';
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const URLS = {
    leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/',
}

async function scrape (url) {
    const res = await fetch(url)
    const html = await res.text()
    return cheerio.load(html)
}

async function getLeaderBoard () {
    const $ = await scrape(URLS.leaderboard)
    const $rows = $('table tbody tr')

    const LEADERBOARD_SELECTORS = {
        team: {selector: '.fs-table-text_3', typeOf: 'string'},
        wins: {selector: '.fs-table-text_4', typeOf: 'number'},
        loses: {selector: '.fs-table-text_5', typeOf: 'number'},
        scored: {selector: '.fs-table-text_6', typeOf: 'number'},
        conceded: {selector: '.fs-table-text_7', typeOf: 'number'},
        cardsYellow: {selector: '.fs-table-text_8', typeOf: 'number'},
        cardsRed: {selector: '.fs-table-text_9', typeOf: 'number'}
    }

    const cleanText = text => text
        .replace(/\t|\n|\s:/g, '')
        .replace(/.*:/g, ' ')

    const leaderBoardSelectEntries = Object.entries(LEADERBOARD_SELECTORS)
    const leaderBoard = []
    $rows.each((index, elem) => {
        const leaderBoardEntries = leaderBoardSelectEntries.map(([key, {selector, typeOf}]) => {
            const rawValue = $(elem).find(selector).text()
            const cleanedValue = cleanText(rawValue)
            const value = typeOf === 'number'
                ? Number(cleanedValue)
                : cleanedValue
            return [key, value]
        })
        // The Object.fromEntries() static method transforms a list of key-value pairs into an object
        leaderBoard.push(Object.fromEntries(leaderBoardEntries))
    })
    return leaderBoard
}

const leaderBoard = await getLeaderBoard()
// Creo que se una el process para capturar la ruta donde se está ejecutando el archivo en lugar del __dirname devido a que en el 
// package.json se especificó que los archivos sean tratados como módulos type:module
const filePath = path.join(process.cwd(), './db/leaderboard.json')
await writeFile(filePath, JSON.stringify(leaderBoard, null, 2), 'utf8')