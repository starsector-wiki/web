import{Q as y}from"./QBtn.ca5b59b8.js";import{Q as k}from"./QPage.360a3488.js";import{I as b,a7 as _,r as x,a8 as S,a as B,K as n,L as P,M as u,U as s,R as l,S as i,Q as e,V as g,N as o,X as d,$ as m,Y as c,aa as I}from"./index.2aa26d26.js";import{_ as V}from"./PersonsDiv.b093d332.js";import{_ as w}from"./IndustriesDiv.251bc7de.js";import"./render.bb5ee70d.js";import"./QOptionGroup.9ed97808.js";import"./use-dark.944238e0.js";const z={key:0},C={style:{display:"grid","grid-template-columns":"3fr 2fr",gap:"10px"}},N={style:{"text-align":"left","vertical-align":"top","white-space":"pre-wrap"}},Q={style:{margin:"auto"}},$={class:"card-item-content"},E={class:"card-item-content"},A=["src"],D={key:2},X=b({name:"PlanetPage",__name:"PlanetPage",setup(R){const f=_();let r=x(f.params.id);S(async p=>{r.value=p.params.id});const a=B(()=>c.getPlanetById(r.value));return(p,t)=>(n(),P(k,null,{default:u(()=>{var v;return[a.value===void 0?(n(),s("h2",z,"Planet id:"+l(i(r))+" not found.",1)):(n(),s(d,{key:1},[e("h4",null,l(a.value.name),1),e("div",C,[e("span",N,l((v=a.value.customDescription)!=null?v:a.value.type.description),1),e("div",Q,[e("div",{style:g({width:50+"px",height:50+"px",backgroundColor:"#"+a.value.type.color,backgroundSize:"cover",backgroundPosition:"center",maskImage:`url(${a.value.type.iconTexture})`,maskSize:"cover"})},null,4),e("span",null,l(a.value.type.name),1)])]),t[2]||(t[2]=e("br",null,null,-1)),t[3]||(t[3]=e("br",null,null,-1)),o(y,{"no-caps":"",flat:"",to:{name:"star_system",params:{id:a.value.starSystemId}}},{default:u(()=>[e("div",$,[e("div",{style:g({width:50+"px",height:50+"px",backgroundColor:"#"+a.value.starSystem.star.type.color,backgroundSize:"cover",backgroundPosition:"center",maskImage:`url(${a.value.starSystem.star.type.iconTexture})`,maskSize:"cover"})},null,4),e("span",null,l(a.value.starSystem.name),1)])]),_:1},8,["to"]),t[4]||(t[4]=e("br",null,null,-1)),t[5]||(t[5]=e("br",null,null,-1)),t[6]||(t[6]=e("h4",null,"\u52BF\u529B",-1)),o(y,{class:"card-item","no-caps":"",to:{name:"faction",params:{id:a.value.faction.id}}},{default:u(()=>[e("div",E,[e("img",{decoding:"async",src:a.value.faction.crest},null,8,A),e("span",null,l(a.value.faction.displayName),1)])]),_:1},8,["to"]),t[7]||(t[7]=e("br",null,null,-1)),t[8]||(t[8]=e("br",null,null,-1)),a.value.persons.length>0?(n(),s(d,{key:0},[t[0]||(t[0]=e("h4",null,"\u4EBA\u7269",-1)),o(V,{"person-values":a.value.persons},null,8,["person-values"])],64)):m("",!0),t[9]||(t[9]=e("br",null,null,-1)),t[10]||(t[10]=e("br",null,null,-1)),a.value.market&&a.value.market.industryIds.length>0?(n(),s(d,{key:1},[t[1]||(t[1]=e("h4",null,"\u4EA7\u4E1A",-1)),o(w,{industryValues:a.value.market.industryIds},null,8,["industryValues"])],64)):m("",!0),i(c).debug?(n(),s("pre",D,[e("code",null,l(i(I)(a.value)),1)])):m("",!0)],64))]}),_:1}))}});export{X as default};