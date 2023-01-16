
Este proyecto lo estoy realizando siguiendo los directos de Midudev en https://www.twitch.tv/midudev/
Todo de forma didáctica.


#Tecnologies used in this project

Cheerio para facilitar el tema de hacer scraping a la página https://kingsleague.pro/
Wrangler: Creo que es un sitio para alojar API, tipo vercel
Hono: Un framework como Express https://honojs.dev/
Se utilizó este framework porque va muy bien con Cloudflare workers


Para correr Wrangler:
API Local:
>>> npx wrangler dev api/index.js
API Web:
>>> npx wrangler publish api/index.js
https://kings-league-api.devsissa.workers.dev/


Web para optimizar los SVG: https://jakearchibald.github.io/svgomg/ PNG-JPG https://squoosh.app/
Para comprar dominios: https://porkbun.com/