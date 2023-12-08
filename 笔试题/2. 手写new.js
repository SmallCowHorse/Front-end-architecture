function newFunc(Person, ...rest) {
    if(typeof Person !== "function") {
        throw new Error('new operator function the frist param must be a function');
    }

    var obj = Object.create(Person.prototype);
    var result = Person.apply(obj, rest);
    return result && typeof result === 'object' ? result : obj;
}

