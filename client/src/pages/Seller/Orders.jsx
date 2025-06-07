import React, { useEffect, useState } from 'react'
import { assets, dummyOrders } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from "react-hot-toast";

const Orders = () => {
    const boxIcon = assets.box_icon
    const {currency,axios} = useAppContext();
    const [orders, setOrders] = useState([])

    const fetchOrders= async ()=>{
        try {
            const { data } = await axios.get("/api/order/seller");

            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(()=>{
        fetchOrders();
    },[])

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
        <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col xl:flex-row gap-5 xl:items-center justify-between p-5 border border-gray-300 rounded-md w-full">
                    <div className="flex gap-5 max-w-80">
                        <img className="w-12 h-12 object-cover" src={boxIcon} alt="boxIcon" />
                        <>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <p className="font-medium">
                                        {item.product.name} <span className=" text-primary">x {item.quantity}</span><br />
                                    </p>
                                </div>
                            ))}
                        </>
                    </div>

                    <div className="text-sm md:text-base text-black/60 w-full xl:w-1/4">
                        <p className="text-black/80">
                                    {order.address.firstName}{" "}
                                    {order.address.lastName}
                                </p>
                                <p>
                                    {order.address.street},{" "}
                                    {order.address.city}
                                </p>
                                <p>
                                    {order.address.state},{" "}
                                    {order.address.zipcode},{" "}
                                    {order.address.country}
                                </p>
                                <p>{order.address.phone}</p>
                    </div>

                    <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

                    <div className="flex flex-col text-sm md:text-base text-black/60 w-full xl:w-1/5">
                        <p>Method: {order.paymentType}</p>
                        <p> Date:{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Orders