import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as n}from"./render-CxhTJIsl.js";import"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import{generateRssData as i}from"./utils-BCd_Tgqv.js";import a from"node:path";t();const o={path:`/new-arrivals/:country/:gender`,categories:[`shopping`],example:`/arcteryx/new-arrivals/us/mens`,parameters:{country:`country`,gender:`gender`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`arcteryx.com/:country/en/c/:gender/new-arrivals`]}],name:`New Arrivals`,maintainers:[`EthanWng97`],handler:s,description:`Country

| United States | Canada | United Kingdom |
| ------------- | ------ | -------------- |
| us            | ca     | gb             |

  gender

| male | female |
| ---- | ------ |
| mens | womens |

::: tip
  Parameter \`country\` can be found within the url of \`Arcteryx\` website.
:::`};async function s(t){let{country:o,gender:s}=t.req.param(),c=`https://arcteryx.com/${o}/en/`,l=`${c}api/fredhopper/query`,u=`${c}shop/`,d=`${c}c/${s}/new-arrivals`,f=await r({method:`get`,url:l,searchParams:{fh_location:`//catalog01/en_CA/gender>{${s}}/intended_use>{newarrivals}`,fh_country:o,fh_view_size:`all`}}),p=f.data.universes.universe[1][`items-section`].items.item.map((e,t,n)=>i(e,t,n,o));return{title:`Arcteryx - New Arrivals(${o.toUpperCase()}) - ${s.toUpperCase()}`,link:d,description:`Arcteryx - New Arrivals(${o.toUpperCase()}) - ${s.toUpperCase()}`,item:p.map(t=>({title:t.name,link:u+t.slug,description:n(a.join(e,`templates/product-description-6179601e.art`),{item:t})}))}}export{o as route};
//# sourceMappingURL=new-arrivals-DeLxHwca.js.map