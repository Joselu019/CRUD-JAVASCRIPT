console.log("tupac")
var texto=""
var vector=[]

function guardar(){
    var nombre=document.getElementById("cajaNombre").value
    vector.push(nombre)
    document.getElementById("cajaNombre").value=""
    actualizarTabla()
}
function actualizarTabla(){
    texto=""

    for (var i=0;i<vector.length;i++){
        var fila= "<tr>" +"<td>" + vector[i] + "</td>" +"</tr>" 
        texto+=fila
        }
        document.getElementById("tabla").innerHTML=texto
}
