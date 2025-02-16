import React from "react";
import { useState } from "react";
import Rodal from "rodal";
import { useForm } from "react-hook-form";
import TableBody from "./TableBody";
import "rodal/lib/rodal.css";
import ModalTable from "./ModalTable";

const HomePage = () => {
  interface Debtor {
    id: string;
    name: string;
    loan: string;
    payment: string;
  }

  interface Sum {
    debtorId: string;
    id: string;
    value: string;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [currentDeptor, setCurrentDebtor] = useState<number | null>(null);
  const [sum, setSum] = useState<Sum>({ debtorId: "", value: "", id: "" });
  const [sumArr, setSumArr] = useState<Sum[]>([]);
  const [currentSumArr, setCurrentSumArr] = useState<Sum[]>([]);
  const [currentSum, setCurrentSum] = useState<null | number>(null);
  const [currentSum2, setCurrentSum2] = useState<null | number>(null);
  const [currentId, setCurrentId] = useState("");
  const [currentLoan, setCurrentLoan] = useState(0);
  const [allLoan, setAllLoan] = useState<Sum[]>([]);

  const { handleSubmit, reset, register } = useForm<Debtor>();

  function closeModal() {
    setIsOpen(false);
    reset({ name: "", loan: "", payment: "" });
  }

  function saveDebtor(data: Debtor) {
    if (currentDeptor === null) {
      data.id = data.name + debtors.length;
      data.payment = "0";
      setAllLoan([...allLoan, { debtorId: data.id, value: data.loan, id: "" }]);
      setDebtors([...debtors, data]);
    } else {
      // data.id = data.name + (debtors.length - 1);
      debtors[currentDeptor] = data;
      setDebtors([...debtors]);
      let foundLoan = allLoan.find((itm) => itm.debtorId === data.id);
      let index = allLoan.indexOf(foundLoan!);
      allLoan[index].value = data.loan;
      setAllLoan([...allLoan]);
      setCurrentDebtor(null);
    }
    reset({ name: "", loan: "", payment: "" });
    setIsOpen(false);
  }

  function deleteDebtor(i: number) {
    let debtorId = debtors[i].id;
    setSumArr(sumArr.filter((itm) => itm.debtorId !== debtorId));
    debtors.splice(i, 1);

    setDebtors([...debtors]);
  }

  function editDeptor(i: number) {
    setIsOpen(true);
    setCurrentDebtor(i);
    reset(debtors[i]);
  }

  function getValue(e: React.ChangeEvent<HTMLInputElement>) {
    let id = currentId + currentSumArr.length;
    setSum({ debtorId: currentId, value: e.target.value, id });
  }

  function addPayment() {
    if (currentSum === null) {
      setCurrentSumArr([...currentSumArr, sum]);
      setSumArr([...sumArr, sum]);
    } else {
      currentSumArr[currentSum] = sum;
      setCurrentSumArr([...currentSumArr]);
      setCurrentSum(null);
      sumArr[currentSum2!] = sum;
      setSumArr([...sumArr]);
    }
    setSum({ debtorId: "", value: "", id: "" });
  }

  function sumDelete(id: string) {
    let foundSum = currentSumArr.find((itm) => itm.id === id);
    let index1 = currentSumArr.indexOf(foundSum!);
    currentSumArr.splice(index1, 1);
    setCurrentSumArr([...currentSumArr]);
    let foundSum2 = sumArr.find((itm) => itm.id === id);
    let index2 = sumArr.indexOf(foundSum2!);
    sumArr.splice(index2, 1);
    setSumArr([...sumArr]);
  }

  function sumEdit(id: string) {
    let foundSum = currentSumArr.find((itm) => itm.id === id);
    let index1 = currentSumArr.indexOf(foundSum!);
    setSum(currentSumArr[index1]);
    setCurrentSum(index1);
    let foundSum2 = sumArr.find((itm) => itm.id === id);
    let index2 = sumArr.indexOf(foundSum2!);
    setCurrentSum2(index2);
  }

  function showModal2(id: string) {
    setIsOpen2(true);
    setCurrentId(id);
    let foundDeptor = debtors.find((itm) => itm.id === id);
    setCurrentLoan(Number(foundDeptor?.loan));
    setCurrentSumArr(sumArr.filter((itm) => itm.debtorId === id));
  }

  function pay() {
    let values: number[] = [];

    for (const itm of currentSumArr) {
      values.push(Number(itm.value));
    }
    let foundDebtor = debtors.find((itm) => itm.id === currentId);
    let foundLoan = allLoan.find((itm) => itm.debtorId === currentId);
    let index = debtors.indexOf(foundDebtor!);
    let indexLoan = allLoan.indexOf(foundLoan!);
    if (
      values.reduce((acc, val) => acc + val, 0) <=
      Number(allLoan[indexLoan].value)
    ) {
      debtors[index].loan = String(
        Number(allLoan[indexLoan].value) -
          values.reduce((acc, val) => acc + val, 0)
      );
      debtors[index].payment = values.reduce((acc, val) => acc + val, 0) + "";
      setDebtors([...debtors]);
      setIsOpen2(false);
      setSum({ debtorId: "", value: "", id: "" });
      setCurrentSumArr([]);
    }
  }

  function deleteAll() {
    setDebtors([]);
    setSumArr([]);
    setAllLoan([]);
  }

  return (
    <div className="container m-auto mt-3">
      <button onClick={() => setIsOpen(true)} className="btn btn-primary">
        Creat Debtor
      </button>
      {/* table */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Loan</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {debtors.map((itm, i) => {
            return (
              <TableBody
                itm={itm}
                deleteDebtor={deleteDebtor}
                editDebtor={editDeptor}
                showModal2={showModal2}
                index={i}
              />
            );
          })}
        </tbody>
      </table>

      <button onClick={deleteAll} className="btn btn-danger">
        Delete All
      </button>

      {/* Modal */}
      <Rodal visible={isOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit(saveDebtor)}
          className="d-flex flex-column gap-2 m-3"
        >
          <input
            {...register("name")}
            type="text"
            className="form-control"
            placeholder="enter name"
          />
          <input
            {...register("loan")}
            type="number"
            className="form-control"
            placeholder="Loan"
          />
          <button className="btn btn-primary">submit</button>
        </form>
      </Rodal>
      <Rodal
        customStyles={{
          borderRadius: "10px",
          height: "300px",
          overflow: "auto",
        }}
        visible={isOpen2}
        onClose={() => setIsOpen2(false)}
      >
        <div className="d-flex justify-content-between w-75">
          <button onClick={addPayment} className="btn btn-primary mb-2">
            Add Payment
          </button>
          <h5 className=" d-flex align-items-center">Loan: {currentLoan}</h5>
        </div>
        <input
          value={sum?.value}
          type="text"
          className="form-control mb-2"
          onChange={getValue}
          placeholder="Enter amount payment"
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>sum</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSumArr.map((itm, i) => {
              return (
                <ModalTable
                  itm={itm}
                  index={i}
                  sumDelete={sumDelete}
                  sumEdit={sumEdit}
                />
              );
            })}
          </tbody>
        </table>
        <button onClick={pay} className="btn btn-info float-end w-100 mt-2">
          Pay
        </button>
      </Rodal>
    </div>
  );
};

export default HomePage;
