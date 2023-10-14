// Componente: Single Search Selection Dropdown //

// Delegación de eventos //
function handleEvents(global_event) {
  const dropdown = global_event.target.closest(".Dropdown");
  if (dropdown) {
    // Validación de apertura.
    if (
      // Validar que no se haya dado clic en el elemento 'outside'.
      global_event.target != dropdown.children[0] &&
      // Validar que el 'dropdown' esté cerrado.
      !dropdown.classList.contains("is-open")
    ) {
      // 1. Obtener elementos.
      const select = dropdown.querySelector(".Dropdown-select");
      const search_icon = select.children[0];
      const search = select.children[1];
      const switch_icon = select.children[2];
      const list = dropdown.querySelector(".Dropdown-list");
      const options = Array.from(list.children).filter(
        (option) => !option.classList.contains("Dropdown-option--message")
      );

      // 2. Declarar variables generales.
      const option_height = options[0].clientHeight;
      let selected_option = options.find((option) =>
        option.classList.contains("is-selected")
      );
      let filtered_options = options.filter(
        (option) => !option.classList.contains("is-hidden")
      );
      let matching_options = 0;

      // 3. Declaración de funciones utilitarias.
      function close() {
        dropdown.classList.remove("is-open");
        dropdown.removeEventListener("click", process);
        search.removeEventListener("keydown", process);
        search.removeEventListener("keyup", process);
        list.removeEventListener("mousemove", process);
        search.blur();
        if (search.value === "") {
          selected_option = options.find((option) =>
            option.classList.contains("is-selected")
          );
          if (selected_option) {
            search.value = selected_option.innerText;
            search.placeholder = selected_option.innerText;
          }
        }
        options.forEach((option) => {
          option.classList.remove("is-focused");
        });
        console.log("%ccerrado", "color: lightcoral");
      }
      function filter() {
        matching_options = 0;
        options.forEach((option) => {
          let match_value = option.innerText
            .toLowerCase()
            .includes(search.value.toLowerCase());
          option.classList.toggle("is-hidden", !match_value);
          if (match_value) matching_options++;
        });
        console.log(matching_options);
        list.classList.toggle("is-short", matching_options <= 5);
        list.classList.toggle("is-empty", matching_options === 0);
        filtered_options = options.filter(
          (option) => !option.classList.contains("is-hidden")
        );
        if (matching_options > 0) {
          filtered_options[0].classList.add("is-focused");
        }
        console.log(matching_options);
      }

      // 4. Script de procesamiento de acciones.
      function process(event) {
        event.stopPropagation();
        switch (event.type) {
          case "click":
            switch (event.target) {
              case dropdown.children[0]:
              case switch_icon:
                close();
                break;
              case search_icon:
                search.focus();
                break;
              default:
                const picked_option = event.target.closest(".Dropdown-option");
                if (options.includes(picked_option)) {
                  options.forEach((option) => {
                    option.classList.toggle(
                      "is-selected",
                      option === picked_option
                    );
                  });
                  search.value = picked_option.innerText;
                  search.placeholder = picked_option.innerText;
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
                event.preventDefault();
                let focused_option_index = filtered_options.findIndex(
                  (option) => option.classList.contains("is-focused")
                );
                console.log(filtered_options);
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
                // options.forEach((option) => {
                //   option.classList.toggle(
                //     "is-focused",
                //     option === options[focused_option_index]
                //   );
                // });
                // list.scrollTop = option_height * focused_option_index;
                // console.log(focused_option_index);
                break;
              default:
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

      // 5. Script de apertura.
      dropdown.classList.add("is-open");
      dropdown.addEventListener("click", process);
      search.addEventListener("keydown", process);
      search.addEventListener("keyup", process);
      list.addEventListener("mousemove", process);
      search.value = "";
      search.focus();
      filter();
      if (selected_option) {
        options.forEach((option) => {
          option.classList.toggle("is-focused", option === selected_option);
        });
      } else list.scrollTop = option_height * options.indexOf(selected_option);
      console.log("%cabierto", "color: lightgreen");
    }
  }
}

// Escuchadores globales
document.addEventListener("click", handleEvents);
document.addEventListener("focusin", handleEvents);
document.addEventListener("submit", (event) => event.preventDefault());
