import{parseDate as e}from"./parse-date-Bgabdhlb.js";import{got_default as t}from"./got-CdvI2yKX.js";import{invalid_parameter_default as n}from"./invalid-parameter-CUJdROXf.js";import r from"crypto-js";const i={host:`https://www.mixcloud.com`,imageBaseURL:`https://thumbnailer.mixcloud.com/unsafe/480x480/`,graphqlURL:`https://app.mixcloud.com/graphql`,decryptionKey:`IFYOUWANTTHEARTISTSTOGETPAIDDONOTDOWNLOADFROMMIXCLOUD`,headers:{Referer:`https://www.mixcloud.com`,"Content-Type":`application/json`,"X-Requested-With":`XMLHttpRequest`}},a={uploads:`uploads`,reposts:`reposted`,favorites:`favorites`,listens:`listeningHistory`,stream:`stream`,playlist:`items`},o={uploads:`Shows`,reposts:`Reposts`,favorites:`Favorites`,listens:`History`,stream:`Stream`,playlist:`Playlist`},s=`
  id
  slug
  name
  description
  publishDate
  audioLength
  picture(width: 1024, height: 1024) {
    url
  }
  owner {
    displayName
    username
    url
  }
  streamInfo {
    url
    hlsUrl
    dashUrl
  }
  favorites {
    totalCount
  }
  reposts {
    totalCount
  }
  plays
  tags {
    tag {
      name
    }
  }
  featuringArtistList
  isExclusive
  restrictedReason
  comments(first: 100) {
    edges {
      node {
        comment
        created
        user {
          displayName
          username
        }
      }
    }
    totalCount
  }
`;function c(e){if(e===`playlist`)return{objectType:`playlist`,objectFields:`
        name
        description
        picture {
          urlRoot
        }
        items(first: 100) {
          edges {
            node {
              cloudcast {
                ${s}
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      `};{let t=e===`listens`?`node { cloudcast { ${s} } }`:`node { ${s} }`;return{objectType:`user`,objectFields:`
        displayName
        biog
        picture {
          urlRoot
        }
        ${a[e]}(first: 100) {
          edges {
            ${t}
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      `}}}const l={path:`/:username/:type?`,categories:[`multimedia`],example:`/mixcloud/dholbach/uploads`,parameters:{username:`Username, can be found in URL`,type:`Type, see below, uploads by default`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!0,supportScihub:!1},radar:[{source:[`mixcloud.com/:username/:type?`]},{source:[`www.mixcloud.com/:username/:type?`]}],name:`User`,maintainers:[`Misaka13514`],handler:g,description:`| Shows   | Reposts | Favorites | History | Stream |
| ------- | ------- | --------- | ------- | ------ |
| uploads | reposts | favorites | listens | stream |`};async function u(e,n,r,a){let o=e+`Lookup`,s=i.headers,c=a?`, slug: "${a}"`:``,l=`{
    ${o}(lookup: {username: "${r}"${c}}) {
      ${n}
    }
  }`,u=await t({method:`post`,url:i.graphqlURL,headers:s,json:{query:l}});return u.data.data[o]}function d(e,t){let n=r.enc.Base64.parse(t).toString(r.enc.Utf8);return[...n].map((t,n)=>String.fromCodePoint((t.codePointAt(0)||0)^(e.codePointAt(n%e.length)||0))).join(``)}function f(e){if(!e)return``;try{return d(i.decryptionKey,e)}catch{return e}}function p(e,t){return t===`playlist`||t===`listens`?e.cloudcast:e}function m(e,t,n){return t===`playlist`&&n?`Mixcloud - ${e}'s Playlist: ${n}`:`Mixcloud - ${e}'s ${o[t]||t}`}function h(e,t,n){let r=i.host;return t===`playlist`&&n?`${r}/${e}/playlists/${n}/`:`${r}/${e}/${t===`uploads`?``:t+`/`}`}async function g(t){let r=t.req.param(`username`),o=t.req.param(`playlist`),s=t.req.param(`type`)??(o?`playlist`:`uploads`);if(!a[s])throw new n(`Invalid type: ${s}`);let{objectType:l,objectFields:d}=c(s),g=await u(l,d,r,o);if(!g)throw Error(`${s===`playlist`?`Playlist`:`User`} not found`);let _=s===`playlist`,v=_?r:g.displayName,y=_?g.description:g.biog,b=g.picture,x=b&&b.urlRoot?`${i.imageBaseURL}${b.urlRoot}`:``,S=g[a[s]],C=S?.edges||[],w=C.map(t=>{let n=p(t.node,s);if(!n)return null;let a=n.streamInfo||{},o=f(a.url),c=n.tags?.map(e=>e.tag?.name).filter(Boolean)||[],l=n.description?.replaceAll(`
`,`<br>`)||``;if(n.featuringArtistList&&n.featuringArtistList.length>0){let e=n.featuringArtistList.slice(0,5).join(`, `);l+=l?`<br><br>`:``,l+=`<strong>Featured Artists:</strong> ${e}`,n.featuringArtistList.length>5&&(l+=` and ${n.featuringArtistList.length-5} more...`)}let u=[];return n.plays&&u.push(`${n.plays} plays`),n.favorites?.totalCount&&u.push(`${n.favorites.totalCount} favorites`),n.reposts?.totalCount&&u.push(`${n.reposts.totalCount} reposts`),n.comments?.totalCount&&u.push(`${n.comments.totalCount} comments`),u.length>0&&(l+=l?`<br><br>`:``,l+=`<em>${u.join(` • `)}</em>`),{title:n.name,author:n.owner?.displayName||r,description:l,pubDate:e(n.publishDate),guid:Buffer.from(n.id,`base64`).toString(),link:`${i.host}/${n.owner?.username||r}/${n.slug}`,itunes_item_image:n.picture?.url||``,itunes_duration:n.audioLength,enclosure_url:o,enclosure_type:`audio/x-m4a`,itunes_author:n.owner?.displayName||r,category:c,comments:n.comments?.totalCount||0,upvotes:n.favorites?.totalCount||0,media:o?{content:{url:o,type:`audio/x-m4a`,duration:n.audioLength},thumbnail:n.picture?.url?{url:n.picture.url}:void 0}:void 0}}).filter(Boolean),T=m(v,s,g.name),E=h(r,s,o);return{title:T,description:y?.replaceAll(`
`,`<br>`)||``,itunes_author:v,image:x,link:E,item:w}}export{g as handler,l as route};
//# sourceMappingURL=mixcloud-CpDW4eTV.js.map