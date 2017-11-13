package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;




import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
 


import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


/**
 * Servlet implementation class PushToExcel
 */
@WebServlet("/PushToExcel")
public class PushToExcel extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PushToExcel() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String partno = request.getParameter("partno");
		String partname = request.getParameter("partname");
		String processname = request.getParameter("processname");
		String usl = request.getParameter("usl");
		String mid = request.getParameter("mid");
		String lsl = request.getParameter("lsl");
		String density = request.getParameter("density");
        String burr = request.getParameter("burr");
        String bubbleValue = request.getParameter("bubbleValue");
		
		System.out.println(usl + " value "+mid);
				
		//String excelFilePath = "C:/eclipse-jee-luna-R-win32-x86_64/eclipse/ControlPlanDemo.xlsx";
		String excelFilePath = "ControlDemo.xlsx"; //C:/eclipse-jee-luna-R-win32-x86_64/eclipse/ControlDemo.xlsx
        
        try {
            FileInputStream inputStream = new FileInputStream(new File(excelFilePath));
            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
	        XSSFSheet sheet = workbook.getSheetAt(0);
            
            Cell cellPartNo= sheet.getRow(2).getCell(0);
            String partNo = cellPartNo.getStringCellValue();
            System.out.println("partno text "+partNo);
            cellPartNo.setCellValue(partNo+" "+partno);
            
           Cell cellPartName= sheet.getRow(3).getCell(0);
            String partName = cellPartName.getStringCellValue();
            cellPartName.setCellValue(partName+" "+partname);
            
            
            Row compactionRow = sheet.createRow(8);
            Cell cellProcessName= compactionRow.createCell(1);
            cellProcessName.setCellValue(processname);    
            
            Cell cellWeightNo = compactionRow.createCell(3);
            cellWeightNo.setCellValue("1");
            
            Cell cellWeight = compactionRow.createCell(4);
            cellWeight.setCellValue("Weight");
            
            Cell cellWeightUsl = compactionRow.createCell(7);
            cellWeightUsl.setCellValue("USL : "+usl);
            
            Cell cellWeightMid = sheet.createRow(9).createCell(7);
            cellWeightMid.setCellValue("MID : "+mid);
            
            Cell cellWeightLsl = sheet.createRow(10).createCell(7);
            cellWeightLsl.setCellValue("LSL : "+lsl);
            
            Cell cellDensity = sheet.createRow(11).createCell(4);
            cellDensity.setCellValue("Density");
            
            Cell cellDensityValue = sheet.getRow(11).createCell(7);
            cellDensityValue.setCellValue(density);

            Cell cellBurrNo = sheet.createRow(12).createCell(3);
            cellBurrNo.setCellValue("2");

            Cell cellBurr = sheet.getRow(12).createCell(4);
            cellBurr.setCellValue("Compaction burr control");

            Cell cellBurrValue = sheet.getRow(12).createCell(7);
            cellBurrValue.setCellValue(burr);
            
            Cell cellBubbleNo = sheet.createRow(13).createCell(3);
            cellBubbleNo.setCellValue("3");

            Cell cellBubble = sheet.getRow(13).createCell(4);
            cellBubble.setCellValue("Length");

            Cell cellBubbleValue = sheet.getRow(13).createCell(7);
            cellBubbleValue.setCellValue(bubbleValue);
            
            inputStream.close();
            
            FileOutputStream outputStream = new FileOutputStream(excelFilePath);
            workbook.write(outputStream);
            workbook.close();
            outputStream.close();
            
        }catch (IOException | EncryptedDocumentException ex) {
            ex.printStackTrace();
        }		
		
		response.getWriter().print("Appended Data to Excel");
		
	}

}
