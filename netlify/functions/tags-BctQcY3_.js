import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import"./parse-date-Bgabdhlb.js";import{ofetch_default as t}from"./ofetch-Bzt0BXUH.js";import{baseUrl as n,gqlEndpoint as r,parseItem as i}from"./utils-DUDLsATZ.js";import*as a from"cheerio";const o=r=>e.tryGet(`matters:tags:${r}`,async()=>{let e=await t(`${n}/tags/${r}`),i=a.load(e),o=JSON.parse(i(`script#__NEXT_DATA__`).text()),s=Object.entries(o.props.apolloState.data.ROOT_QUERY).find(([e])=>e.startsWith(`node`))?.pop();return s?.id.split(`:`)[1]}),s=async e=>{let{tid:a}=e.req.param(),s=e.req.query(`limit`)?Number.parseInt(e.req.query(`limit`),10):20,c=await o(a),l=await t(r,{method:`POST`,body:{query:`{
                node(input: {id: "${c}"}) {
                  ... on Tag {
                    content
                    description
                    articles(input: {first: ${s}}) {
                      edges {
                        node {
                          title
                          shortHash
                          content
                          createdAt
                          author {
                            displayName
                          }
                          tags {
                            content
                          }
                        }
                      }
                    }
                  }
                }
              }`}}),u=l.data.node;return{title:`Matters | ${u.content}`,link:`${n}/tags/${a}`,description:u.description,item:u.articles.edges.map(({node:e})=>i(e))}},c={path:`/tags/:tid`,name:`Tags`,example:`/matters/tags/972-哲學`,parameters:{tid:`Tag id, can be found in the url of the tag page`},maintainers:[`Cerebrater`],handler:s,radar:[{source:[`matters.town/tags/:tid`]}]};export{c as route};
//# sourceMappingURL=tags-BctQcY3_.js.map