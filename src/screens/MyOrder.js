import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  console.log(global.food_items);
  const [orderData, setOrderData] = useState(null);
  const [foodItem, setFoodItem] = useState([]);
  const getImageSrcById = (id) => {
    const item = foodItem.find((item) => item._id === id);
    return item ? item.img : "..."; // Fallback image
  };
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
  };
  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    const response = await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });
    const data = await response.json();
    console.log("Fetched order data:", data); // Debug: Check the structure
    setOrderData(data);
  };

  useEffect(() => {
    fetchMyOrder();
    loadData();
    console.log(foodItem);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData && orderData.orderData ? (
            orderData.orderData.order_data
              .slice()
              .reverse()
              .map((item, index) => {
                if (!Array.isArray(item)) return null; // Ensure item is an array
                return (
                  <React.Fragment key={index}>
                    {item.map((arrayData, i) => (
                      <div key={i}>
                        {arrayData.Order_date ? (
                          <div
                            className="m-auto mt-5"
                            style={{ color: "#bbbbbb" }}
                          >
                            {arrayData.Order_date}
                            <hr style={{ borderColor: "#444" }} />
                          </div>
                        ) : (
                          <div className="col-12 col-md-6 col-lg-3">
                            <div
                              className="card mt-3"
                              style={{
                                width: "16rem",
                                maxHeight: "360px",
                                backgroundColor: "#1e1e1e",
                                color: "#ffffff",
                              }}
                            >
                              <img
                                src={getImageSrcById(arrayData.id)}
                                className="card-img-top"
                                alt="..."
                                style={{
                                  height: "120px",
                                  objectFit: "fill",
                                }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{arrayData.name}</h5>
                                <div
                                  className="container w-100 p-0"
                                  style={{ height: "38px" }}
                                >
                                  <span className="m-1">{arrayData.qty}</span>
                                  <span className="m-1">{arrayData.size}</span>
                                  <span className="m-1">
                                    {arrayData.Order_date}
                                  </span>
                                  <div className="d-inline ms-2 h-100 w-20 fs-5">
                                    ₹{arrayData.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                );
              })
          ) : (
            <p style={{ color: "#bbbbbb" }}>No order data available.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}
