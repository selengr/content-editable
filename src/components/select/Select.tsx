
import {
  TextField,
  TextFieldProps,
} from '@mui/material';

// ----------------------------------------------------------------------

type SelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
};

export function Select({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  ...other
}: SelectProps) {


  return (

    <TextField
      select
      fullWidth
      SelectProps={{
        native,
        MenuProps: {
          PaperProps: {
            sx: {
              ...(!native && {
                px: 1,
                maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                '& .MuiMenuItem-root': {
                  px: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                },
              }),
            },
          },
        },
        sx: { textTransform: 'capitalize' },
      }}
      // error={!!error}
      // helperText={error ? error?.message : helperText}
      {...other}
    >
      {children}
    </TextField>

  );
}

// ----------------------------------------------------------------------
