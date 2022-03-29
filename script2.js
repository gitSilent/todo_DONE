(function () {
  let countNotes;
  function createAppTitle(title) {
    //создаем и возвращаем заголовок приложения
    let h1 = document.createElement("h1");
    h1.classList.add("h1");
    h1.textContent = title;
    console.log(title);
    return h1;
  }

  function createTodoItemForm() {
    //создаем и возвращаем форму для создания дела
    let form = document.createElement("form");
    let input = document.createElement("input");
    let divBtnAdd = document.createElement("div");
    let btnAdd = document.createElement("button");

    form.classList.add("input-group");

    form.classList.add("divEnter");
    // divTodo.append(form);

    input.classList.add("form-control");
    input.setAttribute("placeholder", "Enter a new note");
    form.append(input);

    divBtnAdd.classList.add("input-group-append");
    form.append(divBtnAdd);

    btnAdd.classList.add("btnAdd");
    btnAdd.classList.add("btn-primary");
    btnAdd.setAttribute("disabled", "disabled");
    divBtnAdd.append(btnAdd);
    btnAdd.textContent = "ADD NOTE";
    // btnAdd.setAttribute("disabled", "disabled");

    return {
      form,
      input,
      btnAdd,
    };
  }

  function createTodoList() {
    //создаем и возвращаем список элементов
    let divList = document.createElement("div");
    let ul = document.createElement("ul");

    divList.classList.add("divList");
    // divTodo.append(divList);

    ul.classList.add("ul");
    // divList.appendChild(ul);

    return {
      divList,
      ul,
    };
  }
  function refreshStorage(container){ // обновление данных в localStorage
    let AllLi = container.querySelectorAll('#li');
    masObj.splice(0,masObj.length);
    let obj={};
    for (let i of AllLi){
      console.log(i.querySelector("#p_note").textContent);
      let pContent = i.querySelector("#p_note").textContent;
      let pStatus = false;
      if (i.querySelector("#divNote").className == "backColor"){
        pStatus = true;
      }
      masObj.push({
        content: pContent,
            status: pStatus
      });
    }
    
    console.log(masObj);
}

  function pullFromStorage(storageName, container, TodoList) { //выгрузка данных из localStorage
    console.log(storageName)
    if (JSON.parse(localStorage.getItem(storageName)) != null) {
      masObj = JSON.parse(localStorage.getItem(storageName));
    } else {
      masObj = []
    }
    //     { content: "contentFirst", status: true },
    //     { content: "contentSecond", status: false },
    //     { content: "contentThird", status: false },
    //     { content: "contentFourth", status: false },
    //   ];
    // } else if (storageName == "dadStorage") {
    //   masObj = [
    //     { content: "contentFirst", status: true },
    //     { content: "contentSecond", status: false },
    //     { content: "contentThird", status: false },
    //   ];
    // } else if (storageName == "mumStorage") {
    //   masObj = [
    //     { content: "contentFirst", status: true },
    //     { content: "contentSecond", status: false },
    //   ];
    // }
    try{
    countNotes = masObj.length;
    } catch {countNotes = 0}
    // console.log("cnotes", countNotes)
    // console.log('mas obj = ', masObj);
    for (let i =0;i<countNotes;i++){
      console.log(masObj[i].content)
      if(masObj[i].status == true){
        createTodoItems(countNotes, masObj[i].content, container,storageName,true);
      } else{
        createTodoItems(countNotes, masObj[i].content, container,storageName,false);
      }
    }
    if (countNotes > 0){
      createDeleteAll(container, TodoList,storageName);
    }
  }


  function createTodoItems(cNotes, inputValue, container, storageName,status) {
    //создаем и возвращаем элемент списка

    event.preventDefault();
    // console.log("контейнер", container)
    let ul = container.querySelector(".ul");
    let li = document.createElement("li");
    li.setAttribute("id", `li`);
    li.classList.add(`divEnter${cNotes}`);
    ul.appendChild(li);
    li.addEventListener("click", (e) => {
      console.log(e.target)
      if (e.target.getAttribute("id") == "buttonDone") {
        e.target.closest("#divNote").classList.toggle("backColor");
        refreshStorage(container);
        localStorage.setItem(storageName, JSON.stringify(masObj));

      }
      if (e.target.getAttribute("id") == "buttonDelete") {
        if (confirmDel() == true) {
          countNotes -= 1;
          e.target.closest("#li").remove();
          console.log(countNotes);
          
          refreshStorage(container);
          localStorage.setItem(storageName, JSON.stringify(masObj));

          
          if (countNotes == 0) {
            document.querySelector("#btnDelAll").remove();
          }
        }
      }
    });


    let divNote = document.createElement("div");
    divNote.setAttribute("id", `divNote`);
    li.append(divNote);
    if (status) {divNote.classList.add("backColor")}

    let p_note = document.createElement("p");
    p_note.setAttribute("id", `p_note`);
    p_note.classList.add(`${countNotes}_li`);
    p_note.classList.add(`p_note${countNotes}`);
    divNote.append(p_note);
    p_note.textContent = inputValue;

    let divButtons = document.createElement("div");
    divButtons.setAttribute("id", `divButtons`);
    divButtons.classList.add(`divButtons${countNotes}`);
    divNote.append(divButtons);

    let buttonDone = document.createElement("button");
    buttonDone.setAttribute("id", `buttonDone`);
    buttonDone.classList.add(`buttonDone${countNotes}`);
    buttonDone.classList.add("btn-success");
    divButtons.append(buttonDone);
    buttonDone.textContent = "Done";

    let buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("id", `buttonDelete`);
    buttonDelete.classList.add(`buttonDelete${countNotes}`);
    buttonDelete.classList.add("btn-danger");
    divButtons.append(buttonDelete);
    buttonDelete.textContent = "Delete";

    console.log(countNotes);

    return {
      li,
      divNote,
      p_note,
      divButtons,
      buttonDone,
      buttonDelete,
    };
  }
  function confirmDel() {
    // функция подтверждения удаления записи

    if (confirm("Вы действительно хотите удалить запись?")) {
      return true;
    } else {
      return false;
    }
  }

  function confirmDelAll() {
    // функция подтверждения удаления всех записей

    if (confirm("Вы действительно хотите удалить ВСЕ записи?")) {
      return true;
    } else {
      return false;
    }
  }

  function createDeleteAll(container, TodoList,storageName) {
    let btnDelAll = document.createElement("button");
    //функция создания кнопки удаления всех записей

    btnDelAll.setAttribute("id", "btnDelAll");
    btnDelAll.textContent = "DELETE ALL";
    btnDelAll.classList.add("btnDelAll");
    btnDelAll.classList.add("btn-danger");
    if (container.querySelector("#btnDelAll") == null) {
      TodoList.divList.append(btnDelAll);
      btnDelAll.addEventListener("click", () => {
        if (confirmDelAll()) {
          for (let i = 0; i < countNotes; i++) {
            let liElem = document.getElementById("li");
            liElem.remove();
          }
          countNotes = 0;
          masObj = [];
          localStorage.setItem(storageName, JSON.stringify(masObj));

          document.querySelector("#btnDelAll").remove();
        }
      });
    }
    return {
      btnDelAll,
    };
  }

  let masObj = [];

  function createApp(titleName, contClass, storageName) {
    countNotes = 0;

    const container = document.querySelector(contClass);

    const h1 = createAppTitle(titleName);
    container.append(h1);

    const TodoItemForm = createTodoItemForm();
    container.append(TodoItemForm.form);

    const TodoList = createTodoList();
    container.append(TodoList.divList);
    TodoList.divList.append(TodoList.ul);

    const TodoItems = createTodoItems;

    const deleteAll = createDeleteAll;

    const delAll = createDeleteAll;

    pullFromStorage(storageName, container, TodoList);

    setInterval(() => {
      if (TodoItemForm.input.value.length > 0) {
        TodoItemForm.btnAdd.removeAttribute("disabled");
        TodoItemForm.btnAdd.classList.remove("disabledAdd");
      } else {
        TodoItemForm.btnAdd.setAttribute("disabled", "disabled");
        TodoItemForm.btnAdd.classList.add("disabledAdd")
      }

    }, 100);
    // TodoItemForm.input.addEventListener("input", () => {
    //   if (TodoItemForm.input.value.length > 0) {
    //     TodoItemForm.btnAdd.removeAttribute("disabled");
    //   } 
    // })

    TodoItemForm.form.addEventListener("submit", function (e) {
        TodoItemForm.btnAdd.setAttribute("disabled", "disabled");
        event.preventDefault();
      if (TodoItemForm.input.value != "") {
        countNotes = +1;
        createTodoItems(
          countNotes,
          TodoItemForm.input.value,
          container,
          storageName,
          false
        );
        // obj.content = TodoItemForm.input.value;
        masObj.push({
          content: TodoItemForm.input.value,
          status: false,
        });
        localStorage.setItem(storageName, JSON.stringify(masObj));
        console.log(masObj);
        TodoItemForm.input.value = "";
        deleteAll(container, TodoList, storageName);
      }
      
    });
  }

  // document.addEventListener("DOMContentLoaded", function () {
  //   // createApp(document.title, ".todo");
    
  // });

  window.createApp = createApp;
})();

