const students=[]
let editingStudent = null; // Variable to hold the student being edited

document.getElementById("studentform").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastname=document.getElementById("lastname").value.trim();
    const fecha=document.getElementById("fecha").value.trim();
    const grade=parseFloat(document.getElementById("grade").value)
    
    // Validate all fields, even if only one is being edited, to ensure data integrity
    if(grade<1 || grade>7 || !name || !lastname || isNaN(grade)){
        alert("error al ingresar los datos")
        return
    }

    if (editingStudent) {
        // Update existing student - only update fields that have changed
        const index = students.indexOf(editingStudent);
        if (index > -1) {
            const studentRow = tablebody.querySelector(`tr:nth-child(${index + 1})`); // Assuming table row order matches array order

            if (students[index].name !== name) {
                students[index].name = name;
                if (studentRow) studentRow.cells[0].textContent = name;
            }
            if (students[index].lastname !== lastname) {
                students[index].lastname = lastname;
                if (studentRow) studentRow.cells[1].textContent = lastname;
            }
            if (students[index].fecha !== fecha) {
                students[index].fecha = fecha;
                if (studentRow) studentRow.cells[2].textContent = fecha;
            }
            // Always update grade if it's valid, as it affects average
            if (students[index].grade !== grade) {
                 students[index].grade = grade;
                 if (studentRow) studentRow.cells[3].textContent = grade;
            }

            // Note: Finding the table row by index assumes array and table stay in sync.
            // A more robust solution would involve adding a unique ID to student objects
            // and setting a data-id attribute on table rows for reliable lookups.
        }
        editingStudent = null; // Reset editing state

    } else {
        // Add new student
        const student = {name, lastname, fecha, grade};
        students.push(student);
        addStudentToTable(student);
    }

    calculateAverage();
    this.reset();
});

const tablebody=document.querySelector("#studentstable tbody");

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastname}</td>
        <td>${student.fecha}</td>
        <td>${student.grade}</td>
        <td>
            <button class="delete-btn">Eliminar</button>
            <button class="edit-btn">Editar</button>
        </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function(){
        borrarEstudiante(student, row);
    });

    row.querySelector(".edit-btn").addEventListener("click", function(){
        editarEstudiante(student, row);
    });

    tablebody.appendChild(row);
}

function borrarEstudiante(student, row){
    const index = students.indexOf(student);
    if(index > -1){
        students.splice(index, 1);
        row.remove();
        calculateAverage();
    }
}

const promedioDiv = document.getElementById("average");
const calculateAverage = () => {
    if (students.length === 0) {
        promedioDiv.textContent = "Promedio general del curso: No disponible";
        return;
    }
    const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
    const average = totalGrades / students.length;
    promedioDiv.textContent = `El promedio es: ${average.toFixed(2)}`;
};

/*
function calcularPromedio(){
   let suma = 0;
   for (const student of students){
       suma += student.grade;
   }
   const count = students.length;
   const promedio = suma / count;
   console.log(promedio);
   averageDiv.textContent = "Promedio General del Curso :" +promedio;

}*/

function editarEstudiante(student, row) {
    // Populate the form with the student's data
    document.getElementById("name").value = student.name;
    document.getElementById("lastname").value = student.lastname;
    document.getElementById("fecha").value = student.fecha;
    document.getElementById("grade").value = student.grade;

    // Set the editing state
    editingStudent = student;

    // Scroll to the form (optional, for better UX)
    document.getElementById("studentform").scrollIntoView({
        behavior: 'smooth'
    });

    // Note: We no longer need to change the form's onsubmit directly here.
    // The main submit handler will now check the editingStudent variable.
}