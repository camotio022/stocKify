import { Typography } from "@mui/material";
import { MuiStockBotton, MuiStockNavBar, MuiStockNavBarRigth } from "../../styles";
import { Add } from "@mui/icons-material";
import { Root } from "../../../../styles/Root/root_styles";

export const NavBarTop = ({ generateExcelFile }) => {
    const buttons = [
        {
            label: 'Export to Excel',
            onclick: 'excel',
            variant: null

        }, {
            label: 'Import Produts',
            onclick: null,
            variant: null

        }, {
            label: 'New Produt',
            onclick: null,
            variant: 'contained'
        },
    ]
    const clicks = (e) => {
        if (e.onclick === 'excel') {
            alert('opas')
            generateExcelFile();
        }
    }
    return (
        <MuiStockNavBar>
            <Typography sx={{ fontWeight: 'bold' }}>Products</Typography>
            <MuiStockNavBarRigth>
                {buttons.map((botton, index) => {
                    const isContained = botton.variant === 'contained';
                    const isImportExcel = botton.onclick === 'excel';
                    return (
                        <MuiStockBotton
                            sx={isContained && {
                                backgroundColor: Root.color_button,
                                color: Root.white,
                                ...Root.hoverReverse
                            }}
                            key={index}
                            variant={botton.variant}
                            onClick={() => clicks(botton)}
                        >
                            {isContained && <Add />}
                            {botton.label}
                        </MuiStockBotton>
                    )
                })}
            </MuiStockNavBarRigth>
        </MuiStockNavBar>
    )
}