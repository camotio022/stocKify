import { useEffect, useState } from "react";
import { StylesDetailsItems } from "./styles"
import Image from '../../images/layout/pass.png'
import { useNavigate, useParams } from 'react-router-dom';
import { get_items } from "../../api/products/get";
import { Root } from "../../styles/Root/root_styles";
import { Close, Info, UnfoldMore } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { TagsNewItem } from "../NewItem/styles";
import { StyleCommits } from "./commits/styles";
import { Commits } from "./commits";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase_config";

export const SectionTag = ({ value, labelExtern, backgroundColor }) => {

    return (
        <StylesDetailsItems.sectionsRow>
            <Stack sx={{
                fontWeight: 'bold',
                fontSize: '14px',
                color: Root.color_button
            }}>
                {labelExtern}
            </Stack>
            <StylesDetailsItems.sectionsRowValue sx={{ backgroundColor }}>
                {value}
            </StylesDetailsItems.sectionsRowValue>
        </StylesDetailsItems.sectionsRow>
    )
}
export const DetailsItems = () => {
    const navigate = useNavigate()
    const [item, setItem] = useState({})
    const { id } = useParams();
    const closeDetails = () => {
        navigate(-1)
    }
    const filteredKeys = Object.keys(item).filter(key => (
        key !== 'author' &&
        key !== 'nome' &&
        key !== 'quantidade'
    ));
    const keyMapping = {
        dataChegada: { label: 'Data de chegada', backgroundColor: 'blue' },
        dataValidade: { label: 'Data de validade', backgroundColor: 'green' },
        id: { label: 'Id do documento', backgroundColor: 'red' },
        categoria: { label: 'Categoria', backgroundColor: 'orange' },
    };
    const geTokenItem = async () => {
        const stockDocRef = doc(db, 'stock', id);
        const unsubscribe = onSnapshot(stockDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setItem(data);
                console.log("Dados do documento atualizados:", data);
            } else {
                console.log("O documento não existe.");
            }
        });
        return unsubscribe;
    }
    useEffect(() => {
        geTokenItem()
    }, [id])
    return (
        <StylesDetailsItems.container>
            <StylesDetailsItems.nav_bar>
                <StylesDetailsItems.title sx={{ color: Root.color_button }}>
                    {item.nome}
                </StylesDetailsItems.title>
            </StylesDetailsItems.nav_bar>
            <StylesDetailsItems.container2>
                <TagsNewItem.close onClick={closeDetails}>
                    <Close />
                </TagsNewItem.close>

                <StylesDetailsItems.subtitle minh={true} sx={{
                    ml: 2,
                    mt: 2,
                    p: 3,
                    bgcolor: Root.color_default,
                }}>
                    <StylesDetailsItems.infeite />
                    <StylesDetailsItems.infeite sx={{

                    }} />
                    <>
                        {item.nome}
                    </>
                    <StylesDetailsItems.title sx={{
                        fontSize: '38px'
                    }}>
                        {item.quantidade} {item.quantidade > 1 ? 'Unidades' : 'Unidades'}
                    </StylesDetailsItems.title>
                </StylesDetailsItems.subtitle>
                <StylesDetailsItems.sections>
                    {filteredKeys.map((key, index) => {
                        const { label, backgroundColor } = keyMapping[key] || { label: key, color: 'black' };

                        return (
                            <SectionTag
                                key={index}
                                labelExtern={label}
                                value={item[key]}
                                backgroundColor={backgroundColor}
                            />
                        )
                    })}
                </StylesDetailsItems.sections>

            </StylesDetailsItems.container2>


            <StylesDetailsItems.title sx={{
                mt: 2,
                fontSize: '18px',
                color: Root.color_button,
                textTransform: 'uppercase',
                padding: '8px'
            }}>
                Commits desse item
            </StylesDetailsItems.title>
            <StylesDetailsItems.bar>
                {['Entradas & Saídas', 'Número/Commits', 'Quantidade/Commits', 'Data', 'Usuário'].map((tag, index) => {
                    return (
                        <StylesDetailsItems.barTag key={index} sx={{ ...Root.hover }}>
                            {tag} <UnfoldMore />
                        </StylesDetailsItems.barTag>
                    )
                })}
            </StylesDetailsItems.bar>
            <Commits id={item.id} />
        </StylesDetailsItems.container>
    )
}