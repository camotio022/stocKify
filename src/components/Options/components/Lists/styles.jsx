import { MenuItem, Stack, styled } from "@mui/material";
import { Root } from "../../../../styles/Root/root_styles";

export const StylesLists = {
    button: styled(Stack)(({ }) => ({
        position: 'absolute',
        bottom: '12px',
        ...Root.defaultBotton,
        ':hover': {
            boxShadow: Root.boxS,
            backgroundColor: Root.color_app_bar,
            color: Root.color_button,
            cursor: 'pointer',
        }
    })),
    contain: styled(Stack)(({ }) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        height: '238px',
        transition: 'all .4s',
        transition: 'height width 0.4s',
        marginBottom: '12px',
        boxSizing: 'border-box',
        overflow: 'auto',
        overflowX: 'hidden',
        ...Root.scrollBar
    })),
    headerInfos: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginBlock: '12px',
        minHeight: '36px',
        backgroundColor: Root.color_app_bar,
        fontWeight: '500',
        fontSize: '15px'
    })),
    headerInfosItem: styled(Stack)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center'
    })),
    menuItem: styled(MenuItem)(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        width: '100%',
        borderRadius: '4px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#333',
        transition: 'all .3s',
        ...Root.hover
    })),
    listContain: styled(Stack)(({})=> ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '12px',
        width: '100%',
        height: 'auto',
        transition: 'all .3s'
    })),
    tagDescription: styled(Stack)(({})=> ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '288px',
        padding: '12px',
        height: 'auto',
        fontFamily: 'Arial, sans-serif',
        fontSize: '13px',
        lineHeight: '1.6',
        color: Root.gray_desfius,
        zIndex: '99999'
    })),
    tagDescriptionButton: styled(MenuItem)(({})=> ({
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Root.color_button,
        color: Root.color_default,
        padding: '4px',
        ...Root.hoverReverse,
    })),
    tagDescriptionInput: styled('input')(({})=> ({
        outline: 'none',
        border: 'none',
        marginTop: '12px',
        bottom: '12px',

        display: 'flex',
        alignItems: 'center',
        backgroundColor: Root.color_button,
        color: Root.color_default,
        padding: '4px',
        ...Root.hoverReverse,
    }))
}