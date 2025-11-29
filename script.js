// Load data from localStorage
let patients = JSON.parse(localStorage.getItem("patients")) || [];

const form = document.getElementById("patientForm");
const tableBody = document.querySelector("#patientTable tbody");
const clearBtn = document.getElementById("clearBtn");
const editIndex = document.getElementById("editIndex");

// Display patients in table
function displayPatients() {
  tableBody.innerHTML = "";
  patients.forEach((p, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.disease}</td>
      <td>
        <button class="editBtn" data-index="${index}">✏️ Edit</button>
        <button class="deleteBtn" data-index="${index}">🗑️ Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  localStorage.setItem("patients", JSON.stringify(patients));
}

// Add or update patient
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const disease = document.getElementById("disease").value;

  const patient = { id, name, age, disease };
  const index = editIndex.value;

  if (index === "") {
    if (patients.some(p => p.id === id)) {
      alert("Patient ID already exists!");
      return;
    }
    patients.push(patient);
  } else {
    patients[index] = patient;
    editIndex.value = "";
  }

  form.reset();
  displayPatients();
});

// Edit / Delete buttons
tableBody.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("editBtn")) {
    const p = patients[index];
    document.getElementById("id").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("age").value = p.age;
    document.getElementById("disease").value = p.disease;
    editIndex.value = index;
  } else if (e.target.classList.contains("deleteBtn")) {
    if (confirm("Delete this patient?")) {
      patients.splice(index, 1);
      displayPatients();
    }
  }
});

// Clear all
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all data?")) {
    patients = [];
    localStorage.removeItem("patients");
    displayPatients();
  }
});

// Initial load
displayPatients();
