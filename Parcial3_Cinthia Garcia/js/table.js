
let data =JSON.parse( window.localStorage.getItem('user'));

let info = '';

for (let index = 0; index < data.length; index++) {
    
     info = info + `<tr id="${index}">
    <td>${data[index].nombre} ${data[index].apellido}</td>
    <td>${data[index].correo}</td>
    <td>${data[index].categoria}</td>
    <td> <button  type="button" onclick="eliminarUsuario(${index})" ><i class="fas fa-trash"></i></button>  </td>
 </tr>`;
    
}
document.getElementById("tableBody").innerHTML=info;



function eliminarUsuario(id){
   let data =JSON.parse( window.localStorage.getItem('user'));
   let arrayObj = json2array(data, id);
   window.localStorage.setItem('user', JSON.stringify(arrayObj));
   var final = document.getElementById(id);
   final.remove();
}


function json2array(json, id ){
   var result = [];
   var keys = Object.keys(json);
   keys.forEach(function(key){
       if(id != key){
         result.push(json[key]);
       }
   });
   return result;
}


