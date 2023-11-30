let ul = document.querySelector('ul')
let add = document.querySelector('.add')
let allDelete = document.querySelector('.allDelete');
let input = document.querySelector('#input')
let list = document.querySelector('.list')
let todos = [];

// string formatında gələn data əgər varsa massiv formatına dönüştürərək todos massivimizə bərabər edirik
const savedTodos = localStorage.getItem('todos');

if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderList();
  }

// renderList
function renderList(){
    list.innerHTML = '';
    todos.forEach((todo, index)=> {
        const li = document.createElement('li');
        li.classList.add('li')
        li.innerHTML = `
        <span onclick='deleteItem(event)' class="span"  data-id="${index}">${todo}</span>
        <button onclick='deleteItem(event)' class="delete"  data-id="${index}">Delete</button>
        `;
        list.appendChild(li);
    })
    // allDelete button disabled - enabledgit add
    if (todos.length == 0) {
        allDelete.setAttribute('disabled',true);
      } 
      else {
        allDelete.removeAttribute('disabled')
      }
      add.setAttribute('disabled',true)
      input.addEventListener('keyup',(event)=>{
          if(event.target.value){ 
              add.removeAttribute('disabled')
            if(todos.includes(event.target.value.trim())) {
                add.setAttribute('disabled',true)
            } else {
                add.removeAttribute('disabled')
            }

            }
            else{
                add.setAttribute('disabled',true)
            }
    // console.log(event.target.value);
     })
}

// tapşırıqları əlavə etmək
add.addEventListener('click', addItem);
function addItem(){
    const newList = input.value.trim();
    if (newList !== '') {
        todos.unshift(newList);
        input.value = '';
        // tapşırıqlarımızı 'todos' deyişkenine beraber edib daha sonra string formatında set edirik
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    renderList();
};

// tapşırıqları tək-tək silmək
function deleteItem(event){
    if (event.target.classList.contains('delete') || event.target.classList.contains('span')) {
        const listId = event.target.getAttribute('data-id');
        todos.splice(listId, 1);
        
        // tapşırıqlarımızı 'todos' deyişkenine beraber edib daha sonra string formatında set edirik
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    renderList();
        } 
        
        
        // tapşırıqları ümumi silmək
        allDelete.addEventListener('click', allDeleteItem);
        function allDeleteItem(){
            todos = [];
            localStorage.removeItem('todos');
            renderList();
        }


