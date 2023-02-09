let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros=numeros.sort(()=>{return Math.random()-0.5})

let tarjetasDestapadas=0
let tarjeta=null;
let tarjeta2=null;
let primerResultado=null
let segundoResultado=null
let Movimiento=0
let aciertos=0
let temporizador=false
let timer=30
let timerInicial=30
let tiempoRegresivo=null

//documetos ahtml
let mostrarMovimientos=document.getElementById("movimientos")
let mostrarAcierto=document.getElementById('aciertos');
let mostarTiempo=document.getElementById("t-restante")

function contaraTiempo(){
    
    tiempoRegresivo= setInterval(()=>{
        timer--;
        mostarTiempo.innerHTML=`Tiempo: ${timer} segundos`
        if(timer==0){
            clearInterval(tiempoRegresivo)
            bloquearTarjetas()
        }
    },1000)
}

function bloquearTarjetas(){
    for(let i=0; i<=15;i++){
        let tarjetaBloqueada=document.getElementById(i)
        tarjetaBloqueada.innerHTML=numeros[i]
        tarjetaBloqueada.disabled=true;
    }
}

function destapar(id){
    
if(temporizador==false){
    contaraTiempo();
    temporizador=true;
}

tarjetasDestapadas++

    if(tarjetasDestapadas==1){
        //mostrar el primer numero
        tarjeta=document.getElementById(id)
        primerResultado=numeros[id]
        tarjeta.innerHTML=primerResultado

        //deshabilitar boton
        tarjeta.disabled=true;

    }else if(tarjetasDestapadas==2){
        //ver segundo numero
        tarjeta2=document.getElementById(id)
        segundoResultado=numeros[id]
        tarjeta2.innerHTML=segundoResultado;
        tarjeta2.disabled=true
        //incrementarMovimiento
        Movimiento++;
        mostrarMovimientos.innerHTML=`Movimientos: ${Movimiento}`
        
        if(primerResultado==segundoResultado){
            tarjetasDestapadas=0;

            aciertos++;
            mostrarAcierto.innerHTML=`Aciertos: ${aciertos}`
            if(aciertos==8){
                clearInterval(tiempoRegresivo)
                mostrarAcierto.innerHTML= `Pedazo de CAMPEON!😎😁...Aciertos:${aciertos}`
                mostarTiempo.innerHTML=`Fastastico 🎉 solo te demoraste ${timerInicial-timer} segundos`
                mostrarMovimientos.innerHTML=`Movimientos ${Movimiento} 👌`
            }
        }else {
            //mostrar y volver a tapar
            setTimeout(()=>{
                tarjeta.innerHTML="";
                tarjeta2.innerHTML="";
                tarjeta.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;
            },900)

        }
    }
}