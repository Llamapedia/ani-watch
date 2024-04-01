import{_ as $}from"./Boj0Llnf.js";import{f as x,r as p,u as P,y as N,g as C,h as y,c as d,i as n,a as e,t as _,k as I,v as M,s as S,F as L,m as j,j as b,o as u,z as R,b as V,w as z,d as B}from"./Dbba_kar.js";import{p as H}from"./D4h8WKgh.js";const A={class:"container"},D={key:0,class:"row mt-3"},E={class:"col-12"},F={class:"search-title"},O={class:"col-12 search-item-amount"},J=e("label",{for:"perPage"},"Items per page: ",-1),U=e("option",{value:"10"},"10",-1),G=e("option",{value:"20"},"20",-1),K=e("option",{value:"50"},"50",-1),Q=[U,G,K],W={class:"col-12"},X={class:"row"},Y={class:"card mb-3"},Z={class:"card-img"},ee=["src","onClick"],ae={class:"card-body"},se={class:"card-title"},te={class:"card-info"},oe={class:"card-type"},ie={key:0,class:"card-episodes"},ne=["innerHTML"],ce={class:"search-pagination"},re=["disabled"],le=["disabled"],he=x({__name:"[query]",setup(de){const g=p([]),a=p(1),h=p(0),i=p(10),r=P(),f=N(),c=P().params.query.toString();C(async()=>{r.query.page||await f.push({query:{...r.query,page:1}}),a.value=Number(r.query.page)||1,await l(c,a.value,i.value)}),y(r,async(s,o)=>{s.query.page!==o.query.page&&(a.value=Number(s.query.page)||1,await l(c,a.value,i.value))}),y(i,async(s,o)=>{s!==o&&(a.value=1,await l(c,a.value,i.value))}),y(a,async(s,o)=>{s!==o&&(await f.push({query:{...r.query,page:s}}),window.scrollTo(0,0))});async function l(s,o,v){const m=await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`
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
  `,variables:{search:s,page:o,perPage:v}})})).json();console.log(m),g.value=m.data.Page.media,h.value=m.data.Page.pageInfo.lastPage}function q(){a.value<h.value&&(a.value++,l(c,a.value,i.value))}function w(){a.value>1&&(a.value--,l(c,a.value,i.value))}function k(s){return H.sanitize(s)}return(s,o)=>{const v=$;return u(),d("div",A,[n(g).length>0?(u(),d("div",D,[e("div",E,[e("h2",F,"Search Results for "+_(n(c)),1)]),e("div",O,[J,I(e("select",{id:"perPage","onUpdate:modelValue":o[0]||(o[0]=t=>S(i)?i.value=t:null)},Q,512),[[M,n(i)]])]),e("div",W,[e("div",X,[(u(!0),d(L,null,j(n(g),t=>(u(),d("div",{class:"col-4",key:t.id},[e("div",Y,[e("div",Z,[e("img",{src:t.coverImage.large,class:"card-img-top",alt:"...",onClick:T=>("navigateTo"in s?s.navigateTo:n(R))(`/anime/${t.idMal}`)},null,8,ee)]),e("div",ae,[e("h3",se,[V(v,{to:`/anime/${t.idMal}`,target:"",rel:"noopener noreferrer"},{default:z(()=>[B(_(t.title.english),1)]),_:2},1032,["to"])]),e("div",te,[e("span",oe,_(t.type),1),t.episodes?(u(),d("span",ie," | "+_(t.episodes)+" Episodes",1)):b("",!0)]),e("p",{class:"card-text",innerHTML:k(t.description)},null,8,ne)])])]))),128))])]),e("div",ce,[e("button",{class:"search-pagination-button",onClick:w,disabled:n(a)<=1}," Previous ",8,re),e("button",{class:"search-pagination-button",onClick:q,disabled:n(a)>=n(h)}," Next ",8,le)])])):b("",!0)])}}});export{he as default};
