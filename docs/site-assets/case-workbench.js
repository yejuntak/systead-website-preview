(()=>{
const workbench=document.querySelector('.case-workbench');if(!workbench)return;workbench.addEventListener('keydown',()=>workbench.dataset.keyboard='true');workbench.addEventListener('pointerdown',()=>workbench.dataset.keyboard='false');
const $=s=>workbench.querySelector(s),all=s=>[...workbench.querySelectorAll(s)];
const stages=['question','evidence','review','proposal'],sources=['order','dispatch'];
const query=new URLSearchParams(location.search),validCase=query.get('case')==='EX-104';
let stage=validCase&&stages.includes(query.get('stage'))?query.get('stage'):'question';
let source=validCase&&sources.includes(query.get('source'))?query.get('source'):'order';
let proposalPreviewed=false;const choiceFromURL=validCase&&query.get('proposal')==='owner'?'owner':'reference';$('input[value="'+choiceFromURL+'"]').checked=true;
const sourceData={order:{title:'Original order record',reference:'EX-104',quantity:24,note:'Order quantity retained in the original record.'},dispatch:{title:'Original dispatch record',reference:'Dispatch A',quantity:20,note:'Dispatch A records20 units. The sample does not include the separate dispatch reference.'}};
const status={question:'Question: inspect the linked originals before reviewing the explanation.',evidence:'Evidence: EX-104 and Dispatch A stay distinct. The four-unit difference remains visible.',review:'Review: the separate-dispatch explanation is retained, but its supporting record is not supplied.',proposal:'Proposed next step: preview a request for missing evidence. Nothing is sent or executed.'};
function linkState(){const page=workbench.dataset.casePage,next=page==='home'?'/systead-website-preview/products/steed/':page==='steed'?'/systead-website-preview/demo/':'/systead-website-preview/products/steed/',anchor=page==='home'?'steed-workbench':page==='steed'?'demo-workbench':'steed-workbench';$('#cw-continue').href=next+'?case=EX-104&stage='+stage+'&source='+source+'&proposal='+$('input[name="case-proposal"]:checked').value+'#'+anchor;}
function render(){
 workbench.dataset.stage=stage;
 all('[data-case-stage]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.caseStage===stage)));
 all('[data-case-panel]').forEach(p=>p.hidden=p.dataset.casePanel!==stage);
 all('[data-case-source]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.caseSource===source)));
 const d=sourceData[source];$('#cw-document-title').textContent=d.title;$('#cw-document-ref').textContent=d.reference;
 $('#cw-document-qty').replaceChildren(document.createTextNode(d.quantity+' '),Object.assign(document.createElement('small'),{textContent:'units'}));
 $('#cw-document-note').textContent=d.note.replace('records20','records 20');
 $('#cw-state-status').textContent=status[stage];
 $('#cw-evidence-summary').textContent=(source==='order'?'You are reading EX-104:24 units.':'You are reading Dispatch A:20 units.').replace(':24',': 24').replace(':20',': 20')+' The other original stays available; neither quantity is replaced.';
 if(stage!=='proposal'&&proposalPreviewed){$('#cw-proposal-output').textContent='';proposalPreviewed=false;}
 linkState();
}
function setStage(next){if(stages.includes(next)){stage=next;render();}}
all('[data-case-stage]').forEach(b=>b.addEventListener('click',()=>setStage(b.dataset.caseStage)));
all('[data-go-stage]').forEach(b=>b.addEventListener('click',()=>{setStage(b.dataset.goStage);$('[data-case-stage="'+stage+'"]').focus();}));
all('[data-case-source]').forEach(b=>b.addEventListener('click',()=>{source=b.dataset.caseSource;stage='evidence';render();}));
all('[data-open-source]').forEach(b=>b.addEventListener('click',()=>{source=b.dataset.openSource;stage='evidence';render();const original=$('.cw-source'),target=$('[data-case-source="'+source+'"]');target.focus({preventScroll:true});if(matchMedia('(max-width:700px)').matches)original.scrollIntoView({block:'start',behavior:'instant'});}));
$('#cw-gap-toggle').addEventListener('click',()=>{const gap=$('#cw-evidence-gap');gap.hidden=!gap.hidden;$('#cw-gap-toggle').setAttribute('aria-expanded',String(!gap.hidden));});
$('#cw-preview-proposal').addEventListener('click',()=>{const choice=$('input[name="case-proposal"]:checked').value;$('#cw-proposal-output').textContent=choice==='owner'?'Local proposal preview for EX-104 / P-104: ask the responsible person to confirm the separate-dispatch plan. Original figures remain24 ordered and20 dispatched. Nothing was sent.':'Local proposal preview for EX-104 / P-104: ask for the separate dispatch reference supporting the four-unit explanation. Nothing was sent and no record changed.';$('#cw-proposal-output').textContent=$('#cw-proposal-output').textContent.replace('remain24','remain 24').replace('and20','and 20');proposalPreviewed=true;});
all('input[name="case-proposal"]').forEach(input=>input.addEventListener('change',()=>{linkState();if(proposalPreviewed){$('#cw-proposal-output').textContent='Selection changed. Preview this proposed next step to inspect its wording.';proposalPreviewed=false;}}));
const role=$('#cw-role');role?.addEventListener('change',()=>{$('#cw-role-note').textContent=role.value==='warehouse'?'Warehouse perspective: inspect the separate dispatch reference before preparing remaining units. This illustration grants no permission to change an order.':'Owner perspective: identify the exception and the person responsible for its next step.';});
render();
// Existing SiteA responsibilities remain a separate, honestly conceptual tour.
const infrastructure=document.querySelector('.case-infrastructure');
if(infrastructure){const legacy=document.querySelector('[data-tour="infrastructure"]');if(legacy)legacy.click();
 document.querySelectorAll('[data-case-perspective]').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('[data-case-perspective]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  const mode=b.dataset.casePerspective;
  if(mode==='infrastructure'){infrastructure.open=true;workbench.hidden=true;document.querySelector('.case-infrastructure summary').focus();}
  else{workbench.hidden=false;infrastructure.open=false;stage=mode==='connected'?'evidence':'question';render();}
 }));
}
})();

(()=>{const select=document.querySelector("#case-perspective-select");if(!select)return;select.addEventListener("change",()=>document.querySelector("[data-case-perspective=\""+select.value+"\"]")?.click());document.querySelectorAll("[data-case-perspective]").forEach(button=>button.addEventListener("click",()=>select.value=button.dataset.casePerspective));})();

// Preserve the product responsibility selected by an incoming internal link.
(()=>{if(!document.querySelector('#case-perspective-select'))return;const q=new URLSearchParams(location.search),productModes={Steed:'ai',Ground:'connected',Ger:'infrastructure',Station:'infrastructure'},allowed=['all','ai','connected','infrastructure'],requested=q.get('perspective')||productModes[q.get('product')];if(allowed.includes(requested))document.querySelector('[data-case-perspective="'+requested+'"]')?.click()})();
