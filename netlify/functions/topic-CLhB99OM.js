import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import"./timezone-BrNu6iXe.js";import{getData as e,getList as t}from"./utils-D2U52lFb.js";const n={path:`/topic/:topic`,categories:[`new-media`],example:`/grist/topic/extreme-heat`,parameters:{topic:`Any Topic from Table below`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`grist.org/:topic`]}],name:`Topic`,maintainers:[`Rjnishant530`],handler:r,url:`grist.org/articles/`,description:`Topics

| Topic Name               | Topic Link         |
| ------------------------ | ------------------ |
| Accountability           | accountability     |
| Agriculture              | agriculture        |
| Ask Umbra                | ask-umbra-series   |
| Buildings                | buildings          |
| Cities                   | cities             |
| Climate & Energy         | climate-energy     |
| Climate Fiction          | climate-fiction    |
| Climate of Courage       | climate-of-courage |
| COP26                    | cop26              |
| COP27                    | cop27              |
| Culture                  | culture            |
| Economics                | economics          |
| Energy                   | energy             |
| Equity                   | equity             |
| Extreme Weather          | extreme-weather    |
| Fix                      | fix                |
| Food                     | food               |
| Grist                    | grist              |
| Grist News               | grist-news         |
| Health                   | health             |
| Housing                  | housing            |
| Indigenous Affairs       | indigenous         |
| International            | international      |
| Labor                    | labor              |
| Language                 | language           |
| Migration                | migration          |
| Opinion                  | opinion            |
| Politics                 | politics           |
| Protest                  | protest            |
| Race                     | race               |
| Regulation               | regulation         |
| Science                  | science            |
| Shift Happens Newsletter | shift-happens      |
| Solutions                | solutions          |
| Spanish                  | spanish            |
| Sponsored                | sponsored          |
| Technology               | technology         |
| Temperature Check        | temperature-check  |
| Uncategorized            | article            |
| Updates                  | updates            |
| Video                    | video              |`};async function r(n){let r=`https://grist.org`,i=n.req.param(`topic`),a=(await e(`${r}/wp-json/wp/v2/categories?slug=${i}`))[0].id,o=await e(`${r}/wp-json/wp/v2/posts?categories=${a}&_embed`),s=await t(o);return{title:`${i[0].toUpperCase()+i.slice(1)} - Gist Articles`,link:`${r}/${i}`,item:s,description:`${i[0].toUpperCase()+i.slice(1)} Articles on grist.org`,logo:`https://grist.org/wp-content/uploads/2021/03/cropped-Grist-Favicon.png?w=192`,icon:`https://grist.org/wp-content/uploads/2021/03/cropped-Grist-Favicon.png?w=32`,language:`en-us`}}export{n as route};
//# sourceMappingURL=topic-CLhB99OM.js.map