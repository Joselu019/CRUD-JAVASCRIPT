var texto="" // Variable para actualizar la tabla
var vector=[] 
var alumnos=[];
var totalAlumnos=0;
var botonInvertir=document.getElementById("botonInvertir");

function guardar(){
    var nombre=document.getElementById("cajaNombre").value
    if(nombre==""){       
        document.getElementById('divResultado').innerHTML="Por favor introduzca un nombre";//lo he añadido al div busqueda por si no introducen un nombre que les salga ese mensaje.    
    }
    vector.push(nombre)
    document.getElementById("cajaNombre").value=""
    actualizarTabla()  
}

function actualizarTabla(informacion){
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onclick="calcularYMostrarInfo(${i})">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"></path>
                            </svg>
                        <td class="icono">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onclick="eliminarAlumno(${i})">                  //svg para hacer el boton de eliminar, funcion con el parametro de la posicion
                                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path>
                            </svg>
                        </td>
                    </tr>
                `
        texto+=fila
    }
    texto+=informacion
    filaTotal=`
    <tr>
        <td>Total alumnos:${totalAlumnos}</td>
    </tr>`
    
    document.getElementById("tabla").innerHTML=texto+filaTotal;
}

function eliminarAlumno(posicion){
    vector.splice(posicion,1);
    actualizarTabla();
    info()
}

function modificar(nombre,posicion){
    let nuevoNombre=nombre.value
    vector.splice(posicion,1, nuevoNombre) //modifico 1 elemento segun su posicion y lo reemplazo por el nuevo nombre
    actualizarTabla()
}

function buscar(){
    var nombre=document.getElementById("cajaBuscar").value;
    var resultado=document.getElementById('divResultado');
    var contador=0;
    var numVeces=[];
    resultado.innerHTML=" ";
    for(i=0;i<vector.length;i++){
        document.getElementById('alumno'+i).style.background="white"
        document.getElementById('alumno'+i).style.color="black"
        if(nombre==vector[i]){
            numVeces.push(`<tr><td>${i+1}</td><td id="salto${i}">${vector[i]}</tr></td>`)
            contador++;
            document.getElementById('alumno'+i).style.background="rgb(19, 36, 73)"
            document.getElementById('alumno'+i).style.color="white"
            resultado.innerHTML=` ${nombre} aparece ${contador} veces <table>${numVeces.join('')}</table>`;
        }
    }   
    document.getElementById("cajaBuscar").value=""
}

function saltar(){
    alert('Hola')
}

function invertir(){
    var invertido=botonInvertir.value.split("").reverse().join("");
    botonInvertir.value=invertido
    for (let i = 0; i < vector.length; i++) {
        let nombreInvertido=vector[i].split("").reverse().join("");  //separo el elemento del vector por caracteres, les doy la vuelta, los vuelto a unir y los guardo en una variable
        vector.splice(i,1, nombreInvertido);                         //modifico esa posicion del vector y la sustituyo por la nueva
    }
    actualizarTabla();
}

// Función que reemplaza los nombres de la tabla por el que el usuario indique
function reemplazar(){
    var nombre=document.getElementById("cajaBuscar").value
    var reemplazar=document.getElementById("nuevoNombre").value
    
    for(i=0;i<vector.length;i++){
        if(vector[i] == nombre){
            vector[i]=reemplazar
        }
    }
    actualizarTabla()
}
function info(promedio,contadorCorto,contadorLargo){
    var vectorCaracteres=[]
    for(i=0;i<vector.length;i++){
        var separarCaracteres=vector[i].split("")
        vectorCaracteres=separarCaracteres.concat(vectorCaracteres)
    }
    var contadorLargo=0
    for(var i=0;i<vector.length;i++){
        var dividirLargo=vector[i].split("")
        var longitudLargo=dividirLargo.length
            if(longitudLargo>contadorLargo){
                contadorLargo=longitudLargo
                var nombreLargo=contadorLargo
        }
    }
    var contadorCorto=100
    for(var i=0;i<vector.length;i++){
        var dividirCorto=vector[i].split("")
        var longitudCorto=dividirCorto.length
            if(longitudCorto<contadorCorto){
                contadorCorto=longitudCorto
                var nombreCorto=contadorCorto
        }
    }
    var promedio=(vectorCaracteres.length / vector.length).toFixed(2)

    var informacion = `
        <tr>
            <td colspan="2"><strong>Promedio:</strong> ${promedio}</td>
        </tr>
        <tr>
            <td colspan="2"><strong>Nombre más largo:</strong> ${nombreLargo}</td>
        </tr>
        <tr>
            <td colspan="2"><strong>Nombre más corto:</strong> ${nombreCorto}</td>
        </tr>
    `
    actualizarTabla(informacion)
}

function calcularYMostrarInfo(i, promedio, nombreLargo, nombreCorto){
    var numeroVocales=0
    var separarCaracteres=vector[i].split("")
    var longitudNombre=separarCaracteres.length
    for(var j=0;j<separarCaracteres.length;j++){
        if (separarCaracteres[j] == "a" || separarCaracteres[j] == "e" || separarCaracteres[j] == "i" || separarCaracteres[j] == "o" || separarCaracteres[j] == "u") {
            numeroVocales+=1
        }
    }

    var info=`
        El nombre es ${vector[i]} <br>
        Su longitud es ${longitudNombre} caracteres <br>     
        Su número de vocales es ${numeroVocales} <br>
    `
        if (longitudNombre<promedio){
            info += "El nombre está por debajo del promedio <br>"
        }else if(longitudNombre==promedio){
            info += "El nombre es igual al promedio <br>"
        }else{
            info += "El nombre está por encima del promedio <br>"
        }
        
        if (longitudNombre<=nombreCorto){
            info += "Es el nombre más corto"
        }else if(longitudNombre>=nombreLargo){
            info += "Es el nombre más largo"
        }else{
            info += "No es ni el nombre más largo ni el más corto"
        }
    document.getElementById("infoNombre").innerHTML=info
}
