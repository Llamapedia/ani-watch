import{n as O,r as g,u as R,q as x,h as D,c as l,s as a,a as s,t as u,v as y,x as M,y as B,z as U,F as f,A as k,o as d,p as G,e as z,B as h,_ as V}from"./HWOIP6YO.js";import{p as J}from"./D4h8WKgh.js";const p=m=>(G("data-v-101590ff"),m=m(),z(),m),H={key:0,class:"anime-details"},F={class:"anime-banner"},W=["src"],Y={class:"anime-title"},K={class:"anime-info"},Q={class:"anime-cover"},X=["src"],Z={class:"anime-text"},ee=["innerHTML"],se={class:"anime-episodes"},te={key:1,class:"anime-completion"},ae=p(()=>s("option",{value:"COMPLETED"},"Completed",-1)),oe=p(()=>s("option",{value:"PLANNING"},"Planning",-1)),ne=p(()=>s("option",{value:"CURRENT"},"Watching",-1)),ie=p(()=>s("option",{value:"REPEATING"},"Rewatching",-1)),re=[ae,oe,ne,ie],ce={class:"anime-progress"},le=p(()=>s("span",null," You have watched",-1)),de={class:"anime-progress-modifier"},pe=["max","disabled"],ue={key:2,class:"anime-completion"},me={key:3,class:"streaming-links"},ge=p(()=>s("h2",{class:"streaming-links-headline"},"Watch this anime:",-1)),he={class:"streaming-service-title"},ve=["href"],_e=O({__name:"[id]",setup(m){const t=g(),v=g(),I=g(),e=g(),A=R();x(()=>{const o=A.params.id.toString();w(parseInt(o)),S(parseInt(o))}),D(t,async(o,n)=>{o!==n&&(await b(),console.log(e.value))});function E(){switch(e.value.status){case"COMPLETED":e.value.progress=t.value.episodes;break;case"CURRENT":e.value.progress=0;break;case"PLANNING":e.value.progress=0;break;case"REPEATING":e.value.progress=0;break}}async function $(){const o=h.get("access_token"),n=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,i={},c=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:n,variables:i})});if(c.status===200){const r=await c.json();console.log(r),I.value=r.data.Viewer}}async function w(o){const r=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
    `,variables:{id:o,type:"ANIME"}})})).json();console.log(r),t.value=r.data.Media}async function b(){await $();const o=h.get("access_token"),n=`
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
    `,i={userId:I.value.id,type:"ANIME"},r=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:n,variables:i})})).json();for(const _ in r.data.MediaListCollection.lists){const C=r.data.MediaListCollection.lists[_].entries.find(q=>q.media.idMal===t.value.idMal);if(C){e.value=C;return}}}async function N(){const o=h.get("access_token"),n=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,i={mediaId:parseInt(e.value.mediaId),status:e.value.status,progress:parseInt(e.value.progress)},r=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:n,variables:i})})).json();console.error(r)}async function T(){const o=h.get("access_token"),n=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,i={mediaId:parseInt(t.value.id),status:"PLANNING",progress:0};await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:n,variables:i})})).json(),b()}async function S(o){const n="https://nhentai-api.onrender.com/",i=`https://api.malsync.moe/mal/anime/${o}`,r=await(await fetch(n+i)).json();console.log(r),v.value=r.Sites}function L(o){return J.sanitize(o)}const P=()=>{e.value.progress++,e.value.progress>t.value.episodes&&(e.value.progress=t.value.episodes),e.value.progress===t.value.episodes&&(e.value.status="COMPLETED"),e.value.status==="PLANNING"&&(e.value.status="CURRENT")},j=()=>{e.value.progress--,e.value.progress<0&&(e.value.progress=0),e.value.progress<t.value.episodes&&e.value.status!=="REPEATING"&&(e.value.status="CURRENT"),e.value.progress===0&&(e.value.status="PLANNING")};return(o,n)=>(d(),l(f,null,[a(t)?(d(),l("div",H,[s("div",F,[s("img",{src:a(t).bannerImage,alt:"Anime Banner Image",class:"anime-banner-image"},null,8,W)]),s("h1",Y,u(a(t).title.english?a(t).title.english:a(t).title.romaji?a(t).title.romaji:a(t).title.native?a(t).title.native:""),1),s("div",K,[s("div",Q,[s("img",{src:a(t).coverImage.large,alt:"Anime Cover Image",class:"anime-cover-image"},null,8,X)]),s("div",Z,[s("p",{class:"anime-description",innerHTML:L(a(t).description)},null,8,ee),s("h3",se,"Episodes: "+u(a(t).episodes),1)])])])):y("",!0),a(e)?(d(),l("div",te,[M(s("select",{class:"anime-status","onUpdate:modelValue":n[0]||(n[0]=i=>a(e).status=i),onChange:E},re,544),[[B,a(e).status]]),s("h2",ce,[le,s("div",de,[M(s("input",{type:"number","onUpdate:modelValue":n[1]||(n[1]=i=>a(e).progress=i),min:"0",max:a(t).episodes,disabled:a(e).status=="COMPLETED"},null,8,pe),[[U,a(e).progress]]),s("div",{class:"anime-progress-btn-container"},[s("button",{class:"btn-increase",onClick:P}," ⏶ "),s("button",{class:"btn-decrease",onClick:j}," ⏷ ")])]),s("span",null,"out of "+u(a(t).episodes)+" Episodes.",1)]),s("button",{class:"anime-completion-save",onClick:N,onTouchend:N}," Save ",32)])):a(t)?(d(),l("div",ue,[s("button",{class:"anime-completion-save",onClick:T,onTouchend:T}," Plan to watch ",32)])):y("",!0),a(v)?(d(),l("div",me,[ge,(d(!0),l(f,null,k(a(v),(i,c)=>(d(),l("div",{key:c,class:"streaming-service"},[s("h2",he,u(c),1),(d(!0),l(f,null,k(Object.values(i),(r,_)=>(d(),l("div",{key:_},[s("a",{href:r.url,target:"_blank"},u(r.title),9,ve)]))),128))]))),128))])):y("",!0)],64))}}),Ie=V(_e,[["__scopeId","data-v-101590ff"]]);export{Ie as default};
