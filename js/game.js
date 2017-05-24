/**
 * Created by SIRMly on 2017/5/23.
 */

$(function(){
    var click = "ontouchstart" in document.documentElement ? "touchstart" : "click";
    document.ontouchmove = function (e){
        e.preventDefault();
    };
    var startBtn = $("#start-btn");
    var againBtn = $("#again-btn");
    startBtn.on(click, function () {
        game.init();
    });
    againBtn.on(click, function () {
        game.init();
    });
    var game = {
        init : function () {
            $("#crashes,#crashes>div").addClass("hide");
            this.pics.removeClass("trans");
            this.pics.off(click);
            this.eachNum = 0;
            this.successNum = 0;
            this.time = 600;
            this.timeText = "60.0";
            this.gameOn();
        },
        cardNum : 20,
        doubleNum : 10,
        eachNum : 0,
        successNum : 0,
        cards : $(".card"),
        pics : $(".pic"),
        time : 600,
        timeText : "60.0",
        timeBox : $("#title-time"),
        failArr: [],
        gameOn : function (){
            /*图片数组*/var that = this;
            var cardArray = new Array(this.cardNum);
            for(var i=0; i<cardArray.length; i++){
                cardArray[i] = Math.floor(i/2);
            }
            /*打乱*/
            cardArray.sort(this.numberRandom);
            /*添加图片*/
            for(var i=0; i<cardArray.length; i++){
                this.cards.eq(i).css({
                    "background" : "url('img/"+ cardArray[i] +".jpg') center center  no-repeat ",
                    "background-size" : "contain"
                });
                this.pics.eq(i).attr("data-num",cardArray[i]);
            }
            console.log(cardArray);
            $("#crashes,#crashes>div").addClass("hide");
            $("#game-center").removeClass("hide");
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
            /*绑定点击函数*/
            $.each(this.pics, function (){
                $(this).on(click, function (){
                    $(this).addClass("trans");
                    if(game.failArr.length>0){
                        game.failArr[0].removeClass("trans");
                        game.failArr[1].removeClass("trans");
                        game.failArr = [];
                    }
                    if(game.eachNum === 0){
                        game.presentNum = $(this).attr("data-num");
                        game.card1 = $(this);
                        game.eachNum = 1;
                    }else{
                        game.card2 = $(this);
                        if($(this).attr("data-num") == game.presentNum){
                            game.successNum++;
                            if(game.successNum==game.doubleNum){
                                clearInterval(game.timer);
                                $("#game-center").addClass("hide");
                                $("#crashes,#restart-crash").removeClass("hide");
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
                    $("#using-time").text("已超时！");
                    $("#crashes,#restart-crash").removeClass("hide");
                }
            },100)
        }
    };



});