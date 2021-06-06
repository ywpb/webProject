
let categorys = function(parameter){
    this.type = parameter.type;
    this.category = parameter.category;
    this.parent = parameter.parent;
    this.isOpen = false;
    this.init();
}

categorys.prototype = {
    constructor:categorys,
    init(){
        this.catePosit();
        this.bindEvent();
    },

    //搜索列表定位
    catePosit(){
        let top = this.getElementTop(this.parent) + this.parent.clientHeight;
        let left = this.getElementLeft(this.parent)+1;

        this.category.style.position = "absolute";
        this.category.style.top = top + 'px';
        this.category.style.left = left + 'px';
    },

    getElementTop(element){
        let actualTop = element.offsetTop;
        let current  = element.offsetParent;

        if(current != null){
            actualTop += current.offsetTop;
            current = element.offsetParent;
        }
        return actualTop;
    },
    getElementLeft(element){
        let actualLeft = element.offsetLeft;
        let current  = element.offsetParent;

        if(current != null){
            actualLeft += current.offsetLeft;
            current = element.offsetParent;
        }
        return actualLeft;
    },


    bindEvent(){
        this.headerClick();
    },

    headerClick(){
        let that = this;
        this.type.addEventListener('click',function(){
            if(that.isOpen){
                that.stop(that.category);
            }else{
                that.open(that.category);
            }
        })
    },
    //控制搜索列表是否打开
    open(obj){
        this.isOpen = true;
        obj.style.display = 'block';
    },
    stop(obj){
        this.isOpen = false;
        // console.log(obj.className);
        obj.style.display = 'none';
    }


}

export {categorys};