import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./parse-date-Bgabdhlb.js";import{ofetch_default as e}from"./ofetch-Bzt0BXUH.js";import{baseUrl as t,gqlEndpoint as n,parseItem as r}from"./utils-DUDLsATZ.js";const i=async i=>{let{uid:a}=i.req.param(),o=i.req.query(`limit`)?Number.parseInt(i.req.query(`limit`),10):20,s=await e(n,{method:`POST`,body:{query:`{
                user(input: {userName: "${a}"}) {
                  displayName
                  avatar
                  info {
                    description
                  }
                  articles(input: {first: ${o}}) {
                    edges {
                      node {
                        shortHash
                        title
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
              }`}}),c=s.data.user;return{title:`Matters | ${c.displayName}`,link:`${t}/@${a}`,description:c.info.description,image:c.avatar,item:c.articles.edges.map(({node:e})=>r(e))}},a={path:`/author/:uid`,name:`Author`,example:`/matters/author/robertu`,parameters:{uid:`Author id, can be found at author's homepage url`},maintainers:[`Cerebrater`,`xosdy`],handler:i,radar:[{source:[`matters.town/:uid`],target:e=>`/matters/author/${e.uid.slice(1)}`}]};export{a as route};
//# sourceMappingURL=author-CwE5250d.js.map