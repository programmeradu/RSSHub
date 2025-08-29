import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";const n=async(n=0)=>{let r=await e.tryGet(`eleduck-categories`,async()=>{let e=await t(`https://svc.eleduck.com/api/v1/categories`),n={};for(let t of e.data.categories)n[t.id]=t.name;return n});return r[n]||`全部`},r={path:`/posts/:id?`,categories:[`bbs`],example:`/eleduck/posts/4`,parameters:{id:`分类id,可以论坛的URL找到，默认为全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`分类文章`,maintainers:[`running-grass`],handler:i,description:`| id | 分类     |
| -- | -------- |
| 0  | 全部     |
| 1  | 讨论     |
| 2  | 分享     |
| 3  | 露个脸   |
| 4  | 访谈故事 |
| 5  | 招聘     |
| 10 | 海外移民 |
| 12 | 英语     |
| 14 | 电鸭官方 |
| 15 | 独立产品 |
| 17 | 闲话开源 |
| 19 | Web3     |
| 21 | 设计     |
| 22 | 人才库   |
| 23 | Upwork   |
| 24 | 经验课   |`};async function i(e){let r=e.req.param(`id`)||0,i=await t(`https://svc.eleduck.com/api/v1/posts?category=${r}&sort=-published_at&page=1`),{posts:a}=i.data;if(a===void 0)throw Error(`没有获取到数据`);let o=await n(r);return{title:`电鸭社区的文章--${o}`,link:`https://eleduck.com/categories/${r}`,description:`电鸭社区的文章,栏目为${o}`,item:a.map(e=>({title:e.title,description:e.summary,pubDate:e.published_at,link:`https://eleduck.com/${e.category.id===22?`tposts`:`posts`}/${e.id}`,author:e.user.nickname}))}}export{r as route};
//# sourceMappingURL=posts-DkDP5rsW.js.map