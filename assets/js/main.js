const CONFIG = window.BRUNX || {};
const base = document.body?.dataset.base || '';
const page = document.body?.dataset.page || 'home';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const url = (href='#') => href.startsWith('#') || href.startsWith('http') ? href : base + href;

function setBrand(){
  $$('.js-brand-name').forEach(e=>e.textContent=CONFIG.brand?.name||'BrunxScript');
  $$('.js-brand-tagline').forEach(e=>e.textContent=CONFIG.brand?.tagline||'Documentation');
  $$('.js-logo').forEach(img=>img.src=url(CONFIG.brand?.logo||'assets/img/logo.svg'));
  $$('.js-bridge-download').forEach(a=>a.href=url(CONFIG.links?.brunxBridgeDownload||'https://github.com/brunxscripts/brunx_bridge/archive/refs/heads/main.zip'));
}
function scriptBySlug(slug){return (CONFIG.scripts||[]).find(s=>s.slug===slug) || (CONFIG.scripts||[])[0];}
function navItems(){return (CONFIG.scripts||[]).map(s=>`<a href="${url(s.page)}" class="${page===s.slug?'active':''}">${esc(s.name)}</a>`).join('');}
function renderNav(){ const target=$('.js-script-nav'); if(target) target.innerHTML=navItems(); }
function card(s){return `<a class="card reveal searchable" href="${url(s.page)}" data-search="${esc((s.name+' '+s.short+' '+s.category+' '+s.badge).toLowerCase())}"><div class="card-top"><span class="badge">${esc(s.badge)}</span><span class="status">${esc(s.status)}</span></div><div class="icon">${esc(s.icon)}</div><h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><span class="link">Open documentation →</span></a>`}
function renderHome(){
  const grid=$('#scriptGrid'); if(grid) grid.innerHTML=(CONFIG.scripts||[]).map(card).join('');
  const faq=$('#faqGrid'); if(faq) faq.innerHTML=(CONFIG.faq||[]).map(f=>`<div class="panel reveal"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('');
  const count=$('#scriptCount'); if(count) count.textContent=(CONFIG.scripts||[]).length + '+';
}
function list(items=[]){return `<ol>${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ol>`}
function renderPairs(items=[], empty='No entries yet.'){ if(!items.length) return `<p>${empty}</p>`; return `<div class="table">${items.map(i=>`<div class="row"><div><span class="badge">${esc(i.type)}</span></div><div><code>${esc(i.name)}</code><p>${esc(i.description)}</p></div></div>`).join('')}</div>`}
function renderExtraSections(s){
  let html = '';
  if (s.fileStructure?.length) {
    html += `<section id="structure" class="doc-section reveal"><h2>Resource structure</h2><p>This structure keeps the bridge easy to maintain and future-proof for new frameworks, targets and integrations.</p><div class="file-tree">${s.fileStructure.map(x=>`<div>${esc(x)}</div>`).join('')}</div></section>`;
  }
  if (s.usage) {
    html += `<section id="usage" class="doc-section code reveal"><button class="btn ghost small copy" data-copy="usageCode">Copy</button><h2>Usage example</h2><pre id="usageCode"><code>${esc(s.usage)}</code></pre></section>`;
  }
  if (s.clientApi?.length) {
    html += `<section id="client-api" class="doc-section reveal"><h2>Client API</h2>${renderPairs(s.clientApi)}</section>`;
  }
  if (s.serverApi?.length) {
    html += `<section id="server-api" class="doc-section reveal"><h2>Server API</h2>${renderPairs(s.serverApi)}</section>`;
  }
  if (s.targetApi?.length) {
    html += `<section id="target-api" class="doc-section reveal"><h2>Target API</h2>${renderPairs(s.targetApi)}</section>`;
  }
  if (s.frameworks?.length) {
    html += `<section id="frameworks" class="doc-section reveal"><h2>Framework support</h2><div class="feature-grid">${s.frameworks.map(f=>`<div class="mini-card"><span class="badge">${esc(f.name)}</span><h3>${esc(f.title)}</h3><p>${esc(f.description)}</p></div>`).join('')}</div></section>`;
  }
  if (s.notes?.length) {
    html += `<section id="notes" class="doc-section reveal"><h2>Implementation notes</h2><ul>${s.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></section>`;
  }
  return html;
}
function renderDoc(){
  const root=$('#docRoot'); if(!root) return; const s=scriptBySlug(page); document.title=`${s.name} | ${CONFIG.brand?.name||'BrunxScript'} Docs`;
  root.innerHTML=`<section class="doc-hero reveal"><span class="eyebrow">${esc(s.badge)} · ${esc(s.status)}</span><h1 class="grad">${esc(s.name)}</h1><p class="lead">${esc(s.short)}</p><div class="meta"><span class="badge">Version ${esc(s.version)}</span><span class="badge">${esc(s.category)}</span><a class="btn small js-bridge-download" href="${url(s.download||'#')}">Download</a></div></section>
  <section id="overview" class="doc-section reveal"><h2>Overview</h2>${(s.overview||[]).map(p=>`<p>${esc(p)}</p>`).join('')}</section>
  <section id="requirements" class="doc-section reveal"><h2>Requirements</h2><ul>${(s.requirements||[]).map(r=>`<li>${esc(r)}</li>`).join('')}</ul></section>
  <section id="installation" class="doc-section reveal"><h2>Installation</h2>${list(s.install||[])}</section>
  <section id="configuration" class="doc-section code reveal"><button class="btn ghost small copy" data-copy="configCode">Copy</button><h2>Configuration</h2><pre id="configCode"><code>${esc(s.config||'')}</code></pre></section>
  ${renderExtraSections(s)}
  <section id="exports" class="doc-section reveal"><h2>Exports</h2>${renderPairs(s.exports)}</section>
  <section id="events" class="doc-section reveal"><h2>Events</h2>${renderPairs(s.events)}</section>
  <section id="changelog" class="doc-section reveal"><h2>Changelog</h2>${(s.changelog||[]).map(c=>`<div class="step"><div><strong>${esc(c.version)} · ${esc(c.date)}</strong><ul>${(c.changes||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>`).join('')}</section>`;
}
function search(){ const input=$('#searchInput'); if(!input) return; input.addEventListener('input',()=>{const q=input.value.toLowerCase().trim(); $$('.searchable').forEach(el=>{el.style.display=(el.dataset.search||'').includes(q)?'':'none'})}); }
function copyButtons(){ document.addEventListener('click', async e=>{const b=e.target.closest('[data-copy]'); if(!b) return; const t=document.getElementById(b.dataset.copy)?.innerText||''; await navigator.clipboard.writeText(t); const old=b.textContent; b.textContent='Copied'; setTimeout(()=>b.textContent=old,1200);}); }
function reveal(){ const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12}); $$('.reveal').forEach(e=>io.observe(e)); }
function mobileNav(){ $('.hamb')?.addEventListener('click',()=>$('.nav')?.classList.toggle('open')); }
setBrand(); renderNav(); renderHome(); renderDoc(); search(); copyButtons(); reveal(); mobileNav();
