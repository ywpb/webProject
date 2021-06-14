function Subject(){
    this.handlers = [];
}

Subject.prototype = {
    constructor: Subject,

    //插入订阅者
    subscribe:function(fn){
        this.handlers.push(fn);
    },

    unsubscribe:function(fn){
        this.handlers = this.handlers.filter(
            function(item){
                return item !== fn;
            }
        )
    },

    fire:function(data, thisArg){
        let scope = thisArg || window;
        this.handlers.forEach(function(item){
            item.call(scope, data);
        });
    }
}

export {Subject};