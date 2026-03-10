function saveMember(member){

let members = JSON.parse(localStorage.getItem("members")) || [];

members.push(member);

localStorage.setItem("members", JSON.stringify(members));

}

function getMembers(){

return JSON.parse(localStorage.getItem("members")) || [];

}