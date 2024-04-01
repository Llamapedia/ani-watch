import{f as R,r as g,u as x,g as D,h as U,c as l,i as n,a as s,t as p,j as y,k as C,v as B,d as M,l as G,F as f,m as A,o as d,p as V,e as z,n as h,_ as J}from"./Dbba_kar.js";import{p as H}from"./D4h8WKgh.js";const u=m=>(V("data-v-e23842e3"),m=m(),z(),m),F={key:0,class:"anime-details"},W={class:"anime-banner"},Y=["src"],K={class:"anime-title"},Q={class:"anime-info"},X={class:"anime-cover"},Z=["src"],ee={class:"anime-text"},se=["innerHTML"],te={class:"anime-episodes"},ae={key:1,class:"anime-completion"},oe=u(()=>s("option",{value:"COMPLETED"},"Completed",-1)),ne=u(()=>s("option",{value:"PLANNING"},"Planning",-1)),ie=u(()=>s("option",{value:"CURRENT"},"Watching",-1)),re=u(()=>s("option",{value:"REPEATING"},"Rewatching",-1)),ce=[oe,ne,ie,re],le={class:"anime-progress"},de={class:"anime-progress-modifier"},pe=["max","disabled"],ue={key:2,class:"anime-completion"},me={key:3,class:"streaming-links"},ge=u(()=>s("h2",{class:"streaming-links-headline"},"Watch this anime:",-1)),he=["href"],ve=R({__name:"[id]",setup(m){const a=g(),v=g(),I=g(),e=g(),E=x();D(()=>{const t=E.params.id.toString();S(parseInt(t)),L(parseInt(t))}),U(a,async(t,o)=>{t!==o&&(await b(),console.log(e.value))});function $(){switch(e.value.status){case"COMPLETED":e.value.progress=a.value.episodes;break;case"CURRENT":e.value.progress=0;break;case"PLANNING":e.value.progress=0;break;case"REPEATING":e.value.progress=0;break}}async function w(){const t=h.get("access_token"),o=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,i={},c=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:o,variables:i})});if(c.status===200){const r=await c.json();console.log(r),I.value=r.data.Viewer}}async function S(t){const r=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
        query ($id: Int, $type: MediaType) {
            Media (idMal: $id, type: $type) {
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
    `,variables:{id:t,type:"ANIME"}})})).json();console.log(r),a.value=r.data.Media}async function b(){await w();const t=h.get("access_token"),o=`
    query ($userId: Int, $type: MediaType) {
            MediaListCollection(userId: $userId, type: $type) {
                lists {
                    name
                    entries {
                        status
                        score
                        progress
                        mediaId
                        media {
                            idMal
                        }
                    }
                }
            }
        }
    `,i={userId:I.value.id,type:"ANIME"},r=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:o,variables:i})})).json();for(const _ in r.data.MediaListCollection.lists){const k=r.data.MediaListCollection.lists[_].entries.find(q=>q.media.idMal===a.value.idMal);if(k){e.value=k;return}}}async function N(){const t=h.get("access_token"),o=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,i={mediaId:parseInt(e.value.mediaId),status:e.value.status,progress:parseInt(e.value.progress)},r=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:o,variables:i})})).json();console.error(r)}async function T(){const t=h.get("access_token"),o=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,i={mediaId:parseInt(a.value.id),status:"PLANNING",progress:0};await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:o,variables:i})})).json(),b()}async function L(t){const o="https://nhentai-api.onrender.com/",i=`https://api.malsync.moe/mal/anime/${t}`,r=await(await fetch(o+i)).json();console.log(r),v.value=r.Sites}function P(t){return H.sanitize(t)}const j=()=>{e.value.progress++,e.value.progress>a.value.episodes&&(e.value.progress=a.value.episodes),e.value.progress===a.value.episodes&&(e.value.status="COMPLETED"),e.value.status==="PLANNING"&&(e.value.status="CURRENT")},O=()=>{e.value.progress--,e.value.progress<0&&(e.value.progress=0),e.value.progress<a.value.episodes&&e.value.status!=="REPEATING"&&(e.value.status="CURRENT"),e.value.progress===0&&(e.value.status="PLANNING")};return(t,o)=>(d(),l(f,null,[n(a)?(d(),l("div",F,[s("div",W,[s("img",{src:n(a).bannerImage,alt:"Anime Banner Image",class:"anime-banner-image"},null,8,Y)]),s("h1",K,p(n(a).title.english),1),s("div",Q,[s("div",X,[s("img",{src:n(a).coverImage.large,alt:"Anime Cover Image",class:"anime-cover-image"},null,8,Z)]),s("div",ee,[s("p",{class:"anime-description",innerHTML:P(n(a).description)},null,8,se),s("h3",te,"Episodes: "+p(n(a).episodes),1)])])])):y("",!0),n(e)?(d(),l("div",ae,[C(s("select",{class:"anime-status","onUpdate:modelValue":o[0]||(o[0]=i=>n(e).status=i),onChange:$},ce,544),[[B,n(e).status]]),s("h2",le,[M(" You have watched "),s("div",de,[C(s("input",{type:"number","onUpdate:modelValue":o[1]||(o[1]=i=>n(e).progress=i),min:"0",max:n(a).episodes,disabled:n(e).status=="COMPLETED"},null,8,pe),[[G,n(e).progress]]),s("div",{class:"anime-progress-btn-container"},[s("button",{class:"btn-increase",onClick:j}," ⏶ "),s("button",{class:"btn-decrease",onClick:O}," ⏷ ")])]),M(" out of "+p(n(a).episodes)+" Episodes. ",1)]),s("button",{class:"anime-completion-save",onClick:N,onTouchend:N}," Save ",32)])):n(a)?(d(),l("div",ue,[s("button",{class:"anime-completion-save",onClick:T,onTouchend:T}," Plan to watch ",32)])):y("",!0),n(v)?(d(),l("div",me,[ge,(d(!0),l(f,null,A(n(v),(i,c)=>(d(),l("div",{key:c,class:"streaming-service"},[s("h2",null,p(c),1),(d(!0),l(f,null,A(Object.values(i),(r,_)=>(d(),l("div",{key:_},[s("a",{href:r.url,target:"_blank"},p(r.title),9,he)]))),128))]))),128))])):y("",!0)],64))}}),fe=J(ve,[["__scopeId","data-v-e23842e3"]]);export{fe as default};
