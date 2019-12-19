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
        // const loadDataFirst = async ($mainDiv, $total) => {
        //     //create box picture
        //     const item = $total;
        //     // for (let i = 0; i < item; i++){
        //         // var divBox = document.createElement('div');
        //         // divBox.setAttribute("className", 'box');
        //         // divBox.setAttribute("id", 'box' + i);
        //         // listen event server send image from user
        //         socket.on("server-send-danhsach-img", function (data) {
        //             data.forEach(function(i){
        //                 $($mainDiv).append( '<div className="box">' +
        //                                         '<img src="'+ i + '" />' +
        //                                     '</div>'
        //                                 );
        //             });
        //         });
        //         // $($mainDiv).append([divBox]);
        //     // }
        // }
        // catch Event User register
        socket.on("server-send-danhsach-Users", function(data){
            $("#userContent").html("");
            data.forEach(function(i){
                $("#userContent").append("<p class='user'>" + i + "</p>");
            });
        });

        // listen event server send image from user
        socket.on("server-send-danhsach-img", function (data) {
            // console.log(data)
                $(".box").html("");
                $(".box").append('<img src="'+ data + '" />')
                // $(".box_container").append( '<div className="box">' +
                //                                 '<img src="'+ data + '" />' +
                //                              '</div>'
                //                         );
        });

        // //content vars
        var arrBox = [];
         arrBox.push(content.children[0]);
        for ( let i = 1; i < 50; i++ ){
            arrBox.push(arrBox[i - 1].nextSibling);
        }
        var box = 0;
        for ( let i = 0; i < 50; i++){
            box = box + 20;
            arrBox[i].style.position='absolute';
            arrBox[i].style.top = box + 'px';
        }
        // sort random box number
        arrBox.sort(function(){return 0.5-Math.random()});

        //Remove initial flash
        TweenMax.to(app, 0, {css: {visibility: 'visible'}})
        //Content Animation
        TweenMax.staggerFromTo(arrBox, 40,
            { x: -100 },
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
            }, 3, 'Start')
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
                    <div className="box">1</div>
                    <div className="box">2</div>
                    <div className="box">3</div>
                    <div className="box">4</div>
                    <div className="box">5</div>
                    <div className="box">6</div>
                    <div className="box">7</div>
                    <div className="box">8</div>
                    <div className="box">9</div>
                    <div className="box">10</div>

                    <div className="box">11</div>
                    <div className="box">12</div>
                    <div className="box">13</div>
                    <div className="box">14</div>
                    <div className="box">15</div>
                    <div className="box">16</div>
                    <div className="box">17</div>
                    <div className="box">18</div>
                    <div className="box">19</div>
                    <div className="box">20</div>

                    <div className="box">21</div>
                    <div className="box">22</div>
                    <div className="box">23</div>
                    <div className="box">24</div>
                    <div className="box">25</div>
                    <div className="box">26</div>
                    <div className="box">27</div>
                    <div className="box">28</div>
                    <div className="box">29</div>
                    <div className="box">30</div>

                    <div className="box">31</div>
                    <div className="box">32</div>
                    <div className="box">33</div>
                    <div className="box">34</div>
                    <div className="box">35</div>
                    <div className="box">36</div>
                    <div className="box">37</div>
                    <div className="box">38</div>
                    <div className="box">39</div>
                    <div className="box">40</div>

                    <div className="box">41</div>
                    <div className="box">42</div>
                    <div className="box">43</div>
                    <div className="box">44</div>
                    <div className="box">45</div>
                    <div className="box">46</div>
                    <div className="box">47</div>
                    <div className="box">48</div>
                    <div className="box">49</div>
                    <div className="box">50</div>
            </div>
        </div>
    );
}

export default Home_PC;