import { useEffect, useState } from "react";
import { LogOut, Package, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Vaishnavi Dwivedi",
    email: "vaishnavi@example.com",
    avatar: "https://i.pravatar.cc/150?img=32",
  });

  const [addressList, setAddressList] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    default: false,
  });

  const navigate = useNavigate();

  const getAllAddress = () => {
    services
      .get(StaticApi.getAllAddressesOfUser)
      .then((res) => {
        const data = res?.data || [];
        setAddressList(data);
      })
      .catch(() => {});
  };

  const handleAddAddress = () => {
    const apiCall =
      editIndex !== null
        ? services.put(
            `${StaticApi.updateAddress}/${newAddress.addressId}`,
            newAddress
          )
        : services.post(StaticApi.createAddress, newAddress);

    apiCall
      .then(() => {
        getAllAddress();
        setNewAddress({
          name: "",
          phone: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          default: false,
        });
        setShowAddAddress(false);
        setIsEditing(false);
        setEditIndex(null);
      })
      .catch(() => {});
  };

  const handleDeleteAddress = (addressId) => {
    services.delete(`${StaticApi.deleteAddress}/${addressId}`).then(() => {
      getAllAddress();
    });
  };

  const handleSetDefaultAddress = (addressId) => {
    services.post(`${StaticApi.setDefaultAddress}/${addressId}`).then(() => {
      getAllAddress();
    });
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">My Profile</h1>

      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white shadow rounded-2xl p-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-[#429686] flex items-center justify-center text-3xl font-bold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Saved Addresses</h3>
          <button
            onClick={() => {
              setNewAddress({
                name: "",
                phone: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
                default: false,
              });
              setIsEditing(false);
              setShowAddAddress(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded text-sm"
          >
            + Add Address
          </button>
        </div>

        {addressList.length === 0 && (
          <p className="text-gray-600">No address added yet.</p>
        )}

        <div className="grid gap-4">
          {addressList.map((addr, index) => (
            <div
              key={addr.addressId}
              className="border rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold">{addr.name}</p>
                <p>
                  {addr.addressLine1}, {addr.addressLine2}
                </p>
                <p>
                  {addr.city}, {addr.state} - {addr.postalCode}
                </p>
                <p>{addr.country}</p>
                <p className="text-sm text-gray-500">{addr.phone}</p>
                {addr.default && (
                  <span className="text-green-600 text-sm font-medium mt-2 inline-block">
                    ★ Default
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-1 sm:mt-0">
                {!addr.default && (
                  <button
                    onClick={() => handleSetDefaultAddress(addr.addressId)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => {
                    setNewAddress(addr);
                    setEditIndex(index);
                    setIsEditing(true);
                    setShowAddAddress(true);
                  }}
                  className="text-gray-600 hover:text-primary"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDeleteAddress(addr.addressId)}
                  className="text-red-600 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Orders Card */}
      <div className="mt-6">
        <div
          onClick={goToOrders}
          className="flex items-center gap-4 bg-white shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out rounded-2xl p-6 cursor-pointer"
        >
          <div className="bg-primary/10 p-3 rounded-full">
            <Package className="text-primary w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">My Orders</h3>
            <p className="text-sm text-gray-600">
              View all your past and current orders
            </p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-8 text-center">
        <div
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white flex items-center p-3 w-max rounded gap-2"
        >
          <LogOut size={16} /> Logout
        </div>
      </div>

      {/* Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowAddAddress(false)}
              className="absolute top-2 right-3 text-xl text-gray-500"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Address" : "Add Address"}
            </h3>
            <div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-2">
              {[
                ["Name", "name"],
                ["Phone", "phone"],
                ["Address Line 1", "addressLine1"],
                ["Address Line 2", "addressLine2"],
                ["City", "city"],
                ["State", "state"],
                ["Postal Code", "postalCode"],
                ["Country", "country"],
              ].map(([label, key]) => (
                <InputField
                  key={key}
                  label={label}
                  value={newAddress[key]}
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              ))}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newAddress.default}
                  onChange={() =>
                    setNewAddress((prev) => ({
                      ...prev,
                      default: !prev.default,
                    }))
                  }
                />
                Set as default address
              </label>
              <ButtonPrimary
                label={isEditing ? "Update Address" : "Save Address"}
                handleOnClick={handleAddAddress}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full border rounded px-3 py-2"
    />
  </div>
);
