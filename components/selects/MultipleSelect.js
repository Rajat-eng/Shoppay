import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Checkbox,ListItemText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({data,name,handleChange,value,...props}) {
  
  const result = data.length
  ? data.reduce((obj, cur) => ({ ...obj, [cur._id]: cur.name }), {})
  : {};

  // const [personName, setPersonName] = React.useState([]);
  // const handleInputChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  // React.useEffect(()=>{
  //   setPersonName(data)
  // },[data])
  

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">SubCategories</InputLabel>
        <Select
          name={name}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={result[value]} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
           {result &&
            Object.keys(result).map((id) => {
              return (
                <MenuItem key={id} value={id} >
                  <Checkbox checked={Object.keys(result).indexOf(id)>-1} />
                  <ListItemText primary={result[id]} />
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
}