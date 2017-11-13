
$(function(){
	
	var aspectRatio;
	var croppedImageBase64;
	
	
function draw(base64) {
	var image = document.getElementById("image");		
	var imgObj = new Image();	
	imgObj.src = base64;

  	var canvas = document.createElement('canvas');  	
  	if (canvas.getContext) {
	    var ctx = canvas.getContext('2d');
	  	
	    imgObj.onload = function(){
	    	
	    	canvas.height = imgObj.height;
	    	canvas.width = imgObj.width;
	    	console.log("executing height");

	    	image.height = (image.width / imgObj.width) * imgObj.height;
	    	aspectRatioR = image.width/image.height;
	    	aspectRatio = image.width / imgObj.width;
	    	
		  	console.log(image.height)
		  	console.log(image.width)
		  	console.log(imgObj.height)
		  	console.log(imgObj.width)
		  	
		  	ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);
		  
		  	image.src = canvas.toDataURL();
		  	
	   };
  	}
}

draw(img);


function drawPolyies(base64){
	
	console.log("inside polyies")
	
	var image = document.getElementById("image");
	
	var img = new Image();  
	img.src = base64;
	
  	var canvas = document.createElement('canvas');
  	
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		img.onload = function() {
	  	
	    	canvas.height = img.height;
	    	canvas.width = img.width;

	    	owidth = (owidth - ox);
			oheight = (oheight - oy);
			
	   		image.height = (image.width / img.width) * img.height;
	    	
		    ctx.drawImage(img, 0, 0, img.width, img.height)
		  	//ctx.strokeRect(ox, oy, owidth, oheight);
			ctx.strokeStyle="red";
		    
			ctx.lineWidth = (img.width / 500 ) * 0.5;
			
			
			for(var i=0; i<7 ; i++){
				
				var coordinate = coordinatesOfBubbles[i];
				console.log(coordinate);
				var ox = coordinate.x1;
				var oy = coordinate.y1;
				var owidth = coordinate.x1 - coordinate.x2;
				var oheight =  coordinate.y1 - coordinate.y2;
				
				ox = ((img.width/compressedDim.width) * ox) - ((img.width / 500 ));
				oy = ((img.width/compressedDim.width) * oy) - ((img.width / 500 ));
				owidth = ((img.width/compressedDim.width) * owidth) + ((img.width / 500 ) * 20);
				oheight = ((img.width/compressedDim.width) * oheight) + ((img.width / 500 ) * 20);
				
		   		ctx.strokeRect(ox, oy, owidth,oheight);	
		   		
		   		console.log("drawing :"+ ox +","+ oy+","+ owidth+","+oheight  )
			}
		  	image.src = canvas.toDataURL();
		  	
	  	};
		
	}   
   
}


function getSelection(image, selection) {
	console.log("inside getSelection");

	if (parseInt(selection.width) > 0) {
        // Show image preview
        if (selection.x1 != 0 && selection.y1 != 0 && selection.width != 0 && selection.height != 0) {
        	var x1 = selection.x1;
        	var y1 = selection.y1;
        	var width = selection.width;
        	var height = selection.height;
        	        	
        	var canvas = document.createElement('canvas');
        	var canvasContext = canvas.getContext('2d'); 
        	
	    	
        	var newHeight = height/aspectRatio;
        	var newWidth = width/aspectRatio;
        	
        	canvas.height = newHeight;
	    	canvas.width = newWidth;
        	
	    	canvasContext.drawImage(image,x1/aspectRatio,y1/aspectRatio,newWidth,newHeight,0,0,newWidth,newHeight);
	    	
	    	var croppedImage = document.getElementById("croppedImage");
	    	croppedImage.src = canvas.toDataURL();
	    	croppedImageBase64 = croppedImage.src;	    	
        	
        }       
    }
};

$('#image').imgAreaSelect({
    handles: true,
    onSelectEnd: getSelection
});

var textbox = $('#partno');

$('#partno').focus(
		function(){
			console.log('1');
			textbox = $('#partno');
		});
$('#partname').focus(
		function(){
			textbox = $('#partname');
		});
$('#processname').focus(
		function(){
			textbox = $('#processname');
		});

$("#submit").click
(
    function()
    {
    	$('#bubbleValue').val("");
    	$("#submitLoader").show();
      	$('input, button, textarea').attr("disabled", true);
    	$(".container").addClass('haze');
    	$.ajax
        (
            {
                url:'/ControlPlanGeneration/SelectionOCR',
                data: {"croppedImageBase64":croppedImageBase64},
                type:'post',
                success:function(data){
                	console.log(data);
                	$('#bubbleValue').val(data); 
                	$("#submitLoader").hide();
                	$('input, button, textarea').attr("disabled", false);
                	$('.container').removeClass('haze');
                },
                error:function(err){
                	console.log(err)
                	$("#submitLoader").hide();
                	$('input, button, textarea').attr("disabled", false);
                	$('.container').removeClass('haze');
                	
                }
            }
        );
    }
);


$("#excel").click
(
    function()
    {  	
    	var partno = $('#partno').val();
    	var partname = $('#partname').val();
    	var processname = $('#processname').val(); 
    	var usl = $('#usl').val();
    	var mid = $('#mid').val();
    	var lsl = $('#lsl').val();
    	var density = $('#density').val();
        var burr = $('#burr').val();
        var bubbleValue = $('#bubbleValue').val();
    	
    	$('#excelLabel').text("");
    	$("#submitLoader").show();
      	$('input, button, textarea').attr("disabled", true);
    	$(".container").addClass('haze');
    	
    	$.ajax
        (
            {
                url:'/ControlPlanGeneration/PushToExcel',
                data: {"partno":partno, "partname":partname, "processname":processname, "usl":usl, "mid":mid, "lsl":lsl, "density":density, "burr":burr, "bubbleValue":bubbleValue},
                type:'post',
                success:function(data){
                	console.log(data);
                	$('#excelLabel').text(data); 
                	$("#submitLoader").hide();
                	$('input, button, textarea').attr("disabled", false);
                	$('.container').removeClass('haze');
                },
                error:function(err){
                	console.log(err)
                	$("#submitLoader").hide();
                	$('input, button, textarea').attr("disabled", false);
                	$('.container').removeClass('haze');
                	
                }
            }
        );
    }
);


$('#next1').click(function(){
	$('#block1').hide();
	$('#block2').show();
});

$('#next2').click(function(){
	$('#block2').hide();
	$('#block3').show();
});

$('#next3').click(function(){
	$('#block3').hide();
	$('#block4').show();
	
	drawPolyies(img);
});

});