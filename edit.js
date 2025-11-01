const API_URL = "https://contacts-backend-qcyk.onrender.com/api/contacts";
const form = document.getElementById("editForm");

// Cargar contacto desde localStorage
const contact = JSON.parse(localStorage.getItem("editContact"));

form.firstName.value = contact.firstName;
form.lastName.value = contact.lastName;
form.email.value = contact.email;
form.phone.value = contact.phone;

// Guardar cambios
form.addEventListener("submit", async e => {
    e.preventDefault();
    const updated = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value
    };
    await fetch(`${API_URL}/${contact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    });
    localStorage.removeItem("editContact");
    window.location.href = "index.html"; // volver a la lista
});
