let mathField;
let moreTimer = null
var Input = (function ($) {
    var Input = function(){
        console.log()
        return new Input.fn._init();
    }
    Input.fn = Input.prototype = {
        _init: function () {
            let _this = this;
            _this.init = function (option) {
                let initLatex = option.initLatex
                _this.preventFocus();
                _this.initMath(initLatex);
            }
        },


        /**
         * 初始化
         * @returns {*}
         */
        initMath(initLatex){
            let mathFieldSpan = document.getElementById('math_field');
            let latexSpan = document.getElementById('latex');
            let MQ = MathQuill.getInterface(2); // for backcompat
            mathField = MQ.MathField(mathFieldSpan, {
                spaceBehavesLikeTab: true,
                //autoCommands: 'pi sqrt',
                substituteTextarea(){
                    //  阻止键盘
                    return $(`<textarea readonly autocapitalize=off autocomplete=off autocorrect=off spellcheck=false x-palm-disable-ste-all=true/>`)[0];
                },
                handlers: {
                    edit: function() { // useful event handlers
                        latexSpan.textContent = mathField.latex(); // simple API
                    }
                }
            });
            mathField.focus();
            this.inputKey();
            this.keyMoreEvent();
            this.toolsEvent();
            if(initLatex){
                mathField.write(initLatex)
            }
            // mathField.write("1^{}")
            //mathField.write("\\sum")
        },

        /**
         * 输入
         */
        inputKey(){
            $(document).on("touchend",".key-item.input",function (e) {
                let subClass = $(this).data("sub-class");
                if(subClass){
                    subClass = subClass.split(" ").join(".");
                }
                let type = $(this).data("type");
                let $toolsMore = $(`.sub-list>.${type}.${subClass}`);
                // 二级弹出且不是二级的点击 那么隐藏对应的二级
                if($(this).parent().parent()[0].className.indexOf('sub-list') === -1){
                    if ($toolsMore.is(":hidden") ||　$toolsMore.length == 0) { // 隐藏弹出来的菜单
                        $(`.sub-list > .key-group`).fadeOut('fast');
                        let latex = $(this).data("latex");
                        mathField.write(latex)
                        // 注册事件
                        registerEvent($("#latex").text(),INPUT_EVENT);
                    }
                }else{
                    if($toolsMore.is(":hidden") ||　$toolsMore.length == 0){
                        let latex = $(this).data("latex");
                        mathField.write(latex)
                        // 注册事件
                        registerEvent($("#latex").text(),INPUT_EVENT);
                    }
                }
            })
        },

        /**
         * 长按弹出更多
         */
        keyMoreEvent(){
            let time = null;
            $("body").on("touchstart",".key-item.more",function (e) {
                time = setTimeout(function () {
                    time = null;
                    clearTimeout(time)
                    let subClass = $(this).data("sub-class");
                    if(subClass){
                        subClass = subClass.split(" ").join(".")
                    }
                    let type = $(this).data("type");
                    let width = $(this).width();
                    let height = $(this).height();
                    let offset = $(this).offset();
                    let $toolsMore = $(`.sub-list>.${type}.${subClass}`);
                    let left = width + offset.left;
                    if($toolsMore.width() + left > $("body").width()){
                        left = $("body").width() - $toolsMore.width() - 10;
                    }
                    if ($toolsMore.is(":hidden")) {
                        $(`.sub-list > .key-group`).fadeOut('fast')
                        $toolsMore.css({top: offset.top - height, left: left}).fadeIn('fast')
                    } else {
                        $toolsMore.css({top: offset.top - height, left: left}).fadeOut('fast')
                    }
                }.bind(this), 500)
            }).on("touchend",".key-item.more",function () {
                if(time){
                    clearTimeout(time)
                    $(`.sub-list > .key-group`).fadeOut('fast')
                }
            })
        },
        /**
         * 工具
         */
        toolsEvent(){
            let time = null;
            $(document).on("click",".key-item.tools",function (e) {
                e.preventDefault();
                let type = $(this).data("latex");
                let width = $(this).width();
                let height = $(this).height();
                let offset = $(this).offset();
                let $toolsMore = $(`.sub-list>.tools-more`);
                switch (type) {
                    case "tools-del":
                        mathField.keystroke('Backspace')
                        registerEvent($("#latex").text(),DELETE_EVENT);
                        break;
                    case "tools-more":
                        if ($toolsMore.is(":hidden")) {
                            $(`.sub-list > .key-group`).fadeOut('fast')
                            $toolsMore.css({top: offset.top - height, left: width}).fadeIn('fast')
                        } else {
                            $toolsMore.css({top: offset.top - height, left: width}).fadeOut('fast')
                        }
                        break;
                    case 'tools-sure':
                        registerEvent($("#latex").text(),SUB_EVENT);
                        break;
                    case 'tools-left':
                        pressKey(37)
                        break;
                    case 'tools-right':
                        pressKey(39)
                        break;
                }
            }).on("touchstart",".tools[data-latex=tools-del]",function () { // 长按清空
                time = setTimeout(function () {
                    time = null;
                    clearTimeout(time)
                    mathField.latex('');
                    registerEvent($("#latex").text(),DELETE_EVENT);
                },1000);
            }).on("touchend",".tools[data-latex=tools-del]",function () {
                clearTimeout(time)
                time = null;
            }).on("touchend",".tools-more>.key-item",function () {
                let type = $(this).data("latex")
                if(type === 'symbol'){
                    $(".keyboard>.key-list>.key-group.letter").fadeOut();
                    $(".keyboard>.key-list>.key-group.normal").fadeOut();
                }else if(type === 'letter'){
                    $(".keyboard>.key-list>.key-group.symbol").fadeOut();
                    $(".keyboard>.key-list>.key-group.normal").fadeOut();
                }else{
                    $(".keyboard>.key-list>.key-group.letter").fadeOut();
                    $(".keyboard>.key-list>.key-group.symbol").fadeOut();
                }
                $(`.sub-list>.tools-more`).fadeOut()
                $(`.keyboard>.key-list>.key-group.${type}`).css({display:'flex'}).fadeIn();
            });
        },

        /**
         * 方式失去焦点
         */
        preventFocus(){
            $(document).on("mousedown",function(e){
                if(e.target.nodeName.toUpperCase() !== 'TEST'){
                    e.preventDefault()
                }
            });

            // 阻止长按弹出菜单
            document.oncontextmenu = function () {
                return false
            };
        }
    };



    Input.fn._init.prototype = Input.fn;
    return Input;
})(jQuery);
