import {categorys} from './category.js';
import {nav,scate} from './nav.js';
import {ajax} from './jsonData.js';
import {mainList} from './main.js';
import {Subject} from './ajax.js';

new categorys({
    type : document.querySelector('.type'),
    category: document.querySelector('.category'),
    parent: document.querySelector('.parent'),
});

let data = JSON.parse(ajax());

(function(){
    let navList = [];

    for(let i of data){
        navList.push(i.title);
    }
    
    new nav({
        data : navList,
        domain : document.querySelector('.domain'),
        nav: document.querySelector('.nav'),
    });
})();

new scate({
    nav:document.querySelector('.nav'),
    json:data,
    listCate:document.querySelector('.sidebar'),
    Mnav:document.querySelector('.site-box'),
});

new mainList({
    json: data,

})
