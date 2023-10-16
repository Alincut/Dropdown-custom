// Componente: Single Search Selection Dropdown //

// Delegación de eventos //
function handleEvents(global_event) {
  global_event.stopPropagation();
  const dropdown = global_event.target.closest(".Dropdown");
  if (dropdown) {
    // Validar que el 'dropdown' esté cerrado.
    if (!dropdown.classList.contains("is-open")) {
      // Declaración de variables //
      const select = dropdown.querySelector(".Dropdown-select");
      const search = dropdown.querySelector(".Dropdown-search");
      const list = dropdown.querySelector(".Dropdown-list");
      const options = Array.from(dropdown.querySelectorAll(".Dropdown-option"));
      let filtered_options = [...options];
      let selected_option = options.find((option) => {
        return option.classList.contains("is-selected");
      });
      const option_height = options[0].clientHeight;
      const scroll_height =
        list.clientHeight - (list.clientHeight % option_height);
      let matching_options = 0;

      // Declaración de funciones //
      function close() {
        dropdown.classList.remove("is-open");
        dropdown.removeEventListener("click", process);
        search.removeEventListener("keydown", process);
        search.removeEventListener("keyup", process);
        list.removeEventListener("mousemove", process);
        search.blur();
        if (selected_option) {
          search.value = selected_option.children[0].innerText;
          search.placeholder = search.value;
        } else search.value = "";
        options.forEach((option) => {
          option.classList.remove("is-focused", "is-hidden");
        });
        list.classList.remove("is-short", "is-empty");
        console.log("%ccerrado", "color: lightcoral");
      }
      function filter() {
        options.forEach((option) => {
          option.innerText.toLowerCase().includes(search.value.toLowerCase())
            ? (matching_options++, option.classList.remove("is-hidden"))
            : option.classList.add("is-hidden");
        });
        list.classList.toggle("is-short", matching_options <= 5);
        list.classList.toggle("is-empty", matching_options === 0);
        filtered_options = options.filter(
          (option) => !option.classList.contains("is-hidden")
        );
        if (matching_options > 0) {
          filtered_options[0].classList.add("is-focused");
          matching_options = 0;
        }
      }
      function process(event) {
        event.stopPropagation();
        switch (event.type) {
          case "click":
            switch (event.target) {
              case dropdown.children[0]:
              case select.children[2]:
                close();
                break;
              case select.children[0]:
                search.focus();
                break;
              default:
                selected_option = event.target.closest(".Dropdown-option");
                if (options.includes(selected_option)) {
                  // options.forEach((option) => {
                  //   option.classList.toggle(
                  //     "is-selected",
                  //     option === selected_option
                  //   );
                  // });
                  options.forEach((option) => {
                    option.classList.remove("is-selected");
                  });
                  selected_option.classList.add("is-selected");
                  search.value = selected_option.children[0].innerText;
                  search.placeholder = search.value;
                  close();
                }
                break;
            }
            break;
          case "keydown":
            switch (event.keyCode) {
              case 27:
              case 9:
                close();
                break;
              case 40:
              case 38:
              case 13:
                event.preventDefault();
                let focused_option_index = filtered_options.findIndex(
                  (option) => option.classList.contains("is-focused")
                );
                if (event.keyCode === 13) {
                  selected_option = filtered_options[focused_option_index];
                  if (options.includes(selected_option)) {
                    options.forEach((option) => {
                      option.classList.toggle(
                        "is-selected",
                        option === selected_option
                      );
                    });
                    search.value = selected_option.innerText;
                    search.placeholder = selected_option.innerText;
                    close();
                  }
                } else {
                  filtered_options[focused_option_index].classList.remove(
                    "is-focused"
                  );
                  focused_option_index = Math.max(
                    0,
                    Math.min(
                      focused_option_index + (event.keyCode === 40 ? 1 : -1),
                      filtered_options.length - 1
                    )
                  );
                  filtered_options[focused_option_index].classList.add(
                    "is-focused"
                  );
                  let new_scroll = focused_option_index * option_height;
                  let difference = new_scroll - list.scrollTop;
                  list.scrollTop +=
                    option_height *
                    (difference < 0 ? -1 : difference >= scroll_height ? 1 : 0);
                }
                break;
            }
            break;
          case "keyup":
            if (![27, 9, 40, 38].includes(event.keyCode)) {
              options.forEach((option) => {
                option.classList.remove("is-focused");
              });
              filter();
            }
            break;
          case "mousemove":
            if (options.includes(event.target)) {
              options.forEach((option) => {
                option.classList.toggle("is-focused", option === event.target);
              });
            }
            break;
        }
      }

      // Script de apertura //
      dropdown.classList.add("is-open");
      dropdown.addEventListener("click", process);
      search.addEventListener("keydown", process);
      search.addEventListener("keyup", process);
      list.addEventListener("mousemove", process);
      search.value = "";
      search.focus();
      if (selected_option) {
        selected_option.classList.add("is-focused");
        list.scrollTop = option_height * options.indexOf(selected_option);
      } else filtered_options[0].classList.add("is-focused");
      console.log("%cabierto", "color: lightgreen");
    }
  }
}

// Escuchadores globales //
document.addEventListener("click", handleEvents);
document.addEventListener("focusin", handleEvents);
document.addEventListener("submit", (event) => event.preventDefault());

function dark() {
  document.querySelector("body").classList.add("is-dark");
}
