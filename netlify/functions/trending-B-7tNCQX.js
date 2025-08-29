import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import{config as n}from"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as r}from"./render-CxhTJIsl.js";import"./ofetch-Bzt0BXUH.js";import{got_default as i}from"./got-CdvI2yKX.js";import{ViewType as a}from"./types-A5bA50Mg.js";import{config_not_found_default as o}from"./config-not-found-BVqhRP9D.js";import s from"node:path";import{load as c}from"cheerio";t();const l={path:`/trending/:since/:language/:spoken_language?`,categories:[`programming`],example:`/github/trending/daily/javascript/en`,view:a.Notifications,parameters:{since:{description:`time range`,options:[{value:`daily`,label:`Today`},{value:`weekly`,label:`This week`},{value:`monthly`,label:`This month`}]},language:{description:"the feed language, available in [Trending page](https://github.com/trending/javascript?since=monthly) 's URL, don't filter option is `any`",default:`any`},spoken_language:{description:`natural language, available in [Trending page](https://github.com/trending/javascript?since=monthly) 's URL`}},features:{requireConfig:[{name:`GITHUB_ACCESS_TOKEN`,description:``}],requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`github.com/trending`],target:`/trending/:since`}],name:`Trending`,maintainers:[`DIYgod`,`jameschensmith`],handler:u,url:`github.com/trending`};async function u(t){if(!n.github||!n.github.access_token)throw new o(`GitHub trending RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);let a=t.req.param(`since`),l=t.req.param(`language`)===`any`?``:t.req.param(`language`),u=t.req.param(`spoken_language`)??``,d=`https://github.com/trending/${encodeURIComponent(l)}?since=${a}&spoken_language_code=${u}`,{data:f}=await i({method:`get`,url:d,headers:{Referer:d}}),p=c(f),m=p(`article`),h=m.toArray().map(e=>{let[t,n]=p(e).find(`h2`).text().split(`/`);return{name:n.trim(),owner:t.trim()}}),{data:g}=await i({method:`post`,url:`https://api.github.com/graphql`,headers:{Authorization:`bearer ${n.github.access_token}`},json:{query:`
            query {
            ${h.map((e,t)=>`
                _${t}: repository(owner: "${e.owner}", name: "${e.name}") {
                    ...RepositoryFragment
                }
            `).join(`
`)}
            }

            fragment RepositoryFragment on Repository {
                description
                forkCount
                nameWithOwner
                openGraphImageUrl
                primaryLanguage {
                    name
                }
                stargazerCount
            }
            `}}),_=Object.values(g.data).map(e=>{let t=h.find(t=>`${t.owner}/${t.name}`===e.nameWithOwner);return{...t,...e}});return{title:p(`title`).text(),link:d,item:_.map(t=>({title:t.nameWithOwner,author:t.owner,description:r(s.join(e,`templates/trending-description-99f656d9.art`),{cover:t.openGraphImageUrl,desc:t.description,forks:t.forkCount,lang:t.primaryLanguage?.name||`Unknown`,stars:t.stargazerCount}),link:`https://github.com/${t.nameWithOwner}`}))}}export{l as route};
//# sourceMappingURL=trending-B-7tNCQX.js.map