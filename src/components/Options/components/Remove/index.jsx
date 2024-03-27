import { Stack } from "@mui/system"
import { StylesOptions } from "../../stylesOptions"
import { Root } from "../../../../styles/Root/root_styles"
import { useContext, useState } from "react"
import { Alert, CircularProgress, LinearProgress, TextField } from "@mui/material"
import { StylesRemoveItem } from "./remove"
import { addProduct } from "../../../../api/products/add"
import { AuthContext } from '../../../../auth_context/index.jsx'
import { TagsNewItem } from "../../../../pages/NewItem/styles"
import { Close } from "@mui/icons-material"
export const RemoveItems = ({ item, setRemove }) => {
    const { user } = useContext(AuthContext)
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [progress, setProgress] = useState(false);
    const quantidadeTotal = item.quantidade;
    const porcentagens = new Set([
        Math.round(quantidadeTotal * 0.05),
        Math.round(quantidadeTotal * 0.20),
        Math.round(quantidadeTotal * 0.45),
        Math.round(quantidadeTotal * 0.60),
        Math.round(quantidadeTotal * 0.75),
        Math.round(quantidadeTotal * 0.90),
        quantidadeTotal,
        'Nenhuma das opções'
    ]);
    const hadleToRemove = async () => {
        const author = {
            userName: user.name,
            userEmail: user.email,
            userId: user.id
        }
        try {
            setProgress(true)
            await addProduct.to_remove_quantiadade(item.id, inputValue, author)
        } catch (error) {
            console.log(error)
        } finally {
            setProgress(false)
        }
    }
    return (

        <StylesOptions.paper sx={{
            minHeight: '55%',
            maxWidth: '200px',
            gap: 1
        }}>
            <TagsNewItem.close onClick={() => setRemove(false)}>
                <Close fontSize="10px" />
            </TagsNewItem.close>
            <StylesOptions.title>
                Retirnado items
            </StylesOptions.title>
            <StylesOptions.divider />
            <StylesRemoveItem.quetion>
                Qual é a sua quantidade a retirar?
            </StylesRemoveItem.quetion>
            <StylesRemoveItem.mapSugests>
                {[...porcentagens].map((item, index) => {
                    return (
                        <Stack sx={inputValue === item ? {
                            bgcolor: Root.color_button,
                            color: Root.color_default,
                            paddingInline: '18px',
                            boxShadow: Root.boxS
                        } : {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: '100%',
                            paddingInline: '18px',
                            bgcolor: Root.color_button_opacity,
                            borderRadius: '10px',
                            ...Root.hover
                        }} key={index} onClick={() => {
                            if (item === 'Nenhuma das opções') {
                                setInputValue(false)
                                setShowInput(true)
                            } else {
                                setShowInput(false)
                                setInputValue(item)
                            }
                        }}>
                            {item}
                        </Stack>
                    )
                })}

            </StylesRemoveItem.mapSugests>
            {showInput && <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
                backgroundColor: Root.color_button,
                borderRadius: '10px',
            }}>
                <StylesRemoveItem.inputQuantidade
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite a quantidade a retirar"
                    type="number">
                </StylesRemoveItem.inputQuantidade>
            </Stack>}
            {inputValue && inputValue <= item.quantidade &&
                <StylesRemoveItem.retirar onClick={hadleToRemove}>
                    Retirar {progress && <CircularProgress size={24} sx={{
                        marginLeft: '10px',
                        color: Root.color_button,
                    }} />}
                </StylesRemoveItem.retirar>}
            {inputValue > item.quantidade && <Alert sx={{ width: '80%' }} variant="filled" severity="error">
                Quantidade maior que a do estoque a retirar.
            </Alert>}
        </StylesOptions.paper>

    )
}