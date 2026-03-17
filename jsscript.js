const password = "DMD2026";
let equipmentData = [];

window.onload = function() {
  fetch('data/equipment.json')
    .then(response => response.json())
    .then(data => equipmentData = data)
    .catch(err => console.error(err));
};

function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  if(input === password) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    loadEquipment();
  } else {
    alert('Incorrect password');
  }
}

function loadEquipment() {
  const urlParams = new URLSearchParams(window.location.search);
  const eqID = urlParams.get('eq');
  const eq = equipmentData.find(e => e.id === eqID);
  if(!eq) return alert('Equipment not found');

  document.getElementById('equipName').textContent = eq.name;
  document.getElementById('equipID').textContent = eq.id;
  document.getElementById('equipUnit').textContent = eq.unit;
  document.getElementById('equipLocation').textContent = eq.location;
  document.getElementById('equipSerial').value = eq.serial;
  renderMaintenance(eq);
}

function renderMaintenance(eq) {
  const log = document.getElementById('maintenanceLog');
  log.innerHTML = '';
  eq.maintenance.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    log.appendChild(li);
  });
}

function addMaintenance() {
  const task = document.getElementById('newTask').value;
  const eqID = new URLSearchParams(window.location.search).get('eq');
  const eq = equipmentData.find(e => e.id === eqID);
  if(task && eq) {
    eq.maintenance.push(`${new Date().toLocaleDateString()}: ${task}`);
    renderMaintenance(eq);
    document.getElementById('newTask').value = '';
  }
}

function addEquipment() {
  const name = document.getElementById('newEquipName').value;
  const unit = document.getElementById('newEquipUnit').value;
  const location = document.getElementById('newEquipLocation').value;
  if(name && unit && location) {
    const newID = `EQ-${String(equipmentData.length + 1).padStart(3,'0')}`;
    equipmentData.push({id:newID,name:name,unit:unit,location:location,serial:'',maintenance:[]});
    alert(`New Equipment Added: ${newID}`);
    document.getElementById('newEquipName').value='';
    document.getElementById('newEquipUnit').value='';
    document.getElementById('newEquipLocation').value='';
  }
}
