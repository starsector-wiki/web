import{Q}from"./QPage.b5406e9c.js";import{I,K as s,V as o,Q as t,R as a,S as $,$ as A,_ as f,X as D,U as z,a as b,W as P,N as i,a0 as J,r as K,a1 as X,J as Y,L as x,M as k,O as E,a2 as j}from"./index.394238f6.js";import{_ as W}from"./ShipsDiv.03f1f1a5.js";import{_ as q}from"./WeaponSpriteDiv.c8596763.js";import"./render.6132ba5f.js";import"./QBtn.e698b1fd.js";function U(S){return parseFloat(S.toFixed(2))}const n=I({name:"MutableStatDiv",__name:"MutableStatDiv",props:{stat:{},addIsGood:{type:Boolean,default:!0}},setup(S){return(p,C)=>(s(),o(D,null,[t("span",null,a($(U)(p.stat.modifiedValue)),1),p.stat.hasModify()?(s(),o("span",{key:0,style:A({color:p.addIsGood&&p.stat.isPositive()||!p.addIsGood&&p.stat.isNegative()?"green":"red"})},"("+a((p.stat.isPositive()?"+":"")+$(U)(p.stat.getAddend()))+")",5)):f("",!0)],64))}}),H={style:{margin:"auto",position:"relative"}},Z=["src"],O=I({name:"WeaponSpriteDiv",__name:"ShipSpriteDiv",props:{ship:{}},setup(S){const p=z(),C=b(()=>{if(S.ship){const y=[];for(const[u,h]of S.ship.weaponIdMap.entries())if(h){const d=p.getWeaponById(h),v=S.ship.allWeaponSlots.find(r=>r.id===u);d&&v&&y.push([d,v])}return y.sort((u,h)=>{const d=u[1].location,v=h[1].location;return d.x!==v.x?Math.abs(d.x)-Math.abs(v.x):Math.abs(d.y)-Math.abs(v.y)})}else return});return(y,u)=>(s(),o("div",H,[(s(!0),o(D,null,P(C.value,([h,d],v)=>(s(),o("div",{key:d.id,style:A({position:"absolute",zIndex:700+v,bottom:y.ship.center.y+"px",left:y.ship.center.x+"px",transformOrigin:`50% ${d.hardPoint?75:50}%`,transform:`translate(-50%, ${d.hardPoint?25:50}%) translate(${d.location.y*-1}px, ${d.location.x*-1}px) rotate(${360-d.angle}deg)`})},[i(q,{weapon:h,"is-hard-point":d.hardPoint},null,8,["weapon","is-hard-point"])],4))),128)),t("img",{decoding:"async",src:y.ship.sprite},null,8,Z)]))}});const c={key:0},tt={style:{display:"grid","grid-template-columns":"3fr 1fr",gap:"10px"}},lt={style:{"text-align":"left","vertical-align":"top","white-space":"pre-wrap"}},ut={style:{margin:"auto",position:"relative"}},et={style:{"text-align":"right"}},st={style:{"text-align":"right"}},nt={style:{"text-align":"right"}},it={style:{"text-align":"right"}},at={style:{"text-align":"right"}},ot={style:{"text-align":"right"}},dt={style:{"text-align":"right"}},rt={style:{"text-align":"right"}},pt={style:{"text-align":"right"}},gt={style:{"text-align":"right"}},yt={style:{"text-align":"right"}},vt={style:{"text-align":"right"}},mt={style:{"text-align":"right"}},xt={style:{"text-align":"right"}},ft={style:{"text-align":"right"}},ht={style:{"text-align":"right"}},Ft={style:{"text-align":"right"}},Dt={style:{"text-align":"right"}},St={style:{"text-align":"right"}},Bt={style:{"text-align":"right"}},Ct={style:{"text-align":"right"}},Et={style:{"text-align":"right"}},kt={style:{"text-align":"right"}},bt={style:{"text-align":"right"}},Pt={colspan:"5"},$t={key:0},It={colspan:"5",style:{"white-space":"pre-wrap"}},At={colspan:"5"},_t={key:1},Mt={colspan:"5",style:{"white-space":"pre-wrap"}},wt={colspan:"5"},Rt={colspan:"5"},Lt={key:1},Nt={colspan:"5"},Tt={key:1},Qt=I({name:"ShipPage",__name:"ShipPage",setup(S){const p=J();let C=K(p.params.id);X(async r=>{C.value=r.params.id});const y=z(),u=b(()=>y.getShipById(C.value)),h=b(()=>{var r,l;return y.getShipsByIds((l=(r=u.value)==null?void 0:r.skinIds)!=null?l:[])}),d=b(()=>{var r,l;return y.getShipsByIds((l=(r=u.value)==null?void 0:r.varinatIds)!=null?l:[])}),v=b(()=>{if(u.value&&u.value.station){const r=[];for(const[l,m]of u.value.moduleIdMap.entries())if(m){const F=y.getShipById(m),B=u.value.allWeaponSlots.find(e=>e.id===l);F&&B&&r.push([F,B])}return r.sort((l,m)=>{const F=l[0],B=m[0];if(F.isEmptyModule()!==B.isEmptyModule())return F.isEmptyModule()?-1:1;const e=l[1].location,g=m[1].location;return e.x!==g.x?Math.abs(g.x)-Math.abs(e.x):Math.abs(g.y)-Math.abs(e.y)})}else return[]});return(r,l)=>{const m=Y("router-link");return s(),x(Q,{padding:""},{default:k(()=>{var F,B;return[u.value===void 0?(s(),o("h2",c,"Ship id:"+a($(C))+" not found.",1)):(s(),o(D,{key:1},[t("h4",null,a(u.value.getDisplayName()),1),t("div",tt,[t("span",lt,a(u.value.description),1),t("div",ut,[(s(!0),o(D,null,P(v.value,([e,g],G)=>{var _,M,w,R,L,N,T,V;return s(),o("div",{key:g.id,style:A({position:"absolute",bottom:u.value.center.y+"px",left:u.value.center.x+"px",transformOrigin:`calc(${e.center.x}px - ${(M=(_=e.moduleAnchor)==null?void 0:_.y)!=null?M:0}px) calc(100% - ${e.center.y}px - ${(R=(w=e.moduleAnchor)==null?void 0:w.x)!=null?R:0}px)`,transform:`translate(${e.center.x*-1}px, ${e.center.y}px) translate(${(N=(L=e.moduleAnchor)==null?void 0:L.y)!=null?N:0}px, ${(V=(T=e.moduleAnchor)==null?void 0:T.x)!=null?V:0}px) translate(${g.location.y*-1}px, ${g.location.x*-1}px) rotate(${g.angle===0?0:360-g.angle}deg)`,zIndex:e.isUnderParent()?-1:500+G})},[i(O,{ship:e},null,8,["ship"])],4)}),128)),i(O,{ship:u.value},null,8,["ship"])])]),l[46]||(l[46]=t("br",null,null,-1)),l[47]||(l[47]=t("br",null,null,-1)),t("table",null,[l[42]||(l[42]=t("colgroup",null,[t("col",{style:{width:"21%"}}),t("col",{style:{width:"13%"}}),t("col",{style:{width:"20%"}}),t("col",{style:{width:"13%"}}),t("col",{style:{width:"20%"}}),t("col",{style:{width:"13%"}})],-1)),l[43]||(l[43]=t("thead",null,[t("tr",null,[t("th",{colspan:"4",style:{"text-align":"center"}},"\u540E\u52E4\u6570\u636E"),t("th",{colspan:"2",style:{"text-align":"center"}},"\u6218\u6597\u6027\u80FD")])],-1)),t("tbody",null,[t("tr",null,[l[0]||(l[0]=t("td",null,"\u4F5C\u6218\u540E\u6D88\u8017\u7684\u6218\u5907\u503C(CR)",-1)),t("td",et,a(u.value.crToDeploy)+"%",1),l[1]||(l[1]=t("td",null,"\u7EF4\u62A4\u6D88\u8017(\u8865\u7ED9/\u6708)",-1)),t("td",st,[i(n,{stat:u.value.suppliesPerMonth,"add-is-good":!1},null,8,["stat"])]),l[2]||(l[2]=t("td",null,"\u7ED3\u6784\u503C",-1)),t("td",nt,[i(n,{stat:u.value.hitPoints},null,8,["stat"])])]),t("tr",null,[l[4]||(l[4]=t("td",null,"\u6218\u5907\u503C(CR)\u6062\u590D\u901F\u7387(\u6BCF\u5929)",-1)),t("td",it,[i(n,{stat:u.value.repairPercentPerDay},null,8,["stat"]),l[3]||(l[3]=E("% "))]),l[5]||(l[5]=t("td",null,"\u8F7D\u8D27\u91CF",-1)),t("td",at,[i(n,{stat:u.value.cargo},null,8,["stat"])]),l[6]||(l[6]=t("td",null,"\u88C5\u7532\u503C",-1)),t("td",ot,[i(n,{stat:u.value.armorRating},null,8,["stat"])])]),t("tr",null,[l[7]||(l[7]=t("td",null,"\u90E8\u7F72\u6210\u672C(\u8865\u7ED9)",-1)),t("td",dt,[i(n,{stat:u.value.suppliesToRecover,"add-is-good":!1},null,8,["stat"])]),l[8]||(l[8]=t("td",null,"\u6700\u5927\u8F7D\u5458",-1)),t("td",rt,[i(n,{stat:u.value.maxCrew},null,8,["stat"])]),l[9]||(l[9]=t("td",null,"\u9632\u5FA1\u65B9\u5F0F",-1)),t("td",pt,a($(j).get(u.value.shieldType)),1)]),t("tr",null,[l[10]||(l[10]=t("td",null,"\u90E8\u7F72\u70B9",-1)),t("td",gt,[i(n,{stat:u.value.suppliesToRecover,"add-is-good":!1},null,8,["stat"])]),l[11]||(l[11]=t("td",null,"\u5FC5\u8981\u8239\u5458",-1)),t("td",yt,[i(n,{stat:u.value.minCrew,"add-is-good":!1},null,8,["stat"])]),t("td",null,a(u.value.hasShield()?"\u62A4\u76FE\u89D2\u5EA6":u.value.hasPhase()?"\u76F8\u4F4D\u7EBF\u5708\u6FC0\u6D3B":""),1),t("td",vt,[u.value.hasShield()?(s(),x(n,{key:0,stat:u.value.shieldArc},null,8,["stat"])):u.value.hasPhase()?(s(),x(n,{key:1,stat:u.value.phaseCost,"add-is-good":!1},null,8,["stat"])):f("",!0)])]),t("tr",null,[l[12]||(l[12]=t("td",null,"\u5CF0\u503C\u65F6\u95F4(\u79D2)",-1)),t("td",mt,[i(n,{stat:u.value.noCRLossSeconds},null,8,["stat"])]),l[13]||(l[13]=t("td",null,"\u71C3\u6599\u5BB9\u91CF",-1)),t("td",xt,[i(n,{stat:u.value.fuel},null,8,["stat"])]),t("td",null,a(u.value.hasShield()?"\u62A4\u76FE\u7EF4\u6301(\u5E45\u80FD/\u79D2)":u.value.hasPhase()?"\u76F8\u4F4D\u7EBF\u5708\u7EF4\u6301(\u5E45\u80FD/\u79D2)":""),1),t("td",ft,[u.value.hasShield()?(s(),x(n,{key:0,stat:u.value.shieldUpkeep,"add-is-good":!1},null,8,["stat"])):u.value.hasPhase()?(s(),x(n,{key:1,stat:u.value.phaseUpKeep,"add-is-good":!1},null,8,["stat"])):f("",!0)])]),t("tr",null,[l[14]||(l[14]=t("td",null,null,-1)),l[15]||(l[15]=t("td",{style:{"text-align":"right"}},null,-1)),l[16]||(l[16]=t("td",null,"\u6700\u5927\u5B87\u5B99\u822A\u901F",-1)),t("td",ht,[i(n,{stat:u.value.maxBurn},null,8,["stat"])]),t("td",null,a(u.value.hasShield()?"\u62A4\u76FE\u6548\u7387(\u5E45\u80FD/\u4F24\u5BB3)":""),1),t("td",Ft,[u.value.hasShield()?(s(),x(n,{key:0,stat:u.value.fluxPerDamageAbsorbed,"add-is-good":!1},null,8,["stat"])):f("",!0)])]),t("tr",null,[l[17]||(l[17]=t("td",null,null,-1)),l[18]||(l[18]=t("td",{style:{"text-align":"right"}},null,-1)),l[19]||(l[19]=t("td",null,"\u71C3\u6599\u6D88\u8017(\u5149\u5E74)",-1)),t("td",Dt,[i(n,{stat:u.value.fuelPerLY,"add-is-good":!1},null,8,["stat"])]),l[20]||(l[20]=t("td",null,"\u5E45\u80FD\u5BB9\u91CF",-1)),t("td",St,[i(n,{stat:u.value.fluxCapacity},null,8,["stat"])])]),t("tr",null,[l[21]||(l[21]=t("td",null,null,-1)),l[22]||(l[22]=t("td",{style:{"text-align":"right"}},null,-1)),l[23]||(l[23]=t("td",null,null,-1)),l[24]||(l[24]=t("td",{style:{"text-align":"right"}},null,-1)),l[25]||(l[25]=t("td",null,"\u5E45\u80FD\u8017\u6563",-1)),t("td",Bt,[i(n,{stat:u.value.fluxDissipation},null,8,["stat"])])]),t("tr",null,[l[26]||(l[26]=t("td",null,"\u88C5\u914D\u70B9\u6570",-1)),t("td",Ct,a(u.value.ordnancePoints),1),l[27]||(l[27]=t("td",null,"\u88AB\u4FA6\u5BDF\u8303\u56F4",-1)),t("td",Et,[i(n,{stat:u.value.sensorProfile,"add-is-good":!1},null,8,["stat"])]),l[28]||(l[28]=t("td",null,"\u6700\u9AD8\u822A\u901F",-1)),t("td",kt,[i(n,{stat:u.value.maxSpeed},null,8,["stat"])])]),t("tr",null,[l[29]||(l[29]=t("td",null,null,-1)),l[30]||(l[30]=t("td",null,null,-1)),l[31]||(l[31]=t("td",null,"\u63A2\u6D4B\u8303\u56F4",-1)),t("td",bt,[i(n,{stat:u.value.sensorStrength},null,8,["stat"])]),l[32]||(l[32]=t("td",null,null,-1)),l[33]||(l[33]=t("td",{style:{"text-align":"right"}},null,-1))]),t("tr",null,[l[34]||(l[34]=t("td",null,"\u6218\u672F\u7CFB\u7EDF",-1)),t("td",Pt,[u.value.getSystem()?(s(),x(m,{key:0,to:{name:"ship_system",params:{id:(F=u.value)==null?void 0:F.shipSystemId}}},{default:k(()=>{var e;return[E(a((e=u.value.getSystem())==null?void 0:e.name),1)]}),_:1},8,["to"])):f("",!0)]),l[35]||(l[35]=t("td",null,null,-1))]),u.value.hasSystem()?(s(),o("tr",$t,[l[36]||(l[36]=t("td",null,null,-1)),t("td",It,a(u.value.getSystemDescription()),1)])):f("",!0),t("tr",null,[l[37]||(l[37]=t("td",null,"\u7279\u6B8A\u7CFB\u7EDF",-1)),t("td",At,[u.value.getDefense()?(s(),x(m,{key:0,to:{name:"ship_system",params:{id:(B=u.value)==null?void 0:B.shipDefenseId}}},{default:k(()=>{var e,g;return[E(a((g=(e=u.value.getDefense())==null?void 0:e.name)!=null?g:"\u65E0"),1)]}),_:1},8,["to"])):f("",!0)])]),u.value.hasDefense()?(s(),o("tr",_t,[l[38]||(l[38]=t("td",null,null,-1)),t("td",Mt,a(u.value.getDefenseDescription()),1)])):f("",!0),t("tr",null,[l[39]||(l[39]=t("td",null,"\u5B89\u88C5\u69FD\u4F4D:",-1)),t("td",wt,a(u.value.getSlotDescription()),1)]),t("tr",null,[l[40]||(l[40]=t("td",null,"\u519B\u5907\u8BE6\u60C5:",-1)),t("td",Rt,[(s(!0),o(D,null,P(u.value.getWeapons(),e=>(s(),o("span",{style:{"margin-right":"10px"},key:e.id},[E(a(e.count)+"x ",1),e.id!=e.name?(s(),x(m,{key:0,to:{name:"weapon",params:{id:e.id}}},{default:k(()=>[E(a(e.name),1)]),_:2},1032,["to"])):(s(),o("span",Lt,a(e.name),1))]))),128))])]),t("tr",null,[l[41]||(l[41]=t("td",null,"\u8239\u4F53\u63D2\u69FD:",-1)),t("td",Nt,[(s(!0),o(D,null,P(u.value.getShipMods(),e=>(s(),o("span",{style:{"margin-right":"10px"},key:e.id},[e.id!=e.name?(s(),x(m,{key:0,to:{name:"ship_mod",params:{id:e.id}}},{default:k(()=>[E(a(e.name),1)]),_:2},1032,["to"])):(s(),o("span",Tt,a(e.name),1))]))),128))])])])]),l[48]||(l[48]=t("br",null,null,-1)),l[49]||(l[49]=t("br",null,null,-1)),h.value.length>0?(s(),o(D,{key:0},[l[44]||(l[44]=t("h4",null,"\u53D8\u4F53\u8239",-1)),i(W,{ships:h.value},null,8,["ships"])],64)):f("",!0),d.value.length>0?(s(),o(D,{key:1},[l[45]||(l[45]=t("h4",null,"\u88C5\u914D",-1)),i(W,{ships:d.value},null,8,["ships"])],64)):f("",!0),l[50]||(l[50]=t("br",null,null,-1)),l[51]||(l[51]=t("br",null,null,-1)),t("pre",null,[t("code",null,a(JSON.stringify(u.value,null,2)),1)])],64))]}),_:1})}}});export{Qt as default};