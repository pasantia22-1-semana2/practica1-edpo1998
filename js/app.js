/* Ingresos en el Presupuesto */
const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta Coche',1500)
];

/* Egresos en el Presupuesto */
const egresos = [
    new Egreso('Renta Departamento',900),
    new Egreso('Ropa',400)
];


/* Formato de Moneda */
const formatMoney = (valor) =>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}


/* Funcion para enviar la Informacion */
const senData = () =>{
    /* Selector de Operacion */
    const item = document.getElementById('selectorOp').selectedIndex;
    
    /* Valores de la Operacion a Enviar */
    const formO = document.getElementById("activity__op");
    const description = formO["book"];
    const valor = formO["quantity"];

    /* Ejecucion */
    if(description.value === "" || valor.value === "" ){
        alert("Debes Ingresar Valores")
    }else{
        if(item === 1){
            ingresos.push(new Ingreso(description.value,parseFloat(valor.value)))
            cargarIngresoIndividual(description.value,parseFloat(valor.value))    
            colocarIngresos()
            colocarEgresos()
            colocarPresupuesto()
        }else if (item === 0){
            const newEgreso = new Egreso(description.value,parseFloat(valor.value))
            egresos.push(newEgreso)
            cargarEgresoIndividual(description.value,parseFloat(valor.value),newEgreso.id)
            colocarIngresos()
            colocarEgresos()
            colocarPresupuesto()
            updatePercentage()
        }else{
            alert("Verifique la Seleccion")
        }
    }
}

/* Render de carga Inicial */
const cargarData = () =>{
    colocarPresupuesto()
    colocarIngresos()
    colocarEgresos()
    cargarIngresos()
    cargarEgresos()
}

/* Funciones que actualizan el DOM */

const colocarPresupuesto = () =>{
    const totallabel = document.getElementById("totaldisponible")
    totallabel.innerHTML= formatMoney(PresupuestoDisponible())
}

const colocarIngresos = ()=>{
    const labelIngresos = document.getElementById("totalingresos")
    labelIngresos.innerHTML = ""
    labelIngresos.innerHTML = formatMoney(totalIngresos())
}

const colocarEgresos = ()=>{
    const labelIngresos = document.getElementById("totalegresos")
    labelIngresos.innerHTML = formatMoney(totalEgresos())
    colocarPorcentaje();
    
}

const colocarPorcentaje = () => {
    const labelPorcentaje = document.getElementById("peregresos")
    labelPorcentaje.innerHTML = `<div class="bordertext">${(totalEgresos()/totalIngresos()).toFixed(1)}%<div>`
}


const cargarIngresos = () => {
    ingresos.map((row) =>{
        datarow = `<td>${row.name}</td><td class="details__ingresos__text--aqua">${formatMoney(row.value)}</td>\n`
        const layout = document.createElement("tr")
        layout.innerHTML = datarow;
        document.getElementById("ingresostbl").appendChild(layout)
    });
}

const cargarIngresoIndividual = (name,value) =>{
        datarow = `<td>${name}</td><td class="details__ingresos__text--aqua">${formatMoney(value)}</td>\n`
        const layout = document.createElement("tr")
        layout.innerHTML = datarow;
        document.getElementById("ingresostbl").appendChild(layout)
}


const cargarEgresos = () => {

    egresos.map((row) =>{
        datarow = `<td>${row.name}</td>
            <td class ="details__ingresos__text--orange">${formatMoney(row.value)}</td>
            <td id=egreso_${row.id} class="details__ingresos__text--orange "><div class="bordertext">${(row.value/totalEgresos()).toFixed(2)}%</div></td> \n`
        const layout = document.createElement("tr")
        layout.innerHTML = datarow;
        document.getElementById("egresostbl").appendChild(layout)
    });
}


const cargarEgresoIndividual = (name,value,id) =>{
    datarow = `<td>${name}</td><td class="details__ingresos__text--orange">${formatMoney(value)}</td><td id=egreso_${id}  class="details__ingresos__text--orange bordertext"><div class="bordertext">${(value/totalIngresos()).toFixed(2)}%</div></td> \n`
    const layout = document.createElement("tr")
    layout.innerHTML = datarow;
    document.getElementById("egresostbl").appendChild(layout)
}

const updatePercentage = () =>{

    egresos.map((eg) => {
        const egcurrent = document.getElementById(`egreso_${eg.id}`)
        egcurrent.innerHTML = `<div class="bordertext">${(eg.value/totalIngresos()).toFixed(2)}%</div>`;
    })

}


/* Calculos */

const totalIngresos = () =>{
    let total = 0;
    ingresos.map((x)=>{ total += x.value })
    return total
}

const totalEgresos = () =>{
    let total = 0;
    egresos.map((x)=>{ total += x.value })
    return total
}

const PresupuestoDisponible = () =>{
    return totalIngresos() - totalEgresos()
}


//Render Inicial

cargarData()
