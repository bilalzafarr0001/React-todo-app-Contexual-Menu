import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import EditTask from "../modals/EditTask";
import { InputGroup, Input, Fade, Table, Button } from "reactstrap";
import { ContextMenu, ContextMenuTrigger } from "react-contextmenu";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const [taskList, setTaskList] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [myIndex, setMyIndex] = useState();
  const [myTaskObj, setTaskObj] = useState({});

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

  useEffect(() => {
    let arr = localStorage.getItem("taskList");
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const toggle1 = () => {
    setModal1(!modal1);
  };

  const sortAsecName = () => {
    const dataArray = [...taskList];
    setTaskList(dataArray.sort((a, b) => a.Name.localeCompare(b.Name)));
    console.log(taskList);
  };

  const sortDescName = () => {
    const dataArray = [...taskList];
    setTaskList(dataArray.sort((a, b) => b.Name.localeCompare(a.Name)));
    console.log(taskList);
    console.log("sorted array of objects", taskList);
  };

  const sortAsec = () => {
    const dataArray = [...taskList];
    setTaskList(
      dataArray.sort((a, b) => a.Description.localeCompare(b.Description))
    );
    console.log(taskList);
  };

  const sortDesc = () => {
    const dataArray = [...taskList];
    setTaskList(
      dataArray.sort((a, b) => b.Description.localeCompare(a.Description))
    );
    console.log(taskList);
    console.log("sorted array of objects", taskList);
  };

  const search = (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      const todos = taskList.filter((todo) => {
        return todo.Name.toLowerCase().includes(value);
      });
      console.log(value);
      setTaskList(todos);
    } else {
      let arr = localStorage.getItem("taskList");
      if (arr) {
        let obj = JSON.parse(arr);
        setTaskList(obj);
      }
    }
    console.log("Input is", searchItem);
  };

  const deleteTask = (index) => {
    console.log("index", index);
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const handelDel = () => {
    deleteTask(myIndex);
  };

  const updateListArray = (obj, myIndex) => {
    let tempList = taskList;
    tempList[myIndex] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const toggle = () => {
    setModal(!modal);
  };

  function collect(props) {
    console.log("myIndex", myIndex);
    console.log(props.taskObj);
    setMyIndex(props.index);
    setTaskObj(props.taskObj);
  }

  const updateTask = (obj) => {
    updateListArray(obj, myIndex);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setModal(false);
  };

  return (
    <>
      <div className="header text-center">
        <h3 className="text-info">Todo List </h3>
        <button className="btn btn-success mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
        <br></br>
        <br></br>
        <div style={{ marginLeft: "70px", width: "250px" }}>
          <InputGroup>
            <Input type="text" placeholder="Search Item..." onChange={search} />
          </InputGroup>
        </div>
      </div>
      <ContextMenu
        style={{ marginLeft: "60px", cursor: "pointer" }}
        id="same_unique_identifier1"
      >
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem onClick={sortAsecName}>
              <ListItemIcon>
                <ArrowCircleDownIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sort Ascending</ListItemText>
            </MenuItem>
            <MenuItem onClick={sortDescName}>
              <ListItemIcon>
                <ArrowCircleUpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sort Descending</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </ContextMenu>
      <ContextMenu
        style={{ marginLeft: "60px", cursor: "pointer" }}
        id="same_unique_identifier"
      >
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem onClick={sortAsec}>
              <ListItemIcon>
                <ArrowCircleDownIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sort Ascending</ListItemText>
            </MenuItem>
            <MenuItem onClick={sortDesc}>
              <ListItemIcon>
                <ArrowCircleUpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sort Descending</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </ContextMenu>
      <Table hover>
        <thead>
          <tr key={"001_row"}>
            <th>
              <ContextMenuTrigger id="same_unique_identifier1">
                Name
              </ContextMenuTrigger>
            </th>

            <th>
              <ContextMenuTrigger id="same_unique_identifier">
                Description
              </ContextMenuTrigger>
            </th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {taskList &&
            taskList.map((taskObj, index) => (
              <>
                <ContextMenuTrigger
                  index={index}
                  taskObj={taskObj}
                  Name={taskObj.Name}
                  attributes={index}
                  holdToDisplay={1000}
                  collect={collect}
                  id="NAME_IDENTIFIER"
                >
                  <tr key={index + "_row"}>
                    <td>{taskObj.Name}</td>
                    <td>{taskObj.Description}</td>
                    <td>
                      {" "}
                      <i
                        class="fas fa-trash-alt"
                        style={{
                          color: colors[index % 5].primaryColor,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deleteTask(index);
                        }}
                      ></i>
                    </td>
                    <td>
                      <i
                        class="far fa-edit mr-3"
                        style={{
                          color: colors[index % 5].primaryColor,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setMyIndex(index);
                          setTaskObj(taskObj);
                          setModal1(true);
                        }}
                      ></i>{" "}
                    </td>
                  </tr>
                </ContextMenuTrigger>

                <EditTask
                  modal1={modal1}
                  toggle1={toggle1}
                  updateTask={updateTask}
                  taskObj={myTaskObj}
                />
              </>
            ))}
        </tbody>
      </Table>

      <ContextMenu style={{ cursor: "pointer" }} id="NAME_IDENTIFIER">
        <Paper sx={{ width: 320 }}>
          <MenuList>
            <MenuItem data>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText onClick={() => setModal1(true)}>
                {" "}
                Edit Record
              </ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <DeleteSweepIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText onClick={handelDel} data={{ action: "Deleted" }}>
                Delete Record
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </ContextMenu>

      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
