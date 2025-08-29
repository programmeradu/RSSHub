import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import{load as n}from"cheerio";const r={path:`/tianjin/tjftz-notice/:channelId`,categories:[`government`],example:`/gov/tianjin/tjftz-notice/6302`,parameters:{channelId:`公告分类id、详细信息点击源网站https://www.tjftz.gov.cn/请求中寻找`},radar:[{source:[`tjftz.gov.cn/channels/:channelId.html`],target:`/tianjin/tjftz-notice/:channelId`}],name:`天津港保税区-公告`,url:`tjftz.gov.cn`,maintainers:[`HaoyuLee`],description:`
| 公告类别         | channelId |
| ------------ | -- |
| 首页>新闻>保税区要闻>区域聚焦     | 6302  |
    `,async handler(r){let{channelId:i=`6302`}=r.req.param(),a=`https://www.tjftz.gov.cn/channels/${i}.html`,{data:o}=await t(a),s=n(o)(`.location`).text().trim(),c=n(o)(`#sec_right>ul li>.layui-row`).toArray().map(t=>{let r=n(t);return{title:`天津保税区:${r(`a`).attr(`title`)}`,link:`https://www.tjftz.gov.cn${r(`a`).attr(`href`)}`,pubDate:e(r(`span`).text().trim()),author:`天津保税区`,description:`
                        <h4>${s}</h4>
                        <a href="https://www.tjftz.gov.cn${r(`a`).attr(`href`)}">${r(`a`).attr(`title`)}</a>
                    `}});return{title:`天津港保税区-公告`,link:a,item:c}}};export{r as route};
//# sourceMappingURL=tjftz-Dsk-1brd.js.map