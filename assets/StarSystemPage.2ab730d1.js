import{Q as c}from"./QBtn.52ce3026.js";import{Q as g}from"./QPage.ac1e0319.js";import{I as v,a3 as S,r as _,a4 as k,a as B,K as s,L as b,M as p,U as r,R as l,S as u,Q as e,X as m,W as x,N,O as Q,Y as f,a0 as V}from"./index.bcc23c19.js";import{d as w}from"./utils.217e0a5c.js";import"./render.876162c1.js";const C={key:0},D={style:{display:"grid","grid-template-columns":"3fr 1fr",gap:"10px"}},P={style:{"text-align":"left","vertical-align":"top","white-space":"pre-wrap"}},R={key:0},J=v({name:"StarSystemPage",__name:"StarSystemPage",setup(I){const y=S();let n=_(y.params.id);k(async i=>{n.value=i.params.id});const a=B(()=>f.getStarSystemById(n.value));return(i,t)=>(s(),b(g,null,{default:p(()=>{var d;return[a.value===void 0?(s(),r("h2",C,"StarSystem id:"+l(u(n))+" not found.",1)):(s(),r(m,{key:1},[e("h4",null,l(a.value.name),1),e("div",D,[e("span",P,l((d=a.value.star.customDescription)!=null?d:a.value.star.type.description),1)]),t[0]||(t[0]=e("br",null,null,-1)),t[1]||(t[1]=e("br",null,null,-1)),e("ul",null,[(s(!0),r(m,null,x(a.value.planets,o=>(s(),r("li",{key:o.id},[N(c,{"no-caps":"",to:{name:"planet",params:{id:o.id}}},{default:p(()=>[Q(l(o.name),1)]),_:2},1032,["to"])]))),128))]),t[2]||(t[2]=e("br",null,null,-1)),t[3]||(t[3]=e("br",null,null,-1)),u(f).debug?(s(),r("pre",R,[e("code",null,l(u(w)(a.value)),1)])):V("",!0)],64))]}),_:1}))}});export{J as default};