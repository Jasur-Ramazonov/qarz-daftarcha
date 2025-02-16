import React from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const TableBody = (arg: {
  itm: { id: string; name: string; loan: string; payment: string };
  index: number;
  deleteDebtor: (i: number) => void;
  editDebtor: (i: number) => void;
  showModal2: (id: string) => void;
}) => {
  return (
    <tr>
      <td>{arg.index + 1}</td>
      <td>{arg.itm.name}</td>
      <td>{arg.itm.loan}</td>
      <td>{arg.itm.payment}</td>
      <td className="d-flex gap-2">
        <button
          onClick={() => arg.showModal2(arg.itm.id)}
          className="btn btn-info"
        >
          pay
        </button>
        <button
          onClick={() => arg.editDebtor(Number(arg.itm.id.slice(-1)))}
          className="btn btn-warning d-flex justify-content-center align-items-center"
        >
          <MdEdit />
        </button>
        <button
          onClick={() => arg.deleteDebtor(Number(arg.itm.id.slice(-1)))}
          className="btn btn-danger d-flex justify-content-center align-items-center"
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default TableBody;
