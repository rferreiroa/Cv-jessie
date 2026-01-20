/**
 * CV Web de Jessie Molina González
 * Script para exportar a PDF
 */

/**
 * Exporta el CV a formato PDF usando html2pdf.js
 */
function exportToPDF() {
    // Obtener el contenedor del CV
    const element = document.getElementById('cv-content');

    // Configuración para html2pdf
    const opt = {
        margin: 0,
        filename: 'CV_Jessie_Molina_Gonzalez.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Mostrar mensaje de carga
    const loadingMsg = document.createElement('div');
    loadingMsg.id = 'loading-msg';
    loadingMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                background: white;
                padding: 30px 50px;
                border-radius: 10px;
                text-align: center;
                font-family: 'Montserrat', sans-serif;
            ">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 5px solid #e0e0e0;
                    border-top: 5px solid #2c5f6e;
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    animation: spin 1s linear infinite;
                "></div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
                <p style="color: #333; font-size: 16px; margin: 0;">Generando PDF...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loadingMsg);

    // Generar y descargar el PDF
    html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
            // Eliminar mensaje de carga
            const msg = document.getElementById('loading-msg');
            if (msg) {
                msg.remove();
            }
        })
        .catch((error) => {
            console.error('Error al generar PDF:', error);
            const msg = document.getElementById('loading-msg');
            if (msg) {
                msg.remove();
            }
            alert('Hubo un error al generar el PDF. Por favor, usa la opción de Imprimir y selecciona "Guardar como PDF".');
        });
}

/**
 * Función alternativa: Imprimir directamente
 * El usuario puede seleccionar "Guardar como PDF" en el diálogo de impresión
 */
function printCV() {
    window.print();
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('CV Web cargado correctamente');

    // Detectar si es móvil y ajustar el mensaje del botón
    if (window.innerWidth <= 768) {
        const printBtn = document.querySelector('.btn-print');
        if (printBtn) {
            printBtn.innerHTML = '<i class="fas fa-print"></i> Imprimir';
        }
    }
});
