import { Close, Details, GetAppOutlined, InsertEmoticon, LeakRemove, List, PlaylistAdd, ProductionQuantityLimits, QrCode2, Remove, StopCircle, SupervisedUserCircle } from "@mui/icons-material"
import { TagsNewItem } from "../../pages/NewItem/styles"
import { StylesOptions } from "./stylesOptions"
import { useState } from "react"
import { Link } from "react-router-dom"
import { RemoveItems } from "./components/Remove"
import { Root } from "../../styles/Root/root_styles"

export const Options = ({ name, setOptions, optionItem }) => {
    const [paper, setPaper] = useState(false)
    const [details, setDetails] = useState(false)
    const [remove, setRemove] = useState(false)

    const items = [
        { onclick: 'details', name: 'Detalhes', icon: <Details /> },
        { onclick: 'toremove', name: 'Retirar do estoque', icon: <Remove /> },
        { onclick: 'list', name: 'Adicionar na lista', icon: <PlaylistAdd /> },
        { onclick: null, name: 'Supervisionar este item', icon: <ProductionQuantityLimits /> },
        { onclick: null, name: 'Vazamento de estoque', icon: <LeakRemove /> },
        { onclick: null, name: 'Código de barras', icon: <QrCode2 /> },
    ]
    return (
        <>
            <StylesOptions.container>
                {remove && <RemoveItems item={optionItem} setRemove={setRemove}>
                </RemoveItems>}
                {paper && <StylesOptions.paper>
                    <TagsNewItem.close onClick={() => setPaper(false)}>
                        <Close fontSize="10px" />
                    </TagsNewItem.close>
                    <StylesOptions.title>
                        {name} para lista:
                    </StylesOptions.title>
                    <StylesOptions.divider />
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
                            <StylesOptions.item sx={((item.onclick === 'toremove' && remove) ||
                            (item.onclick === 'list' && paper))
                            &&{
                                borderLeft:  '3px solid',
                                boxShadow: Root.boxS
                            }} onClick={
                                () => {
                                    if (item.onclick === 'list') {
                                        setPaper(true)
                                    }
                                    if (item.onclick === 'details') {
                                        setDetails(!details)
                                    }
                                    if (item.onclick === 'toremove') {
                                        setRemove(!remove)
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