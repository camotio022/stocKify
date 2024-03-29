import { Close } from "@mui/icons-material"
import { TagsNewItem } from "./styles"
import { alimentosCategorizados } from "../../variables/foods"
import { Select, MenuItem, FormControl, InputLabel, Typography, TextField, CircularProgress } from '@mui/material';
import { useContext, useState } from "react";
import { Root } from "../../styles/Root/root_styles";
import { addProduct } from "../../api/products/add";
import { AuthContext } from '../../auth_context/index'
import { SimpleAlert } from "../../components/Alert";
export const NewItem = ({
    newItem,
    setNewItem
}) => {
    const { user } = useContext(AuthContext)
    const [progress, setProgress] = useState(false)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({
        nome: "",
        categoria: "",
        quantidade: "",
        dataValidade: "",
        dataChegada: "",
        author: {
            userName: user.name === 'none' ? 'Junta Mais' : user.name,
            userEmail: user.email,
            userId: user.id,
        },
    });

    const handleData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        console.log(data)
        setProgress(true)
        try {
            await addProduct.add(data)
            setProgress(false)
        } catch (err) {
            console.log(err)
        } finally {
            setSuccess(true)
            setTimeout(() => {
                setData({
                    nome: '',
                    categoria: '',
                    quantidade: '',
                    dataValidade: '',
                    dataChegada: '',
                })
                setSuccess(false)
            }, [
                3000
            ])
        }

    }
    return (
        <TagsNewItem.container>
            <TagsNewItem.paper moreitems={data.nome}>
                {success && <SimpleAlert
                    item={data.nome}
                    quantidade={data.quantidade}
                />}
                <TagsNewItem.close onClick={() => setNewItem(false)}>
                    <Close fontSize="10px" />
                </TagsNewItem.close>
                <TagsNewItem.typography>
                    Adicionando novo item
                </TagsNewItem.typography>
                <TagsNewItem.fromControl
                    sx={!data.categoria && {
                        width: '98%'
                    }}
                    variant="filled"
                >
                    <InputLabel>Escolha o item para adicionar</InputLabel>
                    <Select
                        required
                        value={data.categoria}
                        onChange={handleData}
                        name="categoria"
                        defaultValue="default"
                    >
                        {Object.keys(alimentosCategorizados).map((categoria, index) => (
                            <MenuItem key={index} value={categoria}>
                                {categoria.replace('_', ' ')}
                            </MenuItem>
                        ))}
                    </Select>
                </TagsNewItem.fromControl>
                <TagsNewItem.fromControl disabled={!data.categoria} variant="filled">

                    <InputLabel id="demo-simple-select-filled">
                        Escolha o item sobre: {data.categoria.replace('_', ' ')}
                    </InputLabel>

                    <Select
                        required
                        value={data.nome}
                        onChange={handleData}
                        name="nome"
                        defaultValue="default"
                    >
                        {data.categoria && alimentosCategorizados[data.categoria].map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </TagsNewItem.fromControl>
                <TagsNewItem.textfield
                    required
                    disabled={!data.nome}
                    label={`Quantidade/unidade de ${data.nome}`}
                    type="number"
                    variant="filled"
                    value={data.quantidade}
                    onChange={handleData}
                    name="quantidade"
                ></TagsNewItem.textfield>
                <TagsNewItem.textfield
                    disabled={data.quantidade < 1}
                    required
                    label={`Valiadade: ${data.nome}`}
                    type="date"
                    variant="filled"
                    value={data.dataValidade}
                    onChange={handleData}
                    name="dataValidade"
                ></TagsNewItem.textfield>
                <TagsNewItem.textfield
                    disabled={!data.dataValidade}
                    sx={data.categoria && {
                        width: '98%'
                    }}
                    required
                    label={`Date de chegada: ${data.nome}`}
                    type="date"
                    variant="filled"
                    value={data.dataChegada}
                    name="dataChegada"
                    onChange={handleData}
                ></TagsNewItem.textfield>

                {data.dataChegada &&
                    <TagsNewItem.submit
                        onClick={handleSubmit}
                        can={data.quantidade}
                    >
                        {!progress ? <>
                            ADICIONAR {data.quantidade > 1 ? 'OS ITEMS' : 'O ITEM'}
                        </> :
                            <>
                                loading...
                            </>}
                        {progress && <CircularProgress size={24} sx={{
                            marginLeft: '10px',
                            color: Root.color_button,
                        }} />}
                    </TagsNewItem.submit>}
            </TagsNewItem.paper>
        </TagsNewItem.container>
    )
} 