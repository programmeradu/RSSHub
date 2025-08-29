import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{art as n}from"./render-CxhTJIsl.js";import{ofetch_default as r}from"./ofetch-Bzt0BXUH.js";import i from"node:path";t();const a={0:`Community`,1:`Microtransaction`,2:`Collection`,3:`Art`,4:`Video`,5:`Screenshot`,6:`Game`,7:`Software`,8:`Concept`,9:`WebGuide`,10:`IntegratedGuide`,11:`Merch`,12:`ControllerBinding`,13:`SteamworksAccessInvite`,14:`SteamVideo`,15:`GameManagedItem`},o={path:`/appcommunityfeed/:appid/:routeParams?`,categories:[`game`],example:`/steam/appcommunityfeed/730`,parameters:{appid:`Steam appid, can be found on the community hub page or store page URL.`,routeParams:`Query parameters.`},radar:[{title:`Community Hub`,source:[`steamcommunity.com/app/:appid`],target:`/appcommunityfeed/:appid`},{title:`Community Hub`,source:[`store.steampowered.com/app/:appid/*/`],target:`/appcommunityfeed/:appid`}],description:`Query Parameters:

| Name                   | Type   | Description             |
| ---------------------- | ------ | ----------------------- |
| p                      | string | p                       |
| rgSections[]           | string | rgSections              |
| filterLanguage         | string | Filter Language         |
| languageTag            | string | Language Tag            |
| nMaxInappropriateScore | string | Max Inappropriate Score |

Example:
- \`/appcommunityfeed/730/p=1&rgSections[]=2&rgSections[]=4&filterLanguage=english&languageTag=english&nMaxInappropriateScore=1\` for CS2 Screenshot and Artwork contents.
- \`/appcommunityfeed/730/rgSections[]=6\` for CS2 Workshop contents only.
- \`/appcommunityfeed/570/rgSections[]=3&rgSections[]=9\` for Dota2 Video and Guides contents.

::: tip
It can also access community hub contents that require a logged-in account.
:::
`,name:`Steam Community Hub Feeds`,maintainers:[`NyaaaDoge`],handler:async t=>{let{appid:o=730,routeParams:s}=t.req.param(),c=`https://steamcommunity.com/library/appcommunityfeed/${o}${s?`?${s}`:``}`,l=await r(c);return{title:`${o} Steam Community Hub`,link:`https://steamcommunity.com/app/${o}`,item:l.hub.map(t=>({title:t.title===``?a[t.type]:t.title,link:`https://steamcommunity.com/sharedfiles/filedetails/?id=${t.published_file_id}`,description:n(i.join(e,`templates/appcommunityfeed-description-f1a492c0.art`),{image:t.full_image_url,description:t.description}),author:t.creator.name,category:a[t.type]}))}}};export{o as route};
//# sourceMappingURL=appcommunityfeed-DRfqNUlQ.js.map