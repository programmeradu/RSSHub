import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import{ofetch_default as t}from"./ofetch-Bzt0BXUH.js";import{ViewType as n}from"./types-A5bA50Mg.js";import{EXP_LEVELS as r,EXP_LEVELS_QUERY_KEY as i,JOB_TYPES as a,JOB_TYPES_QUERY_KEY as o,KEYWORDS_QUERY_KEY as s,parseJobSearch as c,parseParamsToSearchParams as l,parseParamsToString as u,parseRouteParam as d}from"./utils-BMOUFTcB.js";const f={path:`/jobs/:job_types/:exp_levels/:keywords?/:routeParams?`,categories:[`social-media`],view:n.Notifications,example:`/linkedin/jobs/C-P/1/software engineer`,parameters:{job_types:`See the following table for details, use '-' as delimiter`,exp_levels:`See the following table for details, use '-' as delimiter`,keywords:`keywords`,routeParams:`additional query parameters, see the table below`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.linkedin.com/jobs/search`],target:(e,t)=>{let n=new URLSearchParams(new URL(t).search),r=d(n.get(`f_JT`)),i=d(n.get(`f_E`)),a=encodeURIComponent(n.get(`keywords`)||``),o=new URLSearchParams;for(let[e,t]of n.entries())[`f_JT`,`f_E`,`keywords`].includes(e)||o.append(e,t);return`/linkedin/jobs/${r}/${i}/${a}/?${o.toString()}`}}],name:`Jobs`,maintainers:[`BrandNewLifeJackie26`,`zhoukuncheng`],handler:p,description:`#### \`job_types\` list

| Full Time | Part Time | Contractor | All |
| --------- | --------- | ---------- | --- |
| F         | P         | C          | all |

#### \`exp_levels\` list

| Intership | Entry Level | Associate | Mid-Senior Level | Director | All |
| --------- | ----------- | --------- | ---------------- | -------- | --- |
| 1         | 2           | 3         | 4                | 5        | all |

#### \`routeParams\` additional query parameters

##### \`f_WT\` list

| Onsite | Remote | Hybrid |
| ------ | ------- | ------ |
|    1   |    2    |   3    |

##### \`geoId\`

  Geographic location ID. You can find this ID in the URL of a LinkedIn job search page that is filtered by location.

  For example:
  91000012 is the ID of East Asia.

##### \`f_TPR\`

  Time posted range. Here are some possible values:

  *   \`r86400\`: Past 24 hours
  *   \`r604800\`: Past week
  *   \`r2592000\`: Past month

  For example:

  1.  If we want to search software engineer jobs of all levels and all job types, use \`/linkedin/jobs/all/all/software engineer\`
  2.  If we want to search all entry level contractor/part time software engineer jobs, use \`/linkedin/jobs/P-C/2/software engineer\`
  3.  If we want to search remote mid-senior level software engineer jobs in APAC posted within the last month, use \`/linkedin/jobs/F/4/software%20engineer/f_WT=2&geoId=91000003&f_TPR=r2592000\`

  **To make it easier, the recommended way is to start a search on [LinkedIn](https://www.linkedin.com/jobs/search) and use [RSSHub Radar](https://github.com/DIYgod/RSSHub-Radar) to load the specific feed.**`};async function p(n){let d=l(n.req.param(`job_types`),a),f=l(n.req.param(`exp_levels`),r),p=new URLSearchParams(n.req.param(`routeParams`)),m=new URL(`/jobs-guest/jobs/api/seeMoreJobPostings/search`,`https://www.linkedin.com/`);m.searchParams.append(s,n.req.param(`keywords`)||``),m.searchParams.append(o,d),m.searchParams.append(i,f);for(let[e,t]of p)m.searchParams.has(e)||m.searchParams.append(e,t);m=m.toString();let h=await t(m),g=c(h),_=u(n.req.param(`job_types`),a),v=u(n.req.param(`exp_levels`),r),y=`LinkedIn Job Listing`+(_?` | Job Types: ${_}`:``)+(v?` | Experience Levels: ${v}`:``)+(n.req.param(`keywords`)?` | Keywords: ${n.req.param(`keywords`)}`:``);return{title:y,link:m,description:`This feed gets LinkedIn job posts`,item:g.map(t=>{let n=`${t.company} is hiring ${t.title}`,r=`Title: ${t.title} | Company: ${t.company} | Location: ${t.location} `;return{title:n,description:r,pubDate:e(t.pubDate),link:t.link}})}}export{f as route};
//# sourceMappingURL=jobs-CTEtqCzI.js.map