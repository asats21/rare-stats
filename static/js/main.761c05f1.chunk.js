(this["webpackJsonprare-stats"]=this["webpackJsonprare-stats"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var l=n(0),a=n.n(l),r=n(2),c=n.n(r);n(12);const o=["2009","uncommon","rare","epic","black_uncommon","black_rare","black_epic","palindrome","jan2009","vintage","nakamoto","pizza","jpeg","hitman","silkroad","alpha","omega","1_digit","2_digits","3_digits","perfect_palinception","uniform_palinception","rodarmor","450x","block_9","block_78","block_286","block_666","fibonacci","sequence_palindrome","legacy"];var i=()=>{const[e,t]=Object(l.useState)([]),[n,r]=Object(l.useState)(null),[c,i]=Object(l.useState)(null),u=e=>{const n=e.target.value;t(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n])};return a.a.createElement("div",null,a.a.createElement("h1",null,"Select Rarities"),a.a.createElement("form",null,o.map(e=>a.a.createElement("div",{key:e},a.a.createElement("input",{type:"checkbox",id:e,value:e,onChange:u}),a.a.createElement("label",{htmlFor:e},e)))),a.a.createElement("button",{onClick:()=>{if(0===e.length)return void i("Please select at least one rarity.");const t=e.join(","),n="https://api.deezy.io/v1/sat-hunting/circulation?rarity=".concat(t);fetch(n).then(e=>e.json()).then(e=>{e.message?(i(e.message),r(null)):(r(e.data),i(null))}).catch(e=>{console.error("Error fetching data:",e),i("An error occurred while fetching data."),r(null)})}},"Query"),c&&a.a.createElement("div",{style:{color:"red"}},a.a.createElement("strong",null,"Error:")," ",c),n&&a.a.createElement("div",null,a.a.createElement("h2",null,"Results"),a.a.createElement("p",null,a.a.createElement("strong",null,"Total:")," ",n.n_total),a.a.createElement("p",null,a.a.createElement("strong",null,"Mined:")," ",n.n_mined),a.a.createElement("p",null,a.a.createElement("strong",null,"Epoch:")," ",n.n_epoch),a.a.createElement("p",null,a.a.createElement("strong",null,"365 Days:")," ",n.n_365),a.a.createElement("p",null,a.a.createElement("strong",null,"Sequence:")," ",n.n_seq),a.a.createElement("p",null,a.a.createElement("strong",null,"Inscribed:")," ",n.n_inscribed),a.a.createElement("p",null,a.a.createElement("strong",null,"Sequence Holders:")," ",n.n_seq_holders),a.a.createElement("p",null,a.a.createElement("strong",null,"Total Holders:")," ",n.n_total_holders),a.a.createElement("p",null,a.a.createElement("strong",null,"Updated At:")," ",new Date(n.updated_at).toLocaleString())))};var u=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,14)).then(t=>{let{getCLS:n,getFID:l,getFCP:a,getLCP:r,getTTFB:c}=t;n(e),l(e),a(e),r(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(i,null))),u()},3:function(e,t,n){e.exports=n(13)}},[[3,1,2]]]);
//# sourceMappingURL=main.761c05f1.chunk.js.map