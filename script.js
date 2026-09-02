const BUSINESS_EMAIL = "hello@eleganteventsrentals.com"; // Replace before publishing
const selected = new Set();
const selectedList = document.getElementById('selected-items');
const toast = document.getElementById('toast');

function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
function renderItems(){selectedList.innerHTML=selected.size?[...selected].map(x=>`<li>${x} <button aria-label="Remove ${x}" data-remove="${x}">×</button></li>`).join(''):'<li>No items selected yet</li>';}
function selectItem(item){selected.add(item);renderItems();showToast(`${item} added to your inquiry`);document.getElementById('quote').scrollIntoView({behavior:'smooth'});}

document.querySelectorAll('.add-item,.package-select').forEach(btn=>btn.addEventListener('click',()=>selectItem(btn.dataset.item)));
selectedList.addEventListener('click',e=>{if(e.target.dataset.remove){selected.delete(e.target.dataset.remove);renderItems();}});
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.rental-card').forEach(card=>card.classList.toggle('hidden',btn.dataset.filter!=='all'&&card.dataset.category!==btn.dataset.filter));}));

document.querySelector('.menu-button').addEventListener('click',e=>{const nav=document.getElementById('main-nav');nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'));});
document.querySelectorAll('#main-nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('main-nav').classList.remove('open')));

document.getElementById('quote-form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const items=selected.size?[...selected].join(', '):'Not yet selected';const subject=encodeURIComponent(`Rental quote request: ${d.get('type')} on ${d.get('date')}`);const body=encodeURIComponent(`Hello Elegant Events Rentals,\n\nI would like a rental quote.\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nEmail: ${d.get('email')}\nEvent date: ${d.get('date')}\nEvent type: ${d.get('type')}\nEstimated guests: ${d.get('guests')||'Not provided'}\nEvent location: ${d.get('location')||'Not provided'}\nSelected items: ${items}\n\nDetails:\n${d.get('message')||'No additional details'}\n\nThank you.`);window.location.href=`mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;});
document.getElementById('year').textContent=new Date().getFullYear();
