import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import{config as n}from"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as r}from"./cache-kimkMTWJ.js";import{art as i}from"./render-CxhTJIsl.js";import{parseDate as a}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as o}from"./got-CdvI2yKX.js";import s from"node:path";import{load as c}from"cheerio";t();const l={path:`/latest-ranked/:routeParams?`,categories:[`game`],example:`/osu/latest-ranked/includeMode=osu&difficultyLimit=L3&difficultyLimit=U7`,features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1,supportRadar:!0},parameters:{routeParams:{description:`Used to pass route parameters in Query String format. Check out route description for more info.`,default:`null`}},name:`Latest Ranked Beatmap`,description:`
Subscribe to the new beatmaps on https://osu.ppy.sh/beatmapsets.

#### Parameter Description

Parameters allows you to:

- Filter game mode
- Limit beatmap difficulty
- Show/hide game mode in feed title

Below is a table of all allowed parameters passed to \`routeParams\`


| Name              | Default  | Description                                                                                                                                                                                                                                          |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`includeMode\`     | All mode | Could be \`osu\`, \`mania\`, \`fruits\` or \`taiko\`. Specify included game mode of beatmaps. Including this paramseter multiple times to specify multiple game modes, e.g.: \`includeMode=osu&includeMode=mania\`. Subscribe to all game modes if not specified |
| \`difficultyLimit\` | None     | Lower/upper limit of star rating of the beatmaps in the beatmapset item, e.g.:\`difficultyLimit=U6\`. Checkout tips in descriptions for detailed explaination and examples.                                                                            |
| \`modeInTitle\`     | \`true\`   | \`true\` or \`false\` Add mode info into feed title.


This actual parameters should be passed as \`routeParams\` in URL Query String format without \`?\`, e.g.:

    /osu/latest-ranked/modeInTitle=true&includeMode=osu

:::tip
You could make use of \`difficultyLimit\` paramters to create a "high difficulty/low difficulty only" only feed.

For example, if you only wants to play low star rating beatmap like 1 or 2 star, you could subscribe to:

    /osu/latest-ranked/difficultyLimit=U2

This will filter out all beatmapsets that do not provide at least one beatmap with star rating<=\`2.00\`.

Similarly, you could use lower bound to filter out beatmapsets which don't have at least one beatmap
with star rating higher than a certain threshold.

    /osu/latest-ranked/difficultyLimit=L6

Now all beatmapsets that don't provided at least one beatmap with star rating higher than \`6.00\` will be filtered.
:::
`,maintainers:[`nfnfgo`],radar:[{source:[`osu.ppy.sh/beatmapsets`]}],handler:u};async function u(t){let l=t.req.param(`routeParams`),u=new URL(`https://osu.ppy.sh?${l}`).searchParams,d=u.getAll(`includeMode`),f=u.getAll(`difficultyLimit`),p=u.get(`modeInTitle`)??`true`,m=await r.tryGet(`https://osu.ppy.sh/beatmapsets:JSON`,async()=>{let e=await o.get(`https://osu.ppy.sh/beatmapsets`),t=c(e.data),n=JSON.parse(t(`#json-beatmaps`).text()??`{"beatmapsets": undefined}`),r=n.beatmapsets;if(r===void 0)throw Error(`Failed to retrieve JSON beatmap info from osu! website`);return r},n.cache.routeExpire,!1);for(let e of m)e.beatmaps.sort((e,t)=>e.difficulty_rating-t.difficulty_rating);d?.length&&d?.length>0&&(m=m.filter(e=>d.includes(e.beatmaps[0].mode)));let h=99,g=0;if(f&&f.length>0&&f.length<2){for(let e of f)e.startsWith(`U`)?h=Number.parseFloat(e.slice(1)):e.startsWith(`L`)&&(g=Number.parseFloat(e.slice(1)));let e=e=>!(e.beatmaps.at(0).difficulty_rating>h||e.beatmaps.at(-1).difficulty_rating<g);m=m.filter(t=>e(t))}function _(){if(!l)return``;let e=`Feed Configurations:
`;return e+=`Game Mode: ${d.length>0?JSON.stringify(d):`All modes`}\n`,e+=`Star Rating Limit: Lower=${g}, Upper=${h}`,e}let v=m.map(t=>{let n=a(t.ranked_date),r=t.covers[`cover@2x`]||t.covers.cover,o=t.covers[`card@2x`]||t.covers.card,c=`${Math.floor(t.beatmaps[0].total_length/60).toString().padStart(2,`0`)}:${(t.beatmaps[0].total_length%60).toString().padStart(2,`0`)}`,l={osu:`Osu!`,fruits:`Osu!Catch`,taiko:`Osu!Taiko`,mania:`Osu!Mania`},u=i(s.join(e,`templates/beatmapset-d7371e24.art`),{...t,readableTotalLength:c,modeLiteralToDisplayNameMap:l});return{title:`${p===`true`?`[${l[t.beatmaps[0].mode]}] `:``}${t.title_unicode??t.title}`,description:u,pubDate:n,link:`https://osu.ppy.sh/beatmapsets/${t.id}`,category:[`osu!`,`game`],author:[{name:t.creator}],image:r,banner:o,updated:t.last_updated}});return{title:`Osu! Latest Ranked Map`,link:`https://osu.ppy.sh/beatmapsets`,description:`Newly ranked beatmaps at https://osu.ppy.sh/beatmapsets.\n${_()}`,item:v}}export{l as route};
//# sourceMappingURL=latest-ranked-DwoOihQi.js.map