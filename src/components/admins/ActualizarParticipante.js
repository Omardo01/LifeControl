import { useState } from 'react';
import { Card, CardHeader, Box, Typography, Avatar, Stack, Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ActualizarParticipante({ usuario }) {
  const [valueEfectivo, setValueEfectivo] = useState(usuario.Efectivo);

  const handleValueEfectivo = (e) => {
    setValueEfectivo(e.target.value);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddEfectivo = () => {
    console.log(valueEfectivo);
    setOpen(false);
  };
  return (
    <Stack direction="row" alignItems="end" justifyContent="space-between">
      <Button variant="outlined" onClick={handleClickOpen} size="small">
        Agregar credito
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Creditos</DialogTitle>
        <DialogContent>
          <Stack spacing={5}>
            <DialogContentText> Matricula - {usuario.matricula} </DialogContentText>
            <DialogContentText> Nombre - {usuario.nombres} </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Efectivo"
              fullWidth
              variant="standard"
              value={valueEfectivo}
              onChange={handleValueEfectivo}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={(handleClose, handleAddEfectivo)}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
