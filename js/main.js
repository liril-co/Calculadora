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
let numero1= 0;
let numero2= null;
let operador= null;
let negativo= false;
let coma= false;
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
        operador= null;
    }
    negativo= false;
    if(`${operando}`.indexOf(".") != -1){
        coma= true;
    }else{
        coma= false;
    }
    numero2= null;
}
updateOperando= function(overwrite){
    if(typeof overwrite != "undefined"){
        numero1= parseFloat(overwrite);
        operando= parseFloat(overwrite);
        console.log(operando)
    }
    operandoInput.value= operando;
}
updateOperacion= function(){
    operacionInput.value= operacion;
}
clearEntry= function(){
    operando= 0;
    negativo= false;
    updateOperando()
}
clear= function(){
    operando= 0;
    operacion= "";
    numero1= 0;
    numero2= null;
    operador= null;
    negativo= false;
    updateOperando();
    updateOperacion();
}
clearEntryButton.addEventListener("click", clearEntry);
clearButton.addEventListener("click", clear);

numeros.forEach((numeroInstance)=>{
    numeroInstance.addEventListener("click", (e)=>{
        if(clearOnNextEntry){
            operando= 0;
            clearOnNextEntry= false;
        }
        num= e.target.innerText
        if(num == "."){
            if(coma){
                operando= `${operando}`.replaceAll(".", "") + "."
            }else{
                operando= `${operando}` + "."
            }
            coma= true;
        }else{
            let operandoAbsoluto= `${operando}`.replace("-", "")
            operando= parseFloat(`${negativo?"-":""}${operandoAbsoluto}${num}`)
        }
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
        if(ope == "-"){
            if(numero2 == null && numero1 == 0){
                negativo= !negativo;
                return;
            }else if(operador != null && numero2 == null){
                negativo= !negativo;
                return
            }
        }
        negativo= false;
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
        coma= false
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