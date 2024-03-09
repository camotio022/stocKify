import { Checkbox } from "@mui/material";
import { MuiHeaderTable, MuiTableClhild } from "../StoqueTable/styles";
import { ArrowDropDown } from "@mui/icons-material";
import { Root } from "../../../../styles/Root/root_styles";

export const TableScroll = ({
    setSelectedItems,
    selectedItems
}) => {
    const headerInfos = [
        'ID',
        'Nome',
        'Tipo',
        'Quantidade',
        'Data de Validade',
        'Data de Chegada'
    ];
    return (
        <MuiHeaderTable>
            <MuiTableClhild>
                <Checkbox
                    sx={{
                        color: Root.color_default
                    }}
                    onChange={(e) => {
                        const isChecked = e.target.checked;
                        const newSelectedItems = isChecked ? estoque.map(item => item.id) : [];
                        setSelectedItems(newSelectedItems);
                    }}
                />
            </MuiTableClhild>
            {headerInfos.map((header, index) => (
                <MuiTableClhild key={index}>{header} <ArrowDropDown /></MuiTableClhild>
            ))}
        </MuiHeaderTable>
    )
}