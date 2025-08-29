import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as n}from"./cache-kimkMTWJ.js";import{art as r}from"./render-CxhTJIsl.js";import{parseDate as i}from"./parse-date-Bgabdhlb.js";import{ofetch_default as a}from"./ofetch-Bzt0BXUH.js";import{timezone as o}from"./timezone-BrNu6iXe.js";import s from"node:path";import{load as c}from"cheerio";t();const l={path:`/:id?`,categories:[`multimedia`],example:`/2048/2`,parameters:{id:"板块 ID, 见下表，默认为最新合集，即 `3`，亦可在 URL 中找到, 例如, `thread.php?fid-3.html`中, 板块 ID 为`3`"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!0,supportPodcast:!1,supportScihub:!1,nsfw:!0},name:`论坛`,maintainers:[`nczitzk`],handler:u,description:`| 最新合集 | 亞洲無碼 | 日本騎兵 | 歐美新片 | 國內原創 | 中字原創 | 三級寫真 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 3        | 4        | 5        | 13       | 15       | 16       | 18       |

| 有碼.HD | 亞洲 SM.HD | 日韓 VR/3D | 歐美 VR/3D | S-cute / Mywife / G-area |
| ------- | ---------- | ---------- | ---------- | ------------------------ |
| 116     | 114        | 96         | 97         | 119                      |

| 網友自拍 | 亞洲激情 | 歐美激情 | 露出偷窺 | 高跟絲襪 | 卡通漫畫 | 原創达人 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 23       | 24       | 25       | 26       | 27       | 28       | 135      |

| 唯美清純 | 网络正妹 | 亞洲正妹 | 素人正妹 | COSPLAY | 女优情报 | Gif 动图 |
| -------- | -------- | -------- | -------- | ------- | -------- | -------- |
| 21       | 274      | 276      | 277      | 278     | 29       |          |

| 獨家拍攝 | 稀有首發 | 网络见闻 | 主播實錄 | 珍稀套圖 | 名站同步 | 实用漫画 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 213      | 94       | 283      | 111      | 88       | 131      | 180      |

| 网盘二区 | 网盘三区 | 分享福利 | 国产精选 | 高清福利 | 高清首发 | 多挂原创 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 72       | 272      | 195      | 280      | 79       | 216      | 76       |

| 磁链迅雷 | 正片大片 | H-GAME | 有声小说 | 在线视频 | 在线快播影院 |
| -------- | -------- | ------ | -------- | -------- | ------------ |
| 43       | 67       | 66     | 55       | 78       | 279          |

| 综合小说 | 人妻意淫 | 乱伦迷情 | 长篇连载 | 文学作者 | TXT 小说打包 |
| -------- | -------- | -------- | -------- | -------- | ------------ |
| 48       | 103      | 50       | 54       | 100      | 109          |

| 聚友客栈 | 坛友自售 |
| -------- | -------- |
| 57       | 136      |`};async function u(t){let l=t.req.param(`id`)??`3`,u=await n.tryGet(`2048:domainInfo`,async()=>{let e=await a(`https://2048.info`),t=c(e),n=t(`.button`).first().attr(`onclick`),r=n.match(/window\.open\('([^']+)'/)[1];return{url:r}}),d=await a.raw(u.url),f=`${d.url}thread.php?fid-${l}.html`,p=c(d._data),m=p(`script`).text().match(/var safeid='(.*?)',/)?.[1]??``,h=await a.raw(f,{headers:{cookie:`_safe=${m}`}}),g=c(h._data),_=`https://${new URL(h.url).host}`;g(`#shortcut`).remove(),g(`tr[onmouseover="this.className='tr3 t_two'"]`).remove();let v=g(`#ajaxtable tbody .tr2`).last().nextAll(`.tr3`).toArray().map(e=>(e=g(e).find(`a.subject`),{title:e.text(),link:`${_}/${e.attr(`href`)}`,guid:`https://hjd2048.com/2048/${e.attr(`href`)}`})).filter(e=>!e.link.includes(`undefined`)),y=await Promise.all(v.map(t=>n.tryGet(t.guid,async()=>{let n=await a(t.link,{headers:{cookie:`_safe=${m}`}}),l=c(n);l(`.ads, .tips`).remove(),l(`ignore_js_op`).each(function(){let e=l(this).find(`img`),t=e.attr(`data-original`),n=e.attr(`src`),r=t||n;l(this).replaceWith(`<img src="${r}">`)}),t.author=l(`.fl.black`).first().text(),t.pubDate=o(i(l(`span.fl.gray`).first().attr(`title`)),8);let u=l(`#read_tpc`).first().find(`a`).last(),d=l(`#copytext`)?.first()?.text();if(u?.text()?.startsWith(`http`)&&/bt\.azvmw\.com$/.test(new URL(u.text()).hostname)){let n=await a(u.text()),i=c(n);t.enclosure_type=`application/x-bittorrent`;let o=i(`.uk-button`).last().attr(`href`);t.enclosure_url=o?.startsWith(`http`)?o:`https://bt.azvmw.com/${o}`;let l=i(`.uk-button`).first().attr(`href`);u.replaceWith(r(s.join(e,`templates/download-6b447c6c.art`),{magnet:l,torrent:t.enclosure_url}))}else d?.startsWith(`magnet`)&&(t.enclosure_url=d,t.enclosure_type=`x-scheme-handler/magnet`);let f=l(`#read_tpc`).first();return l(`.showhide img`).each(function(){f.append(`<br><img style="max-width: 100%;" src="${l(this).attr(`src`)}">`)}),t.description=f.html(),t})));return{title:`${g(`#main #breadCrumb a`).last().text()} - 2048核基地`,link:f,item:y}}export{l as route};
//# sourceMappingURL=2048-B0H_1r4K.js.map