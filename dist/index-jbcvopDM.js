var $t=Object.defineProperty;var Ft=(o,t,n)=>t in o?$t(o,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[t]=n;var g=(o,t,n)=>(Ft(o,typeof t!="symbol"?t+"":t,n),n),Tt=(o,t,n)=>{if(!t.has(o))throw TypeError("Cannot "+n)};var e=(o,t,n)=>(Tt(o,t,"read from private field"),n?n.call(o):t.get(o)),i=(o,t,n)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,n)},r=(o,t,n,s)=>(Tt(o,t,"write to private field"),s?s.call(o,n):t.set(o,n),n);var E=(o,t,n)=>(Tt(o,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const D of l.addedNodes)D.tagName==="LINK"&&D.rel==="modulepreload"&&s(D)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();var Y,X,rt;class zt{constructor(t){i(this,Y,void 0);i(this,X,void 0);i(this,rt,{alpha:!1});g(this,"setCanvasFullSize",(t,n,s)=>{var a;this.canvas.width=t*s,this.canvas.height=n*s,(a=this.ctx)==null||a.scale(s,s),this.canvas.style.width=`${window.innerWidth}px`,this.canvas.style.height=`${window.innerHeight}px`});g(this,"clearCanvasData",()=>{var t;(t=this.ctx)==null||t.clearRect(0,0,this.canvas.width,this.canvas.height)});g(this,"moveOriginPointTo",(t,n)=>{var s;(s=this.ctx)==null||s.translate(t,n)});g(this,"resetOriginPoint",t=>{var n;(n=this.ctx)==null||n.setTransform(t,0,0,t,0,0)});r(this,Y,t),r(this,X,this.canvas.getContext("2d",e(this,rt)))}get canvas(){return e(this,Y)}get ctx(){return e(this,X)}}Y=new WeakMap,X=new WeakMap,rt=new WeakMap;var j,W,H;class Kt{constructor(){i(this,j,0);i(this,W,0);i(this,H,!1)}get pressed(){return e(this,H)}set pressed(t){r(this,H,t)}getPrevValues(){return[e(this,j),e(this,W)]}setPrevValues(t,n){r(this,j,t),r(this,W,n)}}j=new WeakMap,W=new WeakMap,H=new WeakMap;const p=new Kt;var L,R,lt,ct,ht;class qt{constructor(t,n){i(this,L,void 0);i(this,R,void 0);i(this,lt,t=>{p.pressed=!0,p.setPrevValues(t.clientX,t.clientY)});i(this,ct,t=>{p.pressed&&(e(this,R).activeTool.draw(...p.getPrevValues(),t.clientX,t.clientY),p.setPrevValues(t.clientX,t.clientY))});i(this,ht,()=>{p.pressed=!1});r(this,L,t),r(this,R,n)}attach(){e(this,L).addEventListener("mousedown",e(this,lt)),e(this,L).addEventListener("mousemove",e(this,ct)),e(this,L).addEventListener("mouseup",e(this,ht))}}L=new WeakMap,R=new WeakMap,lt=new WeakMap,ct=new WeakMap,ht=new WeakMap;var P,V,dt,ut,pt;class Gt{constructor(t,n){i(this,P,void 0);i(this,V,void 0);i(this,dt,t=>{p.pressed=!0,p.setPrevValues(t.touches[0].clientX,t.touches[0].clientY)});i(this,ut,t=>{t.preventDefault(),p.pressed&&(e(this,V).activeTool.draw(...p.getPrevValues(),Math.round(t.touches[0].clientX),Math.round(t.touches[0].clientY)),p.setPrevValues(t.touches[0].clientX,t.touches[0].clientY))});i(this,pt,()=>{p.pressed=!0});r(this,P,t),r(this,V,n)}attach(){e(this,P).addEventListener("touchstart",e(this,dt)),e(this,P).addEventListener("touchmove",e(this,ut)),e(this,P).addEventListener("touchend",e(this,pt))}}P=new WeakMap,V=new WeakMap,dt=new WeakMap,ut=new WeakMap,pt=new WeakMap;var $,gt,F,vt,At,mt,Jt,m,T;class Qt{constructor(t){i(this,vt);i(this,mt);i(this,m);i(this,$,void 0);i(this,gt,"pen");i(this,F,{strokeStyle:"#ffffff",lineWidth:3,lineCap:"round",lineJoin:"round"});r(this,$,t)}get type(){return e(this,gt)}get settings(){return e(this,F)}set settings(t){r(this,F,Object.assign(t))}draw(t,n,s,a,l=this.settings){E(this,vt,At).call(this,l),E(this,mt,Jt).call(this,t,n,s,a)}}$=new WeakMap,gt=new WeakMap,F=new WeakMap,vt=new WeakSet,At=function(t){for(let n in t)e(this,m,T)[n]=t[n]},mt=new WeakSet,Jt=function(t,n,s,a){e(this,m,T).beginPath(),e(this,m,T).moveTo(t,n),e(this,m,T).lineTo(s,a),e(this,m,T).closePath(),e(this,m,T).stroke()},m=new WeakSet,T=function(){return e(this,$)};var b,M;class Zt{constructor(t,n="pen"){i(this,b,void 0);i(this,M,void 0);r(this,b,{});for(let s of t)e(this,b)[s.type]=s;r(this,M,{}),this.activeTool=n}get tools(){return e(this,b)}get activeTool(){return e(this,M)}set activeTool(t){r(this,M,e(this,b)[t])}}b=new WeakMap,M=new WeakMap;var z,_,K,q,G,O,B,A,I,Q,Pt,ft,Nt,wt,Ut;class Lt{constructor(t,n){i(this,Q);i(this,ft);i(this,wt);i(this,z,void 0);i(this,_,!1);i(this,K,"");i(this,q,[]);i(this,G,"");i(this,O,0);i(this,B,0);i(this,A,[0,0]);i(this,I,void 0);g(this,"onPointerDown",(t,n,s)=>{r(this,_,!0),r(this,G,s),r(this,O,t),r(this,B,n),r(this,Q,[0,0],Pt),r(this,A,[0,0])});g(this,"onPointerMove",(t,n)=>{e(this,_)&&(r(this,Q,[t-e(this,O),n-e(this,B)],Pt),r(this,A,[t-e(this,O),n-e(this,B)]))});g(this,"onPointerUp",()=>{r(this,_,!1),E(this,wt,Ut).call(this,e(this,I))});r(this,z,t),r(this,I,{}),Object.assign(e(this,I),n),E(this,ft,Nt).call(this,3)}get elementData(){return{id:e(this,K),points:e(this,q),type:e(this,G),x:e(this,O),y:e(this,B),lastPoint:e(this,A),settings:e(this,I)}}}z=new WeakMap,_=new WeakMap,K=new WeakMap,q=new WeakMap,G=new WeakMap,O=new WeakMap,B=new WeakMap,A=new WeakMap,I=new WeakMap,Q=new WeakSet,Pt=function(t){e(this,q).push(t)},ft=new WeakSet,Nt=function(t=1){let n=0;for(;n<t;)r(this,K,e(this,K)+Math.random().toString(36).substring(2)),n++},wt=new WeakSet,Ut=function(t){for(let n in t)t[n]=e(this,z)[n]};var J;class te{constructor(){i(this,J,[])}get elements(){return e(this,J)}set elements(t){r(this,J,t)}pushElement(t){e(this,J).push(t)}get allData(){return{elements:this.elements}}}J=new WeakMap;var c,N,Z,f,u,Ct,Yt,tt,bt,U,at;class ee{constructor(t,n){i(this,Ct);i(this,tt);i(this,U);i(this,c,void 0);i(this,N,new te);i(this,Z,"LittleNotes");i(this,f,void 0);i(this,u,void 0);g(this,"iterateOverPoints",(t,n)=>{for(let s=0,a=t.length-1;s<a;s++){let l=t[s][0],D=t[s][1],St=t[s+1][0],v=t[s+1][1];e(this,f).activeTool.draw(l,D,St,v,n)}});r(this,u,t),r(this,f,n),r(this,c,new Lt(t,n.activeTool.settings)),E(this,Ct,Yt).call(this)}mouseAttach(){e(this,u).canvas.addEventListener("mousedown",t=>{r(this,c,new Lt(e(this,u),e(this,f).activeTool.settings)),e(this,c).onPointerDown(t.clientX,t.clientY,e(this,f).activeTool.type)}),e(this,u).canvas.addEventListener("mousemove",t=>e(this,c).onPointerMove(t.clientX,t.clientY)),e(this,u).canvas.addEventListener("mouseup",()=>{e(this,c).onPointerUp(),this.storeDataElement(e(this,c).elementData)})}touchAttach(){e(this,u).canvas.addEventListener("touchstart",t=>{r(this,c,new Lt(e(this,u),e(this,f).activeTool.settings)),e(this,c).onPointerDown(Math.round(t.touches[0].clientX),Math.round(t.touches[0].clientY),e(this,f).activeTool.type)}),e(this,u).canvas.addEventListener("touchmove",t=>e(this,c).onPointerMove(Math.round(t.touches[0].clientX),Math.round(t.touches[0].clientY))),e(this,u).canvas.addEventListener("touchend",()=>{e(this,c).onPointerUp(),this.storeDataElement(e(this,c).elementData)})}get appData(){return e(this,N).allData}storeDataElement(t){e(this,U,at).pushElement(t),localStorage.setItem(e(this,tt,bt),JSON.stringify(e(this,U,at).elements))}clearDataElements(){e(this,U,at).elements=[],localStorage.removeItem(e(this,tt,bt))}}c=new WeakMap,N=new WeakMap,Z=new WeakMap,f=new WeakMap,u=new WeakMap,Ct=new WeakSet,Yt=function(){const t=localStorage.getItem(e(this,Z));t&&(e(this,N).elements=JSON.parse(t))},tt=new WeakSet,bt=function(){return e(this,Z)},U=new WeakSet,at=function(){return e(this,N)};var C;class ne{constructor(t){i(this,C,void 0);r(this,C,{}),this.activeTool=t}get activeTool(){return e(this,C).activeTool}set activeTool(t){const{type:n,settings:s}=t;e(this,C).activeTool={type:n,settings:s}}get allData(){return e(this,C)}set allData(t){r(this,C,t)}}C=new WeakMap;var y,x,et,yt,Xt;class se{constructor(t){i(this,yt);i(this,y,void 0);i(this,x,void 0);i(this,et,"LN-state");if(r(this,x,t),r(this,y,new ne(e(this,x).activeTool)),E(this,yt,Xt).call(this)){const{type:n,settings:s}=e(this,y).activeTool;e(this,x).activeTool=n,e(this,x).activeTool.settings=s}this.storeDataElement()}get stateData(){return e(this,y).allData}storeDataElement(){localStorage.setItem(e(this,et),JSON.stringify(e(this,y).allData))}}y=new WeakMap,x=new WeakMap,et=new WeakMap,yt=new WeakSet,Xt=function(){const t=localStorage.getItem(e(this,et));return t?(e(this,y).allData=JSON.parse(t),!0):!1};var nt,st,Ot;class Et{constructor(t){i(this,st);i(this,nt,void 0);r(this,nt,t)}set value(t){e(this,st,Ot).value=t}onChange(t){e(this,st,Ot).addEventListener("change",n=>t(n))}}nt=new WeakMap,st=new WeakSet,Ot=function(){return e(this,nt)};const oe=document.getElementById("settings_picker"),ie=document.getElementById("settings_range"),ae=document.getElementById("settings_line-cap"),re=document.getElementById("settings_line-join"),xt=new Et(oe),kt=new Et(ie),Mt=new Et(ae),_t=new Et(re);var ot,Dt,jt;class It{constructor(t){i(this,Dt);i(this,ot,void 0);r(this,ot,t)}onClick(t){e(this,Dt,jt).addEventListener("click",()=>t())}}ot=new WeakMap,Dt=new WeakSet,jt=function(){return e(this,ot)};const le=document.getElementById("menu__open"),ce=document.getElementById("menu__save"),he=document.getElementById("menu__clear"),de=new It(le),ue=new It(ce),pe=new It(he);class Wt extends HTMLElement{constructor(){super();g(this,"toggleIsOpen",()=>{switch(this.getAttribute("isopen")){case"true":this.setAttribute("isopen","false");break;case"false":this.setAttribute("isopen","true");break}})}connectedCallback(){const n=this.attachShadow({mode:"open"}),s=document.getElementById("dropdown"),a=new CSSStyleSheet;a.replaceSync(`
      :host {
        position: absolute;

        margin: var(--content-padding) !important;
      }

      #dropdown__section {
        display: grid;

        margin-top: calc(var(--content-padding) / 2);
      }

      .dropdown--onTop {
        position: relative;
        z-index: 1;
      }

      .dropdown--isClosed {
      display: none !important;
      }
    `),n.appendChild(s==null?void 0:s.content.cloneNode(!0)),n.adoptedStyleSheets=[a],this.dropdownBtn.classList.add("dropdown--onTop"),this.dropdownBtn.addEventListener("click",this.toggleIsOpen),this.dropdownSection.classList.add("dropdown--onTop"),this.dropdownSection.classList.add("dropdown--isClosed"),this.dropdownSection.ariaHidden="true"}attributeChangedCallback(n,s,a){if(s)switch(a){case"true":this.dropdownSection.classList.remove("dropdown--isClosed"),this.dropdownSection.ariaHidden="false";break;case"false":this.dropdownSection.classList.add("dropdown--isClosed"),this.dropdownSection.ariaHidden="true";break}}disconnectedCallback(){this.dropdownBtn.removeEventListener("click",this.toggleIsOpen)}get dropdownBtn(){var n;return(n=this.shadowRoot)==null?void 0:n.getElementById("dropdown__btn")}get dropdownSection(){var n;return(n=this.shadowRoot)==null?void 0:n.getElementById("dropdown__section")}}g(Wt,"observedAttributes",["isopen"]);const ge=(o,t,n)=>{fetch(me(o,n)).then(s=>(ve(s.url,t).click(),s.url)).then(s=>fe(s)).catch(s=>console.error("onSave:",s))};function ve(o,t){const n=document.createElement("a");return n.href=o,n.download=t,n}function me(o,t){const n=new Blob([JSON.stringify(o,null,2)],{type:t});return URL.createObjectURL(n)}function fe(o){URL.revokeObjectURL(o)}function we(o){return new Promise((t,n)=>{const s=ye(o);s.onchange=()=>{var l;const a=(l=s.files)==null?void 0:l[0];a&&Ce(a).then(t).catch(n)},s.click()})}function Ce(o){return new Promise((t,n)=>{const s=new FileReader;s.onerror=n,s.onload=()=>{const a=JSON.parse(s.result);t(a)},s.readAsText(o)})}function ye(o){const t=document.createElement("input");return t.type="file",t.accept=o,t}function De(o){const t=o.getFullYear(),n=(o.getMonth()+1).toString().padStart(2,"0"),s=o.getDate().toString().padStart(2,"0"),a=o.getHours().toString().padStart(2,"0"),l=o.getMinutes().toString().padStart(2,"0");return`${t}-${n}-${s}_${a}-${l}`}class Ee{get dpr(){return window.devicePixelRatio}get innerHeight(){return window.innerHeight}get innerWidth(){return window.innerWidth}}const Bt=document.getElementById("board"),S=new zt(Bt),it=new Ee;if(S.ctx){let o=function(){for(let k of v.appData.elements)S.moveOriginPointTo(k.x,k.y),v.iterateOverPoints(k.points,k.settings),S.resetOriginPoint(it.dpr)},t=function(){S.setCanvasFullSize(it.innerWidth,it.innerHeight,it.dpr),S.clearCanvasData(),requestAnimationFrame(o)},n=function(){customElements.define("canvas-dropdown",Wt),ue.onClick(()=>{const h=De(new Date);ge(v.appData,`untitled_${h}.json`,"application/json")}),de.onClick(()=>{we("application/json").then(h=>{v.clearDataElements();for(let d of h.elements)v.storeDataElement(d);t()}).catch(h=>console.error("onLoad:",h))}),pe.onClick(()=>{v.clearDataElements(),t()});const k=l.activeTool.settings.strokeStyle.toString(),Ht=l.activeTool.settings.lineWidth.toString(),Rt=l.activeTool.settings.lineCap,Vt=l.activeTool.settings.lineJoin;xt.value=k,xt.onChange(h=>{const d=h.target.value;l.activeTool.settings.strokeStyle=d,w.stateData.activeTool.settings.strokeStyle=d,w.storeDataElement()}),kt.value=Ht,kt.onChange(h=>{const d=parseInt(h.target.value);l.activeTool.settings.lineWidth=d,w.stateData.activeTool.settings.lineWidth=d,w.storeDataElement()}),Mt.value=Rt,Mt.onChange(h=>{const d=h.target.value;l.activeTool.settings.lineCap=d,w.stateData.activeTool.settings.lineCap=d,w.storeDataElement()}),_t.value=Vt,_t.onChange(h=>{const d=h.target.value;l.activeTool.settings.lineJoin=d,w.stateData.activeTool.settings.lineJoin=d,w.storeDataElement()})};const s=new Qt(S.ctx),a=[s],l=new Zt(a,s.type),D=new qt(Bt,l),St=new Gt(Bt,l);D.attach(),St.attach();const v=new ee(S.ctx,l);v.mouseAttach(),v.touchAttach();const w=new se(l);window.addEventListener("resize",t),window.addEventListener("load",t,{once:!0}),window.addEventListener("load",n,{once:!0})}
