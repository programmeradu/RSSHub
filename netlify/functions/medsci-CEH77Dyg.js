import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t,parseRelativeDate as n}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import{load as i}from"cheerio";const a={path:`/:sid?/:tid?`,categories:[`new-media`],example:`/medsci`,parameters:{sid:`科室，见下表，默认为推荐`,tid:`亚专业，可在对应科室页 URL 中找到，默认为该科室的全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`资讯`,maintainers:[`nczitzk`],handler:o,description:`::: tip
  下表为科室对应的 sid，若想获得 tid，可以到对应科室页面 URL 中寻找 \`t_id\` 字段的值，下面是一个例子：

  如 [肿瘤 - NSCLC](https://www.medsci.cn/department/details?s_id=5&t_id=277) 的 URL 为 \`https://www.medsci.cn/department/details?s_id=5&t_id=277\`，可以看到此时 \`s_id\` 对应 \`sid\` 的值为 5， \`t_id\` 对应 \`tid\` 的值为 277，所以可以得到路由 [\`/medsci/5/277\`](https://rsshub.app/medsci/5/277)
:::

| 心血管 | 内分泌 | 消化 | 呼吸 | 神经科 |
| ------ | ------ | ---- | ---- | ------ |
| 2      | 6      | 4    | 12   | 17     |

| 传染科 | 精神心理 | 肾内科 | 风湿免疫 | 血液科 |
| ------ | -------- | ------ | -------- | ------ |
| 9      | 13       | 14     | 15       | 21     |

| 老年医学 | 胃肠外科 | 血管外科 | 肝胆胰外 | 骨科 |
| -------- | -------- | -------- | -------- | ---- |
| 19       | 76       | 92       | 91       | 10   |

| 普通外科 | 胸心外科 | 神经外科 | 泌尿外科 | 烧伤科 |
| -------- | -------- | -------- | -------- | ------ |
| 23       | 24       | 25       | 26       | 27     |

| 整形科 | 麻醉疼痛 | 罕见病 | 康复医学 | 药械 |
| ------ | -------- | ------ | -------- | ---- |
| 28     | 29       | 304    | 95       | 11   |

| 儿科 | 耳鼻咽喉 | 口腔科 | 眼科 | 政策人文 |
| ---- | -------- | ------ | ---- | -------- |
| 18   | 30       | 31     | 32   | 33       |

| 营养全科 | 预防公卫 | 妇产科 | 中医科 | 急重症 |
| -------- | -------- | ------ | ------ | ------ |
| 34       | 35       | 36     | 37     | 38     |

| 皮肤性病 | 影像放射 | 转化医学 | 检验病理 | 护理 |
| -------- | -------- | -------- | -------- | ---- |
| 39       | 40       | 42       | 69       | 79   |

| 糖尿病 | 冠心病 | 肝病 | 乳腺癌 |
| ------ | ------ | ---- | ------ |
| 8      | 43     | 22   | 89     |`};async function o(a){let o=a.req.param(`sid`)??``,s=a.req.param(`tid`)??``;o=o===`recommend`?``:o;let c=`https://www.medsci.cn`,l=`${c}${o?`/department/details?s_id=${o}&module=article${s?`&t_id=${s}`:``}`:``}`,u=await r({method:`get`,url:l}),d=i(u.data),f=d(`#articleList`).find(`.ms-link`).toArray().map(e=>{e=d(e);let r=e.parent().parent().find(`.item-meta-item`).first().text();return{title:e.text(),link:`${c}${e.attr(`href`).replace(/;jsessionid=[\dA-Z]+/,``)}`,pubDate:r.indexOf(`-`)>0?t(r):n(r)}});return f=await Promise.all(f.map(n=>e.tryGet(n.link,async()=>{let e=await r({method:`get`,url:n.link}),a=i(e.data),o=e.data.match(/"publishedTime":"(.*)","publishedTimeString"/);return n.author=a(`.name`).text(),n.description=a(`#content`).html(),n.pubDate=o?t(o[1]):n.pubDate,n.category=a(`meta[name="keywords"]`).attr(`content`)?.split(/,|，/).filter(e=>e!==``&&e!==`undefined`)??[],n}))),{title:`${o?d(`.department-header-active`).text():`推荐`} -${s?` ${d(`.department-keywords-ul .active`).text()} -`:``} MedSci.cn`,link:l,item:f}}export{a as route};
//# sourceMappingURL=medsci-CEH77Dyg.js.map