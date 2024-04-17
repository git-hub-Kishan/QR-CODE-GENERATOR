document.getElementById('generateBtn').addEventListener('click', function() {
    const url = document.getElementById('urlInput').value.trim();

    if (url !== '') {
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `url=${encodeURIComponent(url)}`
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(blob => {
            const qrImgUrl = URL.createObjectURL(blob);
            const qrImg = document.getElementById('qrImg');

            // Load QR code image and handle transition after it's fully loaded
            qrImg.onload = () => {
                // Show QR code container with transition effect
                document.getElementById('qrcodeContainer').style.opacity = '1';
            };

            // Set the source of the QR code image
            qrImg.src = qrImgUrl;

            // Show QR code container and download button
            document.getElementById('qrcodeContainer').style.display = 'block';
            document.getElementById('downloadBtn').style.display = 'block';
            document.getElementById('submittedUrl').style.display = 'block';

            // Center-align the download button
            const downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.style.margin = '0 auto'; // Set left and right margin to 'auto' for center alignment

            // Hide input container
            document.getElementById('inputContainer').style.display = 'none';

            // Display the submitted URL below the heading
            const submittedUrlText = `Your QR for URL: ${url}`;
            
            document.getElementById('submittedUrl').textContent = submittedUrlText;
            // Set up download button functionality
            downloadBtn.addEventListener('click', function() {
                const a = document.createElement('a');
                a.href = qrImgUrl;
                a.download = 'qrcode.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        })
        .catch(error => console.error('Error:', error));
    }
});
