import{n as A,r as u,u as E,q as L,g as j,c as l,s as o,a as i,t as g,v,F as f,A as b,o as d,p as B,e as V,B as m,_ as q}from"./CQSqM5kP.js";import{p as O}from"./D4h8WKgh.js";const C=p=>(B("data-v-72325af9"),p=p(),V(),p),R={key:0,class:"manga-details"},D={class:"manga-banner"},G=["src"],x={class:"manga-title"},U={class:"manga-info"},z={class:"manga-cover"},J=["src"],H={class:"manga-text"},F=["innerHTML"],W={class:"manga-volumes"};const Y={key:2,class:"manga-completion manga-completion-wip"},K=C(()=>i("p",null,"Work in progress...",-1)),Q={key:3,class:"streaming-links"},X=C(()=>i("h2",{class:"streaming-links-headline"},"Read this manga:",-1)),Z={class:"streaming-service-title"},ee=["href"],se=A({__name:"[id]",setup(p){const s=u(),h=u(),y=u(),e=u(),k=E();L(()=>{const a=k.params.id.toString();$(parseInt(a)),w(parseInt(a))}),j(s,async(a,r)=>{a!==r&&(await I(),console.log(e.value))});function ae(){switch(e.value.status){case"COMPLETED":e.value.progress=s.value.episodes;break;case"CURRENT":e.value.progress=0;break;case"PLANNING":e.value.progress=0;break;case"REPEATING":e.value.progress=0;break}}async function T(){const a=m.get("access_token"),r=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,n={},c=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:r,variables:n})});if(c.status===200){const t=await c.json();console.log(t),y.value=t.data.Viewer}}async function $(a){const t=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
                volumes
                bannerImage
            }
        }
    `,variables:{id:a,type:"MANGA"}})})).json();console.log(t),s.value=t.data.Media}async function I(){await T();const a=m.get("access_token"),r=`
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
    `,n={userId:y.value.id,type:"MANGA"},t=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:r,variables:n})})).json();for(const _ in t.data.MediaListCollection.lists){const M=t.data.MediaListCollection.lists[_].entries.find(P=>P.media.idMal===s.value.idMal);if(M){e.value=M;return}}}async function te(){const a=m.get("access_token"),r=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,n={mediaId:parseInt(e.value.mediaId),status:e.value.status,progress:parseInt(e.value.progress)},t=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:r,variables:n})})).json();console.error(t)}async function N(){const a=m.get("access_token"),r=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,n={mediaId:parseInt(s.value.id),status:"PLANNING",progress:0};await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:r,variables:n})})).json(),I()}async function w(a){const r="https://nhentai-api.onrender.com/",n=`https://api.malsync.moe/mal/manga/${a}`,t=await(await fetch(r+n)).json();console.log(t),h.value=t.Sites}function S(a){return O.sanitize(a)}const oe=()=>{e.value.progress++,e.value.progress>s.value.episodes&&(e.value.progress=s.value.episodes),e.value.progress===s.value.episodes&&(e.value.status="COMPLETED"),e.value.status==="PLANNING"&&(e.value.status="CURRENT")},ne=()=>{e.value.progress--,e.value.progress<0&&(e.value.progress=0),e.value.progress<s.value.episodes&&e.value.status!=="REPEATING"&&(e.value.status="CURRENT"),e.value.progress===0&&(e.value.status="PLANNING")};return(a,r)=>(d(),l(f,null,[o(s)?(d(),l("div",R,[i("div",D,[i("img",{src:o(s).bannerImage,alt:"",class:"manga-banner-image"},null,8,G)]),i("h1",x,g(o(s).title.english?o(s).title.english:o(s).title.romaji?o(s).title.romaji:o(s).title.native?o(s).title.native:""),1),i("div",U,[i("div",z,[i("img",{src:o(s).coverImage.large,alt:"Manga Cover Image",class:"manga-cover-image"},null,8,J)]),i("div",H,[i("p",{class:"manga-description",innerHTML:S(o(s).description)},null,8,F),i("h3",W,"Volumes: "+g(o(s).volumes),1)])])])):v("",!0),(o(e),o(s)?(d(),l("div",Y,[K,i("button",{class:"manga-completion-save",onClick:N,onTouchend:N,disabled:""}," Plan to watch ",32)])):v("",!0)),o(h)?(d(),l("div",Q,[X,(d(!0),l(f,null,b(o(h),(n,c)=>(d(),l("div",{key:c,class:"streaming-service"},[i("h2",Z,g(c),1),(d(!0),l(f,null,b(Object.values(n),(t,_)=>(d(),l("div",{key:_},[i("a",{href:t.url,target:"_blank"},g(t.title),9,ee)]))),128))]))),128))])):v("",!0)],64))}}),ce=q(se,[["__scopeId","data-v-72325af9"]]);export{ce as default};
