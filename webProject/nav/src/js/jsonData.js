// let data = 'aa';
function ajax(){
    let data;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            data = xmlhttp.responseText ;
        }
    };
    xmlhttp.open('GET', '../../data/db.json', false);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
    return data;
}

export {ajax};

