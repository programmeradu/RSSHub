import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a=`http://yz.neu.edu.cn`,o=5792,s={download:o,master1:5932,master2:5933,phd1:5945,phd2:5946},c=async(s,c)=>{let l=await Promise.all(s.map(async s=>{let l=i(s),d=l(`span.Article_Title > a`),f=d.attr(`title`)??``,p=a+d.attr(`href`),m={title:f,link:p,description:``,pubDate:(()=>{let e=l(`span.Article_PublishDate`),n=e.text()?r(t(e.text()),8):void 0;return n})(),author:c===o?`研招办`:``};return c===o&&/\.(pdf|docx?|xlsx?|zip|rar|7z)$/i.test(p)?(m.description=`
                        <p>${f}</p><br/>
                        <a href="${p}">点击进入下载地址传送门～</a>
                    `,m):await e.tryGet(p,async()=>{let e=await n(p),a=i(e.data),s=u(a);if(m.description=s,c!==o){let e=a(`.arti_update`).text().match(/(\d{4}-\d{2}-\d{2})/),n=e?e[1]:``,i=a(`.arti_publisher`).text().match(/[:：]?\s*(.+)/),o=i?i[1].trim():``;m.pubDate=r(t(n),8),m.author=o}return m})}));return l},l=async e=>{let t=e.req.param(`type`);s[t]&&(t=s[t]);let r=`${a}/${t}/list.htm`,o=await n(r),l=o.data,u=i(l),d=u(`title`).text(),f=u(`div.col_news_list ul.wp_article_list li`).toArray(),p=await c(f,t);return{title:`${d}-东北大学研究生招生信息网`,description:d,link:a,item:p}},u=e=>{let t=e(`.entry`);return!t||t.length===0?``:(t.find(`span`).removeAttr(`style`).removeAttr(`class`),t.find(`div`).each((t,n)=>{let r=e(n).html();e(n).replaceWith(r)}),t.find(`p`).removeAttr(`style`).removeAttr(`class`),t.find(`a`).removeAttr(`style`).removeAttr(`class`),t.find(`td`).removeAttr(`bgcolor`),t.find(`img`).each((t,n)=>{let r=e(n).attr(`src`),i=e(n).attr(`alt`)||``;e(n).replaceWith(`<img src="${r}" alt="${i}" />`)}),t.find(`.wp_pdf_player`).each((t,n)=>{let r=a+e(n).attr(`pdfsrc`);e(n).replaceWith(`
            <p>点击进入文件传送门～：<a href="${r}">查看文件</a></p>
            `)}),t.find(`.wp_video_player`).each((t,n)=>{let r=e(n),i=r.attr(`sudy-wp-src`);if(i){let e=a+i,t=r.attr(`style`)?.match(/width:\s*(\d+)px/),n=t&&t[1]?t[1]:`600`,o=r.attr(`style`)?.match(/height:\s*(\d+)px/),s=o&&o[1]?o[1]:`400`,c=`
                <video controls width="${n}" height="${s}" style="max-width: 100%;margin-left: auto;margin-right: auto;">
                    <source src="${e}" type="video/mp4">
                    您的浏览器不支持 video 标签。
                </video>
            `;r.replaceWith(c)}}),t.html())},d={path:`/yz/:type`,categories:[`university`],example:`/neu/yz/master1`,parameters:{type:`分类id,见下表`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`yz.neu.edu.cn/:type/list.htm`],target:`/yz/:type`}],name:`研究生招生信息网`,url:`yz.neu.edu.cn`,maintainers:[`paintstar`],handler:l,description:`
| 分类名                     | 分类id      |
| ------------------------- | ---------- |
| 硕士公告                   | master1     |
| 硕士简章                   | master2     |
| 博士公告                   | phd1        |
| 博士简章                   | phd2        |
| 下载中心                   | download    |`};export{d as route};
//# sourceMappingURL=yz-bxri95GJ.js.map