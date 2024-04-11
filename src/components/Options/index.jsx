import { Close, Details, GetAppOutlined, InsertEmoticon, LeakRemove, List, PlaylistAdd, ProductionQuantityLimits, QrCode2, Remove, StopCircle, SupervisedUserCircle } from "@mui/icons-material"
import { TagsNewItem } from "../../pages/NewItem/styles"
import { StylesOptions } from "./stylesOptions"
import { useEffect, useState } from "react"
import { RemoveItems } from "./components/Remove"
import { Root } from "../../styles/Root/root_styles"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../../firebase_config"
import { MyLists } from "./components/Lists"
import { QRCodeReaderData } from "./components/Qr_code"
export const Options = ({ name, setOptions, optionItem }) => {
    const [paper, setPaper] = useState(false)
    const [details, setDetails] = useState(false)
    const [remove, setRemove] = useState(false)
    const [docs, setDocs] = useState({});
    const [qr, setQr] = useState(false)
    const items = [
        { onclick: 'details', name: 'Detalhes', icon: <Details /> },
        { onclick: 'toremove', name: 'Retirar do estoque', icon: <Remove /> },
        { onclick: 'list', name: 'Adicionar na lista', icon: <PlaylistAdd /> },
        { onclick: null, name: 'Supervisionar este item', icon: <ProductionQuantityLimits /> },
        { onclick: null, name: 'Vazamento de estoque', icon: <LeakRemove /> },
        { onclick: 'qr', name: 'Código de barras', icon: <QrCode2 /> },
    ]
    const listenToChanges = (id) => {
        const stockDocRef = doc(db, 'stock', id);
        const unsubscribe = onSnapshot(stockDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setDocs(data);
                console.log("Dados do documento atualizados:", data);
            } else {
                console.log("O documento não existe.");
            }
        });
        return unsubscribe;
    }
    useEffect(() => {
        listenToChanges(optionItem.id);
    }, [optionItem.id])
    return (
        <>
            <StylesOptions.container>
                {remove && <RemoveItems item={docs} setRemove={setRemove}>
                </RemoveItems>}
                {paper && <StylesOptions.paper>
                    <TagsNewItem.close onClick={() => setPaper(false)}>
                        <Close fontSize="10px" />
                    </TagsNewItem.close>
                    <StylesOptions.title>
                        {name} para lista:
                    </StylesOptions.title>
                    <StylesOptions.divider />
                    <MyLists item={optionItem} />
                </StylesOptions.paper>}
                {qr && <StylesOptions.paper sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px'
                }}>
                    <TagsNewItem.close onClick={() => setQr(false)}>
                        <Close fontSize="10px" />
                    </TagsNewItem.close>
                    <StylesOptions.title sx={{
                        width: '80%',
                        textAlign: 'center'
                    }}>
                        Escaneie o código abaixo para continuar.
                    </StylesOptions.title>
                    <QRCodeReaderData data={optionItem} />
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
                                <StylesOptions.link key={index} to={`/${item.onclick}/${docs.id}`}>
                                    <StylesOptions.item>
                                        {item.name}
                                        {item.icon}
                                    </StylesOptions.item>
                                </StylesOptions.link>
                            )
                        }
                        return (
                            <StylesOptions.item sx={(
                                (item.onclick === 'toremove' && remove) ||
                                (item.onclick === 'list' && paper) ||
                                (item.onclick === 'qr' && qr)
                            )
                                && {
                                borderLeft: '3px solid',
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
                                    if (item.onclick === 'qr') {
                                        setQr(!qr)
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