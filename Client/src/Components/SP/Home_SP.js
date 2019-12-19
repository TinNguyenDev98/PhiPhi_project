import React, { useEffect } from "react";
import "./Home_SP.scss";
import $ from "jquery";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
function Home_SP() {
    useEffect( () => {
        $("form").show();
        $("#success").hide();
        $('form').submit(function(e) {
            e.preventDefault();
            socket.emit('client-send-Username', $('#txtUsername').val());
            $('#txtUsername').val('');
            return false;
        });

        // catch instance duplicate Username
        socket.on("server-send-dki-thatbai", function(){
            alert(" Đã có người dki r !!!! ");
        });

        // regiter success User
        socket.on("server-send-dki-thanhcong", function(data){
            $("form").fadeOut("slow");
            $("#success").fadeIn("slow");
        });

        $("#file").on('change', function(e){
            var file = e.originalEvent.target.files[0];
            var reader = new FileReader();
            reader.onload = function(evt) {
                var img = evt.target.result;
                $('#picture').css("display","block");
                $('#picture').attr('src', img);
                $("#file_upload").on("click" , function () {
                    socket.emit("user-send-img", img);
                });
            };
            reader.readAsDataURL(file);
        });
    });
    return (
        <div id="wrapper_sp">
            <form>
                <h1>What's your name ?</h1>
                <input type="text" id="txtUsername"/>
            </form>
            <div id="success">
                <h2 >Đăng ký thành công</h2>
                <input id="file" type="file" accept="image/*"/>
                <button id="file_upload">Upload</button>
                <div id="show_img">
                    <img src="" alt="bla bla bla" id="picture"/>
                </div>
            </div>

        </div>
    );
}

export default Home_SP;