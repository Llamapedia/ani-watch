import{f as x,r as y,u as E,g as O,h as P,c as l,i as t,a as e,t as _,j as f,k as S,v as B,d as T,l as D,F as I,m as $,o as p,p as V,e as U,_ as z}from"./entry.27dd4a2e.js";import{p as R}from"./purify.es.8e338605.js";const h=g=>(V("data-v-7d146910"),g=g(),U(),g),W={key:0,class:"anime-details"},J={class:"anime-banner"},H=["src"],F={class:"anime-title"},G={class:"anime-info"},Y={class:"anime-cover"},K=["src"],Q={class:"anime-text"},X=["innerHTML"],Z={class:"anime-episodes"},ee={key:1,class:"anime-completion"},se=h(()=>e("option",{value:"COMPLETED"},"Completed",-1)),te=h(()=>e("option",{value:"PLANNING"},"Planning",-1)),ae=h(()=>e("option",{value:"CURRENT"},"Watching",-1)),oe=h(()=>e("option",{value:"REPEATING"},"Rewatching",-1)),ne=[se,te,ae,oe],ie={class:"anime-progress"},ce=["max"],re={key:2,class:"streaming-links"},de=h(()=>e("h2",{class:"streaming-links-headline"},"Watch this anime:",-1)),le=["href"],pe=x({__name:"[id]",setup(g){const i=y(),v=y(),k=y(),c=y(),b=E();O(()=>{const a=b.params.id.toString();A(parseInt(a)),N(parseInt(a))}),P(i,async(a,s)=>{a!==s&&(await C(),console.log(c.value))});async function j(){const s=document.cookie.split("; ").find(d=>d.startsWith("access_token")),o=s?s.split("=")[1]:"",r=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,n={},u=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:r,variables:n})});if(u.status===200){const d=await u.json();console.log(d),k.value=d.data.Viewer}}async function A(a){const n=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
    `,variables:{id:a,type:"ANIME"}})})).json();console.log(n),i.value=n.data.Media}async function C(){await j();const s=document.cookie.split("; ").find(m=>m.startsWith("access_token")),o=s?s.split("=")[1]:"",r=`
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
    `,n={userId:k.value.id,type:"ANIME"},d=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:r,variables:n})})).json();for(const m in d.data.MediaListCollection.lists){const w=d.data.MediaListCollection.lists[m].entries.find(L=>L.media.idMal===i.value.idMal);if(w){c.value=w;return}}}async function M(){const s=document.cookie.split("; ").find(m=>m.startsWith("access_token")),o=s?s.split("=")[1]:"",r=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,n={mediaId:parseInt(c.value.mediaId),status:c.value.status,progress:parseInt(c.value.progress)},d=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:r,variables:n})})).json();console.error(d)}async function N(a){const s="https://nhentai-api.onrender.com/",o=`https://api.malsync.moe/mal/anime/${a}`,n=await(await fetch(s+o)).json();console.log(n),v.value=n.Sites}function q(a){return R.sanitize(a)}return(a,s)=>(p(),l(I,null,[t(i)?(p(),l("div",W,[e("div",J,[e("img",{src:t(i).bannerImage,alt:"Anime Banner Image",class:"anime-banner-image"},null,8,H),e("h1",F,_(t(i).title.english),1)]),e("div",G,[e("div",Y,[e("img",{src:t(i).coverImage.large,alt:"Anime Cover Image",class:"anime-cover-image"},null,8,K)]),e("div",Q,[e("p",{class:"anime-description",innerHTML:q(t(i).description)},null,8,X),e("h3",Z,"Episodes: "+_(t(i).episodes),1)])])])):f("",!0),t(c)?(p(),l("div",ee,[S(e("select",{class:"anime-status","onUpdate:modelValue":s[0]||(s[0]=o=>t(c).status=o)},ne,512),[[B,t(c).status]]),e("h2",ie,[T(" You have watched "),S(e("input",{type:"number","onUpdate:modelValue":s[1]||(s[1]=o=>t(c).progress=o),min:"0",max:t(i).episodes},null,8,ce),[[D,t(c).progress]]),T(" out of "+_(t(i).episodes)+" Episodes. ",1)]),e("button",{class:"anime-completion-save",onClick:M,onTouchend:M}," Save ",32)])):f("",!0),t(v)?(p(),l("div",re,[de,(p(!0),l(I,null,$(t(v),(o,r)=>(p(),l("div",{key:r,class:"streaming-service"},[e("h2",null,_(r),1),(p(!0),l(I,null,$(Object.values(o),(n,u)=>(p(),l("div",{key:u},[e("a",{href:n.url,target:"_blank"},_(n.title),9,le)]))),128))]))),128))])):f("",!0)],64))}});const _e=z(pe,[["__scopeId","data-v-7d146910"]]);export{_e as default};
