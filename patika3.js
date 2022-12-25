/*<div class="row">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between">
                Todo 1
                <a href = "#" class ="delete-item">
                    <i class="glyphicon glyphicon-remove"></i>
                </a>

            </li>            
          </ul>
              
        </div>*/
const toDoUl = document.getElementById("listToDo");
const inputElement = document.getElementById("inputElement");
const buttonAdd = document.getElementById("buttonAdd");

buttonAdd.addEventListener("click",addList);

const secondSection = document.querySelector("#secondSection");
secondSection.addEventListener("click",clickElement);
let toDoStorage = [];


showElement();
function showElement(){
  toDoStorage = getStorage();
  if(toDoStorage.length != 0){
  toDoStorage.forEach(element => {
    
    let newValue =  createElement(element);
    toDoUl.append(newValue);
    
  });
}
}


function createElement(elementName){
  var nameElement = elementName;

  nameElement = nameElement[0].toUpperCase()+nameElement.slice(1).toLowerCase();

  var toDoli = document.createElement("li");
  toDoli.className = "list-group-item d-flex justify-content-between";
  toDoli.appendChild(document.createTextNode(nameElement));
  toDoli.id = "newElement";
  let toDoA = document.createElement("a");
  toDoA.className = "delete-item";
  toDoA.href = "#";
  let toDoi = document.createElement("i");
  toDoi.className = "glyphicon glyphicon-remove";
  toDoA.appendChild(toDoi);
  toDoli.appendChild(toDoA);
  
  return toDoli;
}

function addList(){

  let newValue = createElement(inputElement.value.trim());
  let newValueText = newValue.textContent;
  toDoUl.append(newValue);
  addStorage(newValueText);

  inputElement.value ="";

}
function addStorage(task){
    
    toDoStorage.push(task);
    console.log(JSON.stringify(toDoStorage));
    localStorage.setItem("tasks",JSON.stringify(toDoStorage));
    
}

function deleteStorage(nameElement){
  toDoStorage = getStorage();
  
  const index = toDoStorage.indexOf(nameElement);
  if (index > -1) { // only splice array when item is found
  toDoStorage.splice(index, 1); // 2nd parameter means remove one item only
  }
  localStorage.setItem("tasks",JSON.stringify(toDoStorage));
}

function getStorage(){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks.length);
    console.log(tasks);
  }
  return tasks;
}

function clickElement(e){
  e.preventDefault();
  let newElement = e.target;
  if(newElement.id === "newElement"){
    if(newElement.style.textDecoration === "line-through"){
      newElement.style.textDecoration = "none";
      newElement.style.backgroundColor = "white";
    }else{
      newElement.style.textDecoration = "line-through";
      newElement.style.backgroundColor = " rgba(13, 156, 8, 0.884)";
    }
    
  }else if(newElement.className === "glyphicon glyphicon-remove"){
    let deleteElement = newElement.parentElement.parentElement;
    deleteElement.remove();
    deleteStorage(deleteElement.textContent);
    
  }
}
