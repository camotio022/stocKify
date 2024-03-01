import { Stack, Input, MenuItem, FormControl, Select, InputLabel, TextField } from "@mui/material"
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';
import {
    MuiSearch,
    MuiSearchContainer,
    MuiSearchIcon,
    MuiStock, SearchIconWrapper, StyledInputBase,
} from "./styles"
import { NavBarTop } from "./components/Bar"
import EstoqueTable from "./components/StoqueTable"
import { estoque } from "./components/mock"
export const Stock = () => {
    const generateExcelFile = () => {
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
            { header: 'ID', key: 'id', width: 10, style: headerStyle },
            { header: 'Nome', key: 'nome', width: 20, style: headerStyle },
            { header: 'Tipo', key: 'tipo', width: 15, style: headerStyle },
            { header: 'Quantidade', key: 'quantidade', width: 15, style: headerStyle },
            { header: 'Data de Validade', key: 'dataValidade', width: 20, style: headerStyle },
            { header: 'Data de Chegada', key: 'dataChegada', width: 20, style: headerStyle }
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
                saveAs(new Blob([buffer]), 'estoque.xlsx');
            })
            .catch(error => {
                console.error('Erro ao gerar o arquivo Excel:', error);
            });
    };




    return (
        <MuiStock>
            <NavBarTop generateExcelFile={generateExcelFile} />
            <MuiSearch>
                <MuiSearchContainer>
                    <SearchIconWrapper>
                        <MuiSearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </MuiSearchContainer>
                <Stack sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: '12px'
                }}>
                    <TextField
                        sx={{
                            mt: '-3px',
                            height: '36px',
                            maxWidth: 'auto'
                        }}
                        size="small"
                        type="date"
                    ></TextField>
                    <Select
                        sx={{
                            height: '40px',
                        }}
                        size="small"
                        labelId="outlined-select-currency-label"
                        id="outlined-select-currency"
                        defaultValue="default"
                    >
                        <MenuItem disabled value="default">Filtres</MenuItem>
                        <MenuItem value="validade">Data de validade</MenuItem>
                        <MenuItem value="purchaseDate">Data de compra</MenuItem>
                        <MenuItem value="donationDate">Data de Doação</MenuItem>
                        <MenuItem value="itemType">Tipo de item</MenuItem>
                        <MenuItem value="amount">Quantidade</MenuItem>
                        <MenuItem value="users">Users</MenuItem>
                    </Select>
                </Stack>
            </MuiSearch>
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '85%',
                width: '95%',
                mt: '7px',
            }}>
                <EstoqueTable />
            </Stack>
        </MuiStock>
    )
}