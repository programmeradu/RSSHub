import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as n}from"./render-CxhTJIsl.js";import"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import i from"node:path";t();const a={path:`/user/sheets/:username/:iso?/:freeOnly?`,categories:[`shopping`],example:`/mymusicsheet/user/sheets/HalcyonMusic/USD/1`,parameters:{username:`用户名，可在URL中找到`,iso:"用于显示价格的ISO 4217货币代码, 支持常见代码, 默认为人民币, 即`CNY`",freeOnly:`只返回免费谱, 任意值为开启`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`mymusicsheet.com/:username/*`,`mymusicsheet.com/:username`],target:`/user/sheets/:username`}],name:`User Sheets`,maintainers:[`Freddd13`],handler:o,description:`关于 ISO 4217，请参考[维基百科](https://zh.wikipedia.org/zh-cn/ISO_4217#%E7%8E%B0%E8%A1%8C%E4%BB%A3%E7%A0%81)`};async function o(t){let{username:a,iso:o=`CNY`,freeOnly:s}=t.req.param(),c=await r(`https://payport.pd.mapia.io/v2/currency`,{searchParams:{serviceProvider:`mms`,"ngsw-bypass":!0,"no-cache":Date.now(),skipHeaders:!0},responseType:`json`}),l=c.data,u=await r.post(`https://mms.pd.mapia.io/mms/graphql`,{json:{operationName:`loadArtistSheets`,query:`
          query loadArtistSheets($data: SheetSearchInput!) {
            sheetSearch(data: $data) {
              list {
                productId
                productType
                metaSong
                metaMaker
                metaMusician
                metaMemo
                instruments
                level
                price
                sheetId
                status
                author {
                  name
                  artistUrl
                  profileUrl
                }
                youtubeId
                title
                supportCountry
                excludeCountries
                __typename
              }
              total
              current
              listNum
            }
          }`,variables:{data:{listNum:10,paginate:`page`,includeChord:null,includeLyrics:null,page:1,level:null,instruments:[],orderBy:{createdAt:`DESC`},isFree:!!s,category:null,artistUrl:a,aggregationKeywords:[`PACKAGE_IDS`,`TAG_IDS`,`INSTRUMENTS`,`SHEET_TYPE`,`INCLUDE_CHORD`,`INCLUDE_LYRICS`,`INSTRUMENTATION`,`LEVEL`,`CATEGORY`],aggregationKeySize:20}}},responseType:`json`}),d=u.data.data.sheetSearch.list,f=d.map(t=>{let r=`Unknown`,s=Number.parseFloat(t.price);if(t.price===0)r=`Free`;else if(!Number.isNaN(s)&&Number.isFinite(s)){let e=l[o];e&&(r=`${(s*e).toFixed(2)} ${o}`)}let c=t.youtubeId,u={musicName:t.metaSong,musicMemo:t.metaMemo,musicianName:t.metaMusician,author:t.author.name,instruments:t.instruments,status:t.status,price:r};return{title:`${t.author.name} | ${t.title} | ${r}`,link:`https://www.mymusicsheet.com/${a}/${t.sheetId}`,itunes_item_image:t.author.profileUrl,description:n(i.join(e,`templates/description-be8cc869.art`),{youtubeId:c,content:u})}});return{title:`${a}'s sheets`,link:`https://www.mymusicsheet.com/${a}?viewType=sheet&orderBy=createdAt`,item:f}}export{a as route};
//# sourceMappingURL=usersheets-DkMezaWX.js.map