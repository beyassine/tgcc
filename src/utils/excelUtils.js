import * as XLSX from "xlsx";

export function exportToExcel(data, filename = "data.xlsx") {
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    XLSX.writeFile(workbook, filename);
  }
  