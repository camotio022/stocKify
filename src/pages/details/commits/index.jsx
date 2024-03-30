import { useEffect, useState } from "react"
import { StyleCommits } from "./styles"
import { StylesDetailsItems } from "../styles"
import { get_commits } from "../../../api/commits/get"
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../../../firebase_config"
export const Commits = ({ id }) => {
    const [commits, setCommits] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchCommits = async (id) => {
        const commitsRef = collection(db, "commits");
        if (id !== undefined) {
            const querySnapshot = await getDocs(query(commitsRef, where("refDoc", "==", id)));
            const commitsData = querySnapshot.docs.map(doc => doc.data());
            setCommits(commitsData);
        }
    }
    
    

    useEffect(() => {
        fetchCommits(id)
    }, [id])
    console.log(commits)
    return (
        <StyleCommits.container>
            {
                commits.map((commit, index) => {
                    return (
                        <StyleCommits.card key={index} sx={{
                            mb: commits.length === index && '20px'
                        }}>
                            <StylesDetailsItems.barTag>{commit?.type ? commit.type : 'Não registrado'}</StylesDetailsItems.barTag>
                            <StylesDetailsItems.barTag>{commit.commitNumber}</StylesDetailsItems.barTag>
                            <StylesDetailsItems.barTag>{commit.quantidade} {commit.quantidade > 1 ? 'Unidades' : 'Unidade'}</StylesDetailsItems.barTag>
                            <StylesDetailsItems.barTag>{commit.timestamp}</StylesDetailsItems.barTag>
                            <StylesDetailsItems.barTag>{commit?.author.userName}</StylesDetailsItems.barTag>
                        </StyleCommits.card>
                    )
                })
            }
        </StyleCommits.container>
    )
}