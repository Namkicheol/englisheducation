// A minimal DOM contract check, not a browser/layout test.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const topics=['sla','linguistic','learner','discourse','methodology','reading','listen','speaking','writing','grammar','vocab','call','assessment'];
function boot(topic,storage=new Map()){
 const elements=new Map();function el(){return {style:{},innerHTML:'',textContent:'',className:'',disabled:false,classList:{add(){},remove(){},toggle(){}},scrollIntoView(){},appendChild(){},setAttribute(){},addEventListener(){}};}
 const ctx=vm.createContext({console,Math,setTimeout(){},clearTimeout(){},window:{},document:{getElementById(id){if(!elements.has(id))elements.set(id,el());return elements.get(id)},createElement:el,querySelectorAll(){return []}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 const s=fs.readFileSync(topic+'.html','utf8'),script=[...s.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).find(x=>x.includes('const Q='));vm.runInContext(script,ctx);return {ctx,storage,elements};
}
for(const topic of topics){let r=boot(topic);vm.runInContext('pick(Q[order[cur]].ans)',r.ctx);assert.equal(vm.runInContext('getScore()',r.ctx),1);vm.runInContext('next()',r.ctx);assert.equal(vm.runInContext('cur',r.ctx),1);vm.runInContext('jumpTo(0)',r.ctx);assert.equal(vm.runInContext('getScore()',r.ctx),1);r=boot(topic,r.storage);assert.equal(vm.runInContext('getScore()',r.ctx),1);vm.runInContext('freshStart()',r.ctx);assert.equal(vm.runInContext('getScore()',r.ctx),0);vm.runInContext("setMode('random')",r.ctx);assert.equal(vm.runInContext('new Set(order).size===TOTAL',r.ctx),true);vm.runInContext("setMode('normal')",r.ctx);assert.equal(vm.runInContext('order.every((n,i)=>n===i)',r.ctx),true);}
console.log('PASS: 13 quiz flows — correct pick, next, review jump, saved resume, restart and mode switches (minimal DOM)');
