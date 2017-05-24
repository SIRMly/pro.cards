/**
 * Created by SIRMly on 2017/5/23.
 */

$(function(){
    var click = "ontouchstart" in document.documentElement ? "touchstart" : "click";
    document.ontouchmove = function (e){
        e.preventDefault();
    };
    var game = {
        init : function () {
            $("#crashes,#crashes>div").hide();
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
                this.cards.eq(i).css("background","url('img/"+ cardArray[i] +".png') no-repeat center center");
                this.pics.eq(i).attr("data-num",cardArray[i]);
            }
            console.log(cardArray);
            this.timeStart();
            /*绑定点击函数*/
            $.each(this.pics, function (){
                $(this).on(click, that.cardClick);
            });
        },
        numberRandom : function (){
            return Math.random() > 0.5 ? 1 :-1;
        },
        timeStart : function (){
            game.timer = setInterval(function (){
                if(game.time>0){
                    game.time--;
                    game.gameText = Math.floor(game.time/10)+ "." + Math.floor(game.time%10) + "s";
                    game.timeBox.html(game.gameText);
                } else{
                    alert("you fail!");
                    clearInterval(game.timer);
                }
            },100)
        },
        cardClick : function (){
            console.log(this);
            $(this).css("transform","rotateY(90deg)");
            if(game.eachNum == 0){
                game.presentNum = $(this).attr("data-num");
                game.card1 = $(this);
                game.eachNum++;
            }else{
                game.card2 = $(this);
                if($(this).attr("data-num") == game.presentNum){
                    game.successNum++;
                    if(game.successNum==game.doubleNum){
                        alert("over");
                        clearInterval(game.timer);
                    }
                }else{
                    setTimeout(function (){
                        game.cardT1 = game.card1;
                        game.cardT2 = game.card2;
                        game.cardT1.css("transform","rotateY(0deg)");
                        game.cardT2.css("transform","rotateY(0deg)");
                        //game.card1.removeClass("trans");
                        //game.card2.removeClass("trans");
                    },200);
                }
                game.eachNum = 0;
            }







        }
    };
    var startBtn = $("#start-btn");

    startBtn.on(click, function () {
        game.init();
    });

});
