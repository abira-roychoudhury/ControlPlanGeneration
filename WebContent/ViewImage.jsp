<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@page import="java.util.LinkedHashMap"%>
<%@page import="java.util.Map"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>View Image Uploaded</title>
</head>
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/imgareaselect-default.css" />
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/jquery.imgareaselect.pack.js"></script>
	<script type="text/javascript">
		var img = '<%=request.getAttribute("imgBase64").toString()%>'
		var compressedDim = {"height" : <%=request.getAttribute("compressHeight")%>,
							 "width" : <%=request.getAttribute("compressWidth")%>} 
		var fileType = '<%=request.getAttribute("fileType")%>'
		var numberOfBubbles = <%=request.getAttribute("numberOfBubbles")%>
		var coordinatesOfBubbles = <%=request.getAttribute("coordinatesOfBubbles")%>
	</script>
	
  
<body>

	<% LinkedHashMap<String,String> displayDocument = (LinkedHashMap<String,String>)request.getAttribute("displayDocument"); %>

	<div id="submitLoader" class="loader"></div>
	
	<div class="container">
	<div class="row" style="margin-top: 50px">
		<div class="col-md-8">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">Image</h3>
				</div>

		
				<div class="panel-body">
					
					<img id="image" alt=""  class="col-sm-12 col-md-12 col-xs-12"  src="" style="margin-bottom:10px" >
					
				</div>	
			</div>
		</div>
		
		<div class="col-md-4">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">Cropped Image</h3>
				</div>

		
				<div class="panel-body">
					<img id="croppedImage" alt=""  class="col-sm-12 col-md-12 col-xs-12"  src="" style="margin-bottom:10px" >
				</div>	
				
				<div class="panel-footer">
					<button type="button" id="submit" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</div>
	</div>	
	
	<div class="row">	
		<div class="col-md-12">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">
						Values Scanned
					</h3>
				</div>
				<div class="panel-body">
				
					<div id="block1">
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-2" for = "partno">Part No </label>  
							<div class="col-sm-10">
								<input class="form-control" type = "text" id="partno" value ="${displayDocument['Part No']}">
							</div>	
						</div>		
						
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-2" for = "partname">Part Name </label>  
							<div class="col-sm-10">
								<input class="form-control" type = "text" id="partname" value ="${displayDocument['Part Name']}">
							</div>	
						</div>			
						
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-2" for = "processname">Process Name </label>  
							<div class="col-sm-10">
								<input class="form-control" type = "text" id="processname" value ="${displayDocument['Process Name']}">
							</div>	
						</div>
						
						<button class="btn btn-primary" id="next1">Next</button>
					</div>
					
					<div id="block2" style="display : none">											
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-2" for = "usl"> Weight USL </label>  
							<div class="col-sm-10">
								<input class="form-control" type = "text" id="usl" value ="${displayDocument['USL']}">
							</div>	
						</div>	
						
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-2" for = "mid"> Weight MID </label>  
							<div class="col-sm-10">
								<input class="form-control" type = "text" id="mid" value ="${displayDocument['MID']}">
							</div>	
						</div>	
						
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-2" for = "lsl"> Weight LSL </label>  
							<div class="col-sm-10">
								<input class="form-control" type = "text" id="lsl" value ="${displayDocument['LSL']}">
							</div>	
						</div>						
				
						
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-2" for = "density">Density </label>  
							<div class="col-sm-10">
								<input class="form-control" type = "text" id="density" value ="${displayDocument['density']}">
							</div>	
						</div>	
						
						
						<button class="btn btn-primary" id="next2">Next</button>
					</div>

			
					<div id="block3" style="display : none">
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-3" for = "burr">Compaction control burr </label>  
							<div class="col-sm-9">
								<input class="form-control" type = "text" id="burr" value ="${displayDocument['burr']}">
							</div>	
						</div>
						
						<button class="btn btn-primary" id="next3">Next</button>
					</div>			
					
					<div id="block4" style="display : none">
						<h4> Number of Bubbles found : <%=request.getAttribute("numberOfBubbles")%> </h4>
						<div class = "form-group form-horizontal">
							<label class="control-label col-sm-2">Value</label>  
							<div class="col-sm-10">
								<input class="form-control" type="text" id="bubbleValue" value ="">
							</div>	
						</div>
						
					</div>			
					
							
				</div>
				
				<div class="panel-footer">
					<button type="button" id="excel" class="btn btn-primary">Save to Excel</button>
					<label id = "excelLabel"></label>
				</div>
				
			</div>
		</div> 
	</div>

<script src= "js/script.js" type="text/javascript"></script>
</body>
</html>