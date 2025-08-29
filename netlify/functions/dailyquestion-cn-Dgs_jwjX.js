import{__dirname as e,init_esm_shims as t}from"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{art as n}from"./render-CxhTJIsl.js";import"./ofetch-Bzt0BXUH.js";import{got_default as r}from"./got-CdvI2yKX.js";import i from"node:path";t();const a=`https://leetcode.cn`,o={path:`/dailyquestion/cn`,radar:[{source:[`leetcode.cn/`]}],name:`Unknown`,maintainers:[],handler:s,url:`leetcode.cn/`};async function s(){let t={date:``,link:``,titleSlug:``,content:``,frontedId:``,difficulty:``,tags:``},o=a+`/graphql`,s={query:`query questionOfToday {
            todayRecord {
                date
                question {
                    frontendQuestionId: questionFrontendId
                    titleSlug
                }
            }
        } `,variables:{}},c=await r({method:`post`,url:o,headers:{"content-type":`application/json`},body:JSON.stringify(s)}),l=c.data.data.todayRecord[0];t.date=l.date,t.titleSlug=l.question.titleSlug,t.link=a+`/problems/`+t.titleSlug;let u={operationName:`questionData`,query:`query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                questionFrontendId
                title
                titleSlug
                content
                translatedTitle
                translatedContent
                difficulty
                topicTags {
                    name
                    slug
                    translatedName
                    __typename
                }
                __typename
            }
        }`,variables:{titleSlug:t.titleSlug}},d=await r({method:`post`,url:o,headers:{"content-type":`application/json`},body:JSON.stringify(u)}),f={Medium:`🟡`,Easy:`🟢`,Hard:`🔴`},p=d.data.data.question;t.content=p.translatedContent,t.frontedId=p.questionFrontendId,t.difficulty=f[p.difficulty];let m=p.topicTags;m=m.map(e=>{let t=`#`+e.slug;return t=t.replaceAll(`-`,`_`),t}),t.tags=m.join(` `);let h={title:t.frontedId+`.`+t.titleSlug,description:n(i.join(e,`templates/question-description-0a7edc09.art`),{question:t}),link:t.link};return{title:`LeetCode 每日一题`,link:`https://leetcode.cn`,description:`Leetcode 每日一题`,item:[{title:h.title,description:h.description+t.content,link:h.link}]}}export{o as route};
//# sourceMappingURL=dailyquestion-cn-Dgs_jwjX.js.map