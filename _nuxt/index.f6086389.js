import{_ as j}from"./nuxt-link.43090cd8.js";import{f as M,r as h,g as $,n as f,i,c as o,b as w,w as k,a as e,t as c,F as v,m as g,k as q,q as N,s as A,o as n,d as x,x as B,j as O,p as W,e as D,_ as E}from"./entry.8f2a51df.js";const p=m=>(W("data-v-15c36ef8"),m=m(),D(),m),L={key:0,class:"index-content"},z=p(()=>e("h1",{class:"index-welcome"},"Welcome on anime.vg",-1)),P=p(()=>e("h2",{class:"index-login-notification"}," To use anime.vg in any capacity you must sign in using your anilist.co account. ",-1)),U={key:1,class:"index-content"},F={class:"index-welcome"},J={key:0},R={class:"user-list-selector"},G=p(()=>e("h2",null,"Select a list to view:",-1)),H={class:"user-list-selector-items"},K=["onClick"],Q={class:"user-list-compact-switch"},X=p(()=>e("label",{for:"compact-view"},"Compact view",-1)),Y=["id"],Z={class:"user-list-title"},ee={class:"user-list-entry-cover"},se=["src"],te={class:"user-list-entry-info"},oe={key:0},ne={key:1},ae=p(()=>e("h2",null,"We're sorry, but we couldn't get your lists.",-1)),ie=[ae],ce=M({__name:"index",setup(m){const u=h(),l=h(),_=h(!1);$(()=>{_.value=window.innerWidth<600,C()});async function I(){const r=f.get("access_token"),a=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,d={},t=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:d})});if(t.status===200){const s=await t.json();console.log(s),u.value=s.data.Viewer}}async function C(){if(await I(),!u.value)return console.log("User not logged in (yet).");const r=f.get("access_token"),a=`
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
    `,d={userId:u.value.id,type:"ANIME"},s=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:d})})).json();console.log(s),l.value=s.data.MediaListCollection.lists;const y=["Watching","Rewatching","Planning","Completed"];l.value.sort((S,V)=>y.indexOf(S.name)-y.indexOf(V.name)),console.warn(l.value)}const b=r=>{const a=document.getElementById(r);a&&a.scrollIntoView({behavior:"smooth"})},T=()=>{window.scrollTo({top:0,behavior:"smooth"})};return(r,a)=>{const d=j;return i(u)?(n(),o("div",U,[e("h1",F,"Welcome back, "+c(i(u).name)+".",1),i(l)?(n(),o("div",J,[e("div",R,[G,e("div",H,[(n(!0),o(v,null,g(i(l),t=>(n(),o("a",{key:t.name,onClick:s=>b(t.name)},c(t.name),9,K))),128))]),e("div",Q,[X,q(e("input",{type:"checkbox",name:"compact-view",id:"compact-view","onUpdate:modelValue":a[0]||(a[0]=t=>A(_)?_.value=t:null)},null,512),[[N,i(_)]])])]),e("div",{class:"user-list-top"},[e("button",{onClick:T},"⬆️")]),(n(!0),o(v,null,g(i(l),t=>(n(),o("div",{key:t.name,class:B(["user-list",i(_)?"user-list-compact":""]),id:t.name},[e("h2",Z,c(t.name),1),(n(!0),o(v,null,g(t.entries,s=>(n(),o("div",{key:s.media.id,class:"user-list-entry"},[w(d,{to:`/anime/${s.media.idMal}`},{default:k(()=>[e("div",ee,[e("img",{src:s.media.coverImage.large,alt:"Cover Image",class:"user-list-entry-cover-image"},null,8,se)]),e("div",te,[e("h4",null,c(s.media.title.english),1),e("h5",null,[x(c(s.progress)+"/"+c(s.media.episodes)+" Episodes watched. ",1),s.score>0?(n(),o("span",oe,c(s.score)+" / 10",1)):O("",!0)])])]),_:2},1032,["to"])]))),128))],10,Y))),128))])):(n(),o("div",ne,ie))])):(n(),o("div",L,[z,P,w(d,{to:"/login"},{default:k(()=>[x("Go to login page.")]),_:1})]))}}});const de=E(ce,[["__scopeId","data-v-15c36ef8"]]);export{de as default};
