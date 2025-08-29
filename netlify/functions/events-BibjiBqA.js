import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import{ofetch_default as t}from"./ofetch-Bzt0BXUH.js";const n={path:`/events`,name:`Link3 Events`,url:`link3.to`,maintainers:[`cxheng315`],example:`/link3/events`,categories:[`other`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`link3.to/events`],target:`/events`}],handler:r};async function r(){let n=await t(`https://api.cyberconnect.dev/profile/`,{method:`POST`,headers:{"Content-Type":`application/json`},body:{variables:{order:`START_TIME_ASC`},query:`
                query getTrendingEvents($first: Int, $after: String, $order: TrendingEventsRequest_EventOrder, $filter: TrendingEventsRequest_EventFilter) {
                    trendingEvents(first: $first, after: $after, order: $order, filter: $filter) {
                        list {
                            id
                            info
                            title
                            posterUrl
                            startTimestamp
                            endTimestamp
                            organizer {
                                lightInfo {
                                    displayName
                                    profilePicture
                                    profileHandle
                                }
                            }
                        }
                    }
                }
            
            `}}),r=n.data.trendingEvents.list.map(t=>({title:t.title,link:`https://link3.to/e/${t.id}`,description:t.info??``,author:t.organizer.lightInfo.displayName,guid:t.id,pubDate:e(t.startTimestamp*1e3),itunes_item_image:t.posterUrl,itunes_duration:t.endTimestamp-t.startTimestamp}));return{title:`Link3 Events`,link:`https://link3.to/events`,description:`Link3 is a Web3 native social platform built on CyberConnect protocol.`,image:`https://link3.to/logo.svg`,logo:`https://link3.to/logo.svg`,author:`Link3`,item:r}}export{n as route};
//# sourceMappingURL=events-BibjiBqA.js.map