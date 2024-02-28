import { Typography } from "@mui/material";
import { MuiStockBotton, MuiStockNavBar, MuiStockNavBarRigth } from "../../styles";
import { Add } from "@mui/icons-material";
import { Root } from "../../../../styles/Root/root_styles";

export const NavBarTop = ({ }) => {
    const buttons = [
        {
            label: 'Export to Excel',
            onclick: null,
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
    return (
        <MuiStockNavBar>
            <Typography sx={{ fontWeight: 'bold' }}>Products</Typography>
            <MuiStockNavBarRigth>
                {buttons.map((botton, index) => {
                    const isContained = botton.variant === 'contained';
                    return (
                        <MuiStockBotton
                            sx={isContained && {
                                backgroundColor: Root.color_button,
                                color: Root.white,
                                ...Root.hoverReverse
                            }}
                            key={index}
                            variant={botton.variant}
                            onClick={botton.onclick}
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