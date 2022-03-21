class Ingreso{
    static contadorid = 0;
    constructor(name,value){
        this._id = ++Ingreso.contadorid;
        this._name = name;
        this._value = value;
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