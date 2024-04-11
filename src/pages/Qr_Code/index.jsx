import React from "react";
import { useParams } from 'react-router-dom';

export const ItemQrCode = ({ }) => {
    const { id } = useParams();
    return (
        <>{id}</>
    )
}