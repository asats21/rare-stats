(this["webpackJsonprare-stats"]=this["webpackJsonprare-stats"]||[]).push([[0],{13:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),r=a(3),o=a.n(r),i=(a(13),a(14),a(1));a(15),a(16);const c=["uncommon","rare","epic"],s=["black_uncommon","black_rare","black_epic"],m=["450x","block_9","jan2009","2009","vintage","block_78","block_286","block_666","nakamoto"],p=["palindrome","alpha","omega"],d=["pizza","jpeg","hitman","silkroad"],u=["1_digit","2_digits","3_digits","perfect_palinception","uniform_palinception","sequence_palindrome"],h=["paliblock","rodarmor","fibonacci","legacy"],g=["epoch0","epoch1","epoch2","epoch3","epoch4"];var E=()=>{Object(l.useEffect)(()=>{document.title="Rare Stats"},[]);const[e,t]=Object(l.useState)([]),[a,r]=Object(l.useState)([]),[o,E]=Object(l.useState)(null),[b,_]=Object(l.useState)(null),[f,x]=Object(l.useState)(!1),[y,v]=Object(l.useState)(""),[k,S]=Object(l.useState)(!1),[F,w]=Object(l.useState)(()=>"true"===localStorage.getItem("darkMode")),[N,A]=Object(l.useState)(()=>{const e=localStorage.getItem("showSatScore");return null===e||"true"===e});Object(l.useEffect)(()=>{F?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode"),localStorage.setItem("darkMode",F)},[F]),Object(l.useEffect)(()=>{localStorage.setItem("showSatScore",N)},[N]);const q=e=>new Intl.NumberFormat("en-US").format(e),j=(e,t,a,l,n)=>{const r=2.1*Math.pow(10,15),o=Math.log(r),i=Math.log(e),c=Math.log(t),s=(a+l)/2,m=s>1?s:1,p=i/o,d=Math.log(m)/c,u=1-n/l>0?1-n/l:.01,h=1-p,g=1-d,E=1-u,b=1e3*(1-p*d*u);return{score:b,power_transformed_score:1e3*Math.pow(b/1e3,1.5),Sc:p,AFc:d,Hc:u,Sci:h,AFci:g,Hci:E}},C=a=>{const l=a.target.value;if(l.startsWith("epoch")){const a=e.includes(l)?e.filter(e=>e!==l):[...e,l],n=a.filter(e=>e.startsWith("epoch"));for(let e=0;e<n.length-1;e++){const t=parseInt(n[e].replace("epoch",""));if(parseInt(n[e+1].replace("epoch",""))!==t+1)return void alert("You cannot skip epochs. Select them in order.")}t(a)}else t(e=>e.includes(l)?e.filter(e=>e!==l):[...e,l])},z=[["uncommon","2009"],["uncommon","jan2009"],["uncommon","alpha","paliblock"],["uncommon","alpha","epoch0"],["uncommon","alpha","epoch1"],["uncommon","alpha","epoch2"],["uncommon","alpha","epoch3"],["uncommon","alpha","epoch4"],["black_uncommon","2009"],["black_uncommon","jan2009"],["black_uncommon","omega","paliblock"],["pizza","alpha"],["pizza","omega"],["pizza","uncommon"],["pizza","palindrome","2009"],["pizza","palindrome","sequence_palindrome"],["pizza","palindrome","paliblock"],["pizza","palindrome","uniform_palinception"],["pizza","palindrome","uniform_palinception","paliblock"],["jpeg","alpha"],["jpeg","omega"],["jpeg","uncommon"],["jpeg","palindrome"],["jpeg","palindrome","uniform_palinception"],["hitman","alpha"],["hitman","omega"],["hitman","palindrome"],["silkroad","alpha"],["silkroad","omega"],["silkroad","palindrome"],["nakamoto","palindrome"],["nakamoto","alpha"],["nakamoto","omega"],["vintage","alpha"],["vintage","omega"],["vintage","palindrome"],["vintage","palindrome","paliblock"],["vintage","palindrome","3_digits"],["vintage","palindrome","2_digits"],["block_78","alpha"],["block_78","omega"],["block_78","palindrome"],["block_78","palindrome","2_digits"],["block_78","palindrome","3_digits"],["block_78","uniform_palinception"],["block_78","perfect_palinception"],["palindrome","1_digit"],["palindrome","2_digits"],["palindrome","3_digits"],["palindrome","3_digits","epoch1"],["palindrome","3_digits","epoch2"],["palindrome","3_digits","epoch3"],["palindrome","3_digits","epoch4"],["uniform_palinception"],["uniform_palinception","2_digits"],["uniform_palinception","3_digits"],["uniform_palinception","paliblock","palindrome"],["uniform_palinception","paliblock","3_digits"],["uniform_palinception","paliblock","2_digits"],["uniform_palinception","sequence_palindrome"],["uniform_palinception","paliblock","3_digits","sequence_palindrome"],["perfect_palinception"],["perfect_palinception","paliblock"],["perfect_palinception","2_digits"],["perfect_palinception","3_digits"],["perfect_palinception","paliblock","3_digits"],["perfect_palinception","epoch1"],["perfect_palinception","epoch2"],["perfect_palinception","epoch3"],["perfect_palinception","epoch4"],["perfect_palinception","sequence_palindrome"],["450x","palindrome"],["block_9","palindrome"],["block_9","alpha"],["block_286","palindrome"],["block_286","alpha"],["rodarmor"],["rodarmor","2009"],["legacy"]],I=Object(l.useCallback)(()=>{if(0===e.length)return void _("Please select at least one rarity.");const t=e.filter(e=>e.startsWith("epoch")),a=t.length>0?21e4*parseInt(t[0].replace("epoch","")):void 0,l=t.length>0?21e4*(parseInt(t[t.length-1].replace("epoch",""))+1):void 0,n=e.filter(e=>!e.startsWith("epoch")).join(",");let o="https://api.deezy.io/v1/sat-hunting/circulation?rarity=".concat(n);void 0!==a&&void 0!==l&&(o+="&block_start=".concat(a,"&block_end=").concat(l)),x(!0),r([...e]),fetch(o).then(e=>e.json()).then(t=>{if(t.message)_(t.message),E(null);else{E(t.data),_(null);const a=j(t.data.n_total,t.data.n_mined,t.data.n_365,t.data.n_seq,t.data.n_seq_holders);if(t.data.n_total>0&&a.score){const l=[...e].sort(),n={query:l,result:t.data,satScore:a},r=JSON.parse(localStorage.getItem("queries"))||[];r.some(e=>e.query.join(",")===l.join(","))||(r.push(n),localStorage.setItem("queries",JSON.stringify(r)))}}}).catch(e=>{console.error("Error fetching data:",e),_("An error occurred while fetching data."),E(null)}).finally(()=>{x(!1)})},[e]);Object(l.useEffect)(()=>{k&&e.length>0&&(I(),S(!1))},[e,k,I]);const M=(t,a,l)=>{const r={epoch0:"Jan 3, 2009 \u2013 Nov 28, 2012",epoch1:"Nov 28, 2012 \u2013 Jul 9, 2016",epoch2:"Jul 9, 2016 \u2013 May 11, 2020",epoch3:"May 11, 2020 \u2013 Apr 20, 2024",epoch4:"Apr 20, 2024 \u2013 Mar 26, 2028"};return n.a.createElement("div",{style:{border:"2px solid ".concat(l),borderRadius:"10px",margin:"5px",padding:"10px",flex:"1 1 30%",minWidth:"200px"}},n.a.createElement("h5",{style:{color:"Black"===t&&F?"#FFFFFF":l,marginBottom:"5px"}},t),n.a.createElement("div",{className:"d-flex flex-wrap"},a.map(t=>n.a.createElement("div",{key:t,style:{marginRight:"10px",marginBottom:"5px"}},n.a.createElement("input",{type:"checkbox",id:t,value:t,checked:e.includes(t),onChange:C}),n.a.createElement("label",{htmlFor:t,style:{marginLeft:"5px"},title:r[t]||""},t)))),"Epochs"===t&&n.a.createElement("div",{className:"d-block d-md-none mt-2",style:{fontSize:"0.9rem",color:F?"#FFFFFF":"#000000",background:F?"#2A2D34":"#F8F9FA",padding:"5px",borderRadius:"5px",border:"1px solid ".concat(l)}},Object.entries(r).map(e=>{let[t,a]=e;return n.a.createElement("p",{key:t,style:{margin:0}},n.a.createElement("strong",null,t,":")," ",a)})))},O=(JSON.parse(localStorage.getItem("queries"))||[]).sort((e,t)=>t.satScore.score-e.satScore.score);return n.a.createElement("div",{className:"container mt-5 ".concat(F?"dark-mode-container":"")},n.a.createElement("div",{style:{position:"absolute",top:"10px",right:"10px",display:"flex",alignItems:"center",gap:"10px"}},n.a.createElement("span",{className:F?"text-light":"text-dark",style:{fontWeight:"bold"}},F?"Switch To Light":"Switch To Dark"," Mode"),n.a.createElement("label",{className:"switch"},n.a.createElement("input",{type:"checkbox",checked:F,onChange:()=>{w(e=>!e)}}),n.a.createElement("span",{className:"slider"}))),n.a.createElement("h1",{className:"text-center mb-4 ".concat(F?"text-light":"text-dark")},"Select Rarities"),n.a.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"5px"}},M("Rodarmor Rarity",c,"#EF476F"),"          ",M("Black",s,"#2A2D34"),"      ",M("Other types",p,"#FFD166"),"        ",M("Historical",m,"#118AB2")," ",M("Events",d,"#06D6A0"),"    ",M("Palindrome",u,"#8ECAE6")," ",M("Other",h,"#9D4EDD"),"      ",M("Halving epochs",g,"#FFB703")," "),n.a.createElement("div",{className:"text-center mb-4"},n.a.createElement("button",{className:"btn btn-primary mt-3 me-2",onClick:I},"Query"),n.a.createElement("button",{className:"btn btn-success mt-3 me-2",onClick:()=>{const e=z[Math.floor(Math.random()*z.length)];t(e),S(!0)}},"Feelin' Lucky"),n.a.createElement("button",{className:"btn btn-secondary mt-3",onClick:()=>{t([]),E(null),_(null)}},"Clear")),f&&n.a.createElement("div",{className:"text-center"},n.a.createElement("div",{className:"spinner-border text-primary",role:"status"},n.a.createElement("span",{className:"visually-hidden"},"Loading..."))),b&&n.a.createElement("div",{className:"alert alert-danger"},n.a.createElement("strong",null,"Error:")," ",b),o&&!f&&n.a.createElement("div",{className:"mt-4"},n.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}},n.a.createElement("h2",{className:"mb-0 ".concat(F?"text-light":"text-dark"),style:{flex:"1 0 auto"}},"Results"),n.a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"5px",flex:"0 0 auto"}},n.a.createElement("label",{className:F?"text-light":"text-dark",style:{fontSize:"1rem",fontWeight:"bold",whiteSpace:"nowrap"}},"Floor Price, $"),n.a.createElement("input",{type:"number",value:y,onChange:e=>v(e.target.value),placeholder:"Enter value",style:{width:"120px",padding:"5px",border:"1px solid #ccc",borderRadius:"5px",fontSize:"1rem"}}))),n.a.createElement("div",{className:"mb-3"},n.a.createElement("p",{className:F?"text-light":"text-dark",style:{fontSize:"1rem"}},a.length>0?a.join(", "):"None")),n.a.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"20px",justifyContent:"center"}},[{label:"Total",value:o.n_total},{label:"Mined",value:o.n_mined},{label:"Active Epoch",value:o.n_epoch},{label:"Active 365 Days",value:o.n_365},{label:"Found",value:o.n_seq},{label:"Inscribed",value:o.n_inscribed},{label:"Holders (Found)",value:o.n_seq_holders,noMC:!0},{label:"Holders (Total)",value:o.n_total_holders,noMC:!0},{label:"Updated At",value:new Date(o.updated_at).toLocaleDateString("en-US"),noMC:!0}].map((e,t)=>{const a="Updated At"===e.label?e.value:parseInt(e.value,10),l=y&&!e.noMC?a*y:null;return n.a.createElement("div",{key:t,style:{background:F?"#2A2D34":"#F8F9FA",color:F?"#FFFFFF":"#000000",border:F?"1px solid #444":"1px solid #ddd",borderRadius:"8px",padding:"15px",textAlign:"center",width:"calc(33.33% - 20px)",minWidth:"200px",boxShadow:F?"0 4px 6px rgba(0, 0, 0, 0.3)":"0 4px 6px rgba(0, 0, 0, 0.1)"}},n.a.createElement("h5",{style:{marginBottom:"10px",fontSize:"1rem",fontWeight:"bold"}},e.label),n.a.createElement("p",{style:{fontSize:"1.2rem",margin:0}},"Updated At"===e.label?a:q(a),l&&l>0&&n.a.createElement("span",{style:{display:"block",fontSize:"0.9rem",color:F?"#BBBBBB":"#666666"}},"(Market Cap $",q(l),")")))}))),o&&!f&&n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"mt-5"},n.a.createElement("div",{className:"d-flex align-items-center justify-content-around mt-4"},n.a.createElement("div",null,n.a.createElement("h3",null,"Sat Score: ",j(o.n_total,o.n_mined,o.n_365,o.n_seq,o.n_seq_holders).power_transformed_score.toFixed(2))),n.a.createElement("div",{className:"d-flex"},n.a.createElement("div",{style:{margin:"0 10px",textAlign:"center"}},n.a.createElement(i.a,{value:100*j(o.n_total,o.n_mined,o.n_365,o.n_seq,o.n_seq_holders).Sci,text:"".concat((100*j(o.n_total,o.n_mined,o.n_365,o.n_seq,o.n_seq_holders).Sci).toFixed(0)," pt."),styles:Object(i.b)({textColor:"#EF476F",pathColor:"#EF476F",trailColor:"#d6d6d6"})}),n.a.createElement("p",{style:{marginTop:"10px",fontSize:"0.9rem"}},"Supply")),n.a.createElement("div",{style:{margin:"0 10px",textAlign:"center"}},n.a.createElement(i.a,{value:100*Math.pow(j(o.n_total,o.n_mined,o.n_365,o.n_seq,o.n_seq_holders).AFci,1/3),text:"".concat((100*Math.pow(j(o.n_total,o.n_mined,o.n_365,o.n_seq,o.n_seq_holders).AFci,1/3)).toFixed(0)," pt."),styles:Object(i.b)({textColor:"#06D6A0",pathColor:"#06D6A0",trailColor:"#d6d6d6"})}),n.a.createElement("p",{style:{marginTop:"10px",fontSize:"0.9rem"}},"Active+Found")),n.a.createElement("div",{style:{margin:"0 10px",textAlign:"center"}},n.a.createElement(i.a,{value:100*Math.pow(j(o.n_total,o.n_mined,o.n_365,o.n_seq,o.n_seq_holders).Hci,1/3),text:"".concat((100*Math.pow(j(o.n_total,o.n_mined,o.n_365,o.n_seq,o.n_seq_holders).Hci,1/3)).toFixed(0)," pt."),styles:Object(i.b)({textColor:"#118AB2",pathColor:"#118AB2",trailColor:"#d6d6d6"})}),n.a.createElement("p",{style:{marginTop:"10px",fontSize:"0.9rem"}},"Holders")))),n.a.createElement("div",null,n.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"10px"}},n.a.createElement("h3",{className:F?"text-light":"text-dark",style:{margin:0}},"What is the Sat Score?"),n.a.createElement("label",{className:"switch-container",style:{display:"flex",alignItems:"center",gap:"5px"}},n.a.createElement("span",{className:F?"text-light":"text-dark",style:{fontSize:"1rem"}},N?"Hide":"Show"),n.a.createElement("label",{className:"switch"},n.a.createElement("input",{type:"checkbox",checked:N,onChange:()=>A(e=>!e)}),n.a.createElement("span",{className:"slider"})))),N&&n.a.createElement("div",{className:"mt-3"},n.a.createElement("p",null,"The ",n.a.createElement("strong",null,"Sat score")," is a unique metric (developed by AI) that provides a numerical representation of the relative rarity of a given sat. It is calculated using:"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("strong",null,"Smax")," - The total number of sats in existence (2.1 quadrillion)."),n.a.createElement("li",null,n.a.createElement("strong",null,"S (n_total)")," - The total number of selected sats."),n.a.createElement("li",null,n.a.createElement("strong",null,"M (n_mined)")," - The number of mined sats."),n.a.createElement("li",null,n.a.createElement("strong",null,"A (n_365)")," - The number of sats active over the past 365 days."),n.a.createElement("li",null,n.a.createElement("strong",null,"F (n_seq)")," - The number of sats that are found."),n.a.createElement("li",null,n.a.createElement("strong",null,"FH (n_seq_holders)")," - The number of holders of sats that are found.")),n.a.createElement("p",null,"Note that the Sat score is logarithmic, meaning the resulting scores cannot be directly compared. For example, a score of 800 is not twice as rare as 400; it is significantly rarer, but the relationship is not linear."),n.a.createElement("p",null,"Additionally, creating your own scores based on different factors or data points that are important to you is encouraged. Custom scores can provide a more tailored understanding of rarity in your specific context."),n.a.createElement("p",null,n.a.createElement("strong",null,"Why is it useful?")),n.a.createElement("p",null,"The Sat score helps users quickly gauge the rarity and significance of specific sat without having to manually interpret large sets of numbers. By looking at the Sat score, you can get a clearer sense of how valuable or noteworthy an item might be, especially when comparing multiple items."),n.a.createElement("p",null,n.a.createElement("strong",null,"Formula:")),n.a.createElement("div",{style:{fontSize:"1.2rem",fontFamily:"Courier, monospace",lineHeight:"1.6"}},"PowerLaw(1000 \xd7 ( 1 -",n.a.createElement("span",{style:{display:"inline-flex",alignItems:"center"}},n.a.createElement("span",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",margin:"0 5px"}},n.a.createElement("div",null,"log(S)"),n.a.createElement("div",{style:{borderTop:"1px solid black",padding:"0 5px"}},"log(S",n.a.createElement("sub",null,"max"),")")),"\xd7",n.a.createElement("span",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",margin:"0 5px"}},n.a.createElement("div",null,"log(Avg(A,F))"),n.a.createElement("div",{style:{borderTop:"1px solid black",padding:"0 5px"}},"log(M)")),"\xd7",n.a.createElement("span",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",margin:"0 5px"}},n.a.createElement("div",null,"(1 - (FH / F))"))),"))"),n.a.createElement("p",null,n.a.createElement("strong",null,"Disclaimer:")," Please note that the Sat score is an ",n.a.createElement("strong",null,"arbitrary")," calculation based on the dataset, and its value can change as the data updates or as new factors are added to the formula. It is not a definitive or static measure of value but rather a tool to assist in understanding the relative importance of items within the dataset."))))),n.a.createElement("div",{className:"mt-4"},n.a.createElement("h3",{className:F?"text-light":"text-dark"},"Query History"),n.a.createElement("div",{style:{overflowX:"auto",width:"100%"}},n.a.createElement("table",{className:"table ".concat(F?"table-dark":"table-light"," table-striped"),style:{border:F?"1px solid #444":"1px solid #ddd",minWidth:"800px"}},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Query"),n.a.createElement("th",null,"Supply"),n.a.createElement("th",null,"Mined"),n.a.createElement("th",null,"Actv",n.a.createElement("sub",null,"365")),n.a.createElement("th",null,"Found"),n.a.createElement("th",null,"H",n.a.createElement("sub",null,"fnd")),n.a.createElement("th",null,"H",n.a.createElement("sub",null,"ttl")),n.a.createElement("th",null,"%Actv",n.a.createElement("sub",null,"365")),n.a.createElement("th",null,"%Fnd"),n.a.createElement("th",null,"S",n.a.createElement("sub",null,"ci")),n.a.createElement("th",null,"AF",n.a.createElement("sub",null,"ci")),n.a.createElement("th",null,"H",n.a.createElement("sub",null,"ci")),n.a.createElement("th",null,"Score"))),n.a.createElement("tbody",null,O.map((e,t)=>n.a.createElement("tr",{key:t},n.a.createElement("td",null,e.query.join(", ")),n.a.createElement("td",null,q(e.result.n_total)),n.a.createElement("td",null,q(e.result.n_mined)),n.a.createElement("td",null,q(e.result.n_365)),n.a.createElement("td",null,q(e.result.n_seq)),n.a.createElement("td",null,q(e.result.n_seq_holders)),n.a.createElement("td",null,q(e.result.n_total_holders)),n.a.createElement("td",null,(e.result.n_365/e.result.n_mined*100).toFixed(1),"%"),n.a.createElement("td",null,(e.result.n_seq/e.result.n_mined*100).toFixed(1),"%"),n.a.createElement("td",null,e.satScore.Sci.toFixed(2)),n.a.createElement("td",null,e.satScore.AFci.toFixed(2)),n.a.createElement("td",null,e.satScore.Hci.toFixed(2)),n.a.createElement("td",null,e.satScore.power_transformed_score.toFixed(2))))))),O.length>0&&n.a.createElement("div",{className:"text-center mt-3"},n.a.createElement("button",{className:"btn btn-danger",onClick:()=>{localStorage.removeItem("queries"),E(null),_(null),window.location.reload()}},"Clear Query History"))),n.a.createElement("footer",{className:"mt-5 text-center text-muted"},n.a.createElement("p",null,n.a.createElement("small",null,n.a.createElement("strong",null,"Disclaimer:")," This page uses data provided by the API at ",n.a.createElement("a",{href:"https://api.deezy.io",target:"_blank",rel:"noopener noreferrer"},"https://api.deezy.io"),'. The data is provided "as is," and the creator of this page does not profit from its use. ',n.a.createElement("strong",null,"This is not financial advice. Use the data at your own risk.")))))};var b=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,18)).then(t=>{let{getCLS:a,getFID:l,getFCP:n,getLCP:r,getTTFB:o}=t;a(e),l(e),n(e),r(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(E,null))),b()},4:function(e,t,a){e.exports=a(17)}},[[4,1,2]]]);
//# sourceMappingURL=main.c4e632bd.chunk.js.map