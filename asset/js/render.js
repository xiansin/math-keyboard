var Render = (function($){
    /**
     * option.dom =
     * @returns {Render.init}
     * @constructor
     */
    var Render = function () {
        return new Render.fn.init();
    };
    Render.fn = Render.prototype = {
        init: function () {
            let _this = this;
            _this.renderView = function (normal) {
                _this.renderKeyBoard(_this.normal(),'normal');
                _this.renderKeyBoard(_this.symbol(),'symbol');
                _this.renderKeyBoard(_this.letter(),'letter');
                _this.renderTools();
            };
        },

        renderKeyBoard(keyList,renderType){
            let html = ``;
            let subList = ``;
            const $keyboard = $(".keyboard>.key-list");
            // 键盘
            keyList['key'].forEach((row,index) => {
                let temp = ``;
                row.forEach(function (item,rowIndex) {
                    let icon = keyList['class'][index][rowIndex];
                    let latex = keyList['latex'][index][rowIndex];
                    let subListHtml = ``;
                    if(typeof keyList['subList'][index] != "undefined" && typeof keyList['subList'][index][rowIndex] != "undefined"){
                        let child = keyList['subList'][index][rowIndex];
                        child['key'].forEach(function (childValue,childIndex) {
                            let childIcon = child['class'][childIndex];
                            let childLatex = child['latex'][childIndex];
                            subListHtml += `<div class="key-item ${childIcon} ${renderType}" data-key="${childValue}" data-latex="${childLatex}"></div>`;;
                        })
                    }
                    temp += `<div class="key-item ${renderType} ${icon}" data-key="${item}" data-latex="${latex}" data-sub-class="${icon}" data-type="${renderType}"></div>`;
                    subList += subListHtml ? `<div class="key-group ${renderType} ${icon}">${subListHtml}</div>` : ``;
                });
                html += `<div class="key-group ${renderType}">${temp}</div>`
            });

            $keyboard.append(html);

            // 二级
            $(".sub-list").append(subList)
        },
        renderTools(){
            let toolsList = this.tools();
            // 底部功能按钮
            let toolsHtml = ``;
            let subListHtml = ``;
            toolsList['key'].forEach((value,index) => {
                let icon = toolsList['class'][index];
                let latex = toolsList['latex'][index];
                toolsHtml += `<div class="key-item tools ${icon}" data-latex="${latex}" data-type="tools"></div>`;

                if(typeof toolsList['subList'][index] != "undefined"){
                    let child = toolsList['subList'][index];
                    child['key'].forEach(function (childValue,childIndex) {
                        let childIcon = child['class'][childIndex];
                        let latex = child['latex'][childIndex];
                        subListHtml += `<div class="key-item ${childIcon}" data-latex="${latex}" data-type="tools"></div>`;;
                    })
                }
            });
            const $keyboard = $(".keyboard>.tools-keys");
            toolsHtml = `<div class="key-group">${toolsHtml}</div>`
            $keyboard.html(toolsHtml);

            // 二级
            subListHtml = `<div class="key-group tools-more">${subListHtml}</div>`
            $(".sub-list").append(subListHtml)
        },
        normal(){
            return {
                key: [
                    ['π','%','7','8','9','÷'],
                    ['x','a','4','5','6','x'],
                    ['分数','pingfang','1','2','3','-'],
                    ['根号','括号','0','.','=','+'],
                ],
                'class':[
                    ['input pi deep-keys','input baifenghao deep-keys','input shuzi7','input shuzi8','input shuzi9','input chu deep-keys'],
                    ['input zimux deep-keys more','input zimua deep-keys more','input shuzi4','input shuzi5','input shuzi6','input cheng deep-keys'],
                    ['input fenhao deep-keys more','input cimi1 deep-keys more','input shuzi1','input shuzi2','input shuzi3','input jian deep-keys'],
                    ['input genghao1 deep-keys more','input kuohao deep-keys more','input shuzi0','input dian more','input dengyu deep-keys more','input jia deep-keys'],
                ],
                latex:[
                    ['\\pi','%','7','8','9','\\div'],
                    ['x','a','4','5','6','\\times'],
                    ['\\frac{}{}','^2','1','2','3','-'],
                    ['\\sqrt{}','({})','0','.','=','+'],
                ],
                subList: {
                    1: {
                        0:{
                            key:['y','z'],
                            'class':['input zimuy','input zimuz'],
                            latex:['y','z'],
                        },
                        1:{
                            key:['b','c'],
                            'class':['input zimub','input zimuc'],
                            latex:['b','c'],
                        }
                    },
                    2:{
                        0:{
                            key: ['youfenhao'],
                            'class': ['input fenhao1'],
                            latex: ['{}\\frac{}{}'],
                        },
                        1:{
                            key: ['lifang','zidingyi'],
                            'class': ['input cimi2','input cimi3'],
                            latex: ['{}^3','{}^{}'],
                        }
                    },
                    3:{
                        0:{
                            key: ['lifanggen','zidingyideng'],
                            'class': ['input cimi2','input cimi3'],
                            latex: ['{}^3','{}^{}'],

                        },
                        1:{
                            key: ['[]','[)','(]'],
                            'class': ['input kuohao1','input kuohao2','input kuohao3'],
                            latex: ['\\left[\\right]','\\left[\\right)','\\left(\\right]'],
                        },
                        3:{
                            key: [','],
                            'class': ['input douhao'],
                            latex: [','],
                        },
                        4:{
                            key: ['<','≤','≥','﹥','≈','≠','≮','≯'],
                            'class': ['input xiaoyu','input xiaoyudengyu','input dayudengyu','input dayu','input yuedengyu','input budengyu','input buxiaoyu','input budayu'],
                            latex: ['<','\\leq','\\ge','>','\\approx','\\neq','\\nless','\\ngtr'],
                        }
                    }
                }
            };
        },
        symbol(){
            return {
                key: [
                    ['sin','cos','tan','°','绝对值','∽'],
                    ['∵','⊥','pxsbx','⊙','∆','≌'],
                    ['f(x)','e','lg','∞','向量','weuzhi'],
                    ['□','∪','∈','∅','∑','上下标'],
                ],
                'class':[
                    ['input sin more','input cos more','input tan more','input du','input jueduizhi','input quandeng2'],
                    ['input yinwei more','input chuizhi1 more','input pxsbx','input tonghuo','input sanjiao','input quandeng1'],
                    ['input fx more','input e more','lg more','input wuqiong','input xiangliang','input xiangliang1'],
                    ['input zfx more','input jiaojie1 more','input shuyu more','input kongji','input qiuhe','input biaoji3'],
                ],
                latex:[
                    ['\\sin\\left(\\right)','\\cos\\left(\\right)','\\tan\\left(\\right)','^{\\circ}','\\left| {} \\right|','\\sim'],
                    ['\\because','\\bot','','\\odot','\\bigtriangleup','\\cong'],
                    ['\\text{f}\\left(\\text{x}\\right)','\\text{e}','\\lg\\left(\\right)','\\infty','\\vec{}','\\frown{}'],
                    ['\\square','\\cup','\\in','\\oslash','\\sum','{ }_{}^{}'],
                ],
                subList: {
                    0: {
                        0:{
                            key:['sec'],
                            'class':['input sec'],
                            latex:['\\sec\\left(\\right)'],
                        },
                        1:{
                            key:['csc'],
                            'class':['input csc'],
                            latex:['\\csc\\left(\\right)'],
                        },
                        2:{
                            key:['cot'],
                            'class':['input cot'],
                            latex:['\\cot\\left(\\right)'],
                        }
                    },
                    1:{
                        0:{
                            key: ['suoyi'],
                            'class': ['input suoyi'],
                            latex: ['\\therefore'],
                        },
                        1:{
                            key: ['平行','角度'],
                            'class': ['input pingxing','input chuizhi2'],
                            latex: ['\/\/','\\angle'],
                        },
                        5:{
                            key: ['quandeng2'],
                            'class': ['input quandeng2'],
                            latex: ['\\sim'],
                        }
                    },
                    2:{
                        0:{
                            key: ['g(x)','h(x)'],
                            'class': ['input gx','input hx'],
                            latex: ['\\text{g}\\left(\\text{x}\\right)','\\text{h}\\left(\\text{x}\\right)'],
                        },
                        1:{
                            key: ['ecimi'],
                            'class': ['input e1'],
                            latex: ['\\text{e}\\^{}'],
                        },
                        2:{
                            key: ['ln','log'],
                            'class': ['input ln','input log'],
                            latex: ['\\ln\\left(\\right)','\\log\\left(\\right)'],
                        }
                    },
                    3:{
                        0:{
                            // key: ['★','○','●','◎','◇','◆','□'],
                            key: ['○','●','◇'],
                            // 'class': ['input sx-wjx disable','input kx-yuan','input sx-yuan','input yuanhu disable','input kx-lx','input sx-lx disable','input zfx'],
                            'class': ['input kx-yuan','input sx-yuan','input kx-lx'],
                            latex: ['\\circ','\\bullet','\\diamond'],
                        },
                        1:{
                            key: ['jiaojie2','jiaojie3'],
                            'class': ['input jiaojie2','input jiaojie3'],
                            latex: ['\\cap','\\bigcup_{}'],
                        },
                        2:{
                            key: ['∉','shuyu1'],
                            'class': ['input shuyu2','input shuyu1'],
                            latex: ['\\notin','\\subseteq',],
                        }
                    }
                }
            };
        },
        letter(){
            return {
                key: [
                    ['a','x','f','d','p','q'],
                    ['s','t','k','o','m','n'],
                    ['α','β','γ','θ','φ','ω'],
                    ['λ','μ','ρ','δ','ζ','η'],
                ],
                'class':[
                    ['input zimua more','input zimux more','input zimuf','input zimud','input zimup','input zimuq'],
                    ['input zimus','input zimut','input zimuk','input zimuo','input zimum','input zimun'],
                    ['input sp_alpha','input sp_beta','input sp_gamma','input sp_theta','input sp_psi','input sp_omega'],
                    ['input sp_lambda','input sp_mu','input sp_res','input sp_daleth','input sp_xi','input sp_eta'],
                ],
                latex:[
                    ['a','x','f','d','p','q'],
                    ['s','t','h','o','m','n'],
                    ['\\alpha','\\beta','\\gamma','\\theta','\\phi','\\omega'],
                    ['\\lambda','\\mu','\\rho','\\delta','\\xi','\\eta'],
                ],
                subList: {
                    0: {
                        0:{
                            key:['b','c','e','g','h','i','j'],
                            'class':['input zimub','input zimuc','input zimue','input zimug','input zimuh','input zimui','input zimuj'],
                            latex:['b','c','e','g','h','i','j'],
                        },
                        1:{
                            key:['y','z','l','r','u','v','w'],
                            'class':['input zimuy','input zimuz','input zimul','input zimur','input zimuu','input zimuv','input zimuw'],
                            latex:['y','z','l','r','u','v','w'],
                        }
                    }
                }
            };
        },
        tools(){
            return {
                text: true,
                key : ['更多','回车','←','→','删除','确定'],
                'class' : ['icon-more more','enter','left','right','delete','sure'],
                'latex' : ['tools-more','tools-enter','tools-left','tools-right','tools-del','tools-sure'],
                subList: {
                    0: {
                        key: ['sin','αβγ','123'],
                        'class': ['tools-sin','tools-αβγ','tools-number'],
                        'latex': ['symbol','letter','normal'],
                    }
                }
            }
        }
    };
    Render.fn.init.prototype = Render.fn;
    return Render;
})(jQuery);

/*const $keyboard = $(".keyboard");

let html = ``;
for (let key in CONFIG){
    console.log(key)
    let item = CONFIG[key];
    item.forEach(arr => {
        let temp = ``;
        arr.forEach(row =>{
            let subList = ``;
            if(typeof row.subList !== "undefined"){
                let subListTemp = ``;
                row.subList.forEach(list => {
                    subListTemp += `<div class="key-item" data-key="${list.key}" data-latex="${list.latex}">${list.key}</div>`;
                })
                subList += `<div class="sub-list">${subListTemp}</div>`;
            }
            temp += `<div class="key-item ${subList?'more':''}" data-key="${row.key}" data-latex="${row.latex}">${row.key}${subList}</div>`;
        })
        html += `<div class="key-group">${temp}</div>`
    })
}
$keyboard.html(html);


$keyboard.on("click",".key-item.more",function (e) {
    if($(this).parent()[0].className == 'sub-list'){
        return true
    }
    let position = $(this).position();
    let width = $(this).width();
    let height = $(this).height();
    let subHeight = $(this).find(".sub-list").height();
    $(this).find(".sub-list").css({top:(position.top-subHeight/2)+'px',left:(position.left+width)+'px',display:'flex'})
    console.log(1)

    setTimeout(function() {

    }.bind(this), 500);
}).on("click",".key-item",function (e) {
    e.stopPropagation();
    console.log(2)
});*/

