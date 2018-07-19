import showdown from 'showdown' 

function loadRec(){
  var converter = new showdown.Converter()
  document.getElementById('rec').innerHTML = converter.makeHtml(document.querySelector('note').innerHTML)
}

document.addEventListener("DOMContentLoaded", function(event) {
  loadRec();
});
