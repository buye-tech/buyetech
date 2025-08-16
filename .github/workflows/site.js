
const LS = 'tph_site_v1';
const defaultData = {
  profile:{ name:'Techpulse hub', title:'Tech Tips • Developer • Creator',
           avatar:'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=byte',
           bio:'I share practical tech tips, tools, and tutorials.' },
  socials:[
    {label:'Telegram', url:'https://t.me/buye_tech', icon:'✉'},
    {label:'YouTube', url:'http://YouTube.com/c/buyecreative', icon:'▶'},
    {label:'Instagram', url:'https://instagram.com/buye_tech?igshid=YmMyMTA2M2Y=', icon:'◎'},
    {label:'TikTok', url:'http://tiktok.com/@buye_tech', icon:'♪'}
  ],
  posts:[
    {id:'p-1', title:'Welcome to Techpulse hub', date:new Date().toISOString().slice(0,10),
     image:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
     excerpt:'A clean blue-gradient website for socials and posts.',
     content:'Use Edit Mode to customize content. Your changes save to this browser only.',
     links:[]}
  ],
  about:{ headline:'About Techpulse hub', content:'This is my central hub for socials, posts, and updates.'},
  privacy:{ content:'We respect your privacy. No trackers. Edits you make here are stored only in your browser (localStorage). Clearing data resets the site.'},
  faq:[
    {q:'How do I edit?', a:'Click Edit at bottom-right. Change fields and press Save in the footer.'},
    {q:'Where is data stored?', a:'In your browser only (localStorage).'},
    {q:'How to reset?', a:'Click Reset in the footer.'}
  ]
};
function loadData(){ try{ return JSON.parse(localStorage.getItem(LS)) || defaultData }catch(e){ return defaultData } }
function saveData(data){ localStorage.setItem(LS, JSON.stringify(data)); }
function qs(sel){ return document.querySelector(sel) }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)) }
function header(active){
  const links = [
    ['index.html','Home','home'],
    ['posts.html','Posts','posts'],
    ['about.html','About','about'],
    ['faq.html','FAQ','faq'],
    ['privacy.html','Privacy','privacy']
  ].map(([href,label,key]) => `<a href="${href}" class="${active===key?'active':''}">${label}</a>`).join('');
  return `<div class="navwrap"><div class="container"><div class="nav">
            <a class="brand" href="index.html">Techpulse hub</a>
            <div>${links}</div>
          </div></div></div>`;
}
function footer(){
  return `<div class="footer container">
    <div class="card px py" style="display:flex;gap:12px;justify-content:space-between;align-items:center;flex-wrap:wrap">
      <div class="small">© ${new Date().getFullYear()} • Tech-blue gradient</div>
      <div style="display:flex;gap:8px">
        <button class="btn" id="saveBtn">Save</button>
        <button class="btn btn-danger" id="resetBtn">Reset</button>
      </div>
    </div>
  </div>`;
}
function mountCommon(active){
  document.body.insertAdjacentHTML('afterbegin', header(active));
  document.body.insertAdjacentHTML('beforeend', `<button class="edit-toggle" id="editToggle">Edit</button>`);
  document.body.insertAdjacentHTML('beforeend', footer());
  const data = loadData();
  let editing = false;
  const toggle = () => {
    editing = !editing;
    qsa('[data-edit]').forEach(el => {
      el.contentEditable = editing;
      el.style.outline = editing ? '2px dashed rgba(255,255,255,.5)' : 'none';
    });
    qs('#editToggle').textContent = editing ? '✓ Editing' : 'Edit';
  };
  qs('#editToggle').onclick = toggle;
  qs('#saveBtn').onclick = () => {
    const next = loadData();
    qsa('[data-key]').forEach(el => {
      const path = el.getAttribute('data-key');
      const parts = path.split('.');
      let ref = next;
      for (let i=0;i<parts.length-1;i++){ ref = ref[parts[i]] }
      ref[parts[parts.length-1]] = el.innerText.trim();
    });
    saveData(next);
    alert('Saved to this browser.');
  };
  qs('#resetBtn').onclick = () => { localStorage.removeItem(LS); location.reload(); };
  return data;
}
