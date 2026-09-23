/* Power Ladder - Interactive Quiz hub (Wix Custom Code build) */
(function(){
var L=/(^|\/)th(\/|$)/.test(location.pathname)?'th':'en';
function all(s,r){return [].slice.call((r||document).querySelectorAll(s))}
all('.plq').forEach(function(r){r.hidden=r.getAttribute('data-lang')!==L});
var root=document.getElementById('plq-'+L);if(!root)return;
document.documentElement.classList.add('plq-js');
function hide(){['PAGES_CONTAINER','SITE_FOOTER'].forEach(function(id){var n=document.getElementById(id);if(n)n.style.setProperty('display','none','important')})}
hide();var k=0,iv=setInterval(function(){hide();if(++k>40)clearInterval(iv)},200);
var hub=root.querySelector('.plq-hub'),details=all('.plq-detail',root),cards=all('.card',root),
    input=root.querySelector('.plq-search'),empty=root.querySelector('.empty'),count=root.querySelector('.plq-n'),filter='all';
function route(focus){var m=location.hash.match(/^#quiz\/([a-z-]+)/),id=m&&m[1],hit=false;
  details.forEach(function(d){var on=d.getAttribute('data-quiz')===id;d.hidden=!on;if(on)hit=true});
  hub.hidden=hit;if(focus){var top=root.getBoundingClientRect().top+scrollY-20;scrollTo(0,hit||location.hash==='#lab'?top:scrollY)}}
function apply(){var q=(input.value||'').trim().toLowerCase(),n=0;
  cards.forEach(function(c){var ok=(filter==='all'||(' '+c.getAttribute('data-topics')+' ').indexOf(' '+filter+' ')>-1)&&(!q||(c.textContent+c.getAttribute('data-extra')).toLowerCase().indexOf(q)>-1);c.hidden=!ok;if(ok)n++});
  count.textContent=n;empty.hidden=n>0}
root.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
  if(b.getAttribute('data-filter')){filter=b.getAttribute('data-filter');all('[data-filter]',root).forEach(function(x){x.setAttribute('aria-pressed',x===b)});apply()}
  if(b.getAttribute('data-action')==='resetsearch'){filter='all';input.value='';all('[data-filter]',root).forEach(function(x){x.setAttribute('aria-pressed',x.getAttribute('data-filter')==='all')});apply();input.focus()}});
input.addEventListener('input',apply);
addEventListener('hashchange',function(){route(true)});
route(false);apply();
})();
