import{_ as j}from"./nuxt-link.f85f6a61.js";import{f as C,r as g,i as u,c as t,b as y,w as k,a as s,t as r,F as v,m as w,o,d as f,j as S,p as N,e as T,_ as $}from"./entry.27dd4a2e.js";const m=d=>(N("data-v-e85d3730"),d=d(),T(),d),q={key:0},A=m(()=>s("h1",null,"Welcome on wwwwwww",-1)),M=m(()=>s("h2",null,"To use wwww in any capacity you must sign in using your anilist.co account.",-1)),V={key:1,class:"index-content"},B={key:0},W={class:"user-list-title"},L={class:"user-list-entry-cover"},O=["src"],D={class:"user-list-entry-info"},E={key:0},z={key:1},F=m(()=>s("h2",null,"We're sorry, but we couldn't get your lists.",-1)),J=[F],P=C({__name:"index",setup(d){const l=g(),_=g();x();async function I(){const i=document.cookie.split("; ").find(n=>n.startsWith("access_token")),c=i?i.split("=")[1]:"",a=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,e={},p=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({query:a,variables:e})});if(p.status===200){const n=await p.json();console.log(n),l.value=n.data.Viewer}}async function x(){await I();const i=document.cookie.split("; ").find(b=>b.startsWith("access_token")),c=i?i.split("=")[1]:"",a=`
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
    `,e={userId:l.value.id,type:"ANIME"},n=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({query:a,variables:e})})).json();console.log(n),_.value=n.data.MediaListCollection.lists,console.warn(_.value)}return(h,i)=>{const c=j;return u(l)?(o(),t("div",V,[s("h1",null,"Welcome back, "+r(u(l).name),1),u(_)?(o(),t("div",B,[(o(!0),t(v,null,w(u(_),a=>(o(),t("div",{key:a.name,class:"user-list"},[s("h2",W,r(a.name),1),(o(!0),t(v,null,w(a.entries,e=>(o(),t("div",{key:e.media.id,class:"user-list-entry"},[y(c,{to:`/anime/${e.media.idMal}`},{default:k(()=>[s("div",L,[s("img",{src:e.media.coverImage.large,alt:"Cover Image",class:"user-list-entry-cover-image"},null,8,O)]),s("div",D,[s("h4",null,r(e.media.title.english),1),s("h5",null,[f(r(e.progress)+"/"+r(e.media.episodes)+" Episodes watched. ",1),e.score>0?(o(),t("span",E,r(e.score)+" / 10",1)):S("",!0)])])]),_:2},1032,["to"])]))),128))]))),128))])):(o(),t("div",z,J))])):(o(),t("div",q,[A,M,y(c,{to:"/login"},{default:k(()=>[f("Go to login page.")]),_:1})]))}}});const H=$(P,[["__scopeId","data-v-e85d3730"]]);export{H as default};
