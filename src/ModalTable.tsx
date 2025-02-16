import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const ModalTable = (arg: {
  itm: { debtorId: string; value: string; id: string };
  index: number;
  sumDelete: (id: string) => void;
  sumEdit: (id: string) => void;
}) => {
  return (
    <tr>
      <td>{arg.index + 1}</td>
      <td>{arg.itm.value}</td>
      <td className="d-flex gap-2">
        <button
          onClick={() => arg.sumEdit(arg.itm.id)}
          className="btn btn-warning"
        >
          <MdEdit />
        </button>
        <button
          onClick={() => arg.sumDelete(arg.itm.id)}
          className="btn btn-danger"
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default ModalTable;
