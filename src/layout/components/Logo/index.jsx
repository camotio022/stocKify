export const LogoMainLayout = ({ image, text }) => {
    return (
        <>
            <img
                style={{
                    marginTop: '12px',
                    width: '65px',
                    height: '65px'
                }}
                src={image}
                alt="imagem da logo da junta mais!" />
            {text}
        </>
    )
}