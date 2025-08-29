import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{timezone as r}from"./timezone-BrNu6iXe.js";import{load as i}from"cheerio";const a={gjldrhd:`gjldrhd_674881`,wsrc:`wsrc_674883`,wjbxw:`wjbxw_674885`,sjxw:`sjxw_674887`,fyrbt:`fyrbt_674889`,cfhsl:`cfhsl_674891`,dsrm:`dsrm_674893`,zwbd:`zwbd_674895`,zcjd:`zcjd`},o={path:[`/fmprc/:category?`,`/mfa/wjdt/:category?`],name:`Unknown`,maintainers:[`nicolaszf`,`nczitzk`],handler:s,description:`| 分类       | category |
| ---------- | -------- |
| 领导人活动 | gjldrhd  |
| 外事日程   | wsrc     |
| 部领导活动 | wjbxw    |
| 业务动态   | sjxw     |
| 发言人表态 | fyrbt    |
| 吹风会     | cfhsl    |
| 大使任免   | dsrm     |
| 驻外报道   | zwbd     |
| 政策解读   | zcjd     |`};async function s(o){let s=o.req.param(`category`)??`gjldrhd`,c=`https://www.mfa.gov.cn/web/wjdt_674879/${a[s]}`,l=await n({method:`get`,url:c}),u=i(l.data),d=u(`ul.list1 li a`).slice(0,o.req.query(`limit`)?Number.parseInt(o.req.query(`limit`)):35).toArray().map(e=>(e=u(e),{title:e.text(),link:e.attr(`href`).replace(/^\./,c)}));return d=await Promise.all(d.map(a=>e.tryGet(a.link,async()=>{let e=await n({method:`get`,url:a.link}),o=i(e.data);return a.description=o(`#News_Body_Txt_A`).html(),a.pubDate=r(t(o(`.time span`).last().text()),8),a.category=o(`meta[name="Keywords"]`).attr(`content`)?.split(`;`)??[],a}))),{title:u(`title`).text(),link:c,item:d}}export{o as route};
//# sourceMappingURL=wjdt-DSW6sMK_.js.map