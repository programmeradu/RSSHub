import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./cache-kimkMTWJ.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import{ofetch_default as t}from"./ofetch-Bzt0BXUH.js";import{getArticle as n}from"./utils-BbUB0IUi.js";const r={path:[`/category/:category`,`/section/:section`],categories:[`traditional-media`],example:`/mirrormedia/category/political`,parameters:{category:`分类名`,section:`子板名`},name:`分类`,maintainers:[`dzx-dzx`],radar:[{source:[`mirrormedia.mg/category/:category`,`mirrormedia.mg/section/:section`]}],handler:i};async function i(r){let{category:i,section:a}=r.req.param(),o=i?{categories:{some:{slug:{equals:i}}}}:{},s=a?{sections:{some:{slug:{equals:a}}}}:{},c=`https://www.mirrormedia.mg`,l=await t(`https://adam-weekly-api-server-prod-ufaummkd5q-de.a.run.app/content/graphql`,{method:`POST`,body:{variables:{take:r.req.query(`limit`)?Number.parseInt(r.req.query(`limit`),10):24,skip:0,orderBy:{publishedDate:`desc`},filter:{state:{equals:`published`},...o,...s}},query:`
fragment section on Section {
  id
  name
  slug
  state
  __typename
}

fragment category on Category {
  id
  name
  slug
  state
  __typename
}

fragment listingPost on Post {
  id
  slug
  title
  brief
  publishedDate
  state
  sections(where: {state: {equals: "active"}}) {
    ...section
    __typename
  }
  categories(where: {state: {equals: "active"}}) {
    ...category
    __typename
  }
  isFeatured
  __typename
}

query ($take: Int, $skip: Int, $orderBy: [PostOrderByInput!]!, $filter: PostWhereInput!) {
  postsCount(where: $filter)
  posts(take: $take, skip: $skip, orderBy: $orderBy, where: $filter) {
    ...listingPost
    __typename
  }
}`}}),u=l.data.posts.map(t=>({title:t.title,pubDate:e(t.publishedDate),category:[...(t.sections??[]).map(e=>`section:${e.name}`),...(t.categories??[]).map(e=>`category:${e.name}`)],link:`${c}/story/${t.slug}`})),d=await Promise.all(u.map(e=>n(e)));return{title:`鏡週刊 Mirror Media - ${i}`,link:c,item:d}}export{r as route};
//# sourceMappingURL=category-JL3y7kA2.js.map