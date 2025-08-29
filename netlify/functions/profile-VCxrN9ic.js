import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import{ofetch_default as t}from"./ofetch-Bzt0BXUH.js";const n={path:`/profile/:handle`,name:`Link3 Profile`,url:`link3.to`,maintainers:[`cxheng315`],example:`/link3/profile/synfutures_defi`,parameters:{handle:`Profile handle`},categories:[`other`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`link3.to/:handle`],target:`/:handle`}],handler:r};async function r(n){let r=n.req.param(`handle`),i=await t(`https://api.cyberconnect.dev/profile/`,{method:`POST`,headers:{"Content-Type":`application/json`},body:{variables:{handle:r},query:`
                query getProfile($id: ID, $handle: String) {
                    profile(id: $id, handle: $handle) {
                        status
                        data {
                            handle
                            ... on OrgProfile {
                                displayName
                                bio
                                profilePicture
                                backgroundPicture
                                __typename
                            }
                            ... on PerProfile {
                                bio
                                personalDisplayName: displayName {
                                    displayName
                                }
                                personalProfilePicture: profilePicture {
                                    picture
                                }
                                personalBackgroundPicture: backgroundPicture {
                                    picture
                                }
                                __typename
                            }
                            blocks {
                                ... on Block {
                                    ... on EventBlock {
                                        __typename
                                        events {
                                            id
                                            title
                                            info
                                            posterUrl
                                            startTimestamp
                                            endTimestamp
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            `}}),a=i.data.profile.status;if(a!==`SUCCESS`)return{title:`Error`,description:`Profile not found`,items:[{title:`Error`,description:`Profile not found`,link:`https://link3.to/${r}`}]};let o=i.data.profile.data,s=o.blocks.filter(e=>e.__typename===`EventBlock`).flatMap(e=>e.events).map(t=>({title:t.title,link:`https://link3.to/e/${t.id}`,description:t.info??``,author:o.handle,guid:t.id,pubDate:t.startTimestamp?e(t.startTimestamp*1e3):null,itunes_item_image:t.posterUrl,itunes_duration:t.endTimestamp-t.startTimestamp}));return{title:o.displayName??o.personalDisplayName.displayName,link:`https://link3.to/${o.handle}`,description:o.bio,logo:o.profilePicture??o.personalProfilePicture.picture,image:o.profilePicture??o.personalProfilePicture.picture,author:o.handle,item:s&&s.length>0?s:[{title:`No events`,description:`No events`,link:`https://link3.to/${r}`}]}}export{n as route};
//# sourceMappingURL=profile-VCxrN9ic.js.map