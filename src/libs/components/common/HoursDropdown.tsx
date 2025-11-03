import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const HoursDropdown = () => {
  const [selectedHour, setSelectedHour] = useState("");

  // Generate hours from 00 to 23
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleChange = (event: any) => {
    setSelectedHour(event.target.value);
  };

  return (
    <FormControl sx={{ width: 220 }}>
      <InputLabel id="hours-label">Select Hour</InputLabel>
      <Select
        labelId="hours-label"
        id="hours-select"
        value={selectedHour}
        label="Select Hour"
        onChange={handleChange}
      >
        {hours.map((hour) => (
          <MenuItem key={hour} value={hour}>
            {hour}:00
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default HoursDropdown;
