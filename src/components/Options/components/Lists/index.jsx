import { MenuItem, Stack } from "@mui/material"
import { Root } from "../../../../styles/Root/root_styles"
import { Add, AttachMoney, Build, Cached, CardGiftcard, CheckCircle, DeleteForever, FavoriteBorder, Hd, LocalDining, Restaurant, Timeline } from "@mui/icons-material"
import { StylesLists } from "./styles"
import { Fragment, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../../auth_context"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../../../../firebase_config"
import { descriptionsTypeLists } from "./descriptionsTypeLists"
import { my_lists } from "../../../../api/lists/get"

export const MyLists = ({ item }) => {
    const [lists, setLists] = useState([])
    const { user } = useContext(AuthContext)
    const [value, setValue] = useState(0)
    const [openDs, setOpenDs] = useState('')
    const [progress, setProgress] = useState(false)
    const getLists = async (id) => {
        if (!id) {
            console.error("userId não fornecido.");
            return;
        }
        const unsubscribe = onSnapshot(query(collection(db, "lists"), where("userId", "==", id)), (querySnapshot) => {
            const listsData = [];
            querySnapshot.forEach((doc) => {
                listsData.push(doc.data());
            });
            setLists(listsData);
        });
        return unsubscribe;
    }
    useEffect(() => {
        getLists(user.id)
    }, [user.id])
    const iconType = {
        to_cook: <Restaurant />,
        to_eat: <LocalDining />,
        to_use: <CheckCircle />,
        to_sell: <AttachMoney />,
        to_sample: <Hd />,
        to_donate: <CardGiftcard />,
        to_donate: <FavoriteBorder />,
        to_consume: <Restaurant />,
        to_customize: <Build />,
        to_repurpose: <Cached />,
        to_test: <Timeline />,
        to_dispose: <DeleteForever />
    }
    const openDescription = (i) => {
        if (openDs === i.listName) {
            return setOpenDs('');
        }
        setOpenDs(i.listName)
    }
    const handleAddList = async (list, i) => {
        if (!list.id) return;
        setProgress(true)
        try {

            const newItemInList = {
                idItem: i.id,
                name: i.nome,
                category: i.categoria,
                quantidade: value
            }
            await my_lists.addItemToList(list.id, newItemInList)
        } catch (error) {
            console.error(error)
        } finally {
            setProgress(false)
            setValue('')
        }
    }

    return (
        <Fragment>
            <StylesLists.headerInfos direction={'row'}>
                {['Nome', 'Tipo de lista'].map((i, ix) => {
                    return (
                        <StylesLists.headerInfosItem key={ix}>{i}</StylesLists.headerInfosItem>
                    )
                })}
            </StylesLists.headerInfos>
            <StylesLists.contain>
                {lists.map((list, index) => {
                    const icon = iconType[list.type]
                    const description = descriptionsTypeLists[list.type]
                    return (
                        <StylesLists.listContain key={index} sx={{
                            backgroundColor: (openDs === list.listName) && Root.color_button_opacity,
                            borderLeft: `5px solid ${Root.color_button}`,
                            boxSizing: 'border-box'

                        }}>
                            <StylesLists.menuItem onClick={() => openDescription(list)} sx={(openDs === list.listName) && {
                                backgroundColor: Root.color_button,
                                color: Root.color_default,
                                borderRadius: '0px',
                            }}
                            >
                                {list.listName} {icon}
                            </StylesLists.menuItem>
                            {(openDs === list.listName) && <StylesLists.tagDescription>
                                <Stack sx={{ width: '88%' }}>{description}</Stack>
                                <Stack direction={'row'}>
                                    <StylesLists.tagDescriptionInput
                                        value={value}
                                        type="number"
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder="Digite a quantidade" />
                                    <StylesLists.tagDescriptionButton

                                        disabled={!value}
                                        onClick={() => handleAddList(list, item)}
                                    >
                                        {progress? 'loading...':'Adicionar'}
                                    </StylesLists.tagDescriptionButton>
                                </Stack>
                            </StylesLists.tagDescription>}
                        </StylesLists.listContain>
                    )
                })}
            </StylesLists.contain>

            <StylesLists.button>
                <Add /> Nova Lista
            </StylesLists.button>
        </Fragment>
    )
}