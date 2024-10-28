const inputTask = document.querySelector("#task");
const buttonAdd = document.querySelector("#tarefa");
const atividades = document.querySelector(".atividades");
const edit = document.querySelector("#edit");
const inputSearch = document.querySelector("#inputSearch");
const select = document.querySelector("#select");

let itens = [];

buttonAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTask.value == "") {
  } else {
    //Criandos os elementos HTML
    const div = document.createElement("div");
    const span = document.createElement("span");
    const hr = document.createElement("hr");
    const buttonDone = document.createElement("button");
    const buttonEdit = document.createElement("button");
    const buttonRemove = document.createElement("button");
    //Colocando as classes nos botões
    buttonDone.classList.add("buttonDone");
    buttonEdit.classList.add("buttonEdit");
    buttonRemove.classList.add("buttonRemove");

    //Colocando os icons nos botões
    buttonDone.innerHTML =
      '<span class="material-symbols-outlined"> check </span>';
    buttonEdit.innerHTML =
      '<span class="material-symbols-outlined"> edit </span>';
    buttonRemove.innerHTML =
      ' <span class="material-symbols-outlined"> close </span>';
    //Colocando o valor do input no span
    span.innerHTML = inputTask.value;
    //Colocando as classes
    div.classList.add("divTask");
    //Colocando o status e o valor do span no objeto itens

    switch (select.value) {
      case "incomplete":
        itens.push({
          valor: span.innerHTML,
          stats: "incomplete",
          id: crypto.randomUUID(),
        });
        //Colocando os elementos no HTML
        div.appendChild(span);
        div.appendChild(buttonDone);
        div.appendChild(buttonEdit);
        div.appendChild(buttonRemove);
        div.appendChild(hr);

        atividades.appendChild(div);
        inputTask.value = "";
        break;
      case "done":
        div.classList.add("taskComplete");
        itens.push({
          valor: span.innerHTML,
          stats: "done",
          id: crypto.randomUUID(),
        });
        //Colocando os elementos no HTML
        div.appendChild(span);
        div.appendChild(buttonDone);
        div.appendChild(buttonEdit);
        div.appendChild(buttonRemove);
        div.appendChild(hr);

        atividades.appendChild(div);
        inputTask.value = "";
        break;
      default:
        itens.push({
          valor: span.innerHTML,
          stats: "incomplete",
          id: crypto.randomUUID(),
        });
        //Colocando os elementos no HTML
        div.appendChild(span);
        div.appendChild(buttonDone);
        div.appendChild(buttonEdit);
        div.appendChild(buttonRemove);
        div.appendChild(hr);

        atividades.appendChild(div);
        inputTask.value = "";
        break;
    }
  }
});

function filtrar() {
  let filter,
    divtask,
    span,
    i,
    txtValue,
    count = 0;

  //Filtro
  filter = inputSearch.value.toUpperCase();

  //pegar todas as divTask da atividades
  divtask = atividades.getElementsByTagName("div");

  //Percorrer todas as div
  for (i = 0; i < divtask.length; i++) {
    //Pegar a Tag span do elemento percorrido
    span = divtask[i].getElementsByTagName("span")[0];
    //Pegar o Texto dentro da nossa tag span
    txtValue = span.textContent || span.innerText;
    //Verificar se o que o usuario digitou bate com o texto da tag span
    if (
      (txtValue.toUpperCase().indexOf(filter) > -1 &&
        itens[i].stats == select.value) ||
      (select.value == "all" && txtValue.toUpperCase().indexOf(filter) > -1)
    ) {
      // indexOf == Ele faz uma verificação se dois valores são iguais a partir de um ponto de filtragem // se der certo ele retorna 1 se não -1
      //Valor bateu
      divtask[i].style.display = "";
    } else {
      //Não mostra o item da div
      divtask[i].style.display = "none";
    }
  }
}

document.addEventListener("click", (e) => {
  const targetEl = e.target;

  if (targetEl.classList.contains("material-symbols-outlined")) {
    const buttonClassDER = targetEl.parentElement;
    switch (true) {
      //Botão Done
      case buttonClassDER.classList.contains("buttonDone"):
        const divTask = buttonClassDER.parentElement;
        spanValue = buttonClassDER.previousElementSibling.innerText;
        itens.map((item) => {
          if (item.valor == spanValue) {
            divTask.classList.toggle("taskComplete");
            if (divTask.classList.contains("taskComplete")) {
              if (select.value == "incomplete") {
                divTask.style.display = "none";
              }
              item.stats = "done";
            } else {
              if (select.value == "done") {
                divTask.style.display = "none";
              }
              item.stats = "incomplete";
            }
          }
        });
        break;
      //Botão Remove
      case buttonClassDER.classList.contains("buttonRemove"):
        const divTaskRemove = buttonClassDER.parentElement;
        const spanValor =
          buttonClassDER.previousElementSibling.previousElementSibling
            .previousElementSibling.innerHTML;
        itens = itens.filter((item) => item.valor !== spanValor);
        divTaskRemove.remove();

        break;
      //Botão Edit
      case buttonClassDER.classList.contains("buttonEdit"):
        edit.classList.remove("hide");
        tarefa.classList.add("hide");
        const inputEdit = document.querySelector("#inputEdit");
        let spanTitle =
          buttonClassDER.previousElementSibling.previousElementSibling;
        itens.map((item) => {
          inputEdit.value = spanTitle.innerText;
          oldInputValue = inputEdit.value;
          const buttonOk = document.querySelector(".buttonOk");
          buttonOk.addEventListener("click", () => {
            if (spanTitle.innerText == oldInputValue) {
              item.valor = inputEdit.value;
              spanTitle.innerHTML = item.valor;
              edit.classList.add("hide");
              tarefa.classList.remove("hide");
            }
          });
        });
        const buttonCancel = document.querySelector(".buttonCancel");
        buttonCancel.addEventListener("click", () => {
          edit.classList.add("hide");
          tarefa.classList.remove("hide");
        });
        break;
    }
  }
});

function filter() {
  const selectedStats = select.value;

  for (i = 0; i < atividades.children.length; i++) {
    const divs = atividades.children[i];
    if (selectedStats == "all") {
      divs.style.display = "block";
    } else if (itens[i].stats !== selectedStats) {
      divs.style.display = "none";
    } else {
      divs.style.display = "block";
    }
  }
}
select.addEventListener("change", filter);
log;
