document.addEventListener("DOMContentLoaded", function(){

const form = document.querySelector("form");

form.addEventListener("submit", function(e){

e.preventDefault();

const name = document.querySelector('input[placeholder="e.g. John Doe"]').value;
const email = document.querySelector('input[type="email"]').value;
const phone = document.querySelector('input[type="tel"]').value;

if(name === "" || email === "" || phone === ""){
alert("Please fill all required fields");
return;
}

alert("Member Added Successfully!");

window.location.href = "dashboard.html";

});

});