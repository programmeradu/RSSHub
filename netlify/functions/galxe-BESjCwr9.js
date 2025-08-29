import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import{ofetch_default as t}from"./ofetch-Bzt0BXUH.js";const n={path:`/quest/:alias`,name:`Quest`,url:`app.galxe.com`,maintainers:[`cxheng315`],example:`/galxe/quest/MissionWeb3`,categories:[`other`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`app.galxe.com/quest/:alias`],target:`/quest/:alias`}],handler:r};async function r(n){let r=n.req.param(`alias`),i=await t(`https://graphigo.prd.galaxy.eco/query`,{method:`POST`,headers:{"Content-Type":`application/json`},body:{variables:{alias:r,campaignInput:{first:n.req.query(`limit`)?Number.parseInt(n.req.query(`limit`)):50,excludeChildren:!0,listType:`Newest`}},query:`
                query BrowseSpaceCampaigns($id: Int, $alias: String, $campaignInput: ListCampaignInput!) {
                    space(id: $id, alias: $alias) {
                        id
                        name
                        alias
                        info
                        campaigns(input: $campaignInput) {
                            list {
                                startTime
                                endTime
                                id
                                name
                                description
                                __typename
                            }
                            pageInfo {
                                endCursor
                                hasNextPage
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                }
            `}}),a=i.data.space,o=a.campaigns.list.map(t=>({title:t.name,link:`https://app.galxe.com/quest/${r}/${t.id}`,description:t.description,pubDate:t.startTime?e(t.startTime*1e3):null}));return{title:a.name,description:a.info,link:`https://app.galxe.com/quest/${r}`,item:o,author:a.alias}}export{n as route};
//# sourceMappingURL=galxe-BESjCwr9.js.map