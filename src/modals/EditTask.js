import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditTaskPopup = ({ modal1, toggle1, updateTask, taskObj }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  useEffect(() => {
    console.log("edit task component");
    console.log("edit task component", taskObj);

    setTaskName(taskObj.Name);
    setDescription(taskObj.Description);
  }, [taskObj]);

  const handleUpdate = (e) => {
    e.preventDefault();
    let tempObj = {};
    tempObj["Name"] = taskName;
    tempObj["Description"] = description;
    updateTask(tempObj);
  };

  return (
    <Modal isOpen={modal1} toggle={toggle1}>
      <ModalHeader toggle={toggle1}>Update Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle1}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;
