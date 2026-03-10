document.addEventListener("DOMContentLoaded", function () {

const addMemberBtn = document.querySelector(".add-member-btn");

if(addMemberBtn){
addMemberBtn.addEventListener("click", function () {
window.location.href = "add-members.html";
});
}

});