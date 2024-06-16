import{n as A,r as u,u as E,q as L,h as j,c as l,s as o,a as i,t as g,v,F as f,A as b,o as d,p as B,e as V,B as m,_ as q}from"./HWOIP6YO.js";import{p as O}from"./D4h8WKgh.js";const C=p=>(B("data-v-dbcc0cef"),p=p(),V(),p),R={key:0,class:"manga-details"},D={class:"manga-banner"},G=["src"],x={class:"manga-title"},U={class:"manga-info"},z={class:"manga-cover"},J=["src"],H={class:"manga-text"},F=["innerHTML"],W={class:"manga-volumes"};const Y={key:2,class:"manga-completion manga-completion-wip"},K=C(()=>i("p",null,"Work in progress...",-1)),Q={key:3,class:"streaming-links"},X=C(()=>i("h2",{class:"streaming-links-headline"},"Read this manga:",-1)),Z={class:"streaming-service-title"},ee=["href"],se=A({__name:"[id]",setup(p){const s=u(),h=u(),y=u(),e=u(),k=E();L(()=>{const t=k.params.id.toString();$(parseInt(t)),w(parseInt(t))}),j(s,async(t,r)=>{t!==r&&(await I(),console.log(e.value))});function te(){switch(e.value.status){case"COMPLETED":e.value.progress=s.value.episodes;break;case"CURRENT":e.value.progress=0;break;case"PLANNING":e.value.progress=0;break;case"REPEATING":e.value.progress=0;break}}async function T(){const t=m.get("access_token"),r=`
            query {
                Viewer {
                    id
                    name
                }
            }
        `,n={},c=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:r,variables:n})});if(c.status===200){const a=await c.json();console.log(a),y.value=a.data.Viewer}}async function $(t){const a=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
    `,variables:{id:t,type:"MANGA"}})})).json();console.log(a),s.value=a.data.Media}async function I(){await T();const t=m.get("access_token"),r=`
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
    `,n={userId:y.value.id,type:"MANGA"},a=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:r,variables:n})})).json();for(const _ in a.data.MediaListCollection.lists){const M=a.data.MediaListCollection.lists[_].entries.find(P=>P.media.idMal===s.value.idMal);if(M){e.value=M;return}}}async function ae(){const t=m.get("access_token"),r=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,n={mediaId:parseInt(e.value.mediaId),status:e.value.status,progress:parseInt(e.value.progress)},a=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:r,variables:n})})).json();console.error(a)}async function N(){const t=m.get("access_token"),r=`
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress) {
            mediaId
            status
            progress
        }
    }
    `,n={mediaId:parseInt(s.value.id),status:"PLANNING",progress:0};await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:r,variables:n})})).json(),I()}async function w(t){const r="https://nhentai-api.onrender.com/",n=`https://api.malsync.moe/mal/manga/${t}`,a=await(await fetch(r+n)).json();console.log(a),h.value=a.Sites}function S(t){return O.sanitize(t)}const oe=()=>{e.value.progress++,e.value.progress>s.value.episodes&&(e.value.progress=s.value.episodes),e.value.progress===s.value.episodes&&(e.value.status="COMPLETED"),e.value.status==="PLANNING"&&(e.value.status="CURRENT")},ne=()=>{e.value.progress--,e.value.progress<0&&(e.value.progress=0),e.value.progress<s.value.episodes&&e.value.status!=="REPEATING"&&(e.value.status="CURRENT"),e.value.progress===0&&(e.value.status="PLANNING")};return(t,r)=>(d(),l(f,null,[o(s)?(d(),l("div",R,[i("div",D,[i("img",{src:o(s).bannerImage,alt:"",class:"manga-banner-image"},null,8,G)]),i("h1",x,g(o(s).title.english?o(s).title.english:o(s).title.romaji?o(s).title.romaji:o(s).title.native?o(s).title.native:""),1),i("div",U,[i("div",z,[i("img",{src:o(s).coverImage.large,alt:"Manga Cover Image",class:"manga-cover-image"},null,8,J)]),i("div",H,[i("p",{class:"manga-description",innerHTML:S(o(s).description)},null,8,F),i("h3",W,"Volumes: "+g(o(s).volumes),1)])])])):v("",!0),(o(e),o(s)?(d(),l("div",Y,[K,i("button",{class:"manga-completion-save",onClick:N,onTouchend:N,disabled:""}," Plan to watch ",32)])):v("",!0)),o(h)?(d(),l("div",Q,[X,(d(!0),l(f,null,b(o(h),(n,c)=>(d(),l("div",{key:c,class:"streaming-service"},[i("h2",Z,g(c),1),(d(!0),l(f,null,b(Object.values(n),(a,_)=>(d(),l("div",{key:_},[i("a",{href:a.url,target:"_blank"},g(a.title),9,ee)]))),128))]))),128))])):v("",!0)],64))}}),ce=q(se,[["__scopeId","data-v-dbcc0cef"]]);export{ce as default};
