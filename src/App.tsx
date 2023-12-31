import { useState } from "react";
import TodoList from "./conteiners/TodoList";
import InputField from "./conteiners/InputField";

function App() {
  //* todoList properties
  const [toDo, setToDo] = useState<
    {
      id: any;
      name: string;
      folder: boolean; //! true <TaskFolder>, false: <Task>
      isChecked: boolean;
      //* Folder Properties
      subItems?: any;
    }[]
  >([]);

  //!Task functions
  const toggleTodo = (idItem: any) => {
    setToDo(
      toDo.map((task) => {
        if (task.id === idItem) {
          return { ...task, isChecked: !task.isChecked };
        }
        return task;
      })
    );
  };

  const handleDelete = (deleteId: any) => {
    setToDo(toDo.filter((updatedTask) => updatedTask.id !== deleteId));
  };

  //! List functions
  function addFolder(inputValue: string) {
    inputValue !== "" &&
      setToDo([
        ...toDo,
        {
          id: crypto.randomUUID(),
          name: inputValue,
          isChecked: false,
          folder: true,
          subItems: [],
        },
      ]);
  }

  function addItem(inputValue: string) {
    inputValue !== "" &&
      setToDo([
        ...toDo,
        {
          id: crypto.randomUUID(),
          name: inputValue,
          isChecked: false,
          folder: false,
        },
      ]);
  }

  //! SubTasks functions
  function handleAddSubitem(subName: string, id: any) {
    subName !== "" &&
      setToDo(
        toDo.map((task) => {
          if (task.id === id) {
            const subitems = task.subItems;
            subitems.push({
              id: crypto.randomUUID(),
              name: subName,
              isChecked: false,
            });
          }
          return task;
        })
      );
  }

  function handleCheckSubItem(subItemId: any, parentId: any) {
    setToDo(
      toDo.map((task) => {
        if (task.id === parentId) {
          const subitems = task.subItems.map((subtask: any) => {
            if (subtask.id === subItemId) {
              return { ...subtask, isChecked: !subtask.isChecked };
            }
            return subtask;
          });

          return { ...task, subItems: subitems };
        }
        return task;
      })
    );
  }

  function handleDeleteSubItem(subItemId: any, parentId: any) {
    setToDo(
      toDo.map((task) => {
        if (task.id === parentId) {
          task.subItems = task.subItems.filter(
            (updatedSubTask: any) => updatedSubTask.id !== subItemId
          );
        }
        return task;
      })
    );
  }

  return (
    <>
      <div>
        <h1>ToDo List:</h1>
        <InputField addFolder={addFolder} addItem={addItem} />
      </div>
      {toDo.length === 0 ? (
        <h4>No items yet</h4>
      ) : (
        <TodoList
          itemList={toDo}
          deleteItem={handleDelete}
          checkItem={toggleTodo}
          addSubItem={handleAddSubitem}
          checkSubItem={handleCheckSubItem}
          deleteSubItem={handleDeleteSubItem}
        />
      )}
    </>
  );
}

export default App;
