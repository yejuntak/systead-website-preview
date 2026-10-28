(()=>{
const rail=document.querySelector('.family-role-rail');if(!rail)return;
const narrow=matchMedia('(max-width:700px)');const orientation=()=>rail.setAttribute('aria-orientation',narrow.matches?'horizontal':'vertical');orientation();narrow.addEventListener('change',orientation);
const tabs=[...rail.querySelectorAll('[data-family]')],panels=[...document.querySelectorAll('[data-family-panel]')];
function choose(tab,focus=false){tabs.forEach(button=>{const selected=button===tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1});panels.forEach(panel=>panel.hidden=panel.dataset.familyPanel!==tab.dataset.family);if(focus)tab.focus()}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>choose(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();choose(tabs[next],true)}})});
const region=document.querySelector('#signature-region'),scene=document.querySelector('#signature-scene'),controls=[...document.querySelectorAll('[data-signature]')],passages=[...document.querySelectorAll('[data-signature-passage]')];
const reduce=matchMedia('(prefers-reduced-motion:reduce)'),wide=matchMedia('(min-width:801px)');let engine=null,near=false;
function stop(){engine?.destroy();engine=null}
function sync(){if(near&&wide.matches&&!reduce.matches&&scene.dataset.manual!=='true'&&window.ScrollCraft){if(!engine)engine=window.ScrollCraft.mount(region)}else stop()}
controls.forEach(button=>button.addEventListener('click',()=>{scene.dataset.manual='true';scene.style.setProperty('--manual-p',String(Number(button.dataset.signature)/2));controls.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));stop()}));
const visibility=new IntersectionObserver(entries=>{near=entries.some(e=>e.isIntersecting);sync()},{rootMargin:'100px'});visibility.observe(region);
const passageObserver=new IntersectionObserver(entries=>{if(scene.dataset.manual==='true'||reduce.matches)return;const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(active)controls.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.signature===active.target.dataset.signaturePassage)))},{threshold:[0,.25,.5,.75,1],rootMargin:'-15% 0px -25% 0px'});passages.forEach(p=>passageObserver.observe(p));
reduce.addEventListener('change',sync);wide.addEventListener('change',sync);document.addEventListener('keydown',()=>{scene.dataset.manual='true';scene.style.setProperty('--manual-p','1');stop()},{once:true});addEventListener('pagehide',()=>{stop();visibility.disconnect();passageObserver.disconnect()},{once:true});
})();
