import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t,parseRelativeDate as n}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import{load as i}from"cheerio";const a=`https://bbs.kanxue.com/`,o={iot:[128,`智能设备`],android:[161,`Android安全`],ios:[166,`iOS安全`],harmonyos:[178,`HarmonyOS安全`],re:[4,`软件逆向`],coding:[41,`编程技术`],unpack:[88,`加壳脱壳`],crypto:[132,`密码应用`],vuln:[150,`二进制漏洞`],ctf:[37,`CTF对抗`],pwn:[171,`Pwn`],web:[151,`WEB安全`],chat:[45,`茶余饭后`],geekzone:[172,`极客空间`],translate:[32,`外文翻译`]},s={path:`/topic/:category?/:type?`,categories:[`bbs`],example:`/kanxue/topic/android/digest`,parameters:{category:"版块, 缺省为`all`",type:"类型, 缺省为`latest`"},name:`论坛`,maintainers:[`renzhexigua`],handler:c,description:`| 版块           | category  |
| -------------- | --------- |
| 智能设备       | iot       |
| Android 安全   | android   |
| iOS 安全       | ios       |
| HarmonyOS 安全 | harmonyos |
| 软件逆向       | re        |
| 编程技术       | coding    |
| 加壳脱壳       | unpack    |
| 密码应用       | crypto    |
| 二进制漏洞     | vuln      |
| CTF 对抗       | ctf       |
| Pwn            | pwn       |
| WEB 安全       | web       |
| 茶余饭后       | chat      |
| 极客空间       | geekzone  |
| 外文翻译       | translate |
| 全站           | all       |

| 类型     | type   |
| -------- | ------ |
| 最新主题 | latest |
| 精华主题 | digest |`};async function c(s){let c=s.req.param(`category`)||`all`,l=s.req.param(`type`)||`latest`,u,d;Object.hasOwn(o,c)?l===`digest`?(u=`forum-${o[c][0]}-1.htm?digest=1`,d=`看雪论坛精华主题 - ${o[c][1]}`):(u=`forum-${o[c][0]}.html`,d=`看雪论坛最新主题 - ${o[c][1]}`):c===`digest`?(u=`new-digest.htm`,d=`看雪论坛精华主题`):(u=`new-tid.htm`,d=`看雪论坛最新主题`);let f=await r({method:`get`,url:a+u,headers:{Referer:a}}),p=i(f.data),m=p(`.thread`),h=await Promise.all(m?m.toArray().filter(e=>{let r=p(`.date`,e).eq(0).text(),i=r.endsWith(`前`)?n(r):t(r.slice(1));return!e.attribs.class.includes(`top`)||Date.now()-i.valueOf()<2592e5}).map(o=>{let s=p(`.subject a`,o).eq(1),c=p(`.date`,o).eq(0).text(),l=c.endsWith(`前`)?n(c):t(c.slice(1)),u=`${a}${s.attr(`href`)}`,d=`kanxue: ${u}`;return e.tryGet(d,async()=>{let e=await r({method:`get`,url:u}),t=i(e.data);t(`.card`).eq(0).find(`.message img`).each((e,n)=>{n=t(n);let r=n.attr(`src`);r!==void 0&&!r.startsWith(`https://`)&&!r.startsWith(`http://`)&&n.attr(`src`,`https://bbs.kanxue.com/${r}`)});let n=t(`.card`).eq(0).find(`.message`).html();return{title:s.text(),link:u,pubDate:l,description:n}})}):[]);return{title:d,link:a+u,item:h,allowEmpty:!0}}export{s as route};
//# sourceMappingURL=topic-BhzbKnlt.js.map