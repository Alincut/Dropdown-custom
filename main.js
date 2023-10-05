// Actividad del menu desplegable
function startDropdown(event_1) {
  let dropdown = event_1.target.closest(".Dropdown");
  if (dropdown && !dropdown.classList.contains("is-open")) {
    function close() {
      dropdown.classList.remove("is-open");
      window.removeEventListener("click", handlingClicks);
      window.removeEventListener("keydown", handlingKeydowns);
      console.log("%ccerrado", "color: lightcoral");
    }
    function other(params) {
      console.log(params);
    }
    function handlingClicks(event_2) {
      const clicked_element = event_2.target;
      if (
        !dropdown.contains(clicked_element) ||
        clicked_element.closest(".Dropdown-toggle .bx") ||
        clicked_element.closest(".Dropdown-menu-header .bx")
      ) {
        close();
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
          close();
        }
      }
    }
    function handlingKeydowns(event_3) {
      let option_list = Array.from(
        dropdown.querySelectorAll(".Dropdown-menu-list-option")
      );
      let focused_option_index = option_list.indexOf(
        option_list.filter((item) =>
          item.matches(".Dropdown-menu-list-option.is-focused")
        )[0]
      );
      if (event_3.keyCode === 40) focused_option_index++;
      if (event_3.keyCode === 38) focused_option_index--;
      if (focused_option_index < 0) {
        focused_option_index = option_list.length - 1;
      } else if (focused_option_index >= option_list.length) {
        focused_option_index = 0;
      }
      option_list.forEach((option) => {
        option === option_list[focused_option_index]
          ? option.classList.add("is-focused")
          : option.classList.remove("is-focused");
      });
      dropdown.querySelector(".Dropdown-menu-list").scrollTop =
        focused_option_index * 36;
      if (event_3.keyCode === 13) {
        dropdown
          .querySelectorAll(".Dropdown-menu-list-option")
          .forEach((option) => {
            option === option_list[focused_option_index]
              ? option.classList.add("is-selected")
              : option.classList.remove("is-selected");
          });
        [".Dropdown-toggle-search", 'input[type="hidden"]'].forEach(
          (class_selector) => {
            dropdown.querySelector(class_selector).value =
              option_list[focused_option_index].innerText;
          }
        );
        close();
      }
    }
    const selected_option = dropdown.querySelector(
      ".Dropdown-menu-list-option.is-selected"
    );
    if (selected_option) {
      dropdown
        .querySelectorAll(".Dropdown-menu-list-option")
        .forEach((option) => {
          option === selected_option
            ? option.classList.add("is-focused")
            : option.classList.remove("is-focused");
        });
    } else {
      dropdown
        .querySelector(".Dropdown-menu-list-option")
        .classList.add("is-focused");
    }
    dropdown.classList.add("is-open");
    window.addEventListener("click", handlingClicks);
    window.addEventListener("keydown", handlingKeydowns);
    dropdown.addEventListener("focusout", other);
    console.log("%cabierto", "color: lightgreen");
  }
}

// Escuchadores globales
window.addEventListener("click", startDropdown);
window.addEventListener("focusin", startDropdown);
window.addEventListener("submit", (event) => event.preventDefault());
