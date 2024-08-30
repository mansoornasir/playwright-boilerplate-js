const ExcelJS = require('exceljs');
const fs = require('fs-extra');

// Function to generate a filename with the current date and time
const generateFilename = () => {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[:.]/g, '-');
  return `TestResults_${dateStr}.xlsx`;
};

// Function to initialize the workbook
const initializeWorkbook = async () => {
  const templatePath = process.cwd() + '\\reports\\excel-reports\\report-template.xlsx';
  const filePath = process.cwd() + '\\reports\\excel-reports\\' + generateFilename();

  // Copy the template to the new file path
  await fs.copy(templatePath, filePath);

  // Load the copied workbook
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  // Access the worksheet (assuming the first worksheet)
  const worksheet = workbook.worksheets[0];

  return { workbook, worksheet, filePath };
};

// Function to update the status in the worksheet
const updateTestResultInWorksheet = (worksheet, caseId, status) => {
  const caseIdColumn = 'A'; // Assuming case IDs are in column A
  const statusColumn = 'H'; // Assuming statuses are in column B

  // Find the row with the given caseId and update the status
  worksheet.eachRow((row) => {
    if (row.getCell(caseIdColumn).value === caseId) {
      row.getCell(statusColumn).value = status;
    }
  });
};

// Function to save the workbook to the file
const saveWorkbook = async (workbook, filePath) => {
  await workbook.xlsx.writeFile(filePath);
};

module.exports = {
  initializeWorkbook,
  updateTestResultInWorksheet,
  saveWorkbook,
};
