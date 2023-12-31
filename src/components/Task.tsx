interface Props {
  toDoElement: any;
  deleteItem: (id: any) => void;
  checkItem: (id: any) => void;
}

const Task = ({ toDoElement, deleteItem, checkItem }: Props) => {
  return (
    <>
      {
        <input
          type="checkbox"
          className="form-check-input"
          checked={toDoElement.isChecked}
          onChange={() => checkItem(toDoElement.id)}
        />
      }
      <h6>{toDoElement.name}</h6>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={() => deleteItem(toDoElement.id)}
      >
        Delete
      </button>
    </>
  );
};

export default Task;

//? Side pannel for an Item
/*<div className="btn-group dropend extraBut" role="group">
        <button
          type="button"
          className={
            show === false
              ? "btn btn-outline-warning btn-sm dropdown-toggle"
              : "btn btn-outline-warning btn-sm dropdown-toggle show"
          }
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={reveal}//*auto animate
        />
        <ul className={show === false ? "dropdown-menu" : "dropdown-menu show"}>
          <li>
            <button className="dropdown-item">Re-name</button>
          </li>
          <li>
            <button className="dropdown-item">to Top</button>
          </li>
          <li>
            <button className="dropdown-item">to Bottom</button>
          </li>
        </ul>
      </div>*/
