import React, { useState } from "react";
import EditTask from "../modals/EditTask";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";

import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    console.log("handle delete is calling ....");
    deleteTask(index);
  };

  return (
    <>
      <tr>
        <td style={{ cursor: "pointer" }}>
          <ContextMenuTrigger id="NAME_IDENTIFIER">
            <td>{taskObj.Name}</td>
          </ContextMenuTrigger>
        </td>
        <td style={{ cursor: "pointer" }}>
          <ContextMenuTrigger>
            <td>{taskObj.Description}</td>
          </ContextMenuTrigger>
        </td>
        <td>
          {" "}
          <i
            class="fas fa-trash-alt"
            style={{
              color: colors[index % 5].primaryColor,
              cursor: "pointer",
            }}
            onClick={handleDelete}
          ></i>
        </td>
        <td>
          <i
            class="far fa-edit mr-3"
            style={{
              color: colors[index % 5].primaryColor,
              cursor: "pointer",
            }}
            onClick={() => setModal(true)}
          ></i>{" "}
        </td>
      </tr>

      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </>
  );
};

export default Card;

{
  /* <ContextMenu style={{ cursor: "pointer" }} id="NAME_IDENTIFIER">
        <Paper sx={{ width: 320 }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText onClick={() => setModal(true)}>
                {" "}
                Edit Record
              </ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <DeleteSweepIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText onClick={handleDelete}>Delete Record</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </ContextMenu> */
}
