<div class="w3-main">
    <div class="w3-container" id="contact" style="margin-top: 75px">
        <h1 class="w3-border-bottom w3-border-light-grey w3-padding-16 tittle" id="tittle">Audit Details</h1>

        <!-- Verification Section -->
        <div class="verification w3-container w3-card w3-white">
            <h3 class="w3-text-black">VERIFICACION Y SEGUIMIENTO</h3>
            <div class="responsive-table">
                <table id="audit-table">
                    <thead>
                        <tr>
                            <th>Numero de Línea</th>
                            <th>Pregunta</th>
                            <th>Respuesta</th>
                            <th>Evidencia Pregunta</th>
                            <th>Descripción de la acción</th>
                            <th>Evidencia de lo implementado</th>
                            <th>Fecha</th>
                            <th>Mejorado</th>
                            <th>Comentario</th>
                            <th>Responsable</th>
                        </tr>

                    </thead>
                    <tbody>
                        <!-- Aquí se agregarán dinámicamente las filas con los datos de la auditoría -->
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    <br>
    <br>
   
    <!-- Ejemplo de un botón con el id_audit en un data-* -->
    <button id="saveButton" class="w3-button w3-block w3-red">Guardar</button>



    <!-- Modal for Camera and Photo Capture -->
    <div id="overlay" class="overlay"></div>
    <div id="photoModal" class="photo-modal">
        <video id="video" autoplay class="modal-video"></video>
        <canvas id="canvas" style="display: none;"></canvas>
        <button id="takePhoto" class="w3-button w3-blue w3-round">Tomar Foto</button>
        <button id="closeCamera" class="w3-button w3-red w3-round">Cerrar Cámara</button>
    </div>
</div>
</div>