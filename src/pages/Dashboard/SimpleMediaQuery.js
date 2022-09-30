import useMediaQuery from '@mui/material/useMediaQuery';

export default function SimpleMediaQuery() {
    const matches = useMediaQuery('(min-width:720px)');
  return matches;
}