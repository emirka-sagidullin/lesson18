let selectlist = document.getElementById('slist')
let option = new Option("Классика", "classic");
selectlist.append(option);
option.selected = true;

let view = document.getElementById('view');
view.onclick = function() {
  editStart();
};
function editStart() {
  area = document.createElement('textarea');
  area.className = 'edit';
  area.value = view.innerHTML;
  area.onkeydown = function(event) {
    if (event.key == 'Enter') {
      this.blur();
    }
  };
  area.onblur = function() {
    editEnd();
  };
  view.replaceWith(area);
  area.focus();
}
function editEnd() {
  view.innerHTML = area.value;
  area.replaceWith(view);
}

let startDeposit = document.getElementById('startDeposit');
let depositTerm = document.getElementById('depositTerm');
let percent = document.getElementById('percent');
let start = document.getElementById('start');
let finish = document.getElementById('finish');
let redPillar = document.getElementById('redPillar');
let greenPillar = document.getElementById('greenPillar');

function startValue(){
  start.innerHTML = startDeposit.value
};

function finishValue(){
  finish.innerHTML = Number(start.innerHTML) + ((Number(start.innerHTML) * (Number(percent.value) / 100)) * (Number(depositTerm.value) / 12));
  redPillar.style = `height: ${start.innerHTML/100}px;`
  greenPillar.style = `height: ${finish.innerHTML/100}px;`
};


// 3
let table = document.getElementById('bagua-table');

let editingTd;

table.onclick = function(event) {

// 3 
let target = event.target.closest('.edit-cancel,.edit-ok,td');
if (!table.contains(target)) return;
if (target.className == 'edit-cancel') {
  finishTdEdit(editingTd.elem, false);
} else if (target.className == 'edit-ok') {
  finishTdEdit(editingTd.elem, true);
} else if (target.nodeName == 'TD') {
  if (editingTd) return;
  makeTdEditable(target);
}
};
function makeTdEditable(td) {
  editingTd = {
    elem: td,
    data: td.innerHTML
  };
  td.classList.add('edit-td');
  let textArea = document.createElement('textarea');
  textArea.style.width = td.clientWidth + 'px';
  textArea.style.height = td.clientHeight + 'px';
  textArea.className = 'edit-area';
  textArea.value = td.innerHTML;
  td.innerHTML = '';
  td.appendChild(textArea);
  textArea.focus();
  td.insertAdjacentHTML("beforeEnd",
    '<div class="edit-controls"> <button class="edit-ok">OK</button> <button class="edit-cancel">CANCEL</button> </div>'
  );
}
function finishTdEdit(td, isOk) {
  if (isOk) {
    td.innerHTML = td.firstChild.value;
  } else {
    td.innerHTML = editingTd.data;
  }
  td.classList.remove('edit-td');
  editingTd = null;
}