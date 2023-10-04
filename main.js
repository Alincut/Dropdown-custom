// Actividad del menu desplegable
function startDropdown(first_event) {
  let dropdown = first_event.target.closest(".Dropdown");
  if (dropdown && !dropdown.classList.contains("is-open")) {
    function closeDropdown() {
      dropdown.classList.remove("is-open");
      window.removeEventListener("click", manageClicksInDropdown);
      window.removeEventListener("keydown", manageKeydownsInDropdown);
      console.log("%ccerrado", "color: lightcoral");
    }
    function manageClicksInDropdown(second_event) {
      const clicked_element = second_event.target;
      if (
        !dropdown.contains(clicked_element) ||
        clicked_element.closest(".Dropdown-toggle .bx") ||
        clicked_element.closest(".Dropdown-menu-header .bx")
      ) {
        closeDropdown();
      } else {
        const picked_option = clicked_element.closest(
          ".Dropdown-menu-list-option"
        );
        if (picked_option) {
          dropdown
            .querySelectorAll(".Dropdown-menu-list-option")
            .forEach((option) => {
              option === picked_option
                ? option.classList.add("is-selected")
                : option.classList.remove("is-selected");
            });
          [".Dropdown-toggle-search", 'input[type="hidden"]'].forEach(
            (class_selector) => {
              dropdown.querySelector(class_selector).value =
                picked_option.innerText;
            }
          );
          closeDropdown();
        }
      }
    }
    function manageKeydownsInDropdown(third_event) {
      let option_list = Array.from(
        dropdown.querySelectorAll(".Dropdown-menu-list-option")
      );
      // console.log(
      //   option_list.indexOf(
      //     option_list.filter((item) =>
      //       item.matches(".Dropdown-menu-list-option.is-selected")
      //     )[0]
      //   )
      // );

      // Obtiene la opción seleccionada actualmente
      // const active_option = dropdown.querySelector(
      //   ".Dropdown-menu-list-option.is-active"
      // );
      // if (!selectOption) {
      //   selectOption = option_list[0];
      // }
      // Obtiene el índice de la opción seleccionada actualmente
      // const selectedIndex = option_list.indexOf(active_option);
      // console.log(selectedIndex);
      // Mueve el índice hacia arriba o hacia abajo según la tecla presionada
      // let active_index = selectedIndex;
      let selected_index = option_list.indexOf(
        option_list.filter((item) =>
          item.matches(".Dropdown-menu-list-option.is-selected")
        )[0]
      );
      let active_index = option_list.indexOf(
        option_list.filter((item) =>
          item.matches(".Dropdown-menu-list-option.is-active")
        )[0]
      );
      selected_index = -1 ? active_index : (active_index = selected_index);
      console.log(active_index);
      switch (third_event.keyCode) {
        case 40:
          active_index++;
          break;
        case 38:
          active_index--;
          break;
      }
      console.log(active_index);
      // if (third_event.key === "ArrowDown") {
      //   active_index++;
      //   console.log(active_index);
      // } else if (third_event.key === "ArrowUp") {
      //   active_index--;
      //   console.log(active_index);
      // }
      // // Previene que el índice salga de los límites de la lista de opciones
      // if (active_index < 0) {
      //   active_index = options.length - 1;
      // } else if (active_index >= options.length) {
      //   active_index = 0;
      // }
      // // Selecciona la nueva opción
      // const newSelectedOption = options[active_index];
      // newSelectedOption.classList.add("is-active");
      // if (active_option) {
      //   active_option.classList.remove("is-active");
      // }
      // // Scrollea la lista de opciones para que la nueva opción seleccionada sea visible
      // menu_list.scrollTop = active_index * 36;
      // // Selecciona la opción
      // if (prm_event_3.keyCode === 13) {
      //   options[active_index].classList.add("is-selected");
      //   close();
      // }
    }
    dropdown.classList.add("is-open");
    window.addEventListener("click", manageClicksInDropdown);
    window.addEventListener("keydown", manageKeydownsInDropdown);
    console.log("%cabierto", "color: lightgreen");
    // dropdown.addEventListener("focusout", closeDropdown);
  }
}

// Escuchadores globales
window.addEventListener("click", startDropdown);
// window.addEventListener("focusin", startDropdown);
