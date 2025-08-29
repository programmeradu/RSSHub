import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as n}from"./render-CxhTJIsl.js";import{parseDate as r}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as i}from"./got-CdvI2yKX.js";import a from"node:path";t();const o={path:`/blog/:username`,categories:[`blog`],example:`/hashnode/blog/inklings`,parameters:{username:`博主名称，用户头像 URL 中找到`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`hashnode.dev/`]}],name:`用户博客`,maintainers:[`hnrainll`],handler:s,url:`hashnode.dev/`,description:"::: tip\n  username 为博主用户名，而非`xxx.hashnode.dev`中`xxx`所代表的 blog 地址。\n:::"};async function s(t){let o=t.req.param(`username`);if(!o)return;let s=`
    {
        user(username: "${o}") {
            publication {
                posts{
                    slug
                    title
                    brief
                    coverImage
                    dateAdded
                }
            }
        }
    }
    `,c=`https://${o}.hashnode.dev`,l=await i({method:`POST`,url:`https://api.hashnode.com`,headers:{Referer:c,"Content-type":`application/json`},body:JSON.stringify({query:s})}),u=l.data.data.user.publication;if(!u)return;let d=u.posts;return{title:`Hashnode by ${o}`,link:c,item:d.map(t=>({title:t.title,description:n(a.join(e,`templates/description-67797f73.art`),{image:t.coverImage,brief:t.brief}),pubDate:r(t.dateAdded),link:`${c}/${t.slug}`})).filter(e=>e!==``)}}export{o as route};
//# sourceMappingURL=blog-zYhTQhM2.js.map