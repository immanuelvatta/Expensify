import PropTypes from 'prop-types'; // Import PropTypes
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import AspectRatio from '@mui/joy/AspectRatio';
import FormControl from '@mui/joy/FormControl';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

export default function CountrySelector({ sx, ...props }) {
  const countries = [
    // ... (list of countries, as provided in your code)
  ];

  return (
    <FormControl
      {...props}
      sx={[{ display: { sm: 'contents' } }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Autocomplete
        aria-label="Country"
        autoHighlight
        isOptionEqualToValue={(option, value) => option.code === value.code}
        defaultValue={{ code: 'US', label: 'United States', phone: '1' }}
        options={countries}
        renderOption={(optionProps, option) => (
          <AutocompleteOption {...optionProps}>
            <ListItemDecorator>
              <AspectRatio ratio="1" sx={{ minWidth: 20, borderRadius: '50%' }}>
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
              </AspectRatio>
            </ListItemDecorator>
            {option.label}
            <Typography component="span" textColor="text.tertiary" ml={0.5}>
              (+{option.phone})
            </Typography>
          </AutocompleteOption>
        )}
        slotProps={{
          input: {
            autoComplete: 'new-password', // disable autocomplete and autofill
          },
        }}
      />
    </FormControl>
  );
}

// PropTypes for type validation
CountrySelector.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // Add other prop types as needed
};