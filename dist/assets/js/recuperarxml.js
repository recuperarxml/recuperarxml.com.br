function toggle(t){var a=document.getElementById(t);""==a.style.display?a.style.display="none":a.style.display=""}function ocultar(){for(var t=1;10>=t;t++){var a=document.getElementById("ocultar"+t);a.style.display="none"}}$(window).scroll(function(){$(".navbar").offset().top>50?$(".navbar-fixed-top").addClass("top-nav-collapse"):$(".navbar-fixed-top").removeClass("top-nav-collapse")}),$(function(){$("a.page-scroll").bind("click",function(t){var a=$(this);$("html, body").stop().animate({scrollTop:$(a.attr("href")).offset().top},1500,"easeInOutExpo"),t.preventDefault()})}),$(".navbar-collapse ul li a").click(function(){$(".navbar-toggle:visible").click()});