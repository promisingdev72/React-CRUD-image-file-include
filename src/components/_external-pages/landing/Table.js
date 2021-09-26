// material
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  IconButton,
  Avatar
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Edit from './Edit';
import Scrollbar from './Scrollbar';

// ----------------------------------------------------------------------

BasicTable.propTypes = {
  traits: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default function BasicTable({ traits, onDelete, updateData, onEdit }) {
  const [receiveTraits, setReceiveTraits] = useState([]);

  useEffect(() => {
    setReceiveTraits([...traits]);
  }, [traits]);
  const { enqueueSnackbar } = useSnackbar();
  const handleEditData = (data) => {
    onEdit(data);
  };

  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 800, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">No</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Content</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receiveTraits.map((row, count) => (
              <TableRow key={count}>
                <TableCell align="left">{count + 1}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.content}</TableCell>
                <TableCell align="left">
                  <Avatar alt={row.title} src={row.image} />
                </TableCell>
                <TableCell align="left" sx={{ width: 70 }}>
                  <Edit
                    editId={row.id}
                    editTitle={row.title}
                    editContent={row.content}
                    editImage={row.image}
                    onEdit={handleEditData}
                  />
                </TableCell>
                <TableCell align="left" sx={{ width: 70 }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      onDelete(row.id);
                      enqueueSnackbar('Delete success', { variant: 'error' });
                    }}
                  >
                    <DeleteOutlineIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
