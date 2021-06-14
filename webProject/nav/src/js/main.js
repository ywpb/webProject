let mainList = function(data){
    this.init();
    this.json = data.json;
}

mainList.prototype = {
    constructor:mainList,
    init(){
        // console.log(document.querySelector('#nSelect'))
    },
}


export{mainList}