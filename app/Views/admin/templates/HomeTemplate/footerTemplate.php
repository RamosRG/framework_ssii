<!-- Footer -->
<div class="w3-light-grey w3-container w3-padding-32" style="margin-top:75px;">
    <p class="w3-right">Powered by DART ATLACOMULCO</p>
</div>

<!-- Scripts -->
<script src="../public/js/framework/script.js"></script>
<script src="../public/js/framework/jquery.dataTables.min.js"></script>
<script src="../public/assets/sweetalert2/sweetalert2.all.min.js"></script>
<script src="../public/js/functions.js"></script>
<script>
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