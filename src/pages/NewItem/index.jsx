import { Close } from "@mui/icons-material"
import { TagsNewItem } from "./styles"
import { alimentosCategorizados } from "../../variables/foods"
import { Select, MenuItem, FormControl, InputLabel, Typography, TextField, CircularProgress } from '@mui/material';
import { useContext, useState } from "react";
import { Root } from "../../styles/Root/root_styles";
import { addProduct } from "../../api/products/add";
import { AuthContext } from '../../auth_context/index'
import { SimpleAlert } from "../../components/Alert";
const formattedDate = (today) => `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')
}-${today.getDate().toString().padStart(2, '0')}`;
const genderCheck = (word) => {
    const lowerWord = word.toLowerCase();
    if (lowerWord.endsWith('a') && !['ma', 'pa', 'ta'].includes(lowerWord.slice(-2))) {
        return `da ${word}`;
    } else if (lowerWord.endsWith('o') || lowerWord.endsWith('e')) {
        return `do ${word}`;
    }
}
export const NewItem = ({
    newItem,
    setNewItem
}) => {
    const { user } = useContext(AuthContext)
    const today = new Date();
    const [progress, setProgress] = useState(false)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({
        nome: "",
        categoria: "",
        quantidade: "",
        dataValidade: "",
        typeItem: "",
        donation: "",
        price: "",
        dataChegada: formattedDate(today),
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
            await addProduct.novas_entradas(data)
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
                    typeItem: '',
                    donation: '',
                    price: ''
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
                <TagsNewItem.fromControl disabled={!data.nome} variant="filled">

                    <InputLabel id="demo-simple-select-filled">
                        {data.nome} foi doado ou comprado?
                    </InputLabel>
                    <Select
                        required
                        value={data.typeItem}
                        onChange={handleData}
                        name="typeItem"
                        defaultValue="default"
                    >
                        {['comprado', 'doação'].map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </TagsNewItem.fromControl>
                {data.typeItem && <TagsNewItem.textfield
                    label={(data.typeItem === 'comprado') ? `Insira o valor ${genderCheck(data.nome)}` : `Quem é o doador ${genderCheck(data.nome)}`}
                    type={(data.typeItem === 'comprado') ? 'number' : 'text'}
                    variant="filled"
                    value={(data.typeItem === 'comprado')? data.price: data.donation}
                    onChange={handleData}
                    name={(data.typeItem === 'comprado')? "price": "donation"}
                ></TagsNewItem.textfield>}
                <TagsNewItem.textfield
                    required
                    disabled={!data.typeItem}
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