window.onload = function () {

    var oScreenBanner = document.getElementsByClassName("screen-banner")[0];
    var oAllScreen = document.getElementsByClassName("all-screen")[0];
    var arrScreen = document.getElementsByClassName("screen-one");
    var screenW, screenH;
    var page = 0;
    var arrbtn = btn.getElementsByTagName('li');
    function resize() {
        // 获取屏幕宽高
        screenW = document.documentElement.clientWidth;
        screenH = document.documentElement.clientHeight;
        // 设置宽高    总轮播图    大盒子    每一屏
        oAllScreen.style.width = oScreenBanner.style.width = screenW + "px";
        oScreenBanner.style.height = screenH + "px";
        oAllScreen.style.height = screenH * arrScreen.length + "px";
        for (var i = 0; i < arrScreen.length; i++) {
            arrScreen[i].style.width = screenW + "px";
            arrScreen[i].style.height = screenH + "px";
        }

        oAllScreen.style.top = -page * screenH + "px";//恢复原样
    }
    resize();
    window.onresize = resize;//动态获取宽高

    var isRunning = false; // 儅isRunning 為true  鼠標滾軸不管事
    // 儅isRunning 為false  鼠標滾軸管事
    for (let i = 0; i < arrbtn.length; i++) {
        arrbtn[i].onclick = function () {
            page = i;
            oAllScreen.style.top = -page * screenH + "px";
            for (var j = 0; j < arrbtn.length; j++) {
                arrbtn[j].classList.remove('active');
            }
            this.classList.add('active');
        }

    }
    function scrollUp() {
        if (!isRunning) {
            isRunning = true;
            // 設置定時器  儅1秒之後  滾軸繼續可以使用
            setTimeout(function () {
                isRunning = false;
            }, 1000);
            if (page > 0) {
                page--;
                oAllScreen.style.top = -page * screenH + "px";
                for (var j = 0; j < arrbtn.length; j++) {
                    arrbtn[j].classList.remove('active');
                }
                arrbtn[page].classList.add('active');
            }
        }
    }

    function scrollDown() {
        if (!isRunning) {
            isRunning = true;
            setTimeout(function () {
                isRunning = false;

            }, 1000);
            if (page < arrScreen.length - 1) {
                page++;
                oAllScreen.style.top = -page * screenH + "px";
                for (var j = 0; j < arrbtn.length; j++) {
                    arrbtn[j].classList.remove('active');
                }
                arrbtn[page].classList.add('active');
            }
        }
    }


    // chrome   ie
    addEvent(window, "mousewheel", mouseWheel);
    // ff
    addEvent(window, "DOMMouseScroll", mouseWheel);


    // 滚轴事件函数
    function mouseWheel(ev) {
        var oEvent = window.event || ev;
        if (oEvent.detail) {
            if (oEvent.detail > 0) {
                scrollDown()
            } else {
                scrollUp()
            }
        } else if (oEvent.wheelDelta) {
            if (oEvent.wheelDelta > 0) {
                scrollUp()
            } else {
                scrollDown()
            }
        }
    }


    function addEvent(ele, type, listener) {
        if (ele.addEventListener) {
            ele.addEventListener(type, listener);
        } else {
            ele.attachEvent("on" + type, listener);
        }
    }

}

