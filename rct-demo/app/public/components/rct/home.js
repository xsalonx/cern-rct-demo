import {h} from '/js/src/index.js';

export default function home(model) {

function onClickAction(modal) {
    if (modal) modal.style.display = "block";
    else console.log('modal not found');
}
/*
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modal-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 
  */  
    return h(
        'h.title', 'welcome',
        //modal('Title', 'Content'),
        h('button.btn', {id: 'modal-btn', onclick: onClickAction(document.getElementById('myModal')) }, 'Open modal')
    );
}