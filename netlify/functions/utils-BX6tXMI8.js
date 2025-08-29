import{ofetch_default as e}from"./ofetch-Bzt0BXUH.js";const t=(e,t)=>e.map(e=>{let n=`https://skebetter.com/author/${e.user_id}`,r=`
            <p>❤${e.fav}    🔁${e.retweet}</p>
            ${e.media_urls.map(e=>`<img src="${e.media_uri}" />`).join(``)}
        `;return t===`manga`?{title:e.text,description:r,author:e.user_name,link:`https://skebetter.com/series/${e.series_id}`}:t===`illust`?{title:e.text,description:r,author:e.user_name,link:`${n}/illust/${e.id}`}:{title:e.text,description:r,author:e.user_name,link:e.series_id?`https://skebetter.com/series/${e.series_id}`:`${n}/manga/${e.id}`}}),n=async(t,n=!1)=>{let r=await e(t);return n?r:r.tweet};export{n as fetchData,t as processItems};
//# sourceMappingURL=utils-BX6tXMI8.js.map