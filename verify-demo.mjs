import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://localhost:3000';
async function account(username){let cookie='',csrf='';async function call(path,payload,expected=200){const r=await fetch(base+'/api/'+path,{method:payload===undefined?'GET':'POST',headers:{Origin:base,'Content-Type':'application/json',Cookie:cookie,'X-CSRF-Token':csrf},body:payload===undefined?undefined:JSON.stringify(payload)});if(r.headers.get('set-cookie'))cookie=r.headers.get('set-cookie').split(';')[0];const out=await r.json();assert.equal(r.status,expected,JSON.stringify(out));if(out.csrf)csrf=out.csrf;return out}await call('login',{username,password:'Demo1234'});await call('state');return call}
const admin=await account('Administrador'),staff=await account('Atendente');
let s=await admin('state');assert.equal(s.clients[0].balance,50);assert.equal(s.archivedClients.length,1);assert.equal(s.clients.length,2);
await staff('products',{name:'Sem permissão',price_cents:100},403);
await admin('users',{username:'Bloqueado',password:'Demo1234',role:'admin'},403);
await admin('clients',{name:'Sem contato'},400);
s=await staff('clients',{name:'Cliente de Teste',phone:'11000000004'},201);const id=s.savedClientId;
s=await staff('sales',{client_id:id,product_id:null,quantity:2,unit_cents:1000,description:'Item fictício',date:'2099-12-31',request_id:crypto.randomUUID()});assert.equal(s.clients.find(c=>c.id===id).balance,20);
s=await staff('payments',{client_id:id,amount_cents:500,method:'Pix',request_id:crypto.randomUUID()});assert.equal(s.clients.find(c=>c.id===id).balance,15);
await staff('demo-reset',{},403);
s=await admin('demo-reset',{});assert.equal(s.clients.length,2);assert.equal(s.clients[0].balance,50);assert.equal(s.products.length,5);
assert.equal((await staff('state')).users.length,0);assert.equal((await staff('state')).audit.length,0);
const html=await (await fetch(base)).text();assert.match(html,/Testar administrador/);assert.match(html,/demo-banner/);assert.doesNotMatch(html,/Bar do Jam|bar-do-jam|logo-bar/);
console.log('PASS: login dos dois perfis, permissões, venda R$20, haver R$5, saldo R$15, cadastro obrigatório, reset e identidade genérica.');
