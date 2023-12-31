interface Props {
  subItem: any;
  deleteSubItem: (subItemId: any, parentId: any) => void;
  checkSubItem: (subItemId: any, parentId: any) => void;
  parentId: any;
}

const SubItemsList = ({
  subItem,
  deleteSubItem,
  checkSubItem,
  parentId,
}: Props) => {
  return (
    <>
      {
        <input
          type="checkbox"
          className="form-check-input"
          checked={subItem.isChecked}
          onChange={() => checkSubItem(subItem.id, parentId)}
        />
      }
      <h6>{subItem.name}</h6>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={() => deleteSubItem(subItem.id, parentId)}
      >
        Delete
      </button>
    </>
  );
};

export default SubItemsList;
