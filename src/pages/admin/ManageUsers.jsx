import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [editingUser, setEditingUser] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const fetchUsers = async () => {
    // Replace with your API call
    let url = "http://localhost:3333/admin/users";
    if (debouncedSearchTerm) {
      url += `?q=${debouncedSearchTerm}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setUsers(data.users);
    console.log(data);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!newUser.name) newErrors.name = "Name is required";
    // if (!newUser.email) newErrors.email = "Email is required";
    // validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newUser.email || !emailRegex.test(newUser.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!newUser.role) newErrors.role = "Role is required";
    if (!newUser.password) newErrors.password = "Password is required";
    if (newUser.password !== newUser.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGNybSIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3MjMyMTQ5MDcsImV4cCI6MTcyMzMwMTMwN30.urj8M1cPOCZHg4LzRNqnFcKP8uKR0NQJE17vvcJjLiA"
    // );

    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      password: newUser.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3333/admin/user",
        requestOptions
      );
      const result = await response.json();
      console.log(result);

      // Handle success (e.g., refresh user list, close modal, etc.)
      //   setUsers([...users, result.user]);
      document.getElementById("addUser").close();
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function deleteUser(id) {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:3333/admin/user/${id}`,
        requestOptions
      );
      const result = await response.json();

      // Handle success (e.g., refresh user list, close modal, etc.)
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="p-4 px-8">
        <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>

        <div className="flex justify-between mb-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              document.getElementById("addUser").showModal();
            }}
          >
            <FaPlus className="mr-2" /> Add New User
          </button>
          <dialog id="addUser" className="modal">
            <div className="modal-box">
              <form onSubmit={handleSubmit}>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <h3 className="font-bold text-lg mb-4">Add New User</h3>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={`input input-bordered mb-2 ${
                      errors.name ? "input-error" : ""
                    }`}
                    value={newUser.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`input input-bordered mb-2 ${
                      errors.email ? "input-error" : ""
                    }`}
                    value={newUser.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <select
                    name="role"
                    id="role"
                    className={`select select-bordered w-full mb-2 ${
                      errors.role ? "select-error" : ""
                    }`}
                    value={newUser.role}
                    onChange={handleInputChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && <p className="text-red-500">{errors.role}</p>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`input input-bordered mb-2 ${
                      errors.password ? "input-error" : ""
                    }`}
                    value={newUser.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`input input-bordered mb-2 ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    value={newUser.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="form-control">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {user.role !== "admin" && (
                    <td className="flex space-x-2">
                      {/* change password
                       */}
                      <button
                        className="btn btn-sm btn-outline btn-info"
                        onClick={() => {
                          setEditingUser(user);
                          document.getElementById("changePassword").showModal();
                        }}
                      >
                        <RiLockPasswordLine /> Password Change
                      </button>

                      <button
                        className="btn btn-sm btn-outline btn-warning"
                        onClick={() => {
                          setEditingUser(user);
                          document.getElementById("editUser").showModal();
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => deleteUser(user.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination component */}
        <div className="mt-4">{/* Add your pagination controls here */}</div>
      </div>
      <dialog id="editUser" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">
              Edit User {editingUser.name}
            </h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`input input-bordered mb-2 ${
                  errors.name ? "input-error" : ""
                }`}
                value={editingUser.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`input input-bordered mb-2 ${
                  errors.email ? "input-error" : ""
                }`}
                value={editingUser.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                name="role"
                id="role"
                className={`select select-bordered w-full mb-2 ${
                  errors.role ? "select-error" : ""
                }`}
                value={editingUser.role}
                onChange={handleInputChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role}</p>}
            </div>

            <div className="form-control">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="changePassword" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">
              Edit User {editingUser.name}
            </h3>

            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`input input-bordered mb-2 ${
                    errors.password ? "input-error" : ""
                  }`}
                  value={newUser.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`input input-bordered mb-2 ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  value={newUser.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="form-control">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default AdminManageUsers;
