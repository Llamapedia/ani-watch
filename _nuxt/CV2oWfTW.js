import{_ as w}from"./B57ErGtO.js";import{n as E,r as m,u as q,L as S,q as j,h as b,s as o,c as d,a,t as l,x as L,y as R,E as V,F as B,A as O,v as y,o as c,M,K as T,w as $,d as N}from"./VTd8GIPQ.js";import{p as z}from"./D4h8WKgh.js";const D={key:0,class:"container"},F={class:"search-title"},G=a("span",{class:"search-title-tag"},"Search Results for",-1),H=a("br",null,null,-1),J={class:"search-title-name"},K={class:"search-item-amount"},U=a("label",{for:"perPage"},"Items per page: ",-1),Q=a("option",{value:"10"},"10",-1),W=a("option",{value:"20"},"20",-1),X=a("option",{value:"50"},"50",-1),Y=[Q,W,X],Z={class:"card-results"},ee={class:"card-img"},ae=["src","onClick"],te=["src","onClick"],se={class:"card-body"},oe={class:"card-title"},ne={class:"card-info"},ie={class:"card-type"},ce={key:0,class:"card-episodes"},re={key:1,class:"card-episodes"},le=["innerHTML"],de={class:"search-pagination"},pe=["disabled"],ge=["disabled"],ue={key:1,class:"container"},_e={class:"search-title"},he=a("span",{class:"search-title-tag"},"No Results found for",-1),ve=a("br",null,null,-1),me={class:"search-title-name"},ke=E({__name:"[query]",setup(ye){const _=m([0]),s=m(1),f=m(0),r=m(10),h=q(),k=S(),p=q().params.query.toString();j(async()=>{h.query.page||await k.push({query:{...h.query,page:1}}),s.value=Number(h.query.page)||1,await v(p,s.value,r.value)}),b(h,async(t,n)=>{t.query.page!==n.query.page&&(s.value=Number(t.query.page)||1,await v(p,s.value,r.value))}),b(r,async(t,n)=>{t!==n&&(s.value=1,await v(p,s.value,r.value))}),b(s,async(t,n)=>{t!==n&&(await k.push({query:{...h.query,page:t}}),window.scrollTo(0,0))});async function v(t,n,u){const i=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
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
        volumes
        type
      }
    }
  }
  `,variables:{search:t,page:n,perPage:u}})})).json();console.log(i),_.value=i.data.Page.media,f.value=i.data.Page.pageInfo.lastPage}function I(){s.value<f.value&&(s.value++,v(p,s.value,r.value))}function A(){s.value>1&&(s.value--,v(p,s.value,r.value))}function C(t){if(!t)return"";const u=[...t.matchAll(/<[^>]+>/gm)].map(i=>({tag:i[0],index:i.index})),e=t.replace(/<[^>]+>/gm,"");let g=e.length>512?e.substring(0,512)+"<br><b>...</b>":e;return u.forEach(i=>{if(i.index<512){const x=i.index<=g.length?i.index:g.length;g=g.slice(0,x)+i.tag+g.slice(x)}}),z.sanitize(g)}return(t,n)=>{const u=w;return o(_).length>0&&o(_)[0]!==0?(c(),d("div",D,[a("div",F,[G,H,a("span",J,l(o(p)),1)]),a("div",K,[U,L(a("select",{id:"perPage","onUpdate:modelValue":n[0]||(n[0]=e=>V(r)?r.value=e:null)},Y,512),[[R,o(r)]])]),a("div",Z,[(c(!0),d(B,null,O(o(_),e=>(c(),d("div",{class:"card",key:e.id},[a("div",ee,[e.type==="ANIME"?(c(),d("img",{key:0,src:e.coverImage.large,class:"card-img-top",alt:"...",onClick:P=>("navigateTo"in t?t.navigateTo:o(M))(`/anime/${e.idMal}`)},null,8,ae)):e.type==="MANGA"?(c(),d("img",{key:1,src:e.coverImage.large,class:"card-img-top",alt:"...",onClick:P=>("navigateTo"in t?t.navigateTo:o(M))(`/manga/${e.idMal}`)},null,8,te)):y("",!0)]),a("div",se,[a("p",oe,[e.type==="ANIME"?(c(),T(u,{key:0,to:`/anime/${e.idMal}`,target:"",rel:"noopener noreferrer"},{default:$(()=>[N(l(e.title.english),1)]),_:2},1032,["to"])):e.type==="MANGA"?(c(),T(u,{key:1,to:`/manga/${e.idMal}`,target:"",rel:"noopener noreferrer"},{default:$(()=>[N(l(e.title.english?e.title.english:e.title.romaji?e.title.romaji:e.title.native?e.title.native:""),1)]),_:2},1032,["to"])):y("",!0)]),a("div",ne,[a("span",ie,l(e.type),1),e.episodes?(c(),d("span",ce," | "+l(e.episodes)+" "+l(e.episodes>1?"Episodes":"Episode"),1)):e.volumes?(c(),d("span",re," | "+l(e.volumes)+" "+l(e.volumes>1?"Volumes":"Volume"),1)):y("",!0)]),a("p",{class:"card-text",innerHTML:C(e.description)},null,8,le)])]))),128))]),a("div",de,[a("button",{class:"search-pagination-button",onClick:A,disabled:o(s)<=1}," Previous ",8,pe),a("button",{class:"search-pagination-button",onClick:I,disabled:o(s)>=o(f)}," Next ",8,ge)])])):o(_).length===0?(c(),d("div",ue,[a("div",_e,[he,ve,a("span",me,l(o(p)),1)])])):y("",!0)}}});export{ke as default};
