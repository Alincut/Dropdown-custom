function dropdownActivity(opening_event) {
  let dropdown = opening_event.target.closest(".Dropdown");
  if (dropdown && !dropdown.classList.contains("is-open")) {
    function turnOffListeners() {
      dropdown.classList.remove("is-open");
      window.removeEventListener("click", closeDropdown);
      // window.removeEventListener("keydown", selectOption);
      console.log("%ccerrado", "color: lightcoral");
    }
    //   function selectOption(prm_event_3) {
    //     // Obtiene la lista de opciones del menú desplegable
    //     const dropdown = prm_event_3.target.closest(".Dropdown");
    //     const menu_list = dropdown.querySelector(".Dropdown-menu-list");
    //     console.log(menu_list);
    //     const options = menu_list.querySelectorAll(
    //       ".Dropdown-menu-list-option"
    //     );
    //     let array = [];
    //     options.forEach((item) => array.push(item));
    //     console.log(options);
    //     console.log(array);
    //     // Obtiene la opción seleccionada actualmente
    //     const selectedOption = menu_list.querySelector(
    //       ".Dropdown-menu-list-option.is-active"
    //     );
    //     if (!selectOption) {
    //       selectOption = array[0];
    //     }
    //     // Obtiene el índice de la opción seleccionada actualmente
    //     const selectedIndex = array.indexOf(selectedOption);
    //     console.log(selectedIndex);
    //     // Mueve el índice hacia arriba o hacia abajo según la tecla presionada
    //     let newIndex = selectedIndex;
    //     if (prm_event_3.key === "ArrowDown") {
    //       newIndex++;
    //     } else if (prm_event_3.key === "ArrowUp") {
    //       newIndex--;
    //     }
    //     // Previene que el índice salga de los límites de la lista de opciones
    //     if (newIndex < 0) {
    //       newIndex = options.length - 1;
    //     } else if (newIndex >= options.length) {
    //       newIndex = 0;
    //     }
    //     // Selecciona la nueva opción
    //     const newSelectedOption = options[newIndex];
    //     newSelectedOption.classList.add("is-active");
    //     if (selectedOption) {
    //       selectedOption.classList.remove("is-active");
    //     }
    //     // Scrollea la lista de opciones para que la nueva opción seleccionada sea visible
    //     menu_list.scrollTop = newIndex * 36;
    //     // Selecciona la opción
    //     if (prm_event_3.keyCode === 13) {
    //       options[newIndex].classList.add("is-selected");
    //       turnOffListeners();
    //     }
    //   }
    function closeDropdown(closing_event) {
      if (dropdown.contains(closing_event.target)) {
        //       // Cierra el dropdown
        //       if (
        //         prm_event_2.target.closest(".Dropdown-toggle .bx") ||
        //         prm_event_2.target.closest(".Dropdown-menu-header .bx")
        //       ) {
        //         turnOffListeners();
        //       }
        //       // Selecciona una opción
        //       const option = prm_event_2.target.closest(
        //         ".Dropdown-menu-list-option"
        //       );
        //       if (option) {
        //         let arr = [];
        //         const menu_list = prm_event_2.target.closest(".Dropdown-menu-list");
        //         menu_list.childNodes.forEach((node_item) => {
        //           if (node_item.nodeType === 1) arr.push(node_item);
        //         });
        //         arr.forEach((element) => {
        //           element.classList.remove("is-selected");
        //           if (option == element) {
        //             element.classList.add("is-selected");
        //             menu_list.scrollTop = arr.indexOf(element) * 36;
        //           }
        //         });
        //         turnOffListeners();
        //       }
      } else {
        // Cierra el dropdown al dar clic fuera
        turnOffListeners();
      }
    }
    dropdown.classList.add("is-open");
    window.addEventListener("click", closeDropdown);
    //   window.addEventListener("keydown", selectOption);
    console.log("%cabierto", "color: lightgreen");
  }
}

window.addEventListener("click", dropdownActivity);
window.addEventListener("focusin", dropdownActivity);

// window.addEventListener("click", (event) => {
//   let dropdown = event.target.closest(".Dropdown");
//   console.log(dropdown);
//   if (dropdown) {
//     if (!dropdown.classList.contains("is-open")) {
//       function turnOffListeners() {
//         dropdown.classList.remove("is-open");
//         window.removeEventListener("click", closeDropdown);
//         window.removeEventListener("keydown", selectOption);
//         console.log("%ccerrado", "color: lightcoral");
//       }
//       function selectOption(prm_event_3) {
//         // Obtiene la lista de opciones del menú desplegable
//         const dropdown = prm_event_3.target.closest(".Dropdown");
//         const menu_list = dropdown.querySelector(".Dropdown-menu-list");
//         console.log(menu_list);
//         const options = menu_list.querySelectorAll(
//           ".Dropdown-menu-list-option"
//         );
//         let array = [];
//         options.forEach((item) => array.push(item));
//         console.log(options);
//         console.log(array);

//         // Obtiene la opción seleccionada actualmente
//         const selectedOption = menu_list.querySelector(
//           ".Dropdown-menu-list-option.is-active"
//         );
//         if (!selectOption) {
//           selectOption = array[0];
//         }

//         // Obtiene el índice de la opción seleccionada actualmente
//         const selectedIndex = array.indexOf(selectedOption);
//         console.log(selectedIndex);

//         // Mueve el índice hacia arriba o hacia abajo según la tecla presionada
//         let newIndex = selectedIndex;
//         if (prm_event_3.key === "ArrowDown") {
//           newIndex++;
//         } else if (prm_event_3.key === "ArrowUp") {
//           newIndex--;
//         }

//         // Previene que el índice salga de los límites de la lista de opciones
//         if (newIndex < 0) {
//           newIndex = options.length - 1;
//         } else if (newIndex >= options.length) {
//           newIndex = 0;
//         }

//         // Selecciona la nueva opción
//         const newSelectedOption = options[newIndex];
//         newSelectedOption.classList.add("is-active");
//         if (selectedOption) {
//           selectedOption.classList.remove("is-active");
//         }

//         // Scrollea la lista de opciones para que la nueva opción seleccionada sea visible
//         menu_list.scrollTop = newIndex * 36;

//         // Selecciona la opción
//         if (prm_event_3.keyCode === 13) {
//           options[newIndex].classList.add("is-selected");
//           turnOffListeners();
//         }
//       }
//       function closeDropdown(prm_event_2) {
//         if (dropdown.contains(prm_event_2.target)) {
//           // Cierra el dropdown
//           if (
//             prm_event_2.target.closest(".Dropdown-toggle .bx") ||
//             prm_event_2.target.closest(".Dropdown-menu-header .bx")
//           ) {
//             turnOffListeners();
//           }
//           // Selecciona una opción
//           const option = prm_event_2.target.closest(
//             ".Dropdown-menu-list-option"
//           );
//           if (option) {
//             let arr = [];
//             const menu_list = prm_event_2.target.closest(".Dropdown-menu-list");
//             menu_list.childNodes.forEach((node_item) => {
//               if (node_item.nodeType === 1) arr.push(node_item);
//             });
//             arr.forEach((element) => {
//               element.classList.remove("is-selected");
//               if (option == element) {
//                 element.classList.add("is-selected");
//                 menu_list.scrollTop = arr.indexOf(element) * 36;
//               }
//             });
//             turnOffListeners();
//           }
//         } else {
//           // Cierra el dropdown al dar clic fuera
//           turnOffListeners();
//         }
//       }
//       dropdown.classList.add("is-open");
//       window.addEventListener("click", closeDropdown);
//       window.addEventListener("keydown", selectOption);
//       console.log("%cabierto", "color: lightgreen");
//     }
//   } else {
//     console.log(dropdown);
//   }
// });
