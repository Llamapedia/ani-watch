import{_ as S}from"./Boj0Llnf.js";import{f as V,r as h,g as j,n as f,i,c as o,b as w,w as k,a as e,t as c,F as g,m as v,k as M,q as $,s as q,o as n,d as x,x as B,j as L,p as O,e as W,_ as D}from"./Dbba_kar.js";const _=m=>(O("data-v-363bf6c5"),m=m(),W(),m),E={key:0,class:"index-content"},z=_(()=>e("h1",{class:"index-welcome"},"Welcome on AN.AL.eu.org",-1)),P=_(()=>e("h2",{class:"index-login-notification"}," To use AN.AL.eu.org in any capacity you must sign in using your anilist.co account. ",-1)),U={key:1,class:"index-content"},F={class:"index-welcome"},J={key:0},R={class:"user-list-selector"},G=_(()=>e("h2",null,"Select a list to view:",-1)),H={class:"user-list-selector-items"},K=["onClick"],Q={class:"user-list-compact-switch"},X=_(()=>e("label",{for:"compact-view"},"Compact view",-1)),Y=["id"],Z={class:"user-list-title"},ee={class:"user-list-entry-cover"},se=["src"],te={class:"user-list-entry-info"},oe={key:0},ne={key:1},ae=_(()=>e("h2",null,"We're sorry, but we couldn't get your lists.",-1)),ie=[ae],ce=V({__name:"index",setup(m){const u=h(),l=h(),p=h(!1);j(()=>{p.value=window.innerWidth<600,I()});async function b(){const r=f.get("access_token"),a=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,d={},t=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:d})});if(t.status===200){const s=await t.json();console.log(s),u.value=s.data.Viewer}}async function I(){if(await b(),!u.value)return console.log("User not logged in (yet).");const r=f.get("access_token"),a=`
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
    `,d={userId:u.value.id,type:"ANIME"},s=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:d})})).json();console.log(s),l.value=s.data.MediaListCollection.lists;const y=["Watching","Rewatching","Planning","Completed"];l.value.sort((A,N)=>y.indexOf(A.name)-y.indexOf(N.name)),console.warn(l.value)}const C=r=>{const a=document.getElementById(r);a&&a.scrollIntoView({behavior:"smooth"})},T=()=>{window.scrollTo({top:0,behavior:"smooth"})};return(r,a)=>{const d=S;return i(u)?(n(),o("div",U,[e("h1",F,"Welcome back, "+c(i(u).name)+".",1),i(l)?(n(),o("div",J,[e("div",R,[G,e("div",H,[(n(!0),o(g,null,v(i(l),t=>(n(),o("a",{key:t.name,onClick:s=>C(t.name)},c(t.name),9,K))),128))]),e("div",Q,[X,M(e("input",{type:"checkbox",name:"compact-view",id:"compact-view","onUpdate:modelValue":a[0]||(a[0]=t=>q(p)?p.value=t:null)},null,512),[[$,i(p)]])])]),e("div",{class:"user-list-top"},[e("button",{onClick:T},"⬆️")]),(n(!0),o(g,null,v(i(l),t=>(n(),o("div",{key:t.name,class:B(["user-list",i(p)?"user-list-compact":""]),id:t.name},[e("h2",Z,c(t.name),1),(n(!0),o(g,null,v(t.entries,s=>(n(),o("div",{key:s.media.id,class:"user-list-entry"},[w(d,{to:`/anime/${s.media.idMal}`},{default:k(()=>[e("div",ee,[e("img",{src:s.media.coverImage.large,alt:"Cover Image",class:"user-list-entry-cover-image"},null,8,se)]),e("div",te,[e("h4",null,c(s.media.title.english),1),e("h5",null,[x(c(s.progress)+"/"+c(s.media.episodes)+" Episodes watched. ",1),s.score>0?(n(),o("span",oe,c(s.score)+" / 10",1)):L("",!0)])])]),_:2},1032,["to"])]))),128))],10,Y))),128))])):(n(),o("div",ne,ie))])):(n(),o("div",E,[z,P,w(d,{to:"/login"},{default:k(()=>[x("Go to login page.")]),_:1})]))}}}),de=D(ce,[["__scopeId","data-v-363bf6c5"]]);export{de as default};
