import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{ofetch_default as e}from"./ofetch-Bzt0BXUH.js";import{load as t}from"cheerio";const n=`/wohnnet/`,r=`https://www.wohnnet.at/immobilien/`,i={name:`Immobiliensuche`,path:`/:category/:region/*`,maintainers:[`sk22`],categories:[`other`],description:`
Only returns the first page of search results, allowing you to keep track of
newly added apartments. If you're looking for an apartment, make sure to also
look through the other pages on the website.

:::tip
Note that the parameter \`&sortierung=neueste-zuerst\` for chronological order
is automatically appended.
:::

:::tip
To get your query URL, go to https://www.wohnnet.at/immobilien/suche, apply
all desired filters (but at least a category and a region!) and click the
"… Treffer anzeigen" link. From the resulting URL, cut off the
\`https://www.wohnnet.at/immobilien/\` part at the beginning and replace only
the \`?\` (the \`&\`s stay as is!) after the region name with a \`/\`.

Examples:

* \`${r}mietwohnungen/wien\`
    - → \`${n}mietwohnungen/wien\`
* \`${r}mietwohnungen/wien?unterregionen=g90101\`
    - → \`${n}mietwohnungen/wien/unterregionen=g90101\`
* \`${r}mietwohnungen/wien?unterregionen=g90101&merkmale=balkon\`
    - → \`${n}mietwohnungen/wien/unterregionen=g90101&merkmale=balkon\`
:::
`,example:n+`mietwohnungen/wien/unterregionen=g90101--g90201--g90301--g90401--g90501&flaeche=40&preis=-1000`,parameters:{category:"Category (`mietwohnungen`, `eigentumswohnungen`, `grundstuecke`, …)",region:"Region (`wien`, `oesterreich`, …)",unterregionen:"Unterregionen (e.g. `g90101--g90201--g90301`)",intention:"Intention (`kauf` | `miete`)",zimmer:"Zimmer (at least number, e.g. `2`)",flaeche:"Fläche (m², `40-` = at least 40 m², `40-60` = between 40 m² and 60 m²)",preis:"Preis (€, `-1000` = at most 1,000 €, `500-1000` = between 500 € and 1,000 €)",merkmale:"Merkmale (multiple, delimited by `--`, e.g. `balkon--garten--kurzzeitmiete--moebliert--parkplatz--provisionsfrei--sofort-beziehbar`)"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},async handler(i){let a=i.req.param(`category`),o=i.req.param(`region`),s=i.req.path.slice(`${n}${a}/${o}/`.length)+`&sortierung=neueste-zuerst`;s.startsWith(`&`)&&(s=s.slice(1));let c=`${r}${a}/${o}/?${s}`,l=await e(c),u=t(l),d=u(`a:has(> .realty)`).toArray().map(e=>{let t=u(e),n=t.attr(`href`),[i,a]=t.find(`.realty-detail-title-address`).text().split(`
`).map(e=>e.trim()).filter(e=>e.length),o=t.find(`.realty-detail-area-rooms .text-right`).text().trim(),s=t.find(`.realty-detail-area-rooms`).text().split(`
`).map(e=>e.trim()).filter(e=>e.length),c=t.find(`.realty-detail-badges .badge`).toArray().map(e=>u(e).text().trim()),l=t.find(`.realty-detail-agency`).text(),d=t.find(`.realty-image img`).attr(`src`),f=`${a} · ${o} | ${i}`,p=new URL(n??``,r).href,m=`${s.join(` · `)} | ${c.join(` · `)} | ${l}`,h=c.filter(e=>!e.endsWith(` Bilder`)),g=d?new URL(d,r).href:void 0;return{title:f,link:p,description:m,category:h,image:g}});return{title:`wohnnet.at`,language:`de`,logo:`https://www.wohnnet.at/media/images/wohnnet/icon_192_192.png`,allowEmpty:!0,item:d,link:c}}};export{i as route};
//# sourceMappingURL=wohnnet-9UBPntyp.js.map