import Link from "next/link";

const SubmitButton = ({loading, text})=> {

  return (
       !loading ?
         <button
             type="submit"
             className="w-full bg-primary-color text-white cursor-pointer transition p-3 rounded font-semibold">
             Send Message
          </button>
         :

         <button className="w-full flex items-center justify-center gap-2 bg-purple-400 text-white px-4  mt-6 px-6 py-3 rounded-lg cursor-not-allowed">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span> Please wait...</span>
          </button>

       ) 
    }

 export default SubmitButton;   