import { useState } from "react";

interface Props {
  addFolder: (inputValue: string) => void;
  addItem: (inputValue: string) => void;
}

const inputField = ({ addFolder, addItem }: Props) => {
  const [name, setName] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    setName("");
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group mb-3">
          <input
            className="form-control col-auto"
            value={name}
            placeholder="Task / Folder Name"
            onChange={(e) => setName(e.target.value)}
          />
          <span className="input-group-text">
            <button
              className={
                (name !== "") == true
                  ? "btn btn-info col-auto"
                  : "btn btn-info col-auto disabled"
              }
              onClick={() => addItem(name)}
            >
              Add Task
            </button>
          </span>
          <span className="input-group-text" id="basic-addon1">
            <button
              className={
                (name !== "") == true
                  ? "btn btn-info col-auto"
                  : "btn btn-info col-auto disabled"
              }
              onClick={() => addFolder(name)}
            >
              Add Folder
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
export default inputField;
