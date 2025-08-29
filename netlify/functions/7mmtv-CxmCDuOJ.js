import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as a}from"./got-CdvI2yKX.js";import o from"node:path";import{load as s}from"cheerio";t();const c={path:`/:language?/:category?/:type?`,categories:[`multimedia`],example:`/7mmtv/zh/censored_list/all`,parameters:{language:"Language, see below, `en` as English by default",category:"Category, see below, `censored_list` as Censored by default",type:`Server, see below, all server by default`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1,nsfw:!0},name:`Category`,maintainers:[`nczitzk`],handler:l,description:`**Language**

| English | 日本語 | 한국의 | 中文 |
| ------- | ------ | ------ | ---- |
| en      | ja     | ko     | zh   |

  **Category**

| Chinese subtitles AV | Censored       | Amateur          | Uncensored       | Asian self-timer | H comics     |
| -------------------- | -------------- | ---------------- | ---------------- | ---------------- | ------------ |
| chinese_list        | censored_list | amateurjav_list | uncensored_list | amateur_list    | hcomic_list |

| Chinese subtitles AV random | Censored random  | Amateur random     | Uncensored random  | Asian self-timer random | H comics random |
| --------------------------- | ---------------- | ------------------ | ------------------ | ----------------------- | --------------- |
| chinese_random             | censored_random | amateurjav_random | uncensored_random | amateur_random         | hcomic_random  |

  **Server**

| All Server | fembed(Full DL) | streamsb(Full DL) | doodstream | streamtape(Full DL) | avgle | embedgram | videovard(Full DL) |
| ---------- | --------------- | ----------------- | ---------- | ------------------- | ----- | --------- | ------------------ |
| all        | 21              | 30                | 28         | 29                  | 17    | 34        | 33                 |`};async function l(t){let c=t.req.param(`language`)??`en`,l=t.req.param(`category`)??`censored_list`,u=t.req.param(`type`)??`all`,d=`https://7mmtv.sx/${c}/${l}/${u}/1.html`,f=await a({method:`get`,url:d}),p=s(f.data),m=p(`.video`).toArray().map(e=>{e=p(e);let t=e.find(`.video-title a`);return{title:t.text(),author:e.find(`.video-channel`).text(),pubDate:i(e.find(`.small`).text()),link:t.attr(`href`),poster:e.find(`img`).attr(`data-src`),video:e.find(`video`).attr(`data-src`)}});return m=await Promise.all(m.map(t=>n.tryGet(t.link,async()=>{let n=await a({method:`get`,url:t.link}),i=s(n.data);return t.description=r(o.join(e,`templates/description-2ff14215.art`),{cover:i(`.content_main_cover img`).attr(`src`),images:i(`.owl-lazy`).toArray().map(e=>i(e).attr(`data-src`)),description:i(`.video-introduction-images-text`).html(),poster:t.poster,video:t.video}),t.category=i(`.categories a`).toArray().map(e=>i(e).text()),delete t.poster,delete t.video,t}))),{title:p(`title`).text().replace(/ - Watch JAV Online/,``),link:d,item:m,description:p(`meta[name="description"]`).attr(`content`)}}export{c as route};
//# sourceMappingURL=7mmtv-CxmCDuOJ.js.map