import { Card, CardHeader, Box, Typography, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Cookies from 'js-cookie';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function Correo() {
  const [inputValue, setinputValue] = useState('');
  const handleInputChangeValue = (e) => {
    setinputValue(e.target.value);
  };
  const datos = {
    id_correo: 0,
    contenido: inputValue,
    leido: 0,
    matricula_usuario: Cookies.get('matricula')
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    };
    fetch('http://localhost:8080/api/correos', requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));
    window.location.reload();
  };
  return (
    <Card>
      <CardHeader
        title="Redacta un mensaje"
        subheader="Deja un mensaje a los administradores o doctores"
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          value={inputValue}
          onChange={handleInputChangeValue}
          placeholder="Escribe aqui..."
          style={{ width: 500 }}
        />
        <LoadingButton
          fullWidth
          size="small"
          type="submit"
          variant="contained"
          color="warning"
          onClick={handleSubmit}
        >
          Mandar Mensaje
        </LoadingButton>
      </Box>
    </Card>
  );
}
