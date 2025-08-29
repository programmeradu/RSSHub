import"./esm-shims-Dqvxr0BZ.js";import{config as e}from"./config-Dl8a1sIg.js";import"./logger-CWOoofbD.js";import"./dist-IvUHtNe1.js";import{cache_default as t}from"./cache-kimkMTWJ.js";import"./render-CxhTJIsl.js";import"./parse-date-Bgabdhlb.js";import{ofetch_default as n}from"./ofetch-Bzt0BXUH.js";import{baseUrl as r,getBuildId as i,getData as a,getList as o}from"./utils-C9oKBPEf.js";const s={path:`/user/:userId/:innerSharedContent?`,example:`/daily/user/kramer`,radar:[{source:[`app.daily.dev/:userId/posts`,`app.daily.dev/:userId`]}],parameters:{innerSharedContent:{description:`Where to Fetch inner Shared Posts instead of original`,default:`false`,options:[{value:`false`,label:`False`},{value:`true`,label:`True`}]}},name:`User Posts`,maintainers:[`TonyRL`],handler:c,url:`app.daily.dev`};async function c(s){let c=s.req.param(`userId`),l=s.req.query(`limit`)?Number.parseInt(s.req.query(`limit`),10):7,u=s.req.param(`innerSharedContent`)?JSON.parse(s.req.param(`innerSharedContent`)):!1,d=await i(),f=await t.tryGet(`daily:user:${c}`,async()=>{let e=await n(`${r}/_next/data/${d}/en/${c}.json`,{query:{userId:c}});return e.pageProps}),p=f.user,m=await t.tryGet(`daily:user:${c}:posts`,async()=>{let e=await a({query:`
  query AuthorFeed(
    $loggedIn: Boolean! = false
    $userId: ID!
    $after: String
    $first: Int
    $supportedTypes: [String!] = [
      "article"
      "share"
      "freeform"
      "video:youtube"
      "collection"
    ]
  ) {
    page: authorFeed(
      author: $userId
      after: $after
      first: $first
      ranking: TIME
      supportedTypes: $supportedTypes
    ) {
      ...FeedPostConnection
    }
  }
  fragment FeedPostConnection on PostConnection {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...FeedPost
        contentHtml
        ...UserPost @include(if: $loggedIn)
      }
    }
  }
  fragment FeedPost on Post {
    ...SharedPostInfo
    sharedPost {
      ...SharedPostInfo
    }
    trending
    feedMeta
    collectionSources {
      handle
      image
    }
    numCollectionSources
    updatedAt
    slug
  }
  fragment SharedPostInfo on Post {
    id
    title
    titleHtml
    image
    readTime
    permalink
    commentsPermalink
    summary
    createdAt
    private
    upvoted
    commented
    bookmarked
    views
    numUpvotes
    numComments
    videoId
    scout {
      ...UserShortInfo
    }
    author {
      ...UserShortInfo
    }
    type
    tags
    source {
      ...SourceBaseInfo
    }
    downvoted
    flags {
      promoteToPublic
    }
    userState {
      vote
      flags {
        feedbackDismiss
      }
    }
    slug
  }
  fragment SourceBaseInfo on Source {
    id
    active
    handle
    name
    permalink
    public
    type
    description
    image
    membersCount
    privilegedMembers {
      user {
        id
      }
      role
    }
    currentMember {
      ...CurrentMember
    }
    memberPostingRole
    memberInviteRole
  }
  fragment CurrentMember on SourceMember {
    user {
      id
    }
    permissions
    role
    referralToken
    flags {
      hideFeedPosts
      collapsePinnedPosts
    }
  }
  fragment UserShortInfo on User {
    id
    name
    image
    permalink
    username
    bio
    createdAt
    reputation
  }
  fragment UserPost on Post {
    read
    upvoted
    commented
    bookmarked
    downvoted
  }`,variables:{userId:p.id,first:l,loggedIn:!1}});return o(e,u,!0)},e.cache.routeExpire,!1);return{title:`${p.name} | daily.dev`,description:p.bio,link:`${r}/${c}/posts`,item:m,image:p.image,logo:p.image,icon:p.image,language:`en-us`}}export{s as route};
//# sourceMappingURL=user-DrEKL_Wg.js.map