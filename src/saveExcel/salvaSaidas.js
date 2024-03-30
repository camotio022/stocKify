import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const salvandoAsSaidas = (saidas, filename) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Saidas'); // Renomeando para "Saidas"

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
        { header: 'Nome do Item', key: 'nome', width: null, style: headerStyle },
        { header: 'Quantidade', key: 'quantidade', width: null, style: headerStyle },
        { header: 'Data de Validade', key: 'dataValidade', width: null, style: headerStyle },
        { header: 'Data de Retirada', key: 'dataRetirada', width: null, style: headerStyle },
        { header: 'Hora de Retirada', key: 'horaRetirada', width: null, style: headerStyle },
        { header: 'Quem Retirou', key: 'author', width: null, style: headerStyle }
    ];

    saidas.forEach(item => {
        const { id,
            categoria,
            nome,
            quantidade,
            dataValidade,
            dataRetirada,
            horaRetirada,
            author
        } = item;
        worksheet.addRow({
            id,
            categoria,
            nome,
            quantidade,
            dataValidade,
            dataRetirada,
            horaRetirada,
            author
        }).eachCell({ includeEmpty: false }, cell => {
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
            saveAs(new Blob([buffer]), `${filename}.xlsx`);
        })
        .catch(error => {
            console.error('Erro ao gerar o arquivo Excel:', error);
        });
};

export default salvandoAsSaidas;
