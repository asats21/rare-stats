(this["webpackJsonprare-stats"]=this["webpackJsonprare-stats"]||[]).push([[0],{14:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),r=a(4),o=a.n(r),c=(a(14),a(15),a(1)),s=(a(16),a(17),a(2));const i=[["uncommon","2009"],["uncommon","jan2009"],["uncommon","alpha","paliblock"],["uncommon","alpha","epoch0"],["uncommon","alpha","epoch1"],["uncommon","alpha","epoch2"],["uncommon","alpha","epoch3"],["uncommon","alpha","epoch4"],["black_uncommon","2009"],["black_uncommon","jan2009"],["black_uncommon","omega","paliblock"],["pizza","alpha"],["pizza","omega"],["pizza","uncommon"],["pizza","palindrome","2009"],["pizza","palindrome","sequence_palindrome"],["pizza","palindrome","paliblock"],["pizza","palindrome","uniform_palinception"],["pizza","palindrome","uniform_palinception","paliblock"],["jpeg","alpha"],["jpeg","omega"],["jpeg","uncommon"],["jpeg","palindrome"],["jpeg","palindrome","uniform_palinception"],["hitman","alpha"],["hitman","omega"],["hitman","palindrome"],["silkroad","alpha"],["silkroad","omega"],["silkroad","palindrome"],["nakamoto","palindrome"],["nakamoto","alpha"],["nakamoto","omega"],["vintage","alpha"],["vintage","omega"],["vintage","palindrome"],["vintage","palindrome","paliblock"],["vintage","palindrome","3_digits"],["vintage","palindrome","2_digits"],["block_78","alpha"],["block_78","omega"],["block_78","palindrome"],["block_78","palindrome","2_digits"],["block_78","palindrome","3_digits"],["block_78","uniform_palinception"],["block_78","perfect_palinception"],["palindrome","1_digit"],["palindrome","2_digits"],["palindrome","3_digits"],["palindrome","3_digits","epoch1"],["palindrome","3_digits","epoch2"],["palindrome","3_digits","epoch3"],["palindrome","3_digits","epoch4"],["uniform_palinception"],["uniform_palinception","2_digits"],["uniform_palinception","3_digits"],["uniform_palinception","paliblock","palindrome"],["uniform_palinception","paliblock","3_digits"],["uniform_palinception","paliblock","2_digits"],["uniform_palinception","sequence_palindrome"],["uniform_palinception","paliblock","3_digits","sequence_palindrome"],["perfect_palinception"],["perfect_palinception","paliblock"],["perfect_palinception","2_digits"],["perfect_palinception","3_digits"],["perfect_palinception","paliblock","3_digits"],["perfect_palinception","epoch1"],["perfect_palinception","epoch2"],["perfect_palinception","epoch3"],["perfect_palinception","epoch4"],["perfect_palinception","sequence_palindrome"],["450x","palindrome"],["block_9","palindrome"],["block_9","alpha"],["block_286","palindrome"],["block_286","alpha"],["rodarmor"],["rodarmor","2009"],["legacy"]],m=(e,t,a,l,n)=>{const r=2.1*Math.pow(10,15),o=Math.log(r),c=Math.log(e),s=Math.log(t),i=(a+l)/2,m=i>1?i:1,d=c/o,p=Math.log(m)/s,u=1-n/l>0?1-n/l:.01,h=1-d,g=1-p,E=1-u,b=1e3*(1-d*p*u);return{score:b,power_transformed_score:1e3*Math.pow(b/1e3,1.5),Sc:d,AFc:p,Hc:u,Sci:h,AFci:g,Hci:E}};var d=e=>{let{showSettings:t,settings:a,handlers:l}=e;return t?n.a.createElement("div",{className:"settings-menu",style:{position:"absolute",top:"30px",right:"0",background:"#333",color:"#fff",border:"1px solid #555",borderRadius:"5px",padding:"10px",zIndex:10,minWidth:"200px"}},Object.keys(a).map(e=>n.a.createElement("label",{key:e,className:"d-flex align-items-center mb-1"},n.a.createElement("input",{type:"checkbox",checked:a[e],onChange:l[e],className:"me-2"}),e.replace(/([A-Z])/g," $1").trim()))):null};var p=()=>n.a.createElement("footer",{className:"mt-5 text-center text-muted"},n.a.createElement("p",null,n.a.createElement("small",null,"This project was made possible through the hard work and dedication of",n.a.createElement("a",{href:"https://x.com/sat_stats",target:"_blank",rel:"noopener noreferrer"}," @sat_stats "),". Please give him a follow on X.")),n.a.createElement("p",null,n.a.createElement("small",{style:{fontSize:"0.7rem",opacity:"0.7"}},n.a.createElement("strong",null,"Disclaimer:"),"This page uses data provided by the API at ",n.a.createElement("a",{href:"https://api.deezy.io",target:"_blank",rel:"noopener noreferrer"},"https://api.deezy.io"),'. The data is provided "as is," and the creator of this page does not profit from its use.',n.a.createElement("span",null,"This is not financial advice. Use the data at your own risk."))),n.a.createElement("div",{className:"mb-3 d-flex justify-content-center gap-2"},n.a.createElement("a",{href:"https://asats21.github.io/collectors-vault/",target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"}},n.a.createElement("button",{style:{border:"2px solid #E89A02"},className:"nav-button-footer rarity"},"Collector's Vault")),n.a.createElement("a",{href:"https://asats21.github.io/rare-sats-lab",target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"}},n.a.createElement("button",{style:{border:"2px solid #06D6A0"},className:"nav-button-footer rare-sats-lab"},"Rare Sats Lab"))));var u=e=>{let{darkMode:t,setShowSatScore:a,showSatScore:l}=e;return n.a.createElement("div",null,n.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"10px"}},n.a.createElement("h3",{className:t?"text-light":"text-dark",style:{margin:0}},"What is the Sat Score?"),n.a.createElement("label",{className:"switch-container",style:{display:"flex",alignItems:"center",gap:"5px"}},n.a.createElement("span",{className:t?"text-light":"text-dark",style:{fontSize:"1rem"}},l?"Hide":"Show"),n.a.createElement("label",{className:"switch"},n.a.createElement("input",{type:"checkbox",checked:l,onChange:()=>a(e=>!e)}),n.a.createElement("span",{className:"slider"})))),l&&n.a.createElement("div",{className:"mt-3"},n.a.createElement("p",null,"The ",n.a.createElement("strong",null,"Sat score")," is a unique metric (developed by AI) that provides a numerical representation of the relative rarity of a given sat. It is calculated using:"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("strong",null,"Smax")," - The total number of sats in existence (2.1 quadrillion)."),n.a.createElement("li",null,n.a.createElement("strong",null,"S (n_total)")," - The total number of selected sats."),n.a.createElement("li",null,n.a.createElement("strong",null,"M (n_mined)")," - The number of mined sats."),n.a.createElement("li",null,n.a.createElement("strong",null,"A (n_365)")," - The number of sats active over the past 365 days."),n.a.createElement("li",null,n.a.createElement("strong",null,"F (n_seq)")," - The number of sats that are found."),n.a.createElement("li",null,n.a.createElement("strong",null,"FH (n_seq_holders)")," - The number of holders of sats that are found.")),n.a.createElement("p",null,"Note that the Sat score is logarithmic, meaning the resulting scores cannot be directly compared. For example, a score of 800 is not twice as rare as 400; it is significantly rarer, but the relationship is not linear."),n.a.createElement("p",null,"Additionally, creating your own scores based on different factors or data points that are important to you is encouraged. Custom scores can provide a more tailored understanding of rarity in your specific context."),n.a.createElement("p",null,n.a.createElement("strong",null,"Why is it useful?")),n.a.createElement("p",null,"The Sat score helps users quickly gauge the rarity and significance of specific sat without having to manually interpret large sets of numbers. By looking at the Sat score, you can get a clearer sense of how valuable or noteworthy an item might be, especially when comparing multiple items."),n.a.createElement("p",null,n.a.createElement("strong",null,"Formula:")),n.a.createElement("div",{style:{fontSize:"1.2rem",fontFamily:"Courier, monospace",lineHeight:"1.6"}},"PowerLaw(1000 \xd7 ( 1 -",n.a.createElement("span",{style:{display:"inline-flex",alignItems:"center"}},n.a.createElement("span",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",margin:"0 5px"}},n.a.createElement("div",null,"log(S)"),n.a.createElement("div",{style:{borderTop:"1px solid ".concat(t?"#ffffff":"#000000"),padding:"0 5px"}},"log(S",n.a.createElement("sub",null,"max"),")")),"\xd7",n.a.createElement("span",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",margin:"0 5px"}},n.a.createElement("div",null,"log(Avg(A,F))"),n.a.createElement("div",{style:{borderTop:"1px solid ".concat(t?"#ffffff":"#000000"),padding:"0 5px"}},"log(M)")),"\xd7",n.a.createElement("span",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",margin:"0 5px"}},n.a.createElement("div",null,"(1 - (FH / F))"))),"))"),n.a.createElement("p",null,n.a.createElement("strong",null,"Disclaimer:")," Please note that the Sat score is an ",n.a.createElement("strong",null,"arbitrary")," calculation based on the dataset, and its value can change as the data updates or as new factors are added to the formula. It is not a definitive or static measure of value but rather a tool to assist in understanding the relative importance of items within the dataset.")))};const h=["uncommon","rare","epic"],g=["black_uncommon","black_rare","black_epic"],E=["450x","block_9","jan2009","2009","vintage","block_78","block_286","block_666","nakamoto"],b=["palindrome","alpha","omega"],f=["pizza","jpeg","hitman","silkroad"],_=["1_digit","2_digits","3_digits","perfect_palinception","uniform_palinception","sequence_palindrome"],y=["paliblock","rodarmor","fibonacci","legacy"],x=["epoch0","epoch1","epoch2","epoch3","epoch4"];var v=()=>{var e,t,a;Object(l.useEffect)(()=>{document.title="Rare Sats: Supply and Circulation"},[]);const[r,o]=Object(l.useState)([]),[v,S]=Object(l.useState)([]),[k,w]=Object(l.useState)(null),[N,F]=Object(l.useState)(null),[j,I]=Object(l.useState)(null),[C,O]=Object(l.useState)(!1),[q,A]=Object(l.useState)(""),[z,M]=Object(l.useState)(!1),[T,H]=Object(l.useState)(""),[B,J]=Object(l.useState)(null),[R,D]=Object(l.useState)(""),W=r.includes("uncommon"),[L,U]=Object(l.useState)(!1),[P,Q]=Object(l.useState)(JSON.parse(localStorage.getItem("showTopHolders"))||!1),[Y,X]=Object(l.useState)(JSON.parse(localStorage.getItem("showTopHoldersFound"))||!1),[Z,$]=Object(l.useState)(JSON.parse(localStorage.getItem("showBlockNumberInput"))||!1),[V,G]=Object(l.useState)(null===(e=JSON.parse(localStorage.getItem("showFeelingLucky")))||void 0===e||e),[K,ee]=Object(l.useState)(JSON.parse(localStorage.getItem("showSatScoreComponents"))||!1),[te,ae]=Object(l.useState)(()=>{const e=localStorage.getItem("darkMode");return null===e||"true"===e}),[le,ne]=Object(l.useState)(()=>{const e=localStorage.getItem("showSatScore");return null===e||"true"===e}),[re,oe]=Object(l.useState)(()=>{const e=localStorage.getItem("showTooltips");return null===e||"true"===e}),[ce,se]=Object(l.useState)(()=>{const e=localStorage.getItem("showYearMined");return null===e||"true"===e}),[ie,me]=Object(l.useState)(JSON.parse(localStorage.getItem("devModeEnabled"))||!1),[de,pe]=Object(l.useState)(!1),[ue,he]=Object(l.useState)(!1);Object(l.useEffect)(()=>{te?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode"),localStorage.setItem("darkMode",te)},[te]),Object(l.useEffect)(()=>{localStorage.setItem("showSatScore",le)},[le]);const ge=e=>new Intl.NumberFormat("en-US").format(e),Ee=e=>{const t=e.target.value;if(t.startsWith("epoch")){const e=r.includes(t)?r.filter(e=>e!==t):[...r,t],a=e.filter(e=>e.startsWith("epoch"));for(let t=0;t<a.length-1;t++){const e=parseInt(a[t].replace("epoch",""));if(parseInt(a[t+1].replace("epoch",""))!==e+1)return void alert("You cannot skip epochs. Select them in order.")}o(e)}else o(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t])},be=Object(l.useCallback)(()=>{if(0===r.length)return void I("Please select at least one rarity.");const e=r.filter(e=>e.startsWith("epoch")),t=e.length>0?21e4*parseInt(e[0].replace("epoch","")):void 0,a=e.length>0?21e4*(parseInt(e[e.length-1].replace("epoch",""))+1):void 0,l=r.filter(e=>!e.startsWith("epoch")&&!e.startsWith("trailing")).join(",");let n="https://api.deezy.io/v1/sat-hunting/circulation?rarity=".concat(l);void 0!==t&&void 0!==a&&(n+="&block_start=".concat(t,"&block_end=").concat(a)),(P||Y)&&(n+="&include_top_holders=true"),W&&R&&(n+="&trailing_0s="+R),T&&(n+="&block="+T),B&&(n+="&year_mined=".concat(B)),O(!0),S([...r.filter(e=>!e.startsWith("trailing_0s")).filter(e=>!e.startsWith("blocknum_")),...W&&R?["trailing_0s_".concat(R)]:[],...T?["blocknum_".concat(T)]:[],...B?["mined_".concat(B)]:[]]),fetch(n).then(e=>e.json()).then(e=>{if(e.message){let t=e.message;t&&t.includes("could not fetch result")&&(t="Your request was not found in the API cache and has been added to the queue. Please try again in a few seconds."),I(t),w(null)}else{w(e.data),I(null);const t=m(e.data.n_total,e.data.n_mined,e.data.n_365,e.data.n_seq,e.data.n_seq_holders);if(e.data.n_total>0&&t.score){const a=[...r,...W&&R?["trailing_0s_".concat(R)]:[],...T?["blocknum_".concat(T)]:[],...B?["mined_".concat(B)]:[]].sort(),l={query:a,result:e.data,satScore:t},n=JSON.parse(localStorage.getItem("queries"))||[];n.some(e=>e.query.join(",")===a.join(","))||(n.push(l),localStorage.setItem("queries",JSON.stringify(n)))}}}).catch(e=>{console.error("Error fetching data:",e),I("An error occurred while fetching data."),w(null)}).finally(()=>{O(!1),F(n)})},[r,P,Y,W,R,T,B]);Object(l.useEffect)(()=>{z&&r.length>0&&(be(),M(!1))},[r,z,be]);const fe=(e,t,a)=>{const l={epoch0:"Jan 3, 2009 \u2013 Nov 28, 2012",epoch1:"Nov 28, 2012 \u2013 Jul 9, 2016",epoch2:"Jul 9, 2016 \u2013 May 11, 2020",epoch3:"May 11, 2020 \u2013 Apr 20, 2024",epoch4:"Apr 20, 2024 \u2013 Mar ??, 2028",pizza:"Pizza Sats were used in the iconic transaction of 10,000 BTC for two pizzas on May 22, 2010. This event marks the first recorded use of Bitcoin to purchase physical goods.",jpeg:"Jpeg Sats originate from what may be the first Bitcoin transaction involving an image, dated February 24, 2010.",hitman:"Hitman sats are tied to a controversial transaction allegedly made by Ross Ulbricht, the founder of the Silk Road marketplace, in an attempt to hire a hitman.",silkroad:"Silk Road sats were seized from the infamous marketplace and are part of the first Bitcoin auctioned off by the US Marshals on June 27, 2014.",rodarmor:"Rodarmor Names are sat names featured in the Ordinal Bounty 3, a challenge rewarding hunters for discovering sat names based on the Google Books Ngram dataset",legacy:"Legacy Sats are sats distributed in paper wallets during Casey Rodarmor's June 2022 Bitcoin workshop, months before the first Inscription.","450x":"The first Bitcoin from block 9"};return n.a.createElement("div",{style:{border:"2px solid ".concat(a),borderRadius:"10px",margin:"5px",padding:"10px",flex:"1 1 30%",minWidth:"200px"}},n.a.createElement("h5",{style:{color:"Black"===e&&te?"#FFFFFF":a,marginBottom:"5px"}},e),n.a.createElement("div",{className:"d-flex flex-wrap"},t.map(e=>n.a.createElement("div",{key:e,style:{marginRight:"10px",marginBottom:"5px",display:"flex",alignItems:"center"}},n.a.createElement("input",{type:"checkbox",id:e,value:e,checked:r.includes(e),onChange:Ee}),n.a.createElement("label",{htmlFor:e,style:{marginLeft:"5px"}},e),re&&l[e]&&n.a.createElement("div",{className:"info-icon-container d-none d-md-block"},n.a.createElement(s.b,{className:"info-icon"})," ",n.a.createElement("div",{className:"tooltip"},l[e])))),"Rodarmor Rarity"===e&&W&&n.a.createElement("div",{className:"trailing-zeroes-container"},n.a.createElement("label",{htmlFor:"trailingZeroes",className:"trailing-zeroes-input-label"},"Trailing Zeroes"),n.a.createElement("input",{className:"trailing-zeroes-input",type:"number",min:"1",max:"14",value:R,onChange:e=>{const t=e.target.value;(""===t||t>=1&&t<=14)&&D(t)},placeholder:"1-14",id:"trailingZeroes"})),"Other"===e&&Z&&n.a.createElement("div",{className:"block-input-container"},n.a.createElement("label",{htmlFor:"blockNumber",className:"block-input-label"},"Block Number"),n.a.createElement("input",{type:"number",id:"blockNumber",className:"block-input-field",placeholder:"Enter block number (0 - 1,000,000)",min:"0",max:"1000000",value:T,onChange:e=>H(e.target.value)}))),re&&"Halving epochs"===e&&n.a.createElement("div",{className:"d-block d-md-none mt-2",style:{fontSize:"0.9rem",color:te?"#FFFFFF":"#000000",background:te?"#2A2D34":"#F8F9FA",padding:"5px",borderRadius:"5px",border:"1px solid ".concat(a)}},Object.entries(l).filter(e=>{let[t]=e;return t.startsWith("epoch")}).map(e=>{let[t,a]=e;return n.a.createElement("p",{key:t,style:{margin:0}},n.a.createElement("strong",null,t,":")," ",a)})))},_e=()=>{const e=(e=>{const t=["query","n_total","n_mined","n_epoch","n_365","n_seq","n_inscribed","n_seq_holders","n_total_holders","updated_at","satScore"].join(";"),a=e.map(e=>[e.query.join(","),e.result.n_total,e.result.n_mined,e.result.n_epoch,e.result.n_365,e.result.n_seq,e.result.n_inscribed,e.result.n_seq_holders,e.result.n_total_holders,e.result.updated_at,e.satScore.power_transformed_score.toFixed(2)].join(";")).join("\n");return"".concat(t,"\n").concat(a)})(xe),t=new Blob([e],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a"),l=URL.createObjectURL(t);a.setAttribute("href",l),a.setAttribute("download","data.csv"),a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a)},ye=()=>n.a.createElement("div",{className:"text-center mt-3"},n.a.createElement("button",{className:"download-csv-button",onClick:_e},"Download CSV")),xe=(JSON.parse(localStorage.getItem("queries"))||[]).sort((e,t)=>t.satScore.score-e.satScore.score);return n.a.createElement("div",{className:"container mt-3 mt-md-4 ".concat(te?"dark-mode-container":"")},n.a.createElement("div",{className:"d-flex justify-content-between align-items-center mb-4",style:{position:"relative"}},n.a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},n.a.createElement("span",{className:te?"text-light":"text-dark",style:{fontWeight:"bold"}},te?"Switch To Light":"Switch To Dark"," Mode"),n.a.createElement("label",{className:"switch"},n.a.createElement("input",{type:"checkbox",checked:te,onChange:()=>{ae(e=>!e)}}),n.a.createElement("span",{className:"slider"}))),n.a.createElement("div",{className:"settings-icon",style:{display:"flex",justifyContent:"flex-end",alignItems:"center"}},n.a.createElement(s.a,{size:24,onClick:()=>{U(!L)},style:{cursor:"pointer",color:te?"#ffffff":"#333333",marginLeft:"10px"}}),n.a.createElement(d,{showSettings:L,settings:{showTopHolders:P,showTopHoldersFound:Y,showSatScoreComponents:K,showBlockNumberInput:Z,showFeelingLucky:V,showTooltips:re,showYearMined:ce,devModeEnabled:ie},handlers:{showTopHolders:e=>{const t=e.target.checked;Q(t),localStorage.setItem("showTopHolders",JSON.stringify(t))},showTopHoldersFound:e=>{const t=e.target.checked;X(t),localStorage.setItem("showTopHoldersFound",JSON.stringify(t))},showSatScoreComponents:e=>{const t=e.target.checked;ee(t),localStorage.setItem("showSatScoreComponents",JSON.stringify(t))},showBlockNumberInput:e=>{const t=e.target.checked;$(t),localStorage.setItem("showBlockNumberInput",JSON.stringify(t))},showFeelingLucky:e=>{const t=e.target.checked;G(t),localStorage.setItem("showFeelingLucky",JSON.stringify(t))},showTooltips:e=>{const t=e.target.checked;oe(t),localStorage.setItem("showTooltips",JSON.stringify(t))},showYearMined:e=>{const t=e.target.checked;se(t),localStorage.setItem("showYearMined",JSON.stringify(t))},devModeEnabled:e=>{const t=e.target.checked;me(t),localStorage.setItem("devModeEnabled",JSON.stringify(t))}}}))),n.a.createElement("h1",{className:"text-center mb-4 ".concat(te?"text-light":"text-dark")},"Select Categories"),n.a.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"5px"}},fe("Rodarmor Rarity",h,"#EF476F"),"          ",fe("Black",g,"#2A2D34"),"      ",fe("Other types",b,"#FFD166"),"        ",fe("Historical",E,"#118AB2")," ",fe("Events",f,"#06D6A0"),"    ",fe("Palindrome",_,"#8ECAE6")," ",fe("Other",y,"#9D4EDD"),"      ",fe("Halving epochs",x,"#FFB703")," ",ce&&n.a.createElement("div",{style:{border:te?"2px solid #fff":"2px solid #aaa",borderRadius:"10px",margin:"5px",padding:"10px",flex:"1 1 30%",minWidth:"200px"}},n.a.createElement("h5",{style:{color:te?"#fff":"#777",marginBottom:"5px"}},"Year mined"),n.a.createElement("div",{className:"d-flex flex-wrap"},[...Array(17)].map((e,t)=>{const a=2009+t;return n.a.createElement("div",{key:a,style:{marginRight:"10px",display:"flex",alignItems:"center"}},n.a.createElement("input",{type:"checkbox",id:"year-".concat(a),name:"year",value:a,checked:B===a.toString(),onChange:e=>{const t=e.target.checked?e.target.value:null;J(t)}}),n.a.createElement("label",{htmlFor:"year-".concat(a),style:{marginLeft:"5px"}},a))})))),n.a.createElement("div",{className:"text-center my-4"},n.a.createElement("button",{className:"query-button",onClick:be},"Query"),V&&n.a.createElement("button",{className:"feelin-lucky-button ms-2",onClick:()=>{const e=i[Math.floor(Math.random()*i.length)];o(e),M(!0)}},"Feelin' Lucky"),n.a.createElement("button",{className:"clear-button ms-2",onClick:()=>{o([]),J(null),w(null),I(null)}},"Clear")),C&&n.a.createElement("div",{className:"text-center"},n.a.createElement("div",{className:"spinner-border text-primary",role:"status"},n.a.createElement("span",{className:"visually-hidden"},"Loading..."))),j&&n.a.createElement("div",{className:"alert alert-danger"},n.a.createElement("strong",null,"Error:")," ",j),ie&&N&&n.a.createElement("div",{className:"alert alert-warning"},n.a.createElement("strong",null,"Last Query Url:")," ",N),k&&!C&&n.a.createElement("div",{className:"mt-4"},n.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}},n.a.createElement("h2",{className:"mb-0 ".concat(te?"text-light":"text-dark"),style:{flex:"1 0 auto"}},"Results"),n.a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"5px",flex:"0 0 auto"}},n.a.createElement("label",{className:te?"text-light":"text-dark",style:{fontSize:"1rem",fontWeight:"bold",whiteSpace:"nowrap"}},"Floor Price, $"),n.a.createElement("input",{type:"number",value:q,onChange:e=>A(e.target.value),placeholder:"Enter value",style:{width:"120px",padding:"5px",border:"1px solid #ccc",borderRadius:"5px",fontSize:"1rem"}}))),n.a.createElement("div",{className:"mb-3"},n.a.createElement("p",{className:te?"text-light":"text-dark",style:{fontSize:"1rem"}},v.length>0?v.join(", "):"None")),n.a.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"20px",justifyContent:"center"}},[{label:"Total",value:k.n_total},{label:"Mined",value:k.n_mined,percentage_mined:!0},{label:"Active Epoch",value:k.n_epoch,percentage:!0},{label:"Active 365 Days",value:k.n_365,percentage:!0},{label:"Found",value:k.n_seq,percentage:!0},{label:"Inscribed",value:k.n_inscribed,percentage:!0},{label:"Holders (Found)",value:k.n_seq_holders,noMC:!0},{label:"Holders (Total)",value:k.n_total_holders,noMC:!0},{label:"Updated At",value:new Date(k.updated_at).toLocaleDateString("en-US"),noMC:!0}].map((e,t)=>{const a="Updated At"===e.label?e.value:parseInt(e.value,10),l=q&&!e.noMC&&a>0?a*q:null,r=e.percentage&&k.n_mined>0?(e.value/k.n_mined*100).toFixed(1):null,o=e.percentage_mined&&k.n_total>0?(e.value/k.n_total*100).toFixed(1):null;return n.a.createElement("div",{key:t,style:{background:te?"#2A2D34":"#F8F9FA",color:te?"#FFFFFF":"#000000",border:te?"1px solid #444":"1px solid #ddd",borderRadius:"8px",padding:"15px",textAlign:"center",width:"calc(33.33% - 20px)",minWidth:"200px",boxShadow:te?"0 4px 6px rgba(0, 0, 0, 0.3)":"0 4px 6px rgba(0, 0, 0, 0.1)"}},n.a.createElement("h5",{style:{marginBottom:"10px",fontSize:"1rem",fontWeight:"bold"}},e.label),n.a.createElement("p",{style:{fontSize:"1.2rem",margin:0}},"Updated At"===e.label?a:ge(a),(r||o)&&n.a.createElement("span",{className:"percentage-text",style:{fontSize:"0.85rem",color:"gray",marginLeft:"4px"}},"(",ge(r||o),"%)"),l&&l>0&&n.a.createElement("span",{style:{display:"block",fontSize:"0.9rem",color:te?"#BBBBBB":"#666666"}},"(Market Cap $",ge(l),")")))}))),k&&!C&&n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"mt-5"},n.a.createElement("div",{className:"d-flex align-items-center justify-content-around mt-4"},n.a.createElement("div",null,n.a.createElement("h3",null,"Sat Score: ",m(k.n_total,k.n_mined,k.n_365,k.n_seq,k.n_seq_holders).power_transformed_score.toFixed(2))),n.a.createElement("div",{className:"d-flex"},n.a.createElement("div",{style:{margin:"0 10px",textAlign:"center"}},n.a.createElement(c.a,{value:100*m(k.n_total,k.n_mined,k.n_365,k.n_seq,k.n_seq_holders).Sci,text:"".concat((100*m(k.n_total,k.n_mined,k.n_365,k.n_seq,k.n_seq_holders).Sci).toFixed(0)," pt."),styles:Object(c.b)({textColor:"#EF476F",pathColor:"#EF476F",trailColor:"#d6d6d6"})}),n.a.createElement("p",{style:{marginTop:"10px",fontSize:"0.9rem"}},"Supply")),n.a.createElement("div",{style:{margin:"0 10px",textAlign:"center"}},n.a.createElement(c.a,{value:100*Math.pow(m(k.n_total,k.n_mined,k.n_365,k.n_seq,k.n_seq_holders).AFci,1/3),text:"".concat((100*Math.pow(m(k.n_total,k.n_mined,k.n_365,k.n_seq,k.n_seq_holders).AFci,1/3)).toFixed(0)," pt."),styles:Object(c.b)({textColor:"#06D6A0",pathColor:"#06D6A0",trailColor:"#d6d6d6"})}),n.a.createElement("p",{style:{marginTop:"10px",fontSize:"0.9rem"}},"Active+Found")),n.a.createElement("div",{style:{margin:"0 10px",textAlign:"center"}},n.a.createElement(c.a,{value:100*Math.pow(m(k.n_total,k.n_mined,k.n_365,k.n_seq,k.n_seq_holders).Hci,1/3),text:"".concat((100*Math.pow(m(k.n_total,k.n_mined,k.n_365,k.n_seq,k.n_seq_holders).Hci,1/3)).toFixed(0)," pt."),styles:Object(c.b)({textColor:"#118AB2",pathColor:"#118AB2",trailColor:"#d6d6d6"})}),n.a.createElement("p",{style:{marginTop:"10px",fontSize:"0.9rem"}},"Holders")))),n.a.createElement(u,{darkMode:te,setShowSatScore:ne,showSatScore:le}))),Y&&(null===k||void 0===k||null===(t=k.top_seq_holders)||void 0===t?void 0:t.length)>0&&n.a.createElement("div",{className:"my-4"},n.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"10px"}},n.a.createElement("h3",{className:te?"text-light":"text-dark",style:{margin:0}},"Top Holders (Found)"),n.a.createElement("label",{className:"switch-container",style:{display:"flex",alignItems:"center",gap:"5px"}},n.a.createElement("span",{className:te?"text-light":"text-dark",style:{fontSize:"1rem"}},ue?"Show":"Hide"),n.a.createElement("label",{className:"switch"},n.a.createElement("input",{type:"checkbox",checked:!ue,onChange:()=>he(e=>!e)}),n.a.createElement("span",{className:"slider"})))),!ue&&n.a.createElement("div",{style:{overflowX:"auto",width:"100%"},className:"mt-3"},n.a.createElement("table",{className:"table ".concat(te?"table-dark":"table-light"," table-striped"),style:{border:te?"1px solid #444":"1px solid #ddd",minWidth:"800px"}},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"#"),n.a.createElement("th",null,"Address"),n.a.createElement("th",null,"Quantity"),n.a.createElement("th",null,"Cumulative % (Fnd)"),n.a.createElement("th",null,"Cumulative %"),n.a.createElement("th",null,"Max Sent Height"),n.a.createElement("th",null,"Max Received Height"))),n.a.createElement("tbody",null,(()=>{let e=0,t=0;const a=k.n_seq,l=k.n_total;return k.top_seq_holders.map((r,o)=>{e+=r.n;const c=(e/a*100).toFixed(2);t+=r.n;const s=(t/l*100).toFixed(2);return n.a.createElement("tr",{key:o},n.a.createElement("td",null,o+1),n.a.createElement("td",null,r.address),n.a.createElement("td",null,r.n),n.a.createElement("td",null,c,"%")," ",n.a.createElement("td",null,s,"%")," ",n.a.createElement("td",null,r.max_send_height),n.a.createElement("td",null,r.max_receive_height))})})())))),P&&(null===k||void 0===k||null===(a=k.top_holders)||void 0===a?void 0:a.length)>0&&n.a.createElement("div",{className:"my-4"},n.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"10px"}},n.a.createElement("h3",{className:te?"text-light":"text-dark",style:{margin:0}},"Top Holders"),n.a.createElement("label",{className:"switch-container",style:{display:"flex",alignItems:"center",gap:"5px"}},n.a.createElement("span",{className:te?"text-light":"text-dark",style:{fontSize:"1rem"}},de?"Show":"Hide"),n.a.createElement("label",{className:"switch"},n.a.createElement("input",{type:"checkbox",checked:!de,onChange:()=>pe(e=>!e)}),n.a.createElement("span",{className:"slider"})))),n.a.createElement("div",{style:{overflowX:"auto",width:"100%"},className:"mt-3"},!de&&n.a.createElement("table",{className:"table ".concat(te?"table-dark":"table-light"," table-striped"),style:{border:te?"1px solid #444":"1px solid #ddd",minWidth:"800px"}},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"#"),n.a.createElement("th",null,"Address"),n.a.createElement("th",null,"Quantity"),n.a.createElement("th",null,"Cumulative %"),n.a.createElement("th",null,"Max Sent Height"),n.a.createElement("th",null,"Max Received Height"))),n.a.createElement("tbody",null,(()=>{let e=0;const t=k.n_total;return k.top_holders.map((a,l)=>{e+=a.n;const r=(e/t*100).toFixed(2);return n.a.createElement("tr",{key:l},n.a.createElement("td",null,l+1),n.a.createElement("td",null,a.address),n.a.createElement("td",null,a.n),n.a.createElement("td",null,r,"%")," ",n.a.createElement("td",null,a.max_send_height),n.a.createElement("td",null,a.max_receive_height))})})())))),n.a.createElement("div",{className:"mt-4"},n.a.createElement("h3",{className:te?"text-light":"text-dark"},"Query History"),n.a.createElement("div",{style:{overflowX:"auto",width:"100%"}},n.a.createElement("table",{className:"table ".concat(te?"table-dark":"table-light"," table-striped"),style:{border:te?"1px solid #444":"1px solid #ddd",minWidth:"800px"}},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Query"),n.a.createElement("th",null,"Supply"),n.a.createElement("th",null,"Mined"),n.a.createElement("th",null,"Actv",n.a.createElement("sub",null,"E")),n.a.createElement("th",null,"Actv",n.a.createElement("sub",null,"365")),n.a.createElement("th",null,"Found"),n.a.createElement("th",null,"H",n.a.createElement("sub",null,"fnd")),n.a.createElement("th",null,"H",n.a.createElement("sub",null,"ttl")),n.a.createElement("th",null,"%Actv",n.a.createElement("sub",null,"E")),n.a.createElement("th",null,"%Actv",n.a.createElement("sub",null,"365")),n.a.createElement("th",null,"%Fnd"),K&&n.a.createElement(n.a.Fragment,null,n.a.createElement("th",null,"S",n.a.createElement("sub",null,"ci")),n.a.createElement("th",null,"AF",n.a.createElement("sub",null,"ci")),n.a.createElement("th",null,"H",n.a.createElement("sub",null,"ci"))),n.a.createElement("th",null,"Score"))),n.a.createElement("tbody",null,xe.map((e,t)=>n.a.createElement("tr",{key:t},n.a.createElement("td",null,e.query.join(", ")),n.a.createElement("td",null,ge(e.result.n_total)),n.a.createElement("td",null,ge(e.result.n_mined)),n.a.createElement("td",null,ge(e.result.n_epoch)),n.a.createElement("td",null,ge(e.result.n_365)),n.a.createElement("td",null,ge(e.result.n_seq)),n.a.createElement("td",null,ge(e.result.n_seq_holders)),n.a.createElement("td",null,ge(e.result.n_total_holders)),n.a.createElement("td",null,(e.result.n_epoch/e.result.n_mined*100).toFixed(1),"%"),n.a.createElement("td",null,(e.result.n_365/e.result.n_mined*100).toFixed(1),"%"),n.a.createElement("td",null,(e.result.n_seq/e.result.n_mined*100).toFixed(1),"%"),K&&n.a.createElement(n.a.Fragment,null,n.a.createElement("td",null,e.satScore.Sci.toFixed(2)),n.a.createElement("td",null,e.satScore.AFci.toFixed(2)),n.a.createElement("td",null,e.satScore.Hci.toFixed(2))),n.a.createElement("td",null,e.satScore.power_transformed_score.toFixed(2))))))),xe.length>0&&n.a.createElement("div",{className:"text-center mt-3"},n.a.createElement("button",{className:"clear-query-history-button",onClick:()=>{localStorage.removeItem("queries"),w(null),I(null),window.location.reload()}},"Clear Query History"))),ie&&xe.length>0&&n.a.createElement(ye,null),n.a.createElement(p,null))};o.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(v,null)))},5:function(e,t,a){e.exports=a(18)}},[[5,1,2]]]);
//# sourceMappingURL=main.114086ca.chunk.js.map