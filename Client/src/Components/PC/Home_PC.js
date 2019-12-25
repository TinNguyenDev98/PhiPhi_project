import React, { useEffect, useRef } from "react";
import "./Home_PC.scss";
import { TweenMax, SlowMo } from 'gsap';
import $ from "jquery";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
function Home_PC() {
    let app = useRef(null);
    let content = useRef(null);
    let _scale = 0;
    useEffect(() => {
        // catch Event User register
        socket.on("server-send-danhsach-Users", function(data){
            $("#userContent").html("");
            data.forEach(function(i){
                $("#userContent").append("<p class='user'>" + i + "</p>");
            });
        });
        var dataImg = [];
        // listen event server send image from user
        socket.once("server-send-danhsach-img", function (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                $("#box" + [i + 1]).append('<img src="'+ data[i] + '" />');
            }
        });

        // //content vars
        var arrBox = [];
        arrBox.push(content.children[0]);
        for ( let i = 1; i < 50; i++ ){
            arrBox.push(arrBox[i - 1].nextSibling);
        }
        var box = 0;
        for ( let i = 0; i < 50; i++){
            box = box + 15;
            arrBox[i].style.position='absolute';
            arrBox[i].style.top = box + 'px';
        }
        // sort random box number
        arrBox.sort(function(){return 0.5-Math.random()});

        //Remove initial flash
        TweenMax.to(app, 0, {css: {visibility: 'visible'}})
        //Content Animation
        TweenMax.staggerFromTo(arrBox, 4,
            { x: -400 },
            {
                bezier:{
                    curviness: 1.25,
                    values:[
                        { x: 100, y: 50 }, { x: 200, y: 0 },
                        { x: 270, y: 50 }, { x: 340, y: 0 },
                        { x: 410, y: 50 }, { x: 470, y: 0 },
                        { x: 620, y: 50 }, { x: 710, y: 0 },
                        { x: 850, y: 50 }, { x: 890, y: 0 },
                        { x: 1080, y: 50 }, { x: 1180, y: 0 },
                        { x: 1200, y: 50 }, { x: 1280, y: 0 },
                        { x: 1350, y: 50 }, { x: 1450, y: 0 },
                        { x: 1520, y: 50 }, { x: 1550, y: 0 },
                        { x: 1600, y: 50 }, { x: 1700, y: 0 }
                        // { x: function() {
                        //     return Math.random() * (100 - 0) + 0.5;}, y: 50
                        // },
                        // { x: function() {
                        //     return Math.random() * (200 - 150) + 0.5;},
                        //   y: function() {
                        //     return Math.random() * (30 - 0) + 0.5;}
                        // },
                        // { x: function() {
                        //     return Math.random() * (270 - 200) + 0.5;},
                        //   y: function() {
                        //     return Math.random() * (20 - 0) + 0.5;},
                        // },
                        // { x: function() {
                        //     return Math.random() * (340 - 300) + 0.5;}, y: 0
                        // },
                        // { x: 410, y: function() {
                        //     return Math.random() * (45 - 5) + 0.5;} ,
                        // },
                        // { x: 470, y: 0 },
                        // { x: function() {
                        //     return Math.random() * (470 - 420) + 0.5;} , y: 50
                        // },
                        // { x: 620, y: 0 },{ x: 680, y: 50 },
                        // { x: 710, y: function() {
                        //     return Math.random() * (15 - 0) + 0.5;} ,
                        // },
                        // { x: 850, y: 50 },  { x: 890, y: 0 },
                        // { x: 980, y: function() {
                        //     return Math.random() * (50 - 15) + 0.5;} ,
                        // },
                        // { x: 1080, y: 0 },{ x: 1180, y: 50 }, { x: 1300, y: 0 },
                        // { x: function() {
                        //     return Math.random() * (1210 - 1100) + 0.5;} , y: 50
                        // },
                        // { x: 1400, y: 0 },
                        // { x: 1520, y: function() {
                        //     return Math.random() * (50 - 20) + 0.5;} ,
                        // },
                        // { x: 1550, y: 0 }
                    ]
                },
                scale: function () {
                    _scale = Math.random() * (4 - 0.5) + 0.5;
                    return _scale;
                },
                rotation: function () {
                    return  Math.random() * (50 - 0) + 0.5;
                },
                'webkitFilter': function (){
                    return (_scale > 1.5 ? 'blur(0px)' : 'blur(2px)');
                },
                zIndex: function() {
                    return (_scale < 1.5 ? 2 : 10);
                },
                repeat: -1,
                repeatDelay: 3,
                yoyo: true,
                ease: new SlowMo(0.1, 0.1),
            }, 1, 'Start')
    }, [])

    return(
        <div id="wrapper" ref={el => app = el}>
            <h4>User Online</h4>
            <div id="userContent">
                Hugh<br/>
                Luna<br/>
                Anthony<br/>
                Xin<br/>
            </div>
            <div className="box_container" ref={el => content = el}>
                <div className="box" id="box1">
                </div>
                <div className="box" id="box2">
                </div>
                <div className="box" id="box3">
                </div>
                <div className="box" id="box4">
                </div>
                <div className="box" id="box5">
                </div>
                <div className="box" id="box6">
                </div>
                <div className="box" id="box7">
                </div>
                <div className="box" id="box8">
                </div>
                <div className="box" id="box9">
                </div>
                <div className="box" id="box10">
                </div>

                <div className="box" id="box11">
                </div>
                <div className="box" id="box12">
                </div>
                <div className="box" id="box13">
                </div>
                <div className="box" id="box14">
                </div>
                <div className="box" id="box15">
                </div>
                <div className="box" id="box16">
                </div>
                <div className="box" id="box17">
                </div>
                <div className="box" id="box18">
                </div>
                <div className="box" id="box19">
                </div>
                <div className="box" id="box20">
                </div>

                <div className="box" id="box21">
                </div>
                <div className="box" id="box22">
                </div>
                <div className="box" id="box23">
                </div>
                <div className="box" id="box24">
                </div>
                <div className="box" id="box25">
                </div>
                <div className="box" id="box26">
                </div>
                <div className="box" id="box27">
                </div>
                <div className="box" id="box28">
                </div>
                <div className="box" id="box29">
                </div>
                <div className="box" id="box30">
                </div>

                <div className="box" id="box31">
                </div>
                <div className="box" id="box32">
                </div>
                <div className="box" id="box33">
                </div>
                <div className="box" id="box34">
                </div>
                <div className="box" id="box35">
                </div>
                <div className="box" id="box36">
                </div>
                <div className="box" id="box37">
                </div>
                <div className="box" id="box38">
                </div>
                <div className="box" id="box39">
                </div>
                <div className="box" id="box40">
                </div>

                <div className="box" id="box41">
                </div>
                <div className="box" id="box42">
                </div>
                <div className="box" id="box43">
                </div>
                <div className="box" id="box44">
                </div>
                <div className="box" id="box45">
                </div>
                <div className="box" id="box46">
                </div>
                <div className="box" id="box47">
                </div>
                <div className="box" id="box48">
                </div>
                <div className="box" id="box49">
                </div>
                <div className="box" id="box50">
                </div>
            </div>
        </div>
    );
}

export default Home_PC;