import{w as s}from"./index-cd438249.js";function o(){const{subscribe:a,set:n,update:e}=s(new Array);return{subscribe:a,set:n,update:e,addLap:t=>e(r=>r.concat({target:t})),removeLap:()=>e(t=>t.slice(0,-1)),reset:()=>n(new Array),timeStart:()=>{e(t=>(t.at(0).start=Date.now(),t))},timeHalf:t=>{e(r=>(r.at(t).half=Date.now(),r))},timeFull:t=>{e(r=>(r.at(t).end=Date.now(),r))}}}const c=o();function m(a){if(Number.isNaN(a))return"";var n=Math.floor(a%1e3),t=Math.floor(a/1e3%60),e=Math.floor(a/(1e3*60)%60),t=t<10&&e!="00"?"0"+t:t,r=t+"."+n.toString().padStart(3,"0");return e=="00"?r:e+":"+r}export{c as l,m};
