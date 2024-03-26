import { Close, Details, GetAppOutlined, InsertEmoticon, LeakRemove, List, PlaylistAdd, ProductionQuantityLimits, QrCode2, Remove, StopCircle, SupervisedUserCircle } from "@mui/icons-material"
import { TagsNewItem } from "../../pages/NewItem/styles"
import { StylesOptions } from "./stylesOptions"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Options = ({ name, setOptions, optionItem }) => {
    const [paper, setPaper] = useState(false)
    const [details, setDetails] = useState(false)
    const handleNewPaper = () => {

    }
    const items = [
        { onclick: 'details', name: 'Detalhes', icon: <Details /> },
        { onclick: null, name: 'Retirar do estoque', icon: <Remove /> },
        { onclick: 'list', name: 'Adicionar na lista', icon: <PlaylistAdd /> },
        { onclick: null, name: 'Supervisionar este item', icon: <ProductionQuantityLimits /> },
        { onclick: null, name: 'Vazamento de estoque', icon: <LeakRemove /> },
        { onclick: null, name: 'Código de barras', icon: <QrCode2 /> },
    ]
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
                    {items.map((item, index) => {
                        if (item.onclick === 'details') {
                            return (
                                <StylesOptions.link key={index} to={`/${item.onclick}/${optionItem.id}`}>
                                    <StylesOptions.item>
                                        {item.name}
                                        {item.icon}
                                    </StylesOptions.item>
                                </StylesOptions.link>

                            )
                        }
                        return (
                            <StylesOptions.item onClick={
                                () => {
                                    if (item.onclick === 'list') {
                                        setPaper(!paper)
                                    }
                                    if (item.onclick === 'details'){
                                        setDetails(!details)
                                    }
                                }
                            }>
                                {item.name}
                                {item.icon}
                            </StylesOptions.item>
                        )
                    })}

                </StylesOptions.paper>
            </StylesOptions.container>
        </>
    )
}