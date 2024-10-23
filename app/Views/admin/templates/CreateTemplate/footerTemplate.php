<!-- Footer -->
<div class="w3-light-grey w3-container w3-padding-32" style="margin-top:75px;">
    <p class="w3-right">Powered by <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" class="w3-hover-opacity">w3.css</a></p>
</div>

<!-- Scripts -->
<script src="../public/js/framework/script.js"></script>
<script src="../public/js/framework/jquery.dataTables.min.js"></script>
<script src="../public/assets/sweetalert2/sweetalert2.all.min.js"></script>
<script src="../public/js/functionsCreate.js"></script>
<script>
 
    $(document).ready(function() {
        $('#example').DataTable();
    });
    function w3_open() {
        if (window.innerWidth <= 600) {
            document.getElementById("mySidebar").style.width = "100%";
        } else {
            document.getElementById("mySidebar").style.width = "300px";
        }
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }

    function w3_close() {
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myOverlay").style.display = "none";
    }
</script>

</body>
</html>