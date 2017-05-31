/**
 * Created by SIRMly on 2017/5/23.
 */

$(function(){
    var click = "ontouchstart" in document.documentElement ? "touchstart" : "click";
    //document.ontouchmove = function (e){
    //    e.preventDefault();
    //};
    var imgs = [
        "img/0.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpg",
        "img/6.jpg",
        "img/7.jpg",
        "img/8.jpg",
        "img/9.jpg"
    ];
    var proBox = $("#progress");
    preload(imgs,proBox);
    function preload(imgs,proBox){
        var progress = 0,
            proNum   = 0,
            count    = imgs.length;
        for(var i in imgs){
            var newImg = new Image();
            newImg.src = imgs[i];
            console.log( newImg.src);
            newImg.onload = function (){
                proNum++;
                progress = Math.floor(proNum/count)*100;
                if(proNum>=count){
                    progress = 100;
                    proBox.addClass("hide");
                    $("#container").removeClass("hide");
                }
                proBox.html(progress+"%");
            }
        }
    }
    var startBtn = $("#start-btn");
    var againBtn = $("#again-btn");
    var rankBtn  = $("#rank-btn");
    var rankClose  = $("#rank-close");
    startBtn.on(click, function () {
        game.init();
    });
    againBtn.on(click, function () {
        $(".card").removeClass("cardRotate");
        $(".card").removeClass("cardRotateBack");
        game.init();
    });
    rankBtn.on("click", function (){
       $("#rank").removeClass("hide");
    });
    rankClose.on("click", function (){
       $("#rank").addClass("hide");
    });
    var game = {
        init : function () {
            $("#crashes,#crashes>div").addClass("hide");
            this.pics.removeClass("trans");
            this.pics.off(click);
            this.eachNum = 0;
            this.successNum = 0;
            this.time = 600;
            this.timeText = "60.0s";
            this.gameOn();
            this.timeBox.html(this.timeText);
        },
        cardNum : 16,
        doubleNum : 8,
        cards : $(".card"),
        pics : $(".pic"),
        timeBox : $("#title-time"),
        failArr: [],
        gameOn : function (){
            /*==图片数组==*/var that = this;
            var cardArray = new Array(this.cardNum);
            for(var i=0; i<cardArray.length; i++){
                cardArray[i] = Math.floor(i/2);
            }
            /*===打乱==*/
            cardArray.sort(this.numberRandom);
            /*==添加图片==*/
            for(var i=0; i<cardArray.length; i++){
                this.cards.eq(i).css({
                    "background" : "url('img/"+ cardArray[i] +".jpg') center center  no-repeat ",
                    "background-size" : "contain"
                });
                this.pics.eq(i).attr("data-num",cardArray[i]);
            }
            /*==图片添加完成==*/
            $("#crashes,#crashes>div").addClass("hide");
            $("#game-center").removeClass("hide");

            this.cards.addClass("cardRotate");
            this.pics.addClass("trans");
            setTimeout(function (){
                game.pics.removeClass("trans");
                game.play();
            },2000);

        },
        numberRandom : function (){
            return Math.random() > 0.5 ? 1 :-1;
        },
        play : function (){
            this.timeStart();
            /*==绑定点击函数==*/
            $.each(this.pics, function (){
                $(this).on(click, function (){
                    $(this).addClass("trans");
                    if(game.failArr.length>0){
                        /*==之前不对的转过去==*/
                        game.failArr[0].removeClass("trans");
                        game.failArr[1].removeClass("trans");
                        game.failArr = [];
                    }
                    if(game.eachNum === 0){
                        game.presentNum = $(this).attr("data-num");
                        game.card1 = $(this);
                        game.box1 = $(this).parent();
                        game.eachNum = 1;
                    }else{
                        game.card2 = $(this);
                        game.box2 = $(this).parent();
                        if($(this).attr("data-num") == game.presentNum){
                            /*==成功一对==*/
                            game.box1.addClass("cardRotateBack");
                            game.box2.addClass("cardRotateBack");
                            game.successNum++;
                            if(game.successNum==game.doubleNum){
                                clearInterval(game.timer);
                                $("#game-center").addClass("hide");
                                $("#crashes,#restart-crash").removeClass("hide");
                                $("#success").text("挑战成功!")
                                $("#using-time").text("用时： "+Math.floor((600-game.time)/10)+"s");
                            }
                        }else{
                            game.failArr[0] = game.card1;
                            game.failArr[1] = game.card2;
                        }
                        game.eachNum = 0;
                    }

                });
            });
        },
        timeStart : function (){
            game.timer = setInterval(function (){
                if(game.time>0){
                    game.time--;
                    game.gameText = Math.floor(game.time/10)+ "." + Math.floor(game.time%10) + "s";
                    game.timeBox.html(game.gameText);
                } else{
                    clearInterval(game.timer);
                    $("#game-center").addClass("hide");
                    $("#success").text("挑战失败!");
                    $("#using-time").text("已超时！");
                    $("#crashes,#restart-crash").removeClass("hide");
                }
            },100)
        }
    };



});