import{Q as B}from"./QPage.c3cd593d.js";import{_ as g}from"./ShipsDiv.ce652be9.js";import{I as E,a7 as C,r as D,a8 as S,a as p,K as d,L as b,M as P,U as e,R as t,S as m,Q as l,N as n,X as r,$ as o,Y as a,aa as x}from"./index.d6896bff.js";import{_ as k}from"./WeaponSpriteDiv.39637e85.js";import{_ as A}from"./FactionsDiv.e3d06849.js";import"./render.88300134.js";import"./QOptionGroup.5ed75565.js";import"./QBtn.efe15480.js";import"./use-dark.9020fae9.js";const w={key:0},I={style:{display:"grid","grid-template-columns":"3fr 1fr",gap:"10px"}},R={style:{"text-align":"left","vertical-align":"top","white-space":"pre-wrap"}},$={style:{"column-count":"3"}},N={style:{display:"grid","grid-template-columns":"1fr 1fr"}},z={style:{display:"grid","grid-template-columns":"1fr 1fr"}},M={style:{display:"grid","grid-template-columns":"1fr 1fr"}},T={style:{display:"grid","grid-template-columns":"1fr 1fr"}},_={style:{display:"grid","grid-template-columns":"1fr 1fr"}},Q={style:{display:"grid","grid-template-columns":"1fr 1fr"}},V={style:{display:"grid","grid-template-columns":"1fr 1fr"}},W={style:{display:"grid","grid-template-columns":"1fr 1fr"}},U={style:{display:"grid","grid-template-columns":"1fr 1fr"}},J={style:{display:"grid","grid-template-columns":"1fr 1fr"}},K={style:{display:"grid","grid-template-columns":"1fr 1fr"}},L={style:{display:"grid","grid-template-columns":"1fr 1fr"}},X={style:{display:"grid","grid-template-columns":"1fr 1fr"}},Y={style:{display:"grid","grid-template-columns":"1fr 1fr"}},j={style:{"white-space":"pre-wrap"}},q={style:{display:"grid","grid-template-columns":"1fr 1fr"}},G={style:{display:"grid","grid-template-columns":"1fr 1fr"}},H={style:{display:"grid","grid-template-columns":"1fr 1fr"}},O={style:{display:"grid","grid-template-columns":"1fr 1fr"}},Z={style:{display:"grid","grid-template-columns":"1fr 1fr"}},h={style:{display:"grid","grid-template-columns":"1fr 1fr"}},c={style:{display:"grid","grid-template-columns":"1fr 1fr"}},ll={style:{display:"grid","grid-template-columns":"1fr 1fr"}},ul={style:{display:"grid","grid-template-columns":"1fr 1fr"}},il={key:3},ml=E({name:"WeaponPage",__name:"WeaponPage",setup(tl){const F=C();let v=D(F.params.id);S(async s=>{v.value=s.params.id});const i=p(()=>a.getWeaponById(v.value)),y=p(()=>{var s,u;return a.getShipsByIds((u=(s=i.value)==null?void 0:s.shipIds)!=null?u:[])}),f=p(()=>{var s,u;return a.getShipsByIds((u=(s=i.value)==null?void 0:s.variantIds)!=null?u:[])});return(s,u)=>(d(),b(B,null,{default:P(()=>[i.value===void 0?(d(),e("h2",w,"ShipSystem id:"+t(m(v))+" not found.",1)):(d(),e(r,{key:1},[l("h4",null,t(i.value.name),1),l("div",I,[l("span",R,t(i.value.description),1),n(k,{weapon:i.value},null,8,["weapon"])]),u[26]||(u[26]=l("br",null,null,-1)),u[27]||(u[27]=l("br",null,null,-1)),l("div",$,[l("div",N,[u[0]||(u[0]=l("div",null,"\u6218\u672F\u5E94\u7528",-1)),l("div",null,t(i.value.primaryRoleStr),1)]),l("div",z,[u[1]||(u[1]=l("div",null,"\u5B89\u88C5\u7C7B\u578B",-1)),l("div",null,t(`${i.value.size}, ${i.value.mountType}`),1)]),l("div",M,[u[2]||(u[2]=l("div",null,"\u90E8\u7F72\u70B9",-1)),l("div",null,t(i.value.ordnancePoint),1)]),l("div",T,[u[3]||(u[3]=l("div",null,"\u5C04\u7A0B",-1)),l("div",null,t(i.value.maxRange),1)]),l("div",_,[u[4]||(u[4]=l("div",null,"\u4F24\u5BB3",-1)),l("div",null,t(i.value.damagePerShot)+t(i.value.burstSize>1?" x "+i.value.burstSize:""),1)]),l("div",Q,[u[5]||(u[5]=l("div",null,"\u4F24\u5BB3/\u79D2",-1)),l("div",null,t(i.value.dps),1)]),l("div",V,[u[6]||(u[6]=l("div",null,"(\u6301\u7EED)\u4F24\u5BB3/\u79D2",-1)),l("div",null,t(i.value.sustainedDps),1)]),l("div",W,[u[7]||(u[7]=l("div",null,"EMP\u4F24\u5BB3",-1)),l("div",null,t(i.value.empPerShot),1)]),l("div",U,[u[8]||(u[8]=l("div",null,"EMP\u4F24\u5BB3\u6BCF\u79D2",-1)),l("div",null,t(i.value.empPerSecond),1)]),l("div",J,[u[9]||(u[9]=l("div",null,"\u5E45\u80FD\u6BCF\u79D2",-1)),l("div",null,t(i.value.fluxPerSecond),1)]),l("div",K,[u[10]||(u[10]=l("div",null,"\u6301\u7EED\u5E45\u80FD\u6BCF\u79D2",-1)),l("div",null,t(i.value.sustainedFluxPerSecond),1)]),l("div",L,[u[11]||(u[11]=l("div",null,"\u5E45\u80FD/non-EMP\u4F24\u5BB3",-1)),l("div",null,t(i.value.fluxPerDamage),1)]),l("div",X,[u[12]||(u[12]=l("div",null,"\u63CF\u8FF0",-1)),l("div",null,t(i.value.customPrimary),1)]),l("div",Y,[u[13]||(u[13]=l("div",null,"\u4F24\u5BB3\u7C7B\u578B",-1)),l("div",j,t(i.value.damageType.displayName+`
`+i.value.damageType.description),1)]),l("div",q,[u[14]||(u[14]=l("div",null,"\u5BFC\u5F39\u98DE\u884C\u901F\u5EA6",-1)),l("div",null,t(i.value.speedStr),1)]),l("div",G,[u[15]||(u[15]=l("div",null,"\u5BFC\u5F39\u8FFD\u8E2A\u6027\u80FD",-1)),l("div",null,t(i.value.trackingStr),1)]),l("div",H,[u[16]||(u[16]=l("div",null,"\u6B66\u5668\u7CBE\u51C6\u5EA6",-1)),l("div",null,t(i.value.accuracyStr),1)]),l("div",O,[u[17]||(u[17]=l("div",null,"\u6B66\u5668\u8F6C\u5411\u901F\u5EA6",-1)),l("div",null,t(i.value.turnRateStr),1)]),l("div",Z,[u[18]||(u[18]=l("div",null,"\u6700\u5927\u5145\u80FD\u6570/\u6700\u5927\u5907\u5F39\u6570",-1)),l("div",null,t(i.value.maxAmmo),1)]),l("div",h,[u[19]||(u[19]=l("div",null,"\u5145\u80FD\u65F6\u95F4/\u88C5\u5F39\u65F6\u95F4",-1)),l("div",null,t(i.value.reloadTime),1)]),l("div",c,[u[20]||(u[20]=l("div",null,"\u6BCF\u6B21\u5145\u80FD\u6570/\u6BCF\u6B21\u88C5\u5F39\u6570",-1)),l("div",null,t(i.value.reloadSize),1)]),l("div",ll,[u[21]||(u[21]=l("div",null,"\u6B66\u5668\u5F00\u706B\u95F4\u9694",-1)),l("div",null,t(i.value.reFireDelay),1)]),l("div",ul,[u[22]||(u[22]=l("div",null,"\u63CF\u8FF0",-1)),l("div",null,t(i.value.customAncillary),1)])]),u[28]||(u[28]=l("br",null,null,-1)),u[29]||(u[29]=l("br",null,null,-1)),y.value.length>0?(d(),e(r,{key:0},[u[23]||(u[23]=l("h4",null,"\u88AB\u7528\u4E8E\u8230\u8239\u8239\u4F53",-1)),n(g,{ships:y.value},null,8,["ships"])],64)):o("",!0),u[30]||(u[30]=l("br",null,null,-1)),u[31]||(u[31]=l("br",null,null,-1)),f.value.length>0?(d(),e(r,{key:1},[u[24]||(u[24]=l("h4",null,"\u88AB\u7528\u4E8E\u8230\u8239\u88C5\u914D",-1)),n(g,{ships:f.value},null,8,["ships"])],64)):o("",!0),u[32]||(u[32]=l("br",null,null,-1)),u[33]||(u[33]=l("br",null,null,-1)),i.value.factions.length>0?(d(),e(r,{key:2},[u[25]||(u[25]=l("h4",null,"\u62E5\u6709\u52BF\u529B",-1)),n(A,{"faction-values":i.value.factions},null,8,["faction-values"])],64)):o("",!0),u[34]||(u[34]=l("br",null,null,-1)),u[35]||(u[35]=l("br",null,null,-1)),m(a).debug?(d(),e("pre",il,[l("code",null,t(m(x)(i.value)),1)])):o("",!0)],64))]),_:1}))}});export{ml as default};