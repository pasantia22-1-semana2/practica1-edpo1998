class Egreso{
    static contadorid = 0;
    constructor(name,value){
        this._id = ++Ingreso.contadorid;
        this._name = name;
        this._value = value;
        this._percentage = 0;
    }
    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }

    set name(name){
        this._name = name; 
    }

    get value(){
        return this._value;
    }

    set value(value){
        this._value = value;
    }
}