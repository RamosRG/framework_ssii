<footer class="w3-container w3-padding-16 w3-light-grey">
    <p class="w3-right">Powered by <a href="#" target="_blank" class="w3-hover-text-indigo">Orlando Ramos</a></p>
</footer>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-rc.0/js/select2.min.js"></script>
<script src="../public/js/audits.js"></script>

<script>
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

$(document).ready(function() {
    $('#example').DataTable();

    // Add more rows to tables
    $('.add-row').click(function() {
        var table = $(this).closest('table');
        var newRow = table.find('tbody tr:last').clone();
        newRow.find('input').val('');
        table.find('tbody').append(newRow);
    });

    // Remove row from tables
    $('table').on('click', '.remove-row', function() {
        $(this).closest('tr').remove();
    });
});
</script>
</body>
</html>