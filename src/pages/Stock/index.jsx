import { Stack, Input, MenuItem, FormControl, Select, InputLabel } from "@mui/material"
import { Root } from "../../styles/Root/root_styles"
import {
    MuiSearch,
    MuiStock, Search, SearchIconWrapper, StyledInputBase,
} from "./styles"
import { Add } from "@mui/icons-material"
import { NavBarTop } from "./components/Bar"
export const Stock = ({ }) => {

    return (
        <MuiStock>
            <NavBarTop />
            <MuiSearch>
                <Search>
                    <SearchIconWrapper>
                        <Add />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Stack>
                    <FormControl variant="outlined" sx={{
                        minWidth: 120,
                    }}>
                        <InputLabel id="outlined-select-currency-label">Filter</InputLabel>
                        <Select
                            sx={{
                                height: '36px',
                  
                            }}
                            size="small"
                            labelId="outlined-select-currency-label"
                            id="outlined-select-currency"
                            label="Filter"
                            defaultValue=""
                        >
                            <MenuItem value="USD">Data de validade</MenuItem>
                            <MenuItem value="EUR">Data de compra</MenuItem>
                            <MenuItem value="GBP">Tipo de item</MenuItem>
                            <MenuItem value="GBP">Quantidade</MenuItem>
                            <MenuItem value="GBP">Valor</MenuItem>
                        </Select>

                    </FormControl>
                </Stack>
            </MuiSearch>
        </MuiStock>
    )
}