import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import spanImg from "../svgs/folder.svg";
import plus from "../svgs/plus.svg";
import SubItemsList from "./SubItems";

interface Props {
  toDoElement: any;
  deleteItem: (id: any) => void;
  addSubItem: (subName: string, id: any) => void;
  deleteSubItem: (subItemId: any, parentId: any) => void;
  checkSubItem: (subItemId: any, parentId: any) => void;
}

const TaskFolder = ({
  toDoElement,
  deleteItem,
  addSubItem,
  deleteSubItem,
  checkSubItem,
}: Props) => {
  const [percentage, setPercentage] = useState("0%");
  const [show, setShow] = useState(false);
  const parent = useRef(null);
  const [subName, setSubName] = useState("");

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  function handleSubmitSubtask(e: any) {
    e.preventDefault();

    setSubName("");
  }

  function Percentage() {
    let percentage = "0%";
    const subitemsList = toDoElement.subItems;
    let doneTasks = 0;
    let tasks = 0;
    subitemsList.map((subTask: any) => {
      tasks++;
      if (subTask.isChecked === true) {
        doneTasks++;
      }
    });
    percentage = ((doneTasks / tasks) * 100).toFixed(2) + "%";
    return setPercentage(percentage);
  }

  useEffect(() => {
    Percentage();
  });

  return (
    <>
      <div className="accordion accordion-item" ref={parent}>
        <button
          className={
            show === false
              ? "accordion-button collapsed accordion-header"
              : "accordion-button accordion-header"
          }
          type="button"
          aria-expanded="true"
          aria-controls="collapseOne"
          onClick={reveal}
        >
          <span className="input-group-text">
            <img src={spanImg} />
          </span>
          <h6>{toDoElement.name}</h6>
          <input
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => deleteItem(toDoElement.id)}
            value={"Delete"}
          />
          <div className="progress" role="progressbar" style={{ width: "33%" }}>
            <div
              className="progress-bar progress-bar-striped bg-success progress-bar-animated"
              //TODO Propgress bar functions
              style={{ width: percentage }}
            ></div>
          </div>
        </button>
        {show && (
          <div id="collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <form onSubmit={(e) => handleSubmitSubtask(e)} name="AddSubTasks">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <img src={plus}></img>
                  </span>
                  <input
                    className="form-control col-auto"
                    value={subName}
                    placeholder="Subtask Name"
                    onChange={(e) => setSubName(e.target.value)}
                  />
                  <span className="input-group-text">
                    <button
                      className={
                        (subName !== "") == true
                          ? "btn btn-secondary col-auto"
                          : "btn btn-secondary col-auto disabled"
                      }
                      onClick={() => addSubItem(subName, toDoElement.id)}
                    >
                      Add Subtask
                    </button>
                  </span>
                </div>
                <div className="card">
                  <ul className="list-group list-group-flush">
                    {toDoElement.subItems.map((subItem: any) => {
                      return (
                        <li
                          key={subItem.id}
                          className={
                            subItem.isChecked === true
                              ? "list-group-item done-task"
                              : "list-group-item"
                          }
                        >
                          <SubItemsList
                            deleteSubItem={deleteSubItem}
                            checkSubItem={checkSubItem}
                            subItem={subItem}
                            parentId={toDoElement.id}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskFolder;
