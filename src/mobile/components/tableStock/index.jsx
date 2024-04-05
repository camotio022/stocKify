import { Box, Container, Stack, Typography } from "@mui/material"
import { Root } from "../../../styles/Root/root_styles"
import { StylesTableMobile } from "./style"
import { grey } from "@mui/material/colors"

export const TableStock = ({ item }) => {
    const headerInfos = [
        'Nome',
        'Quantidade',
        'Validade',
    ]
    return (
        <>
            <StylesTableMobile.tableRow>
                {headerInfos.map((item, index) => {
                    return (
                        <StylesTableMobile.tableRowItem
                            sx={{
                                fontFamily: Root.fontFamilyMonospace,
                                fontWeight: 'bold',
                                color: Root.color_app_bar,
                            }}
                            key={index}>
                            {item}
                        </StylesTableMobile.tableRowItem>
                    )
                })}
            </StylesTableMobile.tableRow>
            <StylesTableMobile.tableRow sx={{
                flexDirection: 'column',
                backgroundColor: Root.color_button_opacity,
                color: Root.color_button,
            }}>
                {item.map((i, ix) => {
                    return (
                        <Stack sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: '100%',
                            height: 'auto',
                        }}>
                            <StylesTableMobile.tableRowItem sx={{
                                minHeight: '38px',
                            }} key={ix}>
                                {i.nome}
                            </StylesTableMobile.tableRowItem>
                            <StylesTableMobile.tableRowItem sx={{
                                minHeight: '38px'
                            }} key={ix}>
                                {i.quantidade}
                            </StylesTableMobile.tableRowItem>
                            <StylesTableMobile.tableRowItem sx={{
                                minHeight: '38px'
                            }} key={ix}>
                                {i.dataValidade}
                            </StylesTableMobile.tableRowItem>
                        </Stack>
                    )
                })}
            </StylesTableMobile.tableRow>
        </>
    )
}