// 

// Creamos la función de delegación de eventos
function handleEvents(global_event) {
  const dropdown = global_event.target.closest(".Dropdown");
}

function startDropdown(event_1) {
  const dropdown = event_1.target.closest(".Dropdown");
  if (dropdown && !dropdown.classList.contains("is-open")) {
    const search = dropdown.querySelector(".Dropdown-toggle-search");
    const menu = dropdown.querySelector(".Dropdown-menu");
    const list = dropdown.querySelector(".Dropdown-menu-list");
    const option_list = Array.from(
      dropdown.querySelectorAll(".Dropdown-menu-list-option")
    );
    function close() {
      dropdown.classList.remove("is-open");
      search.blur();
      document.removeEventListener("click", handlingEvents);
      document.removeEventListener("keydown", handlingEvents);
      document.removeEventListener("keyup", handlingEvents);
      console.log("%ccerrado", "color: lightcoral");
    }
    function handlingEvents(event) {
      function setClass(element, classname) {
        option_list.forEach((option) => {
          option.classList.toggle(classname, option === element);
        });
        list.scrollTop = option_list.indexOf(element) * 36;
      }
      function setValues(element) {
        [".Dropdown-toggle-search", "input[type='hidden']"].forEach(
          (class_selector) => {
            dropdown.querySelector(class_selector).value = element.innerText;
          }
        );
      }
      switch (event.type) {
        case "click":
          if (
            !dropdown.contains(event.target) ||
            event.target.closest(".Dropdown-toggle .bx") ||
            event.target.closest(".Dropdown-menu-header .bx")
          ) {
            close();
          } else {
            const picked_option = event.target.closest(
              ".Dropdown-menu-list-option"
            );
            if (picked_option) {
              setClass(picked_option, "is-selected");
              setValues(picked_option);
              close();
            }
          }
          break;
        case "keydown":
          // let matching_options_list = option_list.forEach(option => {

          // });
          let focus_index = option_list.findIndex((option) =>
            option.classList.contains("is-focused")
          );
          switch (event.keyCode) {
            case 9:
            case 13:
              if (event.keyCode === 13 && option_list[focus_index]) {
                setClass(option_list[focus_index], "is-selected");
                setValues(option_list[focus_index]);
              }
              close();
              break;
            case 40:
            case 38:
              focus_index = Math.max(
                0,
                Math.min(
                  focus_index + (event.keyCode === 40 ? 1 : -1),
                  option_list.length - 1
                )
              );
              setClass(option_list[focus_index], "is-focused");
              break;
          }
          break;
        case "keyup":
          let matching_options2 = 0;
          option_list.forEach((option) => {
            if (
              option.innerText
                .toLowerCase()
                .includes(search.value.toLowerCase())
            ) {
              option.classList.remove("is-hidden");
              matching_options2++;
            } else {
              option.classList.add("is-hidden");
            }
          });
          let first_option = option_list.find(
            (option) => !option.classList.contains("is-hidden")
          );
          option_list.forEach((option) => {
            option.classList.toggle("is-up", option === first_option);
          });
          list.classList.toggle("is-short", matching_options2 <= 5);
          menu.classList.toggle("is-empty", matching_options2 <= 0);
          break;
      }
    }
    option_list.forEach((option) => {
      option.classList.toggle(
        "is-focused",
        option.classList.contains("is-selected")
      );
    });
    let first_option = option_list.find(
      (option) => !option.classList.contains("is-hidden")
    );
    option_list.forEach((option) => {
      option.classList.toggle("is-up", option === first_option);
    });
    // Preparamos la lista
    search.value = "";
    // Abrir el menu desplegable
    dropdown.classList.add("is-open");
    let matching_options = 0;
    option_list.forEach((option) => {
      if (option.innerText.toLowerCase().includes(search.value.toLowerCase())) {
        option.classList.remove("is-hidden");
        matching_options++;
      } else {
        option.classList.add("is-hidden");
      }
    });
    list.classList.toggle("is-short", matching_options <= 5);
    menu.classList.toggle("is-empty", matching_options <= 0);
    document.addEventListener("click", handlingEvents);
    document.addEventListener("keydown", handlingEvents);
    document.addEventListener("keyup", handlingEvents);
    console.log("%cabierto", "color: lightgreen");
  }
}

// Establecemos los escuchadores globales
document.addEventListener("click", handleEvents);
document.addEventListener("focusin", handleEvents);
document.addEventListener("submit", (event) => event.preventDefault());
