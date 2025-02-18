let numeros= document.querySelectorAll("button.numero");
let operadores= document.querySelectorAll("button.operador")
let resultadoButton= document.querySelector("button.resultado")
let clearEntryButton= document.querySelector("button.limpiar-entrada")
let clearButton= document.querySelector("button.limpiar")
let operando= 0
let operacion= "";
let operandoInput= document.querySelector("#operando")
let operacionInput= document.querySelector("#operacion")
let estadoOp= 0;
let clearOnNextEntry= false;
let numero1= null;
let numero2= null;
let operador= null
calculate= function(type){
    switch(operador){
        case "+":
            updateOperando(numero1 + numero2)
            break;
        case "-":
            updateOperando(numero1 - numero2)
            break;
        case "*":
            updateOperando(numero1 * numero2)
            break;
        case "/":
            updateOperando(numero1 / numero2)
            break;
    }
    if(type != "igual"){
        operador= type;
        operacion= `${operando} ${operador}`
        updateOperacion()
        estadoOp= 1;
    }else{
        estadoOp= 0;
    }
    numero2= null;
}
updateOperando= function(overwrite){
    if(typeof overwrite != "undefined"){
        numero1= overwrite;
        operando= overwrite;
    }
    operandoInput.value= operando;
}
updateOperacion= function(){
    operacionInput.value= operacion;
}
clearEntry= function(){
    operando= 0;
    updateOperando()
}
clear= function(){
    operando= 0;
    operacion= "";
    numero1= null;
    numero2= null;
    operador= null;
    updateOperando();
    updateOperacion();
}
clearEntryButton.addEventListener("click", clearEntry);
clearButton.addEventListener("click", clear);

numeros.forEach((numeroInstance)=>{
    numeroInstance.addEventListener("click", (e)=>{
        if(clearOnNextEntry){
            operando= 0;
        }
        num= e.target.innerText
        operando= parseFloat(`${operando}${num}`)
        switch(estadoOp){
            case 0:
                numero1= operando;
                break;
            case 1:
                numero2= operando;
                break;
        }
        updateOperando();
    })
})
operadores.forEach((operadorInstance)=>{
    operadorInstance.addEventListener("click", (e)=>{
        ope= e.target.innerText
        switch(estadoOp){
            case 0:
                operacion= `${operando} ${ope}`
                operador= ope;
                estadoOp= 1
                break;
            case 1:
                if(numero2 == null){
                    operacion= `${operando} ${ope}`
                    operador= ope;
                }else{
                    calculate(ope)
                }
                break;
        }
        clearOnNextEntry= true;
        updateOperacion();
    })
})
resultadoButton.addEventListener("click", (e)=>{
    switch(estadoOp){
        case 1:
            operacion= `${operacion} ${operando} =`
            estadoOp= 0;
            calculate("igual")
            break;
    }
    updateOperacion();
})