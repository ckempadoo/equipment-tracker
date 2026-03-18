const password="DMD2026";let equipmentData=[];
fetch('data/equipment.json').then(r=>r.json()).then(d=>equipmentData=d);

function checkPassword(){
 if(document.getElementById('passwordInput').value===password){
  document.getElementById('login').style.display='none';
  document.getElementById('main').style.display='block';
  loadEquipment();
 } else alert('Wrong password');
}

function loadEquipment(){
 const id=new URLSearchParams(window.location.search).get('eq');
 const eq=equipmentData.find(e=>e.id===id);
 if(!eq)return;
 document.getElementById('equipName').innerText=eq.name+' '+eq.unit;
 document.getElementById('equipID').innerText=eq.id;
 document.getElementById('equipUnit').innerText=eq.unit;
 document.getElementById('equipLocation').innerText=eq.location;
}

function addMaintenance(){
 alert('Prototype only');
}
