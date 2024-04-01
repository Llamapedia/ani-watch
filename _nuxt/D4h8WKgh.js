/*! @license DOMPurify 3.0.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.11/LICENSE */const{entries:ft,setPrototypeOf:nt,isFrozen:Ft,getPrototypeOf:Ht,getOwnPropertyDescriptor:zt}=Object;let{freeze:g,seal:L,create:ut}=Object,{apply:ye,construct:De}=typeof Reflect<"u"&&Reflect;g||(g=function(o){return o});L||(L=function(o){return o});ye||(ye=function(o,l,r){return o.apply(l,r)});De||(De=function(o,l){return new o(...l)});const te=R(Array.prototype.forEach),ot=R(Array.prototype.pop),X=R(Array.prototype.push),ie=R(String.prototype.toLowerCase),Se=R(String.prototype.toString),it=R(String.prototype.match),V=R(String.prototype.replace),Wt=R(String.prototype.indexOf),Gt=R(String.prototype.trim),O=R(Object.prototype.hasOwnProperty),S=R(RegExp.prototype.test),$=Bt(TypeError);function R(s){return function(o){for(var l=arguments.length,r=new Array(l>1?l-1:0),d=1;d<l;d++)r[d-1]=arguments[d];return ye(s,o,r)}}function Bt(s){return function(){for(var o=arguments.length,l=new Array(o),r=0;r<o;r++)l[r]=arguments[r];return De(s,l)}}function a(s,o){let l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ie;nt&&nt(s,null);let r=o.length;for(;r--;){let d=o[r];if(typeof d=="string"){const y=l(d);y!==d&&(Ft(o)||(o[r]=y),d=y)}s[d]=!0}return s}function Yt(s){for(let o=0;o<s.length;o++)O(s,o)||(s[o]=null);return s}function w(s){const o=ut(null);for(const[l,r]of ft(s))O(s,l)&&(Array.isArray(r)?o[l]=Yt(r):r&&typeof r=="object"&&r.constructor===Object?o[l]=w(r):o[l]=r);return o}function ne(s,o){for(;s!==null;){const r=zt(s,o);if(r){if(r.get)return R(r.get);if(typeof r.value=="function")return R(r.value)}s=Ht(s)}function l(){return null}return l}const at=g(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Re=g(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Le=g(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),jt=g(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Oe=g(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Xt=g(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),rt=g(["#text"]),st=g(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),Ne=g(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),lt=g(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),oe=g(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Vt=L(/\{\{[\w\W]*|[\w\W]*\}\}/gm),$t=L(/<%[\w\W]*|[\w\W]*%>/gm),qt=L(/\${[\w\W]*}/gm),Kt=L(/^data-[\-\w.\u00B7-\uFFFF]/),Zt=L(/^aria-[\-\w]+$/),mt=L(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Jt=L(/^(?:\w+script|data):/i),Qt=L(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),pt=L(/^html$/i),en=L(/^[a-z][.\w]*(-[.\w]+)+$/i);var ct=Object.freeze({__proto__:null,MUSTACHE_EXPR:Vt,ERB_EXPR:$t,TMPLIT_EXPR:qt,DATA_ATTR:Kt,ARIA_ATTR:Zt,IS_ALLOWED_URI:mt,IS_SCRIPT_OR_DATA:Jt,ATTR_WHITESPACE:Qt,DOCTYPE_NAME:pt,CUSTOM_ELEMENT:en});const tn=function(){return typeof window>"u"?null:window},nn=function(o,l){if(typeof o!="object"||typeof o.createPolicy!="function")return null;let r=null;const d="data-tt-policy-suffix";l&&l.hasAttribute(d)&&(r=l.getAttribute(d));const y="dompurify"+(r?"#"+r:"");try{return o.createPolicy(y,{createHTML(x){return x},createScriptURL(x){return x}})}catch{return console.warn("TrustedTypes policy "+y+" could not be created."),null}};function dt(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:tn();const o=i=>dt(i);if(o.version="3.0.11",o.removed=[],!s||!s.document||s.document.nodeType!==9)return o.isSupported=!1,o;let{document:l}=s;const r=l,d=r.currentScript,{DocumentFragment:y,HTMLTemplateElement:x,Node:ae,Element:be,NodeFilter:z,NamedNodeMap:Tt=s.NamedNodeMap||s.MozNamedAttrMap,HTMLFormElement:Et,DOMParser:_t,trustedTypes:q}=s,K=be.prototype,gt=ne(K,"cloneNode"),ht=ne(K,"nextSibling"),At=ne(K,"childNodes"),re=ne(K,"parentNode");if(typeof x=="function"){const i=l.createElement("template");i.content&&i.content.ownerDocument&&(l=i.content.ownerDocument)}let _,W="";const{implementation:se,createNodeIterator:St,createDocumentFragment:Rt,getElementsByTagName:Lt}=l,{importNode:Ot}=r;let N={};o.isSupported=typeof ft=="function"&&typeof re=="function"&&se&&se.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:le,ERB_EXPR:ce,TMPLIT_EXPR:fe,DATA_ATTR:Nt,ARIA_ATTR:yt,IS_SCRIPT_OR_DATA:Dt,ATTR_WHITESPACE:Ie,CUSTOM_ELEMENT:bt}=ct;let{IS_ALLOWED_URI:Ce}=ct,u=null;const Me=a({},[...at,...Re,...Le,...Oe,...rt]);let m=null;const we=a({},[...st,...Ne,...lt,...oe]);let f=Object.seal(ut(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),G=null,ue=null,xe=!0,me=!0,Pe=!1,ke=!0,P=!1,C=!1,pe=!1,de=!1,k=!1,Z=!1,J=!1,ve=!0,Ue=!1;const It="user-content-";let Te=!0,B=!1,v={},U=null;const Fe=a({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let He=null;const ze=a({},["audio","video","img","source","image","track"]);let Ee=null;const We=a({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Q="http://www.w3.org/1998/Math/MathML",ee="http://www.w3.org/2000/svg",D="http://www.w3.org/1999/xhtml";let F=D,_e=!1,ge=null;const Ct=a({},[Q,ee,D],Se);let Y=null;const Mt=["application/xhtml+xml","text/html"],wt="text/html";let p=null,H=null;const xt=l.createElement("form"),Ge=function(e){return e instanceof RegExp||e instanceof Function},he=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(H&&H===e)){if((!e||typeof e!="object")&&(e={}),e=w(e),Y=Mt.indexOf(e.PARSER_MEDIA_TYPE)===-1?wt:e.PARSER_MEDIA_TYPE,p=Y==="application/xhtml+xml"?Se:ie,u=O(e,"ALLOWED_TAGS")?a({},e.ALLOWED_TAGS,p):Me,m=O(e,"ALLOWED_ATTR")?a({},e.ALLOWED_ATTR,p):we,ge=O(e,"ALLOWED_NAMESPACES")?a({},e.ALLOWED_NAMESPACES,Se):Ct,Ee=O(e,"ADD_URI_SAFE_ATTR")?a(w(We),e.ADD_URI_SAFE_ATTR,p):We,He=O(e,"ADD_DATA_URI_TAGS")?a(w(ze),e.ADD_DATA_URI_TAGS,p):ze,U=O(e,"FORBID_CONTENTS")?a({},e.FORBID_CONTENTS,p):Fe,G=O(e,"FORBID_TAGS")?a({},e.FORBID_TAGS,p):{},ue=O(e,"FORBID_ATTR")?a({},e.FORBID_ATTR,p):{},v=O(e,"USE_PROFILES")?e.USE_PROFILES:!1,xe=e.ALLOW_ARIA_ATTR!==!1,me=e.ALLOW_DATA_ATTR!==!1,Pe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ke=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,P=e.SAFE_FOR_TEMPLATES||!1,C=e.WHOLE_DOCUMENT||!1,k=e.RETURN_DOM||!1,Z=e.RETURN_DOM_FRAGMENT||!1,J=e.RETURN_TRUSTED_TYPE||!1,de=e.FORCE_BODY||!1,ve=e.SANITIZE_DOM!==!1,Ue=e.SANITIZE_NAMED_PROPS||!1,Te=e.KEEP_CONTENT!==!1,B=e.IN_PLACE||!1,Ce=e.ALLOWED_URI_REGEXP||mt,F=e.NAMESPACE||D,f=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Ge(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(f.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Ge(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(f.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(f.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),P&&(me=!1),Z&&(k=!0),v&&(u=a({},rt),m=[],v.html===!0&&(a(u,at),a(m,st)),v.svg===!0&&(a(u,Re),a(m,Ne),a(m,oe)),v.svgFilters===!0&&(a(u,Le),a(m,Ne),a(m,oe)),v.mathMl===!0&&(a(u,Oe),a(m,lt),a(m,oe))),e.ADD_TAGS&&(u===Me&&(u=w(u)),a(u,e.ADD_TAGS,p)),e.ADD_ATTR&&(m===we&&(m=w(m)),a(m,e.ADD_ATTR,p)),e.ADD_URI_SAFE_ATTR&&a(Ee,e.ADD_URI_SAFE_ATTR,p),e.FORBID_CONTENTS&&(U===Fe&&(U=w(U)),a(U,e.FORBID_CONTENTS,p)),Te&&(u["#text"]=!0),C&&a(u,["html","head","body"]),u.table&&(a(u,["tbody"]),delete G.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw $('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw $('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');_=e.TRUSTED_TYPES_POLICY,W=_.createHTML("")}else _===void 0&&(_=nn(q,d)),_!==null&&typeof W=="string"&&(W=_.createHTML(""));g&&g(e),H=e}},Be=a({},["mi","mo","mn","ms","mtext"]),Ye=a({},["foreignobject","desc","title","annotation-xml"]),Pt=a({},["title","style","font","a","script"]),je=a({},[...Re,...Le,...jt]),Xe=a({},[...Oe,...Xt]),kt=function(e){let t=re(e);(!t||!t.tagName)&&(t={namespaceURI:F,tagName:"template"});const n=ie(e.tagName),c=ie(t.tagName);return ge[e.namespaceURI]?e.namespaceURI===ee?t.namespaceURI===D?n==="svg":t.namespaceURI===Q?n==="svg"&&(c==="annotation-xml"||Be[c]):!!je[n]:e.namespaceURI===Q?t.namespaceURI===D?n==="math":t.namespaceURI===ee?n==="math"&&Ye[c]:!!Xe[n]:e.namespaceURI===D?t.namespaceURI===ee&&!Ye[c]||t.namespaceURI===Q&&!Be[c]?!1:!Xe[n]&&(Pt[n]||!je[n]):!!(Y==="application/xhtml+xml"&&ge[e.namespaceURI]):!1},I=function(e){X(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch{e.remove()}},Ae=function(e,t){try{X(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch{X(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!m[e])if(k||Z)try{I(t)}catch{}else try{t.setAttribute(e,"")}catch{}},Ve=function(e){let t=null,n=null;if(de)e="<remove></remove>"+e;else{const E=it(e,/^[\r\n\t ]+/);n=E&&E[0]}Y==="application/xhtml+xml"&&F===D&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const c=_?_.createHTML(e):e;if(F===D)try{t=new _t().parseFromString(c,Y)}catch{}if(!t||!t.documentElement){t=se.createDocument(F,"template",null);try{t.documentElement.innerHTML=_e?W:c}catch{}}const T=t.body||t.documentElement;return e&&n&&T.insertBefore(l.createTextNode(n),T.childNodes[0]||null),F===D?Lt.call(t,C?"html":"body")[0]:C?t.documentElement:T},$e=function(e){return St.call(e.ownerDocument||e,e,z.SHOW_ELEMENT|z.SHOW_COMMENT|z.SHOW_TEXT|z.SHOW_PROCESSING_INSTRUCTION|z.SHOW_CDATA_SECTION,null)},vt=function(e){return e instanceof Et&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof Tt)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},qe=function(e){return typeof ae=="function"&&e instanceof ae},b=function(e,t,n){N[e]&&te(N[e],c=>{c.call(o,t,n,H)})},Ke=function(e){let t=null;if(b("beforeSanitizeElements",e,null),vt(e))return I(e),!0;const n=p(e.nodeName);if(b("uponSanitizeElement",e,{tagName:n,allowedTags:u}),e.hasChildNodes()&&!qe(e.firstElementChild)&&S(/<[/\w]/g,e.innerHTML)&&S(/<[/\w]/g,e.textContent)||e.nodeType===7)return I(e),!0;if(!u[n]||G[n]){if(!G[n]&&Je(n)&&(f.tagNameCheck instanceof RegExp&&S(f.tagNameCheck,n)||f.tagNameCheck instanceof Function&&f.tagNameCheck(n)))return!1;if(Te&&!U[n]){const c=re(e)||e.parentNode,T=At(e)||e.childNodes;if(T&&c){const E=T.length;for(let h=E-1;h>=0;--h)c.insertBefore(gt(T[h],!0),ht(e))}}return I(e),!0}return e instanceof be&&!kt(e)||(n==="noscript"||n==="noembed"||n==="noframes")&&S(/<\/no(script|embed|frames)/i,e.innerHTML)?(I(e),!0):(P&&e.nodeType===3&&(t=e.textContent,te([le,ce,fe],c=>{t=V(t,c," ")}),e.textContent!==t&&(X(o.removed,{element:e.cloneNode()}),e.textContent=t)),b("afterSanitizeElements",e,null),!1)},Ze=function(e,t,n){if(ve&&(t==="id"||t==="name")&&(n in l||n in xt))return!1;if(!(me&&!ue[t]&&S(Nt,t))){if(!(xe&&S(yt,t))){if(!m[t]||ue[t]){if(!(Je(e)&&(f.tagNameCheck instanceof RegExp&&S(f.tagNameCheck,e)||f.tagNameCheck instanceof Function&&f.tagNameCheck(e))&&(f.attributeNameCheck instanceof RegExp&&S(f.attributeNameCheck,t)||f.attributeNameCheck instanceof Function&&f.attributeNameCheck(t))||t==="is"&&f.allowCustomizedBuiltInElements&&(f.tagNameCheck instanceof RegExp&&S(f.tagNameCheck,n)||f.tagNameCheck instanceof Function&&f.tagNameCheck(n))))return!1}else if(!Ee[t]){if(!S(Ce,V(n,Ie,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&Wt(n,"data:")===0&&He[e])){if(!(Pe&&!S(Dt,V(n,Ie,"")))){if(n)return!1}}}}}}return!0},Je=function(e){return e!=="annotation-xml"&&it(e,bt)},Qe=function(e){b("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const n={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:m};let c=t.length;for(;c--;){const T=t[c],{name:E,namespaceURI:h,value:M}=T,j=p(E);let A=E==="value"?M:Gt(M);if(n.attrName=j,n.attrValue=A,n.keepAttr=!0,n.forceKeepAttr=void 0,b("uponSanitizeAttribute",e,n),A=n.attrValue,n.forceKeepAttr||(Ae(E,e),!n.keepAttr))continue;if(!ke&&S(/\/>/i,A)){Ae(E,e);continue}P&&te([le,ce,fe],tt=>{A=V(A,tt," ")});const et=p(e.nodeName);if(Ze(et,j,A)){if(Ue&&(j==="id"||j==="name")&&(Ae(E,e),A=It+A),_&&typeof q=="object"&&typeof q.getAttributeType=="function"&&!h)switch(q.getAttributeType(et,j)){case"TrustedHTML":{A=_.createHTML(A);break}case"TrustedScriptURL":{A=_.createScriptURL(A);break}}try{h?e.setAttributeNS(h,E,A):e.setAttribute(E,A),ot(o.removed)}catch{}}}b("afterSanitizeAttributes",e,null)},Ut=function i(e){let t=null;const n=$e(e);for(b("beforeSanitizeShadowDOM",e,null);t=n.nextNode();)b("uponSanitizeShadowNode",t,null),!Ke(t)&&(t.content instanceof y&&i(t.content),Qe(t));b("afterSanitizeShadowDOM",e,null)};return o.sanitize=function(i){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,n=null,c=null,T=null;if(_e=!i,_e&&(i="<!-->"),typeof i!="string"&&!qe(i))if(typeof i.toString=="function"){if(i=i.toString(),typeof i!="string")throw $("dirty is not a string, aborting")}else throw $("toString is not a function");if(!o.isSupported)return i;if(pe||he(e),o.removed=[],typeof i=="string"&&(B=!1),B){if(i.nodeName){const M=p(i.nodeName);if(!u[M]||G[M])throw $("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof ae)t=Ve("<!---->"),n=t.ownerDocument.importNode(i,!0),n.nodeType===1&&n.nodeName==="BODY"||n.nodeName==="HTML"?t=n:t.appendChild(n);else{if(!k&&!P&&!C&&i.indexOf("<")===-1)return _&&J?_.createHTML(i):i;if(t=Ve(i),!t)return k?null:J?W:""}t&&de&&I(t.firstChild);const E=$e(B?i:t);for(;c=E.nextNode();)Ke(c)||(c.content instanceof y&&Ut(c.content),Qe(c));if(B)return i;if(k){if(Z)for(T=Rt.call(t.ownerDocument);t.firstChild;)T.appendChild(t.firstChild);else T=t;return(m.shadowroot||m.shadowrootmode)&&(T=Ot.call(r,T,!0)),T}let h=C?t.outerHTML:t.innerHTML;return C&&u["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&S(pt,t.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+h),P&&te([le,ce,fe],M=>{h=V(h,M," ")}),_&&J?_.createHTML(h):h},o.setConfig=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};he(i),pe=!0},o.clearConfig=function(){H=null,pe=!1},o.isValidAttribute=function(i,e,t){H||he({});const n=p(i),c=p(e);return Ze(n,c,t)},o.addHook=function(i,e){typeof e=="function"&&(N[i]=N[i]||[],X(N[i],e))},o.removeHook=function(i){if(N[i])return ot(N[i])},o.removeHooks=function(i){N[i]&&(N[i]=[])},o.removeAllHooks=function(){N={}},o}var on=dt();export{on as p};
