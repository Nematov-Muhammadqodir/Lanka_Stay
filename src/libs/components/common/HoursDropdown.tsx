import React from "react";
import { MenuItem, Select } from "@mui/material";

interface HoursDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

const HoursDropdown: React.FC<HoursDropdownProps> = ({ value, onChange }) => {
  // generate hours in 24h format with 30 min steps
  const hours = Array.from({ length: 24 }, (_, h) =>
    ["00", "30"].map((m) => `${h.toString().padStart(2, "0")}:${m}`)
  ).flat();

  return (
    <Select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: 120 }}
    >
      {hours.map((time) => (
        <MenuItem key={time} value={time}>
          {time}
        </MenuItem>
      ))}
    </Select>
  );
};

export default HoursDropdown;
