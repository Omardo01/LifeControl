import { Card, CardHeader, Box, Typography, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export default function Correos() {
  const [correos, setcorreos] = useState([]);
  useEffect(() => {
    const getCorreos = () => {
      fetch(`http://localhost:8080/api/correos/todo`)
        .then((res) => res.json())
        .then((res) => setcorreos(res));
    };
    getCorreos();
  }, []);

  const handleDelete = (id) => {
    const requestInit = {
      method: 'DELETE'
    };
    fetch(`http://localhost:8080/api/correos/${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));
  };
  return correos.map((correo) => (
    <Card>
      <CardHeader
        title={`Mensaje De: ${correo.nombres} ${correo.apellidos}`}
        subheader={`Contenido: ${correo.contenido}`}
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <Button
          variant="contained"
          onClick={() => {
            handleDelete(correo.id_correo);
            window.location.reload();
          }}
        >
          Leido
        </Button>
      </Box>
    </Card>
  ));
}
