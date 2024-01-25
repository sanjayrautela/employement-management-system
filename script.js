const modalToggleButton = document.getElementById("modal-toggle-btn");
const modal = document.getElementById("modal");
const closeIcon = document.getElementById("close-icon");
const form = document.getElementById("employee-form");

const tableBody = document.querySelector("#employee-list > tbody");

let inc = 1;
function getNewId() {
    return inc++;
}

function deleteRecord(e) {
    console.log("delete record", e.target);
    const rowToDelete = e.target.closest("tr");
    if (rowToDelete) {
        rowToDelete.remove();
    }
}

function editRecord(e) {
    const rowToEdit = e.target.closest("tr");
    if (rowToEdit) {
        const cells = rowToEdit.children;
        form.fullName.value = cells[0].innerText;
        form.email.value = cells[1].innerText;
        form.role.value = cells[3].innerText;
        form.doj.value = cells[4].innerText;
        form.gender.value = cells[5].innerText;
    }
}




function toggleModal() {
    modal.classList.toggle("hide-modal");
    modal.classList.toggle("show-modal");
}

function createNewEmployeeRecord(employee) {
    const record = document.createElement("tr");
    for (let key in employee) {
        const cell = document.createElement("td");
        cell.innerText = employee[key];
        record.appendChild(cell);
    }

    const options = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.className = "material-icons";
    editButton.addEventListener("click", editRecord);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.className = "material-icons";
    deleteButton.addEventListener("click", deleteRecord);

    editButton.addEventListener("click", editRecord);

    options.append(editButton, deleteButton);

    record.appendChild(options);
    tableBody.appendChild(record);
}



modalToggleButton.addEventListener("click", toggleModal);
closeIcon.addEventListener("click", toggleModal);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const employee = {
        name: form.fullName.value,
        email: form.email.value,
        id: getNewId(),
        role: form.role.value,
        doj: form.doj.value,
        gender: form.gender.value,
    };

    createNewEmployeeRecord(employee);

    console.log(employee);

    form.reset();
    toggleModal();
});
