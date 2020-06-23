import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import MaterialInput from "@material-ui/core/Input";

const MultiSelect = ({
  values,
  handleChange,
  users,
}) => {
  return (
    <FormControl>
      <InputLabel id="demo-mutiple-checkbox-label">Users</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={values}
        onChange={handleChange}
        input={<MaterialInput />}
        renderValue={(selected) => selected.map((i) => i.nick).join(", ")}
      >
        {users.map((user) => (
          <MenuItem key={user.nick} value={user}>
            <Checkbox checked={values.find((a) => a.nick === user.nick)} />
            <ListItemText primary={user.nick} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
