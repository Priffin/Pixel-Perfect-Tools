function generateImage() {
    var canvasWidth = parseInt(document.getElementById("canvasWidth").value);
    var canvasHeight = parseInt(document.getElementById("canvasHeight").value);
	var pixels = parseInt(document.getElementById("pixelCount").value);
	var color1 = (document.getElementById("colour1").value.length === 0) ? "#ffb0c5" : document.getElementById("colour1").value;
	var color2 = (document.getElementById("colour2").value.length === 0) ? "#99cdf0" : document.getElementById("colour2").value;
	var colorText = (document.getElementById("colourText").value.length === 0) ? "black" : document.getElementById("colourText").value;
	var opacity = parseInt(document.getElementById("opacity").value);
	const colours = [color1, color2]

    var canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var ctx = canvas.getContext("2d");

    if (canvasWidth > 0 && canvasHeight > 0) {

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw white background
		ctx.globalAlpha = 0;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = opacity / 100;

        // Calculate and draw the pixels to the screen
        const pixelWidth = canvasWidth / 60;
        const pixelHeight = canvasHeight / 12;
		const pixelY = (canvasHeight / 2) - (pixelHeight / 2);
		
		// Calculate the maximum font size to fit inside the rectangle
		var fontSize = 1;
		ctx.font = fontSize + "px Consolas"; // Start with a small font size
		var textWidth = ctx.measureText(pixels).width;

		// Increase font size until it fits inside the rectangle
		while (textWidth < pixelWidth-10 && fontSize < pixelHeight) {
			fontSize++;
			ctx.font = fontSize + "px Consolas";
			textWidth = ctx.measureText(pixels).width;
		}
		
		for (let i = -pixels; i < pixels; i++) {
			var pixelX = (canvasWidth/2) + i * pixelWidth;
			ctx.fillStyle = colours[Math.abs(i%2)];
			ctx.fillRect(pixelX, pixelY, pixelWidth, pixelHeight);
		  
		    // Add the number in the center of each rectangle
			
			var num = (i < 0) ? Math.abs(i) : i + 1;
			
			ctx.fillStyle = colorText;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(num, pixelX + pixelWidth / 2, pixelY + pixelHeight / 2);
		}

        // Draw the crosshair to the screen
		ctx.globalAlpha = 1;
        var crosshairWidth = 0.003125 * canvasWidth;
        var crosshairHeight = canvasHeight;
        var crosshairX = (canvasWidth / 2) - crosshairWidth;
        var crosshairY = 0;

        ctx.fillStyle = "#e8e8e8";
        ctx.fillRect(crosshairX, crosshairY, crosshairWidth, crosshairHeight);
		
		var cropLeft = "Left: " + (canvasWidth - 60) / 2
		var cropRight = "Right: " + (canvasWidth - 60) / 2
		var cropTop = "Top: " + (canvasHeight - 580) / 2
		var cropBottom = "Bottom: " + (canvasHeight - 580) / 2
		
		document.getElementById("cropLeft").innerHTML = cropLeft;
		document.getElementById("cropRight").innerHTML = cropRight;
		document.getElementById("cropTop").innerHTML = cropTop;
		document.getElementById("cropBottom").innerHTML = cropBottom;

        // Enable download button
        document.getElementById("downloadBtn").disabled = false;
    } else {
        alert("Please enter valid values for canvas dimensions.");
    }
}

function downloadImage() {
    var canvas = document.getElementById("canvas");
    var link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'overlay.png';
    link.click();
}
