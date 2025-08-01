import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate,axios } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        try{
            event.preventDefault();
            const {data} = await axios.post('/api/seller/login',{email,password})
            if(data.success){
                setIsSeller(true)
                navigate('/seller')
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
        
    };

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    return (
        !isSeller && (
            <form
                onSubmit={onSubmitHandler}
                className="min-h-screen flex flex-col items-center justify-center text-sm text-gray-600"
            >
                <div className="flex flex-col gap-5 items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
                    <p className="text-2xl font-medium m-auto">
                        <span className="text-primary">Seller</span> Login
                    </p>
                    <div className="w-full">
                        <p>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter your email"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <p>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter your password"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                            required
                        />
                    </div>
                    <button
                        className="bg-primary text-white w-full py-2 rounded-md cursor-pointer transition-all flex justify-center items-center"
                    >
                        Login
                    </button>
                </div>

                {/* <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mt-4 text-primary underline text-sm hover:text-primary/80 cursor-pointer"
                >
                    Go to Home
                </button> */}
            </form>
        )
    );
};

export default SellerLogin;