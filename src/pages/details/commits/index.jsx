import { useEffect, useState } from "react"
import { StyleCommits } from "./styles"
import { StylesDetailsItems } from "../styles"
import { get_commits } from "../../../api/commits/get"
export const Commits = ({ id }) => {
    const [commits, setCommits] = useState([])
    const [loading, setLoading] = useState(false)
    function getDataDeSegundos(segundos, milissegundos) {
        const milissegundosTotais = segundos * 1000 + milissegundos;
        const data = new Date(milissegundosTotais);

        return data.toLocaleString('pt-BR', { timeZone: 'UTC' });
    }

    const fetchCommits = async () => {
        try {
            const response = await get_commits.getFullDocs(id)
            setCommits(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCommits()
    }, [id])
    console.log(commits)
    return (
        <StyleCommits.container>
            {
                commits.map((commit, index) => {
                    return (
                        <StyleCommits.card key={index}>
                            <StylesDetailsItems.barTag>{commit?.type ? commit.type : 'Não registrado'}</StylesDetailsItems.barTag>
                            <StylesDetailsItems.barTag>{commit.commitNumber}</StylesDetailsItems.barTag>
                            <StylesDetailsItems.barTag>{commit.quantidade} {commit.quantidade>1? 'Unidades': 'Unidade'}</StylesDetailsItems.barTag>
                            <StylesDetailsItems.barTag>{getDataDeSegundos(commit?.timestamp.seconds, commit?.timestamp.nanoseconds)}</StylesDetailsItems.barTag>
                            <StylesDetailsItems.barTag>{commit?.author.userName}</StylesDetailsItems.barTag>
                        </StyleCommits.card>
                    )
                })
            }
        </StyleCommits.container>
    )
}