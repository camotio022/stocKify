import { Close, GetAppOutlined, InsertEmoticon, LeakRemove, List, PlaylistAdd, ProductionQuantityLimits, Remove, StopCircle, SupervisedUserCircle } from "@mui/icons-material"
import { TagsNewItem } from "../../pages/NewItem/styles"
import { StylesOptions } from "./stylesOptions"
import { useState } from "react"

export const Options = ({ name, setOptions }) => {
    const [paper, setPaper] = useState(false)
    const handleNewPaper = () => {

    }

    return (
        <>
            <StylesOptions.container>
                {paper && <StylesOptions.paper>
                    {name} para lista:
                </StylesOptions.paper>}
                <StylesOptions.paper>
                    <TagsNewItem.close onClick={() => setOptions(null)}>
                        <Close fontSize="10px" />
                    </TagsNewItem.close>
                    <StylesOptions.title>
                       {name}
                    </StylesOptions.title>
                    <StylesOptions.divider />
                    <StylesOptions.item>
                        Retirar do estoque
                        <Remove />
                    </StylesOptions.item>
                    <StylesOptions.item onClick={() => setPaper(!paper)}>
                        Adicionar na lista
                        <PlaylistAdd />
                    </StylesOptions.item>
                    <StylesOptions.item>
                        Supervisionar este item
                        <ProductionQuantityLimits />
                    </StylesOptions.item>
                    <StylesOptions.item>
                        Vazamento de estoque
                        <LeakRemove />
                    </StylesOptions.item>
                </StylesOptions.paper>
            </StylesOptions.container>
        </>
    )
}