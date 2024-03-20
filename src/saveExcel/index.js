import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const generateExcelFile = (estoque, fillname) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Estoque');
    const headerStyle = {
        font: { bold: true },
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF' },
            bgColor: { argb: '4472C4' }
        },
        border: {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
        },
        alignment: { horizontal: 'center', vertical: 'middle' }
    };
    const bodyStyle = {
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF' }
        },
        border: {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
        },
        alignment: { horizontal: 'center', vertical: 'middle' }
    };
    worksheet.columns = [
        { header: 'ID', key: 'id', width: null, style: headerStyle },
        { header: 'Categória', key: 'categoria', width: null, style: headerStyle },
        { header: 'Nome do alimento', key: 'nome', width: null, style: headerStyle },
        { header: 'Quantidade', key: 'quantidade', width: null, style: headerStyle },
        { header: 'Data de Validade', key: 'dataValidade', width: null, style: headerStyle },
        { header: 'Data de Chegada', key: 'dataChegada', width: null, style: headerStyle }
    ];
    
    estoque.forEach(item => {
        worksheet.addRow(item).eachCell({ includeEmpty: false }, cell => {
            cell.style = bodyStyle;
        });
    });
    const lastRow = worksheet.lastRow;
    if (lastRow) {
        lastRow.eachCell(cell => {
            cell.border.bottom = { style: 'thin', color: { argb: '000000' } };
        });
    }
    workbook.xlsx.writeBuffer()
        .then(buffer => {
            saveAs(new Blob([buffer]), `${fillname}.xlsx`);
        })
        .catch(error => {
            console.error('Erro ao gerar o arquivo Excel:', error);
        });
};
export default generateExcelFile;
