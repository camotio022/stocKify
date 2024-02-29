import { Stack, Input, MenuItem, FormControl, Select, InputLabel, TextField } from "@mui/material"
import { Root } from "../../styles/Root/root_styles"
import {
    MuiSearch,
    MuiSearchContainer,
    MuiSearchIcon,
    MuiStock, SearchIconWrapper, StyledInputBase,
} from "./styles"
import { Add } from "@mui/icons-material"
import { NavBarTop } from "./components/Bar"
import EstoqueTable from "./components/StoqueTable"
export const Stock = ({ }) => {
    return (
        <MuiStock>
            <NavBarTop />
            <MuiSearch>
                <MuiSearchContainer>
                    <SearchIconWrapper>
                        <MuiSearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </MuiSearchContainer>
                <Stack sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: '12px'
                }}>
                    <TextField
                        sx={{
                            mt: '-3px',
                            height: '36px',
                            maxWidth: 'auto'
                        }}
                        size="small"
                        type="date"
                    ></TextField>
                    <Select
                        sx={{
                            height: '40px',
                        }}
                        size="small"
                        labelId="outlined-select-currency-label"
                        id="outlined-select-currency"
                        defaultValue="default"
                    >
                        <MenuItem disabled value="default">Filtres</MenuItem>
                        <MenuItem value="validade">Data de validade</MenuItem>
                        <MenuItem value="purchaseDate">Data de compra</MenuItem>
                        <MenuItem value="donationDate">Data de Doação</MenuItem>
                        <MenuItem value="itemType">Tipo de item</MenuItem>
                        <MenuItem value="amount">Quantidade</MenuItem>
                        <MenuItem value="users">Users</MenuItem>
                    </Select>
                </Stack>
            </MuiSearch>
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '85%',
                width: '95%',
                mt: '7px',
            }}>
                <EstoqueTable />
            </Stack>
        </MuiStock>
    )
}