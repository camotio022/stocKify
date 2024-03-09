import { Typography } from "@mui/material";
import { MuiStockBotton, MuiStockNavBar, MuiStockNavBarRigth } from "../../styles";
import { Add, FileDownload } from "@mui/icons-material";
import { Root } from "../../../../styles/Root/root_styles";
export const NavBarTop = ({
    generateExcelFile,
    saveExcel,
    setSaveExcel
}) => {
    const buttons = [
        {
            label: 'Download',
            onclick: 'Download',
            variant: null,
            icon: <FileDownload />

        }, {
            label: 'Import Produts',
            onclick: null,
            variant: null,
            icon: null

        }, {
            label: 'New Produt',
            onclick: null,
            variant: 'contained',
            icon: <Add />
        },
    ]
    const clicks = (e) => {
        if (e.onclick === 'Download') {
            setSaveExcel(!saveExcel)
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
                                ...Root.hoverReverse,

                            }}
                            key={index}
                            variant={botton.variant}
                            onClick={() => clicks(botton)}
                        >
                            {botton.icon}
                            {botton.label}
                        </MuiStockBotton>
                    )
                })}
            </MuiStockNavBarRigth>
        </MuiStockNavBar>
    )
}