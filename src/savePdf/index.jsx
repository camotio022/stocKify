import jsPDF from 'jspdf';
import 'jspdf-autotable';
export const DownloadPDF = (stockData, name) => {
    const pdf = new jsPDF();
    const title = 'Dados do nosso estoque da junta mais';
    const headers = Object.keys(stockData[0]).map(key => {
        switch (key) {
            case 'id':
                return 'ID do Produto';
            case 'categoria':
                return 'Categoria';
            case 'nome':
                return 'Nome do Produto';
            case 'quantidade':
                return 'Quantidade';
            case 'dataValidade':
                return 'Data de Validade';
            case 'dataChegada':
                return 'Data de Chegada';
            default:
                return null;
        }
    }).filter(header => header !== null);
    const data = stockData.map(item => {
        const rowData = Object.values(item);
        return rowData.filter((_, index) => index !== headers.indexOf('author'));
    });
    pdf.setFontSize(18);
    pdf.setTextColor(255, 165, 0)
    pdf.text(title, pdf.internal.pageSize.width / 2, 30, 'center');
    pdf.autoTable({
        head: [headers],
        body: data,
        theme: 'grid',
        styles: {
            cellPadding: 2,
            fontSize: 10,
            font: 'helvetica',
            lineColor: 200,
            lineWidth: 0.2,
            fontStyle: 'normal',
            overflow: 'linebreak',
            halign: 'center',
        },
        margin: { top: 60 },
        startY: 50,
    });
    pdf.save(`${name}.pdf`);
}

