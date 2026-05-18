import { Alert, Typography } from "@mui/material"
import { MuiModalInpExtension, MuiModalInpExtensionChecked, MuiModalInput, MuiModalInputExtension, MuiModalPapper, MuiModalPapperClose, MuiModalSave, MuiModalTitle, MuiModalZindex } from "./styles"
import { Root } from "../../styles/Root/root_styles"
import { useContext, useState } from "react"
import { TagsNewItem } from "../../pages/NewItem/styles"
import { Check, Close } from "@mui/icons-material"
import generateExcelFile from "../../saveExcel"
import { DownloadPDF } from "../../savePdf"
import { AuthContext } from "../../auth_context"
import { useLocation } from "react-router-dom"
import salvaEntradas from "../../saveExcel/entradas"
import salvandoAsSaidas from "../../saveExcel/salvaSaidas"
function naoTemEspacos(texto) {
    return texto.indexOf(' ') === -1;
}
export const ModalZindex = ({
    setSaveExcel,
    saveExcel
}) => {
    const { downloads } = useContext(AuthContext)
    console.log("detalhes", downloads)
    const location = useLocation()
    const [extension, setExtension] = useState(null)
    const [open, setOpen] = useState(false)
    const [fillname, setFillname] = useState('')
    const checkedExtension = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: '4px',
        height: '100%',
        bgcolor: Root.color_button_opacity,
        color: Root.color_button
    }
    console.log(downloads.estoque)
    const success = () => {
        setTimeout(() => {
            setFillname('')
            setOpen(false)
        }, 6000)
    }
    return (
        <TagsNewItem.container>
            <TagsNewItem.paper>
                {open && <Alert sx={{
                }} icon={<Check fontSize="inherit" />} severity="success">
                    O seu arguivo {fillname}.{extension} foi salvo, abra nos downloads do seu dispositivo!
                </Alert>}
                <TagsNewItem.close onClick={() => setSaveExcel(!saveExcel)} >
                    <Close />
                </TagsNewItem.close>
                <TagsNewItem.typography mb={2}>
                    Digite o nome do arquivo que deseja salvar
                </TagsNewItem.typography>
                <TagsNewItem.fromControl>
                    <MuiModalInput
                        value={fillname}
                        onChange={(e) => {
                            setFillname(e.target.value)
                        }}
                        placeholder="Enter your fill name"
                    />
                    {extension &&
                        <MuiModalTitle
                            sx={{
                                textTransform: 'lowercase',
                                ...checkedExtension
                            }}
                        >
                            .{extension}
                        </MuiModalTitle>}
                </TagsNewItem.fromControl>
                <MuiModalInpExtension>
                    {[
                        {
                            label: 'Pdf',
                            type: 'pdf'
                        },
                        {
                            label: 'Excel',
                            type: 'xlsx'
                        }
                    ].map((download, index) => {
                        return (
                            <MuiModalInpExtensionChecked sx={download.type === extension ? {
                                color: Root.white,
                                bgcolor: Root.color_button,
                                boxShadow: Root.boxS,
                            } :
                                { ...Root.hover, backgroundColor: Root.color_button_opacity2 }} key={index} onClick={() => setExtension(download.type)}>
                                {download.label}
                            </MuiModalInpExtensionChecked>
                        )
                    })}
                </MuiModalInpExtension>
                <TagsNewItem.submit sx={{
                    backgroundColor:
                        (!extension ||
                            !fillname ||
                            !naoTemEspacos(fillname)) ?
                            Root.color_button_opacity : Root.color_button,
                    color: Root.white,
                    fontFamily: Root.fontFamilyMonospace
                }} onClick={() => {
                    if (extension === 'xlsx') {
                        try {
                            if (location.pathname === '/') {
                                generateExcelFile(downloads.estoque, fillname)
                            } else if (location.pathname === '/entradas') {
                                salvaEntradas(downloads.entradas, fillname)
                            } else if (location.pathname === '/exits') {
                                salvandoAsSaidas(downloads.saidas, fillname)
                            }
                        } catch (error) {
                            console.log(error)
                        } finally {
                            setOpen(true)
                            success()
                        }
                    } else if (extension === 'pdf') {
                        try {
                            DownloadPDF(downloads.estoque, fillname, location.pathname)
                        } catch (error) {
                            console.log(error)
                        } finally {
                            setOpen(true)
                            success()
                        }
                    }
                }}>
                    Baixar o arguivo
                </TagsNewItem.submit>
            </TagsNewItem.paper>
        </TagsNewItem.container>
    )
}