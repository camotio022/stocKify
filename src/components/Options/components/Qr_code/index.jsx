import React, { useState } from 'react';
import QRCode from 'qrcode.react';

export const QRCodeReaderData = ({ data }) => {
    let dataString = JSON.stringify(data);
    return (
        <div>
            <QRCode value={dataString}
                delay={300}
                style={{ width: '100%' }}
            />
        </div>
    );
}

