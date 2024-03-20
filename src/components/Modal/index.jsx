import { Alert, Stack, TextField, Typography } from "@mui/material"
import { MuiModalInpExtension, MuiModalInpExtensionChecked, MuiModalInput, MuiModalInputExtension, MuiModalPapper, MuiModalPapperClose, MuiModalSave, MuiModalTitle, MuiModalZindex } from "./styles"
import { Root } from "../../styles/Root/root_styles"
import { useState } from "react"
import { Check, Close } from "@mui/icons-material"
import generateExcelFile from "../../saveExcel"
import { DownloadPDF } from "../../savePdf"
function naoTemEspacos(texto) {
    return texto.indexOf(' ') === -1;
}
export const ModalZindex = ({
    setSaveExcel,
    saveExcel,
    stock
}) => {
    const [focus, setFocus] = useState(false)
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
    const success = () => {
        setTimeout(() => {
            setFillname('')
            setOpen(false)
        }, 6000)
    }
    return (
        <MuiModalZindex>
            <MuiModalPapper>
                {open && <Alert sx={{
                    boxShadow: Root.boxS,
                    mb: 4
                }} icon={<Check fontSize="inherit" />} severity="success">
                    O seu arguivo {fillname}.{extension} foi salvo, abra nos downloads do seu dispositivo!
                </Alert>}
                <MuiModalPapperClose onClick={() => setSaveExcel(!saveExcel)} >
                    <Close />
                </MuiModalPapperClose>
                <MuiModalTitle mb={2}>
                    Enter the file name to save
                </MuiModalTitle>
                <MuiModalInputExtension>
                    <MuiModalInput
                        value={fillname}
                        onChange={(e) => setFillname(e.target.value)}
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
                </MuiModalInputExtension>
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
                                { ...Root.hover }} key={index} onClick={() => setExtension(download.type)}>
                                {download.label}
                            </MuiModalInpExtensionChecked>
                        )
                    })}
                </MuiModalInpExtension>
                <MuiModalSave sx={{
                    backgroundColor:
                        !extension ||
                            !fillname ||
                            !naoTemEspacos(fillname) ?
                            Root.color_button_opacity : Root.color_button,
                    color: Root.white,
                    fontFamily: Root.fontFamilyMonospace
                }} onClick={() => {
                    if (extension === 'xlsx') {
                        try {
                            generateExcelFile(stock, fillname)
                        } catch (error) {
                            console.log(error)
                        } finally {
                            setOpen(true)
                            success()
                        }
                        DownloadPDF(stock, fillname)
                    } else {
                        try {
                            DownloadPDF(stock, fillname)
                        } catch (error) {
                            console.log(error)
                        } finally {
                            setOpen(true)
                            success()
                        }
                    }
                }}>
                    Save
                </MuiModalSave>
            </MuiModalPapper>
        </MuiModalZindex>
    )
}