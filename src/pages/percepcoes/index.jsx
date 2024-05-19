import { BarChart, LineChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase_config';


export const Percepcoes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const commitsCollection = collection(db, 'commits');
            const commitsSnapshot = await getDocs(commitsCollection);
            const commitsData = commitsSnapshot.docs.map(doc => doc.data());
            setData(commitsData);
        };
        fetchData();
    }, []);

    return (
        <>
            <LineChart
                xAxis={[{ data: data.map(entry => entry.commitNumber) }]}
                series={[
                    {
                        data: data.map(entry => entry.commitNumber),
                    },
                    {
                        data: data.map(entry => entry.quantidade),
                    },
                ]}
                width={500}
                height={300}
            />

            <BarChart
                series={[
                    { data: data.map(entry => entry.commitNumber) },
                    { data: data.map(entry => entry.quantidade) },
                ]}
                width={500}
                height={290}
                xAxis={[{ data: data.map(entry => entry.commitNumber), scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
        </>
    );
};

