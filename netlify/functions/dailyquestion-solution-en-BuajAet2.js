import"./esm-shims-Dqvxr0BZ.js";import"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import"./helpers-DzX-lcQO.js";import{parseDate as e}from"./parse-date-Bgabdhlb.js";import"./ofetch-Bzt0BXUH.js";import{got_default as t}from"./got-CdvI2yKX.js";import{timezone as n}from"./timezone-BrNu6iXe.js";import r from"node:path";import i from"markdown-it";const a=i({html:!0,breaks:!0}),o={path:`/dailyquestion/solution/en`,radar:[{source:[`leetcode.com/`]}],name:`Unknown`,maintainers:[],handler:s,url:`leetcode.com/`};async function s(){let i=`https://leetcode.com`,o=`${i}/graphql/`,s={"content-type":`application/json`},c={Medium:`🟡`,Easy:`🟢`,Hard:`🔴`},l=(await t({method:`post`,url:o,json:{operationName:`questionOfToday`,query:`query questionOfToday {
                            activeDailyCodingChallengeQuestion {
                                date
                                link
                                question {
                                    frontendQuestionId: questionFrontendId
                                    titleSlug
                                }
                            }
                        }`,variables:{}},headers:s})).data.data,u=l.activeDailyCodingChallengeQuestion.question.titleSlug,d=`${i}/problems/${u}/`,f=(await t({method:`post`,url:o,json:{operationName:`questionData`,query:`query questionData($titleSlug: String!) {
                            question(titleSlug: $titleSlug) {
                                questionId
                                questionFrontendId
                                categoryTitle
                                boundTopicId
                                title
                                titleSlug
                                content
                                translatedTitle
                                translatedContent
                                isPaidOnly
                                difficulty
                                likes
                            }
                        }`,variables:{titleSlug:u}},headers:s})).data.data.question,p=c[f.difficulty]||``,m=(await t({method:`post`,url:o,json:{operationName:`QuestionNote`,query:`query QuestionNote($titleSlug: String!) {
                    question(titleSlug: $titleSlug) {
                      questionId
                      article
                      solution {
                        id
                        content
                        contentTypeId
                        canSeeDetail
                        paidOnly
                        hasVideoSolution
                        paidOnlyVideo
                        rating {
                          id
                          count
                          average
                          userRating {
                            score
                          }
                        }
                      }
                    }
                }`,variables:{titleSlug:u}},headers:s})).data.data.question.solution;m.content===null&&(m.content=`Sorry, the solution of this question may be locked.`);let h=async e=>{let n=/!\?!(.+)!\?!/;if(!n.test(e))return e;let i=e.match(new RegExp(n,`g`)),a=async e=>{let i=e.match(n)[1].split(`:`)[0],a=r.resolve(`/`+d+`solution/`,i).slice(1),o=(await t({url:a,method:`get`,headers:s})).data.timeline;return o.map(e=>`![pic](${r.resolve(`/problems/${u}/solution/`,e.image)})`).join(`
`)},o=await Promise.all(i.map(e=>a(e)));for(let[t,n]of i.entries())e=e.replace(n,o[t]);return e},g=async e=>{let n=/<iframe.*? src=".*?playground\/(.*?)\/shared".*<\/iframe>/;if(!n.test(e))return e;let r=e.match(new RegExp(n,`g`)),i=async e=>{let r=e.match(n)[1],i=(await t({method:`post`,url:o,json:{operationName:`fetchPlayground`,query:`query fetchPlayground {
                            playground(uuid: "${r}") {
                              testcaseInput
                              name
                              isUserOwner
                              isLive
                              showRunCode
                              showOpenInPlayground
                              selectedLangSlug
                              isShared
                              __typename
                            }
                            allPlaygroundCodes(uuid: "${r}") {
                              code
                              langSlug
                              __typename
                            }
                          }`,variables:{}},headers:s})).data.data.allPlaygroundCodes;return i.map(e=>`###${e.langSlug}\n\r \`\`\`${e.langSlug}\n ${e.code}\n\`\`\``).join(`
\r`)},a=await Promise.all(r.map(e=>i(e)));for(let[t,n]of r.entries())e=e.replace(n,a[t]);return e},_=async e=>(e=await g(e),e=await h(e),e);return m.content=await _(m.content),{title:`LeetCode DailyQuestion Solution`,description:`LeetCode DailyQuestion Solution`,link:d,item:[{title:`DailyQuestion-${f.title}${p}`,link:d,description:f.content,pubDate:n(e(l.activeDailyCodingChallengeQuestion.date),8)},{title:`Solution-${f.title}`,link:`${d}solution/`,description:a.render(m.content),pubDate:n(e(l.activeDailyCodingChallengeQuestion.date),8),author:`leetcode`}]}}export{o as route};
//# sourceMappingURL=dailyquestion-solution-en-BuajAet2.js.map