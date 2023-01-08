import * as cheerio from 'cheerio';

const URLS = {
    leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/',
}

const scrape = async (url) => {
    const res = await fetch(url)
    const html = await res.text()
    return cheerio.load(html)
}

const $ = scrape(URLS.leaderboard)

$('table tbody tr').each((index, elem) => {
    const rawTeam = $(elem).find('.fs-table-text_3').text()
    const rawVistories = $(elem).find('.fs-table-text_4').text()
    const rawLoses = $(elem).find('.fs-table-text_5').text()
    const rawScored = $(elem).find('.fs-table-text_6').text()
    const rawConceded = $(elem).find('.fs-table-text_7').text()
    const rawCardsYellow = $(elem).find('.fs-table-text_8').text()
    const rawCardsRed = $(elem).find('.fs-table-text_9').text()

    console.log({
        rawTeam,
        rawVistories,
        rawLoses,
        rawScored,
        rawConceded,
        rawCardsYellow,
        rawCardsRed
    });
})

const leaderboard = [{
    team: 'Team 1',
    wins: 0,
    loses: 0,
    goalsScored: 0,
    goalsConceded: 0,
    cardsYellow: 0,
    cardsRed: 0,
}]