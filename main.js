window.addEventListener("click", (event) => {
  let dropdown = event.target.closest(".Dropdown");
  if (dropdown) {
    if (!dropdown.classList.contains("is-open")) {
      function turnOffListener() {
        dropdown.classList.remove("is-open");
        window.removeEventListener("click", closeDropdown);
        console.log("%ccerrado", "color: lightcoral");
      }
      function closeDropdown(prm_event_2) {
        if (dropdown.contains(prm_event_2.target)) {
          // Cierra el dropdown
          if (
            prm_event_2.target.closest(".Dropdown-toggle .bx") ||
            prm_event_2.target.closest(".Dropdown-menu-header .bx")
          ) {
            turnOffListener();
          }
          // Selecciona una opción
          if (prm_event_2.target.closest(".Dropdown-menu-list-option")) {
            prm_event_2.target
              .closest(".Dropdown-menu-list")
              .childNodes.forEach((node_item) => {
                if (node_item.nodeType === 1) {
                  node_item.classList.remove("is-selected");
                }
              });
            prm_event_2.target.classList.add("is-selected");
            turnOffListener();
          }
        } else {
          // Cierra el dropdown al dar clic fuera
          turnOffListener();
        }
      }
      dropdown.classList.add("is-open");
      window.addEventListener("click", closeDropdown);
      console.log("%cabierto", "color: lightgreen");
    }
  } else {
    console.log(dropdown);
  }
});
