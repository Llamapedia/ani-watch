import{f as C,A as f,r as g,h as V,B as D,c as o,a as e,k as w,l as I,i as t,s as h,d as k,t as p,q as y,F as b,m as B,j as d,o as n,x as N,p as $,e as F,_ as U}from"./entry.8f2a51df.js";const r=_=>($("data-v-f6a0adf2"),_=_(),F(),_),j={class:"theme-settings"},A=r(()=>e("h1",null,"Theme Settings",-1)),M={class:"theme-domain-edit"},E=r(()=>e("h2",null,"Edit currently used domain here:",-1)),W={key:0,class:"themes-list"},q={key:0},z={key:1},L={class:"theme-preview"},P=r(()=>e("label",{for:"preview"},"Preview themes",-1)),R=r(()=>e("label",{for:"nsfw"},"Allow NSFW themes",-1)),G={class:"theme"},H={key:0,class:"theme-nsfw-tag"},J=r(()=>e("p",null,"🥵",-1)),K=r(()=>e("p",null," This theme contains NSFW content. Adjust your filter settings above. ",-1)),O=[J,K],Q=["src"],X=["src"],Y={key:1,class:"theme-nsfw"},Z={class:"theme-title-bar"},ss=["onClick","disabled"],es={key:2},ts=C({__name:"themes",setup(_){const v=f("themes"),l=f("themeDomain"),S=f("selectedTheme"),u=g(!0),a=g(!1);V(a,(c,i)=>{localStorage.setItem("nsfwThemes",c.toString())});const T=()=>{localStorage.setItem("themeDomain",l.value),window.location.reload()},x=c=>{console.log(c),S.value=c.toString(),localStorage.setItem("theme",c.toString())};return D(()=>{a.value=localStorage.getItem("nsfwThemes")==="true"}),(c,i)=>(n(),o(b,null,[e("div",j,[A,e("div",M,[E,w(e("input",{"onUpdate:modelValue":i[0]||(i[0]=s=>h(l)?l.value=s:null),type:"text",placeholder:"https://www.example.com"},null,512),[[I,t(l)]]),e("button",{onClick:T},"Save")])]),t(v)?(n(),o("div",W,[e("h1",null,[k(" Themes available "),t(l)?(n(),o("span",q," from "+p(t(l)),1)):(n(),o("span",z,"by default")),k(": ")]),e("div",L,[P,w(e("input",{type:"checkbox",name:"preview",id:"preview","onUpdate:modelValue":i[1]||(i[1]=s=>h(u)?u.value=s:null)},null,512),[[y,t(u)]]),R,w(e("input",{type:"checkbox",name:"nsfw",id:"nsfw","onUpdate:modelValue":i[2]||(i[2]=s=>h(a)?a.value=s:null)},null,512),[[y,t(a)]])]),t(v)?(n(!0),o(b,{key:0},B(t(v),(s,m)=>(n(),o("div",{key:m,class:"theme-item"},[e("div",G,[t(u)?(n(),o("div",{key:0,class:N(["theme-preview-images",!t(a)&&(s!=null&&s.nsfw)?"theme-preview-blur":""])},[!t(a)&&(s!=null&&s.nsfw)?(n(),o("div",H,O)):d("",!0),e("img",{src:`${t(l)}/themes/background-${s.id}.png`,alt:"",class:"theme-preview-bg"},null,8,Q),e("img",{src:`${t(l)}/themes/logo-${s.id}.png`,alt:"",class:"theme-preview-logo"},null,8,X)],2)):d("",!0),s!=null&&s.nsfw?(n(),o("p",Y,"🔞")):d("",!0),e("div",Z,[e("h2",null,p(s==null?void 0:s.name),1),e("button",{onClick:os=>x(m),disabled:!t(a)&&(s==null?void 0:s.nsfw)}," Use this theme ",8,ss)]),s!=null&&s.series?(n(),o("h3",es,p(s==null?void 0:s.series),1)):d("",!0),e("p",null,p(s==null?void 0:s.description),1)])]))),128)):d("",!0)])):d("",!0)],64))}});const ls=U(ts,[["__scopeId","data-v-f6a0adf2"]]);export{ls as default};