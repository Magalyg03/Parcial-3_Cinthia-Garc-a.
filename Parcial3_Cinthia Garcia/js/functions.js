
let usuarios = [];
const toast = document.getElementById('toasts');
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var final = document.getElementById("btnfinal");

//campos
var nombre = document.getElementById('nombres');
var apellido=document.getElementById('apellidos');
var contra=document.getElementById('contra');
var rcontra=document.getElementById('rcontra');
var check=document.getElementById('termino');
var correo=document.getElementById('correo');
var pago=document.getElementById('pago');
var checkServicio=document.getElementById('termino_servicio');



btn.onclick = function() {
  modal.style.display = "block";
  validarFormulario();
}

final.onclick = function() {
  modal.style.display ='none';
  enviarFormulario();
  clean();
  createToast("Usuario agregado correctamente", 'success');
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



function createToast(message = null, type = null) {
  let properties
  const notif = document.createElement('div')
  const notifIcon = document.createElement('span')
  const notificationType = type ;
  
  properties = setProperties(notificationType)

  notif.classList.add('toast')
  notif.classList.add(notificationType)
  
  notifIcon.classList.add(properties[0])
  notifIcon.classList.add(properties[1])

  notif.innerText = message

  toast.appendChild(notif)
  notif.append(notifIcon)

  setTimeout(() => {
      notif.remove()
  }, 3000)
}


function setProperties(notificationType){
    let propertyList

    switch (notificationType) {
        case 'info':
            propertyList = ['fas', 'fa-info-circle', 0]
            break
        case 'error':
            propertyList = ['fas', 'fa-exclamation-circle', 1]
            break
        case 'success':
            propertyList = ['fas', 'fa-check-circle', 2]
            break
        case 'warning':
            propertyList = ['fas', 'fa-exclamation-triangle', 3]
            break
    }

    return propertyList;
}

function clean(){

   nombre.value= '';
   apellido.value='';
   contra.value='';
   rcontra.value='';
   correo.value='';
   pago.value='';
   checkServicio.checked=false;
   check.checked= false;



}



function validarFormulario(){
    document.getElementById("diverror").innerHTML = '';
    var error = "";
    if(nombre.value==="" || nombre.value == null){
      error = '<h4 class="error">* El campo nombre es requerido.</h4>';
      errorBool= true;
    }
    if(apellido.value==="" || apellido.value == null) {
      error = error + '<h4 class="error">* El campo apellido es requerido.</h4>';
      errorBool= true;
    }
    
    if(rcontra.value!== contra.value) error =error+ '<h4 class="error">* La contraseña no coincide.</h4>';
    var ps=false, ps2=false;
    if(contra.value==="" || contra.value == null) {
      error =error+ '<h4 class="error">* El campo contraseña es requerido.</h4>';
    }else{
      ps=true;
    }
    if(rcontra.value==="" || rcontra.value == null){
      error =error+ '<h4 class="error">* El campo  repite la contraseña es requerido.</h4>';

    }else{
      ps2=true;
    }

   if(ps2 && ps){
    if( (rcontra.value.length== contra.value.length) && rcontra.value.length<7 && contra.value.length<7 ){
      error =error+ '<h4 class="error">* La contraseña debe tener al menos 7 caracteres.</h4>';
    }else{
    //VALIDAR ESPACIOS EN BLANCO
    var espacios = false;
    var cont = 0;

    while (!espacios && (cont < contra.value.length)) {
      if (contra.value.charAt(cont) == " ")espacios = true;
          
      cont++;
    }
    if (espacios) {
      error =error+ '<h4 class="error">* La contraseña no puede tener espacios en blanco.</h4>';
    }
   }
   }
   
   if(!check.checked){
    error =error+ '<h4 class="error">* Debe aceptar el envio de publicidad e información de la empresa.</h4>';
   }

   if(!checkServicio.checked){
    error =error+ '<h4 class="error">* Debe aceptar los terminos de servicio.</h4>';
   }


   //validar correo no repetido ni nombre
   
    let data =JSON.parse( window.localStorage.getItem('user'));
    if(data){
      for (let index = 0; index < data.length; index++) {
        if( correo.value ==  data[index].correo){
          
          error =error+ '<h4 class="error">* El correo debe ser unico, el ingresado ya ha sido registrado.</h4>';
        }
      }
    }
    


   if(error != "") {
    error=error+'<img src="assets/fondos/DotOficce.png" height="200" width="200" alt="">';
    final.style.display ='none';
   }else{
    error =error+ `<h3 class="error"><strong>Datos a enviar</strong></h3><hr >`;
    error =error+ `<h4 style="margin-top:9px;" class="error mtlabel"><strong>Nombres: </strong> ${nombre.value}</h4>`;
    error =error+ `<h4 class="error mtlabel"><strong>Apellidos: </strong> ${apellido.value}</h4>`;
    error =error+ `<h4 class="error mtlabel"><strong>Correo electronico: </strong> ${correo.value}</h4>`;
    error =error+ `<h4 class="error mtlabel"><strong>Tipo de pago: </strong> ${pago.value}</h4>`;
    final.style.display ='initial';
   }
   document.getElementById("diverror").innerHTML="<br><br>"+error;

}

 
function enviarFormulario(){
        const person = {
          nombre: nombre.value,
          apellido: apellido.value,
          password: contra.value, 
          terminos_condiciones: true, 
          correo: correo.value, 
          terminos_servicio: true, 
          categoria: pago.value
        }
        

       // usuarios.push(person);
       //console.log(window.localStorage.getItem('user'));
       let data =JSON.parse( window.localStorage.getItem('user'));
       var result = [];
       if(data){
        var keys = Object.keys(data);
        keys.forEach(function(key){
              result.push(data[key]);
        });
       }
       result.push(person);
       console.log(result);
       window.localStorage.setItem('user', JSON.stringify(result));
       
}

function getUsers(){
 /* console.log(usuarios)
  let data =JSON.parse( window.localStorage.getItem('user'));
  if(data){
    usuarios = usuarios.concat(data);
  }
  
  window.localStorage.setItem('user', JSON.stringify(usuarios));
  usuarios= [];
 // window.localStorage.setItem('user', JSON.stringify(usuarios));
  // console.log(window.localStorage.getItem('user'));
  //window.location.href = "table.html";*/
  window.open('table.html', '_blank');

}



