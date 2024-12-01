<footer class="w3-container w3-padding-16 w3-light-grey">
    <p class="w3-right">Powered by <a href="#" target="_blank" class="w3-hover-text-indigo">Orlando Ramos</a></p>
</footer>
</div>

<script src="../public/js/framework/jquery-3.6.0.min.js"></script>
<script src="../public/js/framework/jquery.dataTables.min.js"></script>
<script src="../public/assets/sweetalert2/sweetalert2.all.min.js"></script>
<script src="../public/js/audit/auditsComplete.js"></script>

<script>
// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}
</script>
</body>
</html>