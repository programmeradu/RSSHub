import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{cache_default as e}from"./cache-kimkMTWJ.js";import{parseDate as t}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as n}from"./got-CdvI2yKX.js";import{load as r}from"cheerio";const i=`http://ugs.hrbeu.edu.cn`,a={gztz:{all:`/2821`},jwc:{all:`/jwc`,jxap:`/2847`,ksgl:`/2895`,xjgl:`/2902`,wytk:`/2897`,cjgl:`/2901`},sjjxyjlc:{all:`/3206`,syjx:`/2847`,sysjs:`/sysjs`,xwsx:`/2909`,xwlw:`/2910`,kcsj:`/2911`,cxcy:`/2913`,xjjl:`/xjjl`},jypgc:{all:`/3207`,jxyjyjxcg:`/2916`,zljk:`/2917`},zyjsc:{all:`/3208`,zyyjcjs:`/2914`,cgsyb:`/2925`,jxmsyyxzjjs:`/2918`,ktjs:`/2919`,syjx:`/2920`},gjdxswhszjd:{all:`/3209`},jsjxfzzx:{all:`/3210`,jspx:`/2915`},zhbgs:{all:`/3211`,lxkc:`/lxkc`}},o={path:`/ugs/news/:author?/:category?`,categories:[`university`],example:`/hrbeu/ugs/news/jwc/jxap`,parameters:{author:"发布部门，默认为 `gztz`",category:"分类，默认为 `all`"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`ugs.hrbeu.edu.cn/:author/list.htm`],target:`/ugs/news/:author`}],name:`本科生院工作通知`,maintainers:[`XYenon`],handler:s,description:`author 列表：

| 教务处 | 实践教学与交流处 | 教育评估处 | 专业建设处 | 国家大学生文化素质基地 | 教师教学发展中心 | 综合办公室 | 工作通知 |
| ------ | ---------------- | ---------- | ---------- | ---------------------- | ---------------- | ---------- | -------- |
| jwc    | sjjxyjlzx        | jypgc      | zyjsc      | gjdxswhszjd            | jsjxfzzx         | zhbgs      | gztz     |

  category 列表：

  \`all\` 为全部

  教务处：

| 教学安排 | 考试管理 | 学籍管理 | 外语统考 | 成绩管理 |
| -------- | -------- | -------- | -------- | -------- |
| jxap     | ksgl     | xjgl     | wytk     | cjgl     |

  实践教学与交流处：

| 实验教学 | 实验室建设 | 校外实习 | 学位论文 | 课程设计 | 创新创业 | 校际交流 |
| -------- | ---------- | -------- | -------- | -------- | -------- | -------- |
| syjx     | sysjs      | xwsx     | xwlw     | kcsj     | cxcy     | xjjl     |

  教育评估处：

| 教学研究与教学成果 | 质量监控 |
| ------------------ | -------- |
| jxyjyjxcg          | zljk     |

  专业建设处：

| 专业与教材建设 | 陈赓实验班 | 教学名师与优秀主讲教师 | 课程建设 | 双语教学 |
| -------------- | ---------- | ---------------------- | -------- | -------- |
| zyyjcjs        | cgsyb      | jxmsyyxzjjs            | kcjs     | syjx     |

  国家大学生文化素质基地：无

  教师教学发展中心：

| 教师培训 |
| -------- |
| jspx     |

  综合办公室：

| 联系课程 |
| -------- |
| lxkc     |

  工作通知：无`};async function s(o){let s=o.req.param(`author`)||`gztz`,c=o.req.param(`category`)||`all`,l=i+a[s][c]+`/list.htm`,u=await n(l,{headers:{Referer:i}}),d=r(u.data),f=d(`.wp_article_list_table .border9`).toArray().map(e=>(e=d(e),{title:e.find(`a`).attr(`title`),link:new URL(e.find(`a`).attr(`href`),i).href,pubDate:t(e.find(`.date`).text())})),p=await Promise.all(f.map(t=>e.tryGet(t.link,async()=>{if(t.link.includes(`.htm`)){let e=await n(t.link),i=r(e.data);t.description=i(`.wp_articlecontent`).html().trim()}else t.description=`此链接为文件，请点击下载`;return t})));return{title:`哈尔滨工程大学本科生院工作通知`,link:l,item:p}}export{o as route};
//# sourceMappingURL=news-CCwKP1x6.js.map