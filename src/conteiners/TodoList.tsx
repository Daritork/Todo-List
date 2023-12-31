import Task from "../components/Task";
import TaskFolder from "../components/TaskFolder";

interface Props {
  itemList: any;
  deleteItem: (id: any) => void;
  checkItem: (id: any) => void;
  addSubItem: (subName: string, id: any) => void;
  deleteSubItem: (subItemId: any, parentId: any) => void;
  checkSubItem: (subItemId: any, parentId: any) => void;
}

const TodoList = ({
  itemList,
  deleteItem,
  checkItem,
  addSubItem,
  deleteSubItem,
  checkSubItem,
}: Props) => {
  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          {itemList.map((toDoElement: any) =>
            toDoElement.folder === false ? (
              <li
                key={toDoElement.id}
                className={
                  toDoElement.isChecked === true
                    ? "list-group-item done-task"
                    : "list-group-item"
                }
              >
                <Task
                  toDoElement={toDoElement}
                  deleteItem={deleteItem}
                  checkItem={checkItem}
                />
              </li>
            ) : (
              <li
                key={toDoElement.id}
                className={
                  toDoElement.isChecked === true
                    ? "list-group-item folder-li done-task"
                    : "list-group-item folder-li"
                }
              >
                <TaskFolder
                  toDoElement={toDoElement}
                  deleteItem={deleteItem}
                  addSubItem={addSubItem}
                  checkSubItem={checkSubItem}
                  deleteSubItem={deleteSubItem}
                />
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
