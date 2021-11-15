const DELETE_EVENT = 'deleteEvent';
const INPUT_EVENT = 'inputEvent';
const SUB_EVENT = 'subEvent';

/**
 *
 * @param latex
 * @param eventType ['deleteEvent','inputEvent','subEvent']
 */
function registerEvent(latex, eventType) {
    console.log(1)
    let latexImg = latex ? 'https://latex.codecogs.com/gif.latex?'+ latex : '';
    if(latexImg){
        convertImgToBase64(latexImg, event, eventType, latex)
    }else{
        event(eventType,'',{width: 0,height: 0},latexImg, latex);
    }
}

function event(eventType, base64Img, imgInfo, originLatexImg, latex) {
    let myEvent = new CustomEvent(eventType, {
        detail:{
            'latex': latex,
            'latexImg': base64Img,
            'originLatexImg': originLatexImg,
            'imgHeight': imgInfo.height,
            'imgWidth': imgInfo.width,
        }
    });
    document.dispatchEvent(myEvent);
}


function convertImgToBase64(url, callback, eventType, latex){
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        let dataURL = canvas.toDataURL('image/png');
        callback.call(this, eventType, dataURL, {width: img.width,height: img.height},url,latex);
        canvas = null;
    };
    img.src = url;
}

function pressKey(keyCode) {
    let event = jQuery.Event("keydown");//模拟一个键盘事件
    event.keyCode = keyCode;//keyCode=13是回车
    $(".render ").trigger(event);
}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return false;
}
