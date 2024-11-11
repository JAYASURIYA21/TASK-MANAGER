import React, { useRef, useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/AuthStore'

export default function EmailVerificationPage() {
  const [code,setCode]=useState(["","","","","",""])
  const inputRefs=useRef([])
  const navigate=useNavigate()
	const {verifyEmail,user,error,isLoading}=useAuthStore()

  useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

  const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content

		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one

			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered

			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			const data= await verifyEmail(verificationCode);
			toast.success("Email verified successfully");
			console.log(user);
			setTimeout(()=>{
				navigate("/")
			},2000)
		} catch (error) {
			console.log(error);
		}
	};

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Verify your email</h2>
        <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address. </p>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex justify-between'>
            {
              code.map((digit,index)=>(
                <input key={index}
                ref={(eL)=>(inputRefs.current[index]=eL)}
                type='text'
                maxLength='6'
                value={digit}
                onChange={(e)=>handleChange(index,e.target.value)}
                onKeyDown={(e)=>handleKeyDown(index,e)}
                className='w-12 h-12 text-center font-bold text-2xl bg-gray-700 text-white border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
                />
              ))
            }

          </div>
					{error && <p className='text-red-600 font-semibold mt-2'>{error}</p>}

          <button className='mt-2 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 duration-200 text-white font-bold rounded-lg shadow-lg focus:outline-none' type='submit' onClick={handleSubmit}>{isLoading?<Loader className='h-6 w-6 mx-auto animate-spin'/>:"Verify Email"}</button>

        </form>

      </div>

    </div>
  )
}
