import { NavLink } from "react-router-dom";
import SideBar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { getAdminCuts, clearErrors } from "../../actions/cutAction";
import { getAllOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, cuts } = useSelector((state) => state.allCuts);
  const { orders } = useSelector((state) => state.allOrders);
  let totalAmount = 0;
  orders &&
    orders.forEach((order) => {
      totalAmount += order.itemPrice;
    });
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAdminCuts());
    dispatch(getAllOrders());
  }, [dispatch, error]);
  const recentOrders = orders ? orders.reverse().slice(0, 3) : [];
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-start items-start w-full h-screen pt-20">
          <SideBar screenName="Dashboard" />
          <div className="grow-1 w-full h-full sm:px-10 flex flex-wrap gap-10 mx-auto max-[500px]:justify-center">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-10 max-[500px]:justify-center max-[500px]:items-center">
                <div className="w-96 max-[500px]:w-80 h-32 bg-[#52616B] rounded-2xl text-white flex flex-col justify-center items-start pl-6">
                  <span className="text-2xl font-semibold">
                    Total Investment
                  </span>
                  <span className="text-[3rem] font-light">
                    <span className="text-[1.5rem] mx-2">$</span>
                    {totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="w-96 h-96 bg-[#E3F6F5] rounded-xl p-8">
                  <p className="text-xl mb-4">Recent Order</p>
                  {recentOrders.reverse().map((order) => (
                    <div
                      key={order._id}
                      className="bg-white p-4 rounded-md shadow-md my-4 cursor-pointer"
                      onClick={() => navigate(`/admin/order/${order._id}`)}
                    >
                      <p className="text-sm font-semibold">#{order.user}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          timeZoneName: "short",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-10">
                  <div className="w-full h-96 bg-[#E3F6F5] p-8 rounded-xl">
                    <h6 className="text-xl font-bold">Manage Inventory</h6>
                    <div className="flex flex-col justify-center items-center gap-6 py-20">
                      <NavLink
                        to="/admin/brand/new"
                        className="w-72 rounded-md bg-[#52616B] h-10 grid place-items-center text-white font-bold text-xl"
                        onClick={() => navigate("/admin/brand/new")}
                      >
                        List Brands
                      </NavLink>
                      <NavLink
                        to="/admin/model/new"
                        className="w-72 rounded-md bg-[#52616B] h-10 grid place-items-center text-white font-bold text-xl"
                        onClick={() => navigate("/admin/model/new")}
                      >
                        List Models
                      </NavLink>
                      <NavLink
                        to="/admin/variant/new"
                        className="w-72 rounded-md bg-[#52616B] h-10 grid place-items-center text-white font-bold text-xl"
                        onClick={() => navigate("/admin/variant/new")}
                      >
                        List Variants
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-4">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Question</th>
                    <th className="py-2 px-4 border-b">Cut%</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cuts &&
                    cuts.map((cut) => (
                      <tr key={cut.id} className="border-b">
                        <td className="py-2 px-4">{cut.Id}</td>
                        <td className="py-2 px-4">{cut.question}</td>
                        <td className="py-2 px-4">{cut.cut}%</td>
                        <td
                          className="py-2 px-4 cursor-pointer"
                          onClick={() => navigate(`/cut/${cut._id}`)}
                        >
                          <EditIcon />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default AdminPanel;
