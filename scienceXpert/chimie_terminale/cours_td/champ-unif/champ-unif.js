document.addEventListener('DOMContentLoaded', function() {
    var downloadButton = document.querySelector('.download-button');

    if (downloadButton) {
        downloadButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'test.pdf';
        });
    }
});
