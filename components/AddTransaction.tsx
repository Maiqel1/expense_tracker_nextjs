"use client"
import addTransaction from "@/app/actions/addTransaction";
import { useRef } from "react";
import {toast} from "react-toastify"

const AddTransaction = () => {

    const formRef = useRef<HTMLFormElement>(null)

    const clientAction = async(formData: FormData) => {
       const result = await addTransaction(formData)

       if (result.error) {
        toast.error(result.error)
       } else {
        toast.success("Transaction Added")
        formRef.current?.reset()
       }
    }

    return ( 
        <>
        <h3>Add Transaction</h3>
        <form ref={formRef} action={clientAction}>
            <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" id="text" name="text" placeholder ="Enter text" />
            </div>

            <div className="form-control">
               <label htmlFor="amount">Amount <br /> (negative - expense, positive - income)</label>
               <input type="number" name="amount" id="amount" step="0.01" placeholder="Enter Amount"/> 
            </div>

            <button className="btn">Add Transaction</button>
        </form>
        </>
     );
}
 
export default AddTransaction;