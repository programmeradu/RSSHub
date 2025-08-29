import"./esm-shims-Dqvxr0BZ.js";import{config as e}from"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{config_not_found_default as r}from"./config-not-found-BVqhRP9D.js";import i from"markdown-it";const a=i({html:!0,linkify:!0}),o={path:`/discussion/:user/:repo/:state?/:category?`,categories:[`programming`],example:`/github/discussion/DIYgod/RSSHub`,parameters:{user:`User name`,repo:`Repo name`,state:{description:`The state of discussions`,default:`open`,options:[{label:`Open`,value:`open`},{label:`Closed`,value:`closed`},{label:`Answered`,value:`answered`},{label:`Unanswered`,value:`unanswered`},{label:`Locked`,value:`locked`},{label:`Unlocked`,value:`unlocked`},{label:`All`,value:`all`}]},category:"Category Name (case-sensitive). Default: `null`."},features:{requireConfig:[{name:`GITHUB_ACCESS_TOKEN`,description:`GitHub Access Token`}]},radar:[{source:[`github.com/:user/:repo/discussions`,`github.com/:user/:repo/discussions/:id`,`github.com/:user/:repo`],target:`/discussion/:user/:repo`}],name:`Repo Discussions`,maintainers:[`waynzh`],handler:s};async function s(i){if(!e.github||!e.github.access_token)throw new r(`GitHub Discussions RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);let{user:o,repo:s,limit:l,state:u=`open`,category:d=null}=i.req.param(),{answered:f,closed:p,locked:m}=c(u),h=Math.min(Number.parseInt(l)||100,100),g=`https://github.com/${o}/${s}/discussions`,_=`https://api.github.com/graphql`,v=`first: ${h}`;if(f!==null&&(v+=`, answered: ${f}`),d!==null){let t=await n({method:`post`,url:_,headers:{Authorization:`bearer ${e.github.access_token}`},json:{query:`
                {
                    repository(owner: "${o}", name: "${s}") {
                        discussionCategories(first: 25) {
                            nodes {
                                id,
                                name,
                            }
                        },
                    }
                  }
                `}}),r=t.data.data.repository.discussionCategories.nodes.find(e=>e.name===d);v+=r?.id?`, categoryId: "${r.id}"`:``}let y=await n({method:`post`,url:_,headers:{Authorization:`bearer ${e.github.access_token}`},json:{query:`
            {
                repository(owner: "${o}", name: "${s}") {
                    discussions(${v}) {
                        nodes {
                            title,
                            author {
                                login
                            },
                            createdAt,
                            closed,
                            isAnswered,
                            locked,
                            body,
                            url
                        }
                  },
                }
              }
            `}}),b=y.data.data.repository.discussions.nodes.filter(e=>p===null?e:e.closed===p).filter(e=>m===null?e:e.locked===m);return{allowEmpty:!0,title:`${o}/${s} Discussions`,link:g,item:b.map(e=>({title:e.title,author:e.author?.login??`ghost`,description:e.body?a.render(e.body):`No description`,pubDate:t(e.createdAt),link:e.url}))}}function c(e){let t=null,n=null,r=null;switch(e){case`answered`:t=!0;break;case`unanswered`:t=!1;break;case`closed`:n=!0;break;case`open`:n=!1;break;case`locked`:r=!0;break;case`unlocked`:r=!1;break;case`all`:default:break}return{answered:t,closed:n,locked:r}}export{o as route};
//# sourceMappingURL=discussions-DVi1pdEN.js.map