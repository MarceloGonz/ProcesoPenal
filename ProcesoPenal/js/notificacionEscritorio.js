var notificar = document.getElementById("notificar");

notificar.addEventListener('click',function(){
    notify();   
});

function notify(){
    // verificacion de que el navegador soporta notificaciones
    if(("Notification" in window)){
        alert("El navegador no soporta notificaciones")

    }else if(Notification.permission = "granted"){
        var notificacion = new notificacion("Notificacion Enviada A Los Involucrados")

    }else if(Notification.permission = "denied"){
        Notification.requestPermission(function(permission){
            if(Notification.permission === "granted"){
                var notificacion = new notificacion("Notificacion Enviada A Los Involucrados") 
            }
        });
    }
}