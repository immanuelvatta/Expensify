import { useState } from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function ToggleGroup({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  return (
    <RadioGroup
      orientation="horizontal"
      aria-label="Alignment"
      name="alignment"
      variant="outlined"
      value={selectedOption}
      onChange={(event) => setSelectedOption(event.target.value)}
    >
      {options.map((option, index) => (
        <Box
          key={option.value}
          sx={(theme) => ({
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            paddingX: 2,
            '&:not(:first-child)': {
              borderLeft: '1px solid',
              borderColor: theme.palette.divider,
            },
            '&:first-child .MuiRadio-action': {
              borderTopLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
              borderBottomLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
            },
            '&:last-child .MuiRadio-action': {
              borderTopRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
              borderBottomRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
            },
          })}
        >
          <Radio
            value={option.value}
            disableIcon
            overlay
            label={option.label}
            color="neutral"
            variant={selectedOption === option.value ? 'soft' : 'plain'}
            slotProps={{
              input: { 'aria-label': option.value },
              action: {
                sx: { borderRadius: 0, transition: 'none' },
              },
              label: { sx: { lineHeight: 0, fontSize: 'sm', fontWeight: 'lg' } },
            }}
          />
        </Box>
      ))}
    </RadioGroup>
  );
}
