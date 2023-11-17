import{_ as x}from"./nuxt-link.7b2acc11.js";import{f as b,r as m,n as h,i as _,c as t,b as g,w as y,a as s,t as i,F as v,m as w,o,d as f,j,p as C,e as S,_ as N}from"./entry.1ce98275.js";const p=r=>(C("data-v-23ed0b8e"),r=r(),S(),r),T={key:0},$=p(()=>s("h1",null,"Welcome on wwwwwww",-1)),q=p(()=>s("h2",null,"To use wwww in any capacity you must sign in using your anilist.co account.",-1)),A={key:1,class:"index-content"},M={key:0},V={class:"user-list-title"},B={class:"user-list-entry-cover"},L=["src"],O={class:"user-list-entry-info"},D={key:0},E={key:1},W=p(()=>s("h2",null,"We're sorry, but we couldn't get your lists.",-1)),z=[W],F=b({__name:"index",setup(r){const c=m(),l=m();I();async function k(){const d=h.get("access_token"),u=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,n={},a=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:u,variables:n})});if(a.status===200){const e=await a.json();console.log(e),c.value=e.data.Viewer}}async function I(){if(await k(),!c.value)return console.log("User not logged in (yet).");const d=h.get("access_token"),u=`
        query ($userId: Int, $type: MediaType) {
            MediaListCollection(userId: $userId, type: $type) {
                lists {
                    name
                    entries {
                        status
                        score
                        progress
                        id
                        media {
                            id
                            idMal
                            title {
                                romaji
                                english
                                native
                            }
                            coverImage {
                                extraLarge
                                large
                                medium
                                color
                            }
                            description
                            episodes
                            bannerImage
                        }
                    }
                }
            }
        }
    `,n={userId:c.value.id,type:"ANIME"},e=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:u,variables:n})})).json();console.log(e),l.value=e.data.MediaListCollection.lists,console.warn(l.value)}return(d,u)=>{const n=x;return _(c)?(o(),t("div",A,[s("h1",null,"Welcome back, "+i(_(c).name),1),_(l)?(o(),t("div",M,[(o(!0),t(v,null,w(_(l),a=>(o(),t("div",{key:a.name,class:"user-list"},[s("h2",V,i(a.name),1),(o(!0),t(v,null,w(a.entries,e=>(o(),t("div",{key:e.media.id,class:"user-list-entry"},[g(n,{to:`/anime/${e.media.idMal}`},{default:y(()=>[s("div",B,[s("img",{src:e.media.coverImage.large,alt:"Cover Image",class:"user-list-entry-cover-image"},null,8,L)]),s("div",O,[s("h4",null,i(e.media.title.english),1),s("h5",null,[f(i(e.progress)+"/"+i(e.media.episodes)+" Episodes watched. ",1),e.score>0?(o(),t("span",D,i(e.score)+" / 10",1)):j("",!0)])])]),_:2},1032,["to"])]))),128))]))),128))])):(o(),t("div",E,z))])):(o(),t("div",T,[$,q,g(n,{to:"/login"},{default:y(()=>[f("Go to login page.")]),_:1})]))}}});const U=N(F,[["__scopeId","data-v-23ed0b8e"]]);export{U as default};
