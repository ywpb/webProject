let nav = function(data){
    this.data = data.data;
    this.domain = data.domain;
    this.nav = data.nav;
    this.init();
    this.nav.querySelectorAll('div')[0].setAttribute('id', 'nSelect')
}


nav.prototype = {
    constructor: nav,
    
    init(){
        this.navTemp(this.data,'.navTemp');
    },


    navTemp(para,classname){
        //克隆对象
        for(let i of para){
            let navTemp = document.querySelector(classname).content;
            let category = navTemp.querySelector('div');
            category.textContent = i;
            this.nav.appendChild(document.importNode(navTemp, true));
        }
    }
}


let scate = function(data){
    this.nav = data.nav.querySelectorAll('div');
    this.Ncate = data.nav;
    this.Mnav = data.Mnav;
    this.json = data.json;
    //侧边栏
    this.listcate = data.listCate;
    
    //获取头目录下的侧边栏数据
    this.Mcate = [];
    this.init();

    //设置第一个侧边栏目录的id
    this.listcate.querySelectorAll('div')[0].setAttribute('id', 'lSelect');
}

scate.prototype = {
    constructor:scate,
    init(){
        this.mianContent();
        this.listCate();
        for(let i of this.json[0].nav){
            this.Mcate.push(i);
            this.navTemp(i.title, this.listcate);
        };
        
        
        this.Mcates();
    },
    /**
     * 获取用户点击的头标签
     */
    mianContent(){
        let that = this;
        for(let i of this.nav){
            i.addEventListener('click',function(){
                that.clean(that.nav);
                this.setAttribute('id', 'nSelect');
            });
        }  
    },

    /**
     * 获取被点击的主目录
     */
    listCate(){
        let that = this;
        this.Ncate.addEventListener('click',function(){
            let title = document.querySelector('#nSelect').innerHTML;
            that.getLcate(title);
        })
    },

    //显示侧边栏数据
    Mcates(){
        //默认侧边栏目录数据
        this.getMcate(this.Mcate[0]);
        // console.log(this.listcate)

    },

    /**
     * 
     * 显示侧边栏目录
     */
    getLcate(title){        
        this.listcate.innerHTML = '';
        this.Mcate = [];
        for(let i of this.json){
            if(title == i.title){
                for(let j of i.nav){
                    this.navTemp(j.title,this.listcate);
                    //设置第一个侧边栏id
                    this.listcate.querySelectorAll('div')[0].setAttribute('id', 'lSelect');
                    this.Mcate.push(j);
                }
            }
        }
        this.Mcates();
    },
   

    //填充侧边栏对于的主页数据目录
    getMcate(title){
        this.Mnav.innerHTML = '';
        for(let i of title.nav){
            //i.title + 'x'+ i.nav.length
            let html = `
                <i class='material-icons'>expand_more<i>
                <span>${i.title}x${i.nav.length}</span>
            `
           this.navTemp(html,this.Mnav)
        }
    },
    /**
     * 
     * @param {要填充的内容} para  
     * @param {填充内容的位置} classname 
     * 
     */
    navTemp(para,classname){
        let navTemp = document.querySelector('.navTemp').content;
        let category = navTemp.querySelector('div')
        category.innerHTML = para;
        classname.appendChild(document.importNode(navTemp, true));
    },
    clean(element){
        for(let i of element){
            i.removeAttribute('id');
        }
    }
}



export {nav, scate};