import { useState } from 'react';
import PopupExpense from './components/popupExpense'
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AiOutlineFilePdf, AiOutlinePlus } from 'react-icons/ai';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function addExpense(expense, amount) {
    if (expense === '' || amount === '') {
      alert('Please enter both expense and amount');
      return;
    }
    if (expense === 'Sample' && amount === '1') {
      setExpenses([["Groceries", "150"],["Gas", "45"],["Internet", "80"],["Coffee", "25"],["Rent", "1200"],["Electricity", "95"],["Phone Bill", "60"],["Netflix", "15"],["Gym Membership", "50"],["Restaurant", "85"],["Car Insurance", "120"],["Healthcare", "200"],["Books", "40"],["Clothing", "120"],["Home Maintenance", "150"],["Pet Supplies", "75"],["Public Transport", "30"],["Movie Tickets", "35"],["Music Subscription", "10"],["Office Supplies", "25"]]);
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, [expense, amount]]);
    }
  }

  function exportToPDF() {
    const doc = new jsPDF.jsPDF();
    const col = ["Expense Name", "Expense Amount ($)"];

    doc.text('Personal Finance Report', 105, 10, { align: 'center' });
    doc.autoTable({
      head: [col],
      body: expenses,
      startY: 15
    });
    doc.save("YourFinanceReport.pdf");
  }

  return (
    <>
      <div className='flex justify-between items-center mx-8 m-3'>
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">Personal Finance Tracker</h1>
        <button className='text-xs md:text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2' onClick={exportToPDF}>Download as PDF <AiOutlineFilePdf/></button>
      </div>
      <div className="grid grid-cols-1 gap-1 mt-8">
        <div className='flex justify-between items-center '>
          <div className='ml-8 mr-1 h-16 bg-gray-700 p-4 rounded-lg flex flex-col justify-center items-center w-full text-white'>
            <h1 className='text-xs md:text-xl font-bold'>Expense Name</h1>
            <p className='text-xs md:text-base'>Total Entries: {expenses.length}</p>
          </div>
          <div className='mr-8 ml-1 h-16 bg-gray-700 p-4 rounded-lg flex flex-col justify-center items-center w-full text-white'>
            <h1 className='text-xs md:text-xl font-bold'>Expense Amount</h1>
            <p className='text-xs md:text-base'>Total Amount: ${expenses.reduce((sum, expense) => sum + parseInt(expense[1]), 0)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-8 h-[calc(100vh-12rem)] overflow-y-auto">
        {expenses.map((expense, index) => (
          <div key={index} className='flex justify-between items-center'>
            <div className='ml-8 mr-1 h-16 bg-gray-200 p-4 rounded-lg flex justify-center items-center w-full'>{expense[0]}</div>
            <div className='mr-8 ml-1 my-1 h-16 bg-gray-200 p-4 rounded-lg flex justify-center items-center w-full'>${expense[1]}</div>
          </div>
        ))}
      </div>

      <button className="rounded-full bg-black fixed bottom-7 right-7 text-white w-14 h-14 flex items-center justify-center hover:bg-gray-700" onClick={() => {setIsPopupOpen(true)}}>
        <AiOutlinePlus size={50}/>
      </button>

      <PopupExpense isOpen={isPopupOpen} onClose={() => {setIsPopupOpen(false)}} values={(expenseName, expenseAmount) => {addExpense(expenseName, expenseAmount)}}/>
    </>
  );
}

export default App;
