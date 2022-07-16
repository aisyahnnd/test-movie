import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    primary: blue,
  },
});

export default function CustomPagination({ page, type, setPage, numOfPages = 10 }) {
  const handlePageChange = (page) => {
    setPage((old) => ({
      ...old,
      [type]: +page,
    }));
    window.scroll(0, 0);
  };
  console.log(888, type, page[type]);
  // ketika handle page berubah, di dalam fungsi setPage akan mengoper initialState yang lama
  // dengan [type] movie, kemudian nilai halamannya akan berubah sesuai target angka yang didapatkan

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        padding: 20,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          page={page[type]}
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
          sx={{ backgroundColor: 'lightgray', borderRadius: 5 }}
        />
      </ThemeProvider>
    </div>
  );
}
