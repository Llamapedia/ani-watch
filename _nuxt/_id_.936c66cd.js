import{f as q,r as h,u as O,g as x,h as D,c as d,i as a,a as e,t as p,j as y,k as $,v as B,d as w,l as V,F as I,m as A,o as l,p as z,e as R,n as _,_ as U}from"./entry.1ce98275.js";import{p as G}from"./purify.es.8e338605.js";const u=m=>(z("data-v-1e4bc0d5"),m=m(),R(),m),J={key:0,class:"anime-details"},H={class:"anime-banner"},F=["src"],W={class:"anime-title"},Y={class:"anime-info"},K={class:"anime-cover"},Q=["src"],X={class:"anime-text"},Z=["innerHTML"],ee={class:"anime-episodes"},se={key:1,class:"anime-completion"},te=u(()=>e("option",{value:"COMPLETED"},"Completed",-1)),ae=u(()=>e("option",{value:"PLANNING"},"Planning",-1)),ne=u(()=>e("option",{value:"CURRENT"},"Watching",-1)),oe=u(()=>e("option",{value:"REPEATING"},"Rewatching",-1)),ie=[te,ae,ne,oe],ce={class:"anime-progress"},re=["max","disabled"],de={key:2,class:"anime-completion"},le={key:3,class:"streaming-links"},pe=u(()=>e("h2",{class:"streaming-links-headline"},"Watch this anime:",-1)),ue=["href"],me=q({__name:"[id]",setup(m){const c=h(),g=h(),f=h(),i=h(),S=O();x(()=>{const s=S.params.id.toString();j(parseInt(s)),L(parseInt(s))}),D(c,async(s,t)=>{s!==t&&(await b(),console.log(i.value))});function C(){switch(i.value.status){case"COMPLETED":i.value.progress=c.value.episodes;break;case"PLANNING":i.value.progress=0;break;case"REPEATING":i.value.progress=0;break}}async function N(){const s=_.get("access_token"),t=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,n={},r=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:t,variables:n})});if(r.status===200){const o=await r.json();console.log(o),f.value=o.data.Viewer}}async function j(s){const o=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
    `,variables:{id:s,type:"ANIME"}})})).json();console.log(o),c.value=o.data.Media}async function b(){await N();const s=_.get("access_token"),t=`
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
    `,n={userId:f.value.id,type:"ANIME"},o=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:t,variables:n})})).json();for(const v in o.data.MediaListCollection.lists){const k=o.data.MediaListCollection.lists[v].entries.find(P=>P.media.idMal===c.value.idMal);if(k){i.value=k;return}}}async function M(){const s=_.get("access_token"),t=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,n={mediaId:parseInt(i.value.mediaId),status:i.value.status,progress:parseInt(i.value.progress)},o=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:t,variables:n})})).json();console.error(o)}async function T(){const s=_.get("access_token"),t=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,n={mediaId:parseInt(c.value.id),status:"PLANNING",progress:0};await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:t,variables:n})})).json(),b()}async function L(s){const t="https://nhentai-api.onrender.com/",n=`https://api.malsync.moe/mal/anime/${s}`,o=await(await fetch(t+n)).json();console.log(o),g.value=o.Sites}function E(s){return G.sanitize(s)}return(s,t)=>(l(),d(I,null,[a(c)?(l(),d("div",J,[e("div",H,[e("img",{src:a(c).bannerImage,alt:"Anime Banner Image",class:"anime-banner-image"},null,8,F),e("h1",W,p(a(c).title.english),1)]),e("div",Y,[e("div",K,[e("img",{src:a(c).coverImage.large,alt:"Anime Cover Image",class:"anime-cover-image"},null,8,Q)]),e("div",X,[e("p",{class:"anime-description",innerHTML:E(a(c).description)},null,8,Z),e("h3",ee,"Episodes: "+p(a(c).episodes),1)])])])):y("",!0),a(i)?(l(),d("div",se,[$(e("select",{class:"anime-status","onUpdate:modelValue":t[0]||(t[0]=n=>a(i).status=n),onChange:C},ie,544),[[B,a(i).status]]),e("h2",ce,[w(" You have watched "),$(e("input",{type:"number","onUpdate:modelValue":t[1]||(t[1]=n=>a(i).progress=n),min:"0",max:a(c).episodes,disabled:a(i).status=="COMPLETED"},null,8,re),[[V,a(i).progress]]),w(" out of "+p(a(c).episodes)+" Episodes. ",1)]),e("button",{class:"anime-completion-save",onClick:M,onTouchend:M}," Save ",32)])):a(c)?(l(),d("div",de,[e("button",{class:"anime-completion-save",onClick:T,onTouchend:T}," Plan to watch ",32)])):y("",!0),a(g)?(l(),d("div",le,[pe,(l(!0),d(I,null,A(a(g),(n,r)=>(l(),d("div",{key:r,class:"streaming-service"},[e("h2",null,p(r),1),(l(!0),d(I,null,A(Object.values(n),(o,v)=>(l(),d("div",{key:v},[e("a",{href:o.url,target:"_blank"},p(o.title),9,ue)]))),128))]))),128))])):y("",!0)],64))}});const ge=U(me,[["__scopeId","data-v-1e4bc0d5"]]);export{ge as default};
