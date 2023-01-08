import * as cheerio from 'cheerio';

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
        team: '.fs-table-text_3',
        vistories: '.fs-table-text_4',
        loses: '.fs-table-text_5',
        scored: '.fs-table-text_6',
        conceded: '.fs-table-text_7',
        cardsYellow: '.fs-table-text_8',
        cardsRed: '.fs-table-text_9'
    }

    const cleanText = text => text
        .replace(/\t|\n|\s:/g, '')
        .replace(/.*:/g, ' ')

    const leaderBoardSelectEntries = Object.entries(LEADERBOARD_SELECTORS)

    $rows.each((index, elem) => {
        const leaderBoardEntries = Object.entries(LEADERBOARD_SELECTORS).map(([key, selector]) => {
            const rawValue = $(elem).find(selector).text()
            const value = cleanText(rawValue)
            return [key, value]
        })
        Object.fromEntries(leaderBoardEntries)
    })
}

getLeaderBoard()