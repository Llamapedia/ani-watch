import{_ as k}from"./nuxt-link.7b2acc11.js";import{f as N,r as p,u as P,q as $,g as I,h as y,c as d,i as n,a as e,t as _,k as T,v as M,s as S,F as C,m as L,j as b,o as u,b as j,w as R,d as V}from"./entry.1ce98275.js";import{p as B}from"./purify.es.8e338605.js";const H={class:"container"},z={key:0,class:"row mt-3"},A={class:"col-12"},D={class:"search-title"},E={class:"col-12 search-item-amount"},F=e("label",{for:"perPage"},"Items per page: ",-1),O=e("option",{value:"10"},"10",-1),J=e("option",{value:"20"},"20",-1),U=e("option",{value:"50"},"50",-1),G=[O,J,U],K={class:"col-12"},Q={class:"row"},W={class:"card mb-3"},X={class:"card-img"},Y=["src"],Z={class:"card-body"},ee={class:"card-title"},ae={class:"card-info"},se={class:"card-type"},te={key:0,class:"card-episodes"},oe=["innerHTML"],ie={class:"col-12"},ne=["disabled"],ce=["disabled"],ge=N({__name:"[query]",setup(re){const g=p([]),a=p(1),h=p(0),i=p(10),r=P(),f=$(),c=P().params.query.toString();I(async()=>{r.query.page||await f.push({query:{...r.query,page:1}}),a.value=Number(r.query.page)||1,await l(c,a.value,i.value)}),y(r,async(s,o)=>{s.query.page!==o.query.page&&(a.value=Number(s.query.page)||1,await l(c,a.value,i.value))}),y(i,async(s,o)=>{s!==o&&(a.value=1,await l(c,a.value,i.value))}),y(a,async(s,o)=>{s!==o&&(await f.push({query:{...r.query,page:s}}),window.scrollTo(0,0))});async function l(s,o,v){const m=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
        type
      }
    }
  }
  `,variables:{search:s,page:o,perPage:v}})})).json();console.log(m),g.value=m.data.Page.media,h.value=m.data.Page.pageInfo.lastPage}function q(){a.value<h.value&&(a.value++,l(c,a.value,i.value))}function w(){a.value>1&&(a.value--,l(c,a.value,i.value))}function x(s){return B.sanitize(s)}return(s,o)=>{const v=k;return u(),d("div",H,[n(g).length>0?(u(),d("div",z,[e("div",A,[e("h2",D,"Search Results for "+_(n(c)),1)]),e("div",E,[F,T(e("select",{id:"perPage","onUpdate:modelValue":o[0]||(o[0]=t=>S(i)?i.value=t:null)},G,512),[[M,n(i)]])]),e("div",K,[e("div",Q,[(u(!0),d(C,null,L(n(g),t=>(u(),d("div",{class:"col-4",key:t.id},[e("div",W,[e("div",X,[e("img",{src:t.coverImage.large,class:"card-img-top",alt:"..."},null,8,Y)]),e("div",Z,[e("h3",ee,[j(v,{to:`/anime/${t.idMal}`,target:"",rel:"noopener noreferrer"},{default:R(()=>[V(_(t.title.english),1)]),_:2},1032,["to"])]),e("div",ae,[e("span",se,_(t.type),1),t.episodes?(u(),d("span",te," | "+_(t.episodes)+" Episodes",1)):b("",!0)]),e("p",{class:"card-text",innerHTML:x(t.description)},null,8,oe)])])]))),128))])]),e("div",ie,[e("button",{class:"btn btn-primary",onClick:w,disabled:n(a)<=1},"Previous",8,ne),e("button",{class:"btn btn-primary",onClick:q,disabled:n(a)>=n(h)},"Next",8,ce)])])):b("",!0)])}}});export{ge as default};
