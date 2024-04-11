import React, { useState } from 'react';
import QRCode from 'qrcode.react';

export const QRCodeReaderData = ({ data }) => {
    const link = `https://stoc-kify-juntamias.vercel.app/details/${data.id}`
    return (
        <div>
            <QRCode value={link}
                delay={300}
                style={{ width: '100%' }}
            />
        </div>
    );
}

