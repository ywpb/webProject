import {Subject} from './ajax.js';

let nav = function(data){
    this.data = data.data;
    this.domain = data.domain;
    this.nav = data.nav;
    this.init();
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
    console.log(this.json)
    //侧边栏
    this.listcate = data.listCate;

    this.Mcates();
    //获取头目录下的侧边栏数据
    this.Mcate = [];
    this.init();

    //设置第一个侧边栏目录的id
    // this.listcate.firstChild.id = 'lSelect';
}

scate.prototype = {
    constructor:scate,
    init(){
        this.mianContent();
        // this.main();
    },
    /**
     * 获取用户点击的头标签
     */
    mianContent(){
        //观察者
        let subject = new Subject();
        subject.subscribe(this.getLcate);
        // subject.subscribe(this.main);
        
        this.nav.forEach(element => {
            element.addEventListener('click',(eve)=>{
                let navData = this.json.filter((data)=>{
                    return data.title === eve.target.innerText? data:'';
                })
                subject.fire(navData, this);
            })
        });
    },


    main(data,element){
        let content = data.filter((data)=>{
            return data.title === element.target.innerText ? data : '';
        });
        this.getMcate(content[0])
    },

    //显示侧边栏数据
    Mcates(){
        

        //默认侧边栏目录数据
        this.getMcate(this.json[0].nav[0])
        
        this.json[0].nav.forEach((data)=>{
            this.navTemp(data.title, this.listcate);
        })
        
        document.querySelectorAll('.sidebar div').forEach((element)=>{
            element.addEventListener('click',(ele)=>{
                let content = this.json[0].nav.filter((data)=>{
                    return data.title === ele.target.innerText ? data:'';
                });
                this.getMcate(content[0])
            })
        })
    },

    /**
     * 
     * 显示侧边栏目录
     */
    getLcate(title){    
        
        
        this.listcate.innerHTML = '';
        this.getMcate(title[0].nav[0])
        title[0].nav.forEach((data)=>{
            this.navTemp(data.title, this.listcate);
        });

        document.querySelectorAll('.sidebar div').forEach((element)=>{
            element.addEventListener('click',(ele)=>{
                this.main(title[0].nav,ele);
            })
        })
    },


   

    //填充侧边栏对于的主页数据目录
    getMcate(title){
        this.Mnav.innerHTML = '';
        title.nav.map(function(value){
            let html = `
            <i class='material-icons'>expand_more<i>
            <span>${value.title} x ${value.nav.length}</span>
            `;
            this.navTemp(html,this.Mnav)
        },this);
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
    }
}



export {nav, scate};