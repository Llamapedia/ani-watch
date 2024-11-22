import{_ as q}from"./Dt2ISLFS.js";import{n as A,r as v,q as B,B as f,C as N,s as i,c as o,b as x,w as k,a as e,t as c,F as w,A as y,x as C,D,E as O,v as b,o as a,d as I,G as z,p as E,e as W,_ as L}from"./Dejc2vlv.js";const l=h=>(E("data-v-cad81864"),h=h(),W(),h),P={key:0,class:"index-content"},U=l(()=>e("div",{class:"index-welcome"},[e("span",{class:"index-welcome-welcome"},"Welcome on"),e("br"),e("span",{class:"index-welcome-riju"},"riju.anal-slavery.com")],-1)),F=l(()=>e("h2",{class:"index-login-notification"}," To use riju.anal-slavery.com in any capacity you must sign in using your anilist.co account. ",-1)),G={key:1,class:"index-content"},J={class:"index-welcome"},R=l(()=>e("span",{class:"index-welcome-welcome"},"Welcome back,",-1)),H=l(()=>e("br",null,null,-1)),K={class:"index-welcome-riju"},Q={key:0},X={class:"user-list-selector"},Y=l(()=>e("h2",null,"Select a list to view:",-1)),Z={class:"user-list-selector-items"},ee=["onClick"],se={class:"user-list-compact-switch"},te=l(()=>e("label",{for:"compact-view"},"Compact view",-1)),oe=["id"],ae={class:"user-list-title"},ne={class:"user-list-entry-cover"},ie=["data-src"],ce={class:"user-list-entry-info"},le={key:0},re={key:1},de=l(()=>e("h2",null,"We're sorry, but we couldn't get your lists.",-1)),ue=[de],_e=A({__name:"index",setup(h){const _=v(),r=v(),m=v(!1),g=v(!1);B(()=>{m.value=window.innerWidth<600,setTimeout(()=>{g.value=!0},1e3),j()});async function T(){const d=f.get("access_token"),n=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,u={},p=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:n,variables:u})});if(p.status===200){const s=await p.json();console.log(s),_.value=s.data.Viewer}}async function j(){if(await T(),!_.value)return console.log("User not logged in (yet).");const d=f.get("access_token"),n=`
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
    `,u={userId:_.value.id,type:"ANIME"},s=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:n,variables:u})})).json();console.log(s),r.value=s.data.MediaListCollection.lists;const t=["Watching","Rewatching","Planning","Completed"];r.value.sort((M,$)=>t.indexOf(M.name)-t.indexOf($.name)),console.warn(r.value)}const S=d=>{const n=document.getElementById(d);n&&n.scrollIntoView({behavior:"smooth"})},V=()=>{window.scrollTo({top:0,behavior:"smooth"})};return(d,n)=>{const u=q,p=N("lazy-load");return!i(_)&&i(g)?(a(),o("div",P,[U,F,x(u,{to:"/login",class:"index-login-redirect"},{default:k(()=>[I("Go to login page.")]),_:1})])):i(g)?(a(),o("div",G,[e("div",J,[R,H,e("span",K,c(i(_).name)+".",1)]),i(r)?(a(),o("div",Q,[e("div",X,[Y,e("div",Z,[(a(!0),o(w,null,y(i(r),s=>(a(),o("a",{key:s.name,onClick:t=>S(s.name)},c(s.name),9,ee))),128))]),e("div",se,[te,C(e("input",{type:"checkbox",name:"compact-view",id:"compact-view","onUpdate:modelValue":n[0]||(n[0]=s=>O(m)?m.value=s:null)},null,512),[[D,i(m)]])])]),e("div",{class:"user-list-top"},[e("button",{onClick:V},"⬆️")]),(a(!0),o(w,null,y(i(r),s=>(a(),o("div",{key:s.name,class:z(["user-list",i(m)?"user-list-compact":""]),id:s.name},[e("h2",ae,c(s.name),1),(a(!0),o(w,null,y(s.entries,t=>(a(),o("div",{key:t.media.id,class:"user-list-entry"},[x(u,{to:`/anime/${t.media.idMal}`},{default:k(()=>[e("div",ne,[C(e("img",{"data-src":t.media.coverImage.large,alt:"Cover Image",class:"user-list-entry-cover-image"},null,8,ie),[[p]])]),e("div",ce,[e("h4",null,c(t.media.title.english),1),e("h5",null,[I(c(t.progress)+"/"+c(t.media.episodes)+" Episodes watched. ",1),t.score>0?(a(),o("span",le,c(t.score)+" / 10",1)):b("",!0)])])]),_:2},1032,["to"])]))),128))],10,oe))),128))])):(a(),o("div",re,ue))])):b("",!0)}}}),he=L(_e,[["__scopeId","data-v-cad81864"]]);export{he as default};
