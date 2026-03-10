document.addEventListener("DOMContentLoaded", function(){

const form = document.querySelector("form");

form.addEventListener("submit", function(e){

e.preventDefault();

const email = document.querySelector('input[type="email"]').value;
const password = document.querySelector('input[type="password"]').value;

if(email === "" || password === ""){
alert("Please fill email and password");
return;
}

window.location.href = "dashboard.html";

});

});