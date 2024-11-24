import React, { useState } from 'react'

const PopupExpense = ( { isOpen, onClose, values} ) => {
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    function handleAddExpense() {
        values(expenseName, expenseAmount);
        setExpenseName('');
        setExpenseAmount('');
        onClose();
    }
  
    if (isOpen === false) {
        return null;
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Add Expense</h1>
                <p className='text-sm  text-gray-500'>Enter the name of the expense</p>
                <input 
                    type='text' 
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    className='border-2 border-black p-2 rounded' 
                    placeholder='Expense Name' 
                />
                <p className='text-sm  text-gray-500'>Enter the amount of the expense</p>
                <input 
                    type='number' 
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className='border-2 border-black p-2 rounded' 
                    placeholder='Expense Amount' 
                />
                <div className='flex gap-2'>
                    <button 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
                        onClick={handleAddExpense}
                    >
                        Add
                    </button>
                    <button 
                        className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' 
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupExpense;