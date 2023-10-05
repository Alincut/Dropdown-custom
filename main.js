// Actividad del menu desplegable
function startDropdown(event_1) {
  const dropdown = event_1.target.closest(".Dropdown");
  if (dropdown && !dropdown.classList.contains("is-open")) {
    const option_list = Array.from(
      dropdown.querySelectorAll(".Dropdown-menu-list-option")
    );
    option_list.forEach((option) => {
      option.classList.toggle(
        "is-focused",
        option.classList.contains("is-selected")
      );
    });
    function close() {
      dropdown.classList.remove("is-open");
      window.removeEventListener("click", handlingClicks);
      window.removeEventListener("keydown", handlingKeydowns);
      console.log("%ccerrado", "color: lightcoral");
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
          option_list.forEach((option) => {
            option === picked_option
              ? (option.classList.add("is-selected"),
                (dropdown.querySelector(".Dropdown-menu-list").scrollTop =
                  option_list.indexOf(option) * 36))
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
      // if (event_3.keyCode === 9) close();
      // let focused_option_index = option_list.findIndex((option) =>
      //   option.classList.contains("is-focused")
      // );
      // if (event_3.keyCode === 40) focused_option_index++;
      // if (event_3.keyCode === 38) focused_option_index--;
      // if (focused_option_index < 0) {
      //   focused_option_index = option_list.length - 1;
      // } else if (focused_option_index >= option_list.length) {
      //   focused_option_index = 0;
      // }
      // option_list.forEach((option) => {
      //   option.classList.toggle(
      //     "is-focused",
      //     option === option_list[focused_option_index]
      //   );
      // });
      // dropdown.querySelector(".Dropdown-menu-list").scrollTop =
      //   focused_option_index * 36;
      // if (event_3.keyCode === 13) {
      //   option_list.forEach((option) => {
      //     option.classList.toggle(
      //       "is-selected",
      //       option === option_list[focused_option_index]
      //     );
      //   });
      //   [".Dropdown-toggle-search", 'input[type="hidden"]'].forEach(
      //     (class_selector) => {
      //       dropdown.querySelector(class_selector).value =
      //         option_list[focused_option_index].innerText;
      //     }
      //   );
      //   close();
      // }

      let focused_option_index = option_list.findIndex((option) =>
        option.classList.contains("is-focused")
      );
      switch (event_3.keyCode) {
        case 9:
          close();
          break;
        case 40:
        case 38:
          focused_option_index =
            event_3.keyCode === 40
              ? (focused_option_index + 1) % option_list.length
              : (focused_option_index - 1 + option_list.length) %
                option_list.length;
          option_list.forEach((option) => {
            option.classList.toggle(
              "is-focused",
              option === option_list[focused_option_index]
            );
          });
          dropdown.querySelector(".Dropdown-menu-list").scrollTop =
            focused_option_index * 36;
          break;
        case 13:
          option_list.forEach((option) => {
            option.classList.toggle(
              "is-selected",
              option === option_list[focused_option_index]
            );
          });
          [".Dropdown-toggle-search", 'input[type="hidden"]'].forEach(
            (class_selector) => {
              dropdown.querySelector(class_selector).value =
                option_list[focused_option_index].innerText;
            }
          );
          close();
          break;
        default:
          break;
      }
    }
    dropdown.classList.add("is-open");
    window.addEventListener("click", handlingClicks);
    window.addEventListener("keydown", handlingKeydowns);
    console.log("%cabierto", "color: lightgreen");
  }
}

// Escuchadores globales
window.addEventListener("click", startDropdown);
window.addEventListener("focusin", startDropdown);
window.addEventListener("submit", (event) => event.preventDefault());
