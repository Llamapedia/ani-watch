import{_ as C}from"./Boj0Llnf.js";import{f as x,r as l,y as S,A as k,g as A,n as j,o as m,c as u,a as t,b as y,w as F,k as N,l as D,i as v,s as V,C as H,d as $,j as P,v as I,F as L,m as q,t as z,z as U,D as g,h as f,B as E,E as K}from"./Dbba_kar.js";import{u as b}from"./ClCYeTgG.js";const O="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3cpath%20d='M5.52%2019c.64-2.2%201.84-3%203.22-3h6.52c1.38%200%202.58.8%203.22%203'/%3e%3ccircle%20cx='12'%20cy='10'%20r='3'/%3e%3ccircle%20cx='12'%20cy='12'%20r='10'/%3e%3c/svg%3e",R="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3cpath%20d='M20%2021v-2a4%204%200%200%200-4-4H8a4%204%200%200%200-4%204v2'%3e%3c/path%3e%3ccircle%20cx='12'%20cy='7'%20r='4'%3e%3c/circle%3e%3c/svg%3e",J="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3ccircle%20cx='12'%20cy='12'%20r='3'%3e%3c/circle%3e%3cpath%20d='M19.4%2015a1.65%201.65%200%200%200%20.33%201.82l.06.06a2%202%200%200%201%200%202.83%202%202%200%200%201-2.83%200l-.06-.06a1.65%201.65%200%200%200-1.82-.33%201.65%201.65%200%200%200-1%201.51V21a2%202%200%200%201-2%202%202%202%200%200%201-2-2v-.09A1.65%201.65%200%200%200%209%2019.4a1.65%201.65%200%200%200-1.82.33l-.06.06a2%202%200%200%201-2.83%200%202%202%200%200%201%200-2.83l.06-.06a1.65%201.65%200%200%200%20.33-1.82%201.65%201.65%200%200%200-1.51-1H3a2%202%200%200%201-2-2%202%202%200%200%201%202-2h.09A1.65%201.65%200%200%200%204.6%209a1.65%201.65%200%200%200-.33-1.82l-.06-.06a2%202%200%200%201%200-2.83%202%202%200%200%201%202.83%200l.06.06a1.65%201.65%200%200%200%201.82.33H9a1.65%201.65%200%200%200%201-1.51V3a2%202%200%200%201%202-2%202%202%200%200%201%202%202v.09a1.65%201.65%200%200%200%201%201.51%201.65%201.65%200%200%200%201.82-.33l.06-.06a2%202%200%200%201%202.83%200%202%202%200%200%201%200%202.83l-.06.06a1.65%201.65%200%200%200-.33%201.82V9a1.65%201.65%200%200%200%201.51%201H21a2%202%200%200%201%202%202%202%202%200%200%201-2%202h-.09a1.65%201.65%200%200%200-1.51%201z'%3e%3c/path%3e%3c/svg%3e",W="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3cpath%20d='M10%203H6a2%202%200%200%200-2%202v14c0%201.1.9%202%202%202h4M16%2017l5-5-5-5M19.8%2012H9'/%3e%3c/svg%3e",G={class:"navbar"},Q={class:"navbar-elements"},X=t("img",{alt:"Logo",class:"logo"},null,-1),Y={class:"right-side"},Z={key:0,class:"dropdown"},e0=t("a",{href:"#",class:"dropdown-content"},[t("img",{src:R,alt:""}),$(" Profile ")],-1),t0=t("a",{href:"#",class:"dropdown-content"},[t("img",{src:J,alt:""}),$(" Settings ")],-1),s0=t("img",{src:W,alt:""},null,-1),o0=x({__name:"PageNav",setup(T){const r=l(),n=l({}),c=l(!1),s=l(""),o=l(!1),e=S(),a=k("themeFileName");b(()=>({link:[{rel:"stylesheet",href:`/themes/${a}.css`}]})),A(()=>{p()});function i(){e.push(`/search/${s.value}`)}async function p(){const M=j.get("access_token"),h=`
            query {
                Viewer {
                    name
                    avatar {
                        large
                    }
                }
            }
        `,_={},d=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${M}`},body:JSON.stringify({query:h,variables:_})});if(d.status===200){const w=await d.json();console.log(w),n.value=w.data.Viewer,r.value.src=w.data.Viewer.avatar.large,c.value=!0}}const B=()=>{j.remove("access_token"),window.location.reload()};return(M,h)=>{const _=C;return m(),u("nav",G,[t("div",Q,[y(_,{to:"/",class:"logo"},{default:F(()=>[X]),_:1}),t("div",Y,[N(t("input",{type:"search",placeholder:"Search",class:"search-bar","onUpdate:modelValue":h[0]||(h[0]=d=>V(s)?s.value=d:null),onKeyup:H(i,["enter"])},null,544),[[D,v(s)]]),t("div",{class:"account-icon-container",onMouseover:h[1]||(h[1]=d=>o.value=!0),onMouseleave:h[2]||(h[2]=d=>o.value=!1)},[t("img",{ref_key:"usericon",ref:r,src:O,alt:"Account",class:"account-icon",width:"32",height:"32"},null,512),v(c)&&v(o)?(m(),u("div",Z,[e0,t0,t("a",{onClick:B,class:"dropdown-content"},[s0,$(" Logout ")])])):P("",!0)],32)])])])}}}),a0={class:"footer"},n0={class:"theme-selector"},c0=["value"],l0=t("p",null," We are not responsible for the content on this website. All rights belong to anilist and malsync. ",-1),r0=x({__name:"PageFooter",setup(T){const r=k("themes"),n=k("selectedTheme"),c=()=>{localStorage.setItem("theme",n.value)};return(s,o)=>(m(),u("footer",a0,[t("div",n0,[N(t("select",{"onUpdate:modelValue":o[0]||(o[0]=e=>V(n)?n.value=e:null),onChange:c},[(m(!0),u(L,null,q(v(r),(e,a)=>(m(),u("option",{value:a,key:a},z(e.name),9,c0))),128))],544),[[I,v(n)]]),t("button",{onClick:o[1]||(o[1]=e=>("navigateTo"in s?s.navigateTo:v(U))("/themes"))},"Manage Themes")]),l0]))}}),i0={class:"page"},h0={class:"page-content"},v0=x({__name:"default",setup(T){const r=l("0");g("selectedTheme",r);const n=l("default");g("themeFileName",n),f(r,(e,a)=>{if(e!==a){const i=parseInt(e);console.warn("themeLocation",i,s.value[i]),s.value[i]!==void 0&&(n.value=s.value[i].id)}});const c=l("1"),s=l({});f(c,(e,a)=>{e!==a&&o()}),f(s,(e,a)=>{e!==a&&(r.value=localStorage.getItem("theme")||"0")}),g("themes",s),g("themeDomain",c),b(()=>({link:[{rel:"stylesheet",href:`${c.value}/themes/${n.value}.css`}]})),E(()=>{c.value=localStorage.getItem("themeDomain")||"",o()});const o=async()=>{fetch(`${c.value}/themes.json`).then(e=>e.json()).then(e=>s.value=e).catch(e=>console.error(e))};return(e,a)=>{const i=o0,p=r0;return m(),u("div",i0,[y(i),t("div",h0,[K(e.$slots,"default")]),y(p)])}}});export{v0 as default};
