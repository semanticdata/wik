window.openDialog = function () {
  document.getElementById("dialog").style.display = "block";
  document.getElementById("overlay").style.display = "block";
};

window.closeDialog = function () {
  document.getElementById("dialog").style.display = "none";
  document.getElementById("overlay").style.display = "none";
};

document.getElementById("overlay").addEventListener("click", closeDialog);
