//arena functions
function Arena() {

  //function to create the arena on HTML
  this.create = function (size) {
    let arena = document.getElementById("arena");

    arena.style.height = size + "px";
    arena.style.width = size + "px";
    arena.tabIndex = 0;
    arena.focus();

    //event to handle the key press
    arena.onkeydown = (e) => {
      whenKeyPressed(e);
    }
  }
}