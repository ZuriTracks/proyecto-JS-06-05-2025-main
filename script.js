const students=[]

document.getElementById("studentform").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastname=document.getElementById("lastname").value.trim();
    const fecha=document.getElementById("fecha").value.trim();
    const grade=parseFloat(document.getElementById("grade").value)
    
    if(grade<1 || grade>7 || !name || !lastname || isNaN(grade)){
        alert("error al ingresar los datos")
        return
    }

    const student = {name, lastname, fecha, grade};
    students.push(student);
    addStudentToTable(student);
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
        </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function(){
        borrarEstudiante(student, row);
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