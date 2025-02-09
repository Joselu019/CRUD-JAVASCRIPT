var texto=""
var vector=[] 
var alumnos=[];
var totalAlumnos=0;

function guardar(){
    var nombre=document.getElementById("cajaNombre").value
    if(nombre==""){       
        document.getElementById('busqueda').innerHTML="Por favor introduzca un nombre";//lo he añadido al div busqueda por si no introducen un nombre que les salga ese mensaje.
        }
    vector.push(nombre)
    document.getElementById("cajaNombre").value=""
    actualizarTabla()
    
}

function actualizarTabla(){
    texto=""
    if(vector.length==0){
        totalAlumnos=0;
    }
    for (var i=0;i<vector.length;i++){
        totalAlumnos=(i+1);
        var fila= `
                    <tr>
                    <td> ${(i + 1)}</td>
                    <td> <input type="text" id="alumno${i}" value="${vector[i]}" onchange="modificar(this,${i})"> </td> 
                        <td class="icono">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onclick="eliminarAlumno(${i})">
                                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                            </svg>
                        </td>
                    </tr>
                    `
        texto+=fila
        console.log(vector[0])
    }
    filaTotal=`
    <tr>
        <td>Total alumnos:${totalAlumnos}</td>
    </tr>`
    
    document.getElementById("tabla").innerHTML=texto+filaTotal;


}

function eliminarAlumno(posicion){
    vector.splice(posicion,1);
    actualizarTabla();
}

function modificar(nombre,posicion){
    let nuevoNombre=nombre.value
    vector.splice(posicion,1, nuevoNombre)
    actualizarTabla()
}

function buscar(){
    var nombre=document.getElementById("cajaNombre").value;
    var busqueda=document.getElementById('busqueda');
    var contador=0;
    for(i=0;i<vector.length;i++){
        document.getElementById('alumno'+i).style.background="white"
        document.getElementById('alumno'+i).style.color="black"
        if(nombre==vector[i]){
            contador++;
            document.getElementById('alumno'+i).style.background="purple"
            document.getElementById('alumno'+i).style.color="white"
            busqueda.style.display="inline";
            busqueda.innerHTML=` ${nombre} aparece ${contador} veces`;
            
        }
    }
    
}

