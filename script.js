const API_URL = "http://localhost:8080/api/contacts"; // Cambia si lo subes online
const contactsList = document.getElementById("contacts");
const form = document.getElementById("contactForm");
const refreshBtn = document.getElementById("refreshBtn");

const searchInput = document.getElementById("searchInput");

// Cargar todos los contactos
async function loadContacts() {
    const query = searchInput.value.trim();
    let url = API_URL;

    if (query !== "") {
        url = `${API_URL}/search?query=${encodeURIComponent(query)}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    contactsList.innerHTML = "";
    data.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.firstName} ${c.lastName} - ${c.email || ""} ${c.phone || ""}`;
        
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons");
        //edit button
        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.onclick = () => {
            localStorage.setItem("editContact", JSON.stringify(c));
            window.location.href = "edit.html";
        };
        buttonsDiv.appendChild(edit);

        //delete button
        const del = document.createElement("button");
        del.textContent = "Delete";
        del.onclick = () => deleteContact(c.id);
        buttonsDiv.appendChild(del);

        li.appendChild(buttonsDiv);
        contactsList.appendChild(li);
    });
}

// Eliminar contacto
async function deleteContact(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadContacts();
}

// Añadir contacto
form.addEventListener("submit", async e => {
    e.preventDefault();
    const contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value
    };
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
    });
    form.reset();
    loadContacts();
});

refreshBtn.addEventListener("click", () => {
    loadContacts();
});

searchInput.addEventListener("input", () => {
    loadContacts();
});

// Inicializar
loadContacts();