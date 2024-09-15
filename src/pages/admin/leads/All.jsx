import { useState, useEffect } from "react";
const AdminAllLeads = () => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    mobile: "",
    emailVerificationStatus: "verified",
    mobileVerificationStatus: "verified",
    description: "",
    status: "",
    city: "",
    state: "",
    leadType: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLead({ ...newLead, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newLead.name) newErrors.name = "Name is required";
    // check if email is valid using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newLead.email || !emailRegex.test(newLead.email)) {
      newErrors.email = "Invalid email format";
    }
    // check if mobile is valid using a regular expression
    //  mobile number should be 10 digits long
    const mobileRegex = /^[0-9]{10}$/;
    if (!newLead.mobile || !mobileRegex.test(newLead.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }
    if (!newLead.emailVerificationStatus)
      newErrors.emailVerificationStatus =
        "Email verification status is required";
    if (!newLead.mobileVerificationStatus)
      newErrors.mobileVerificationStatus =
        "Mobile verification status is required";
    if (!newLead.description) newErrors.description = "Description is required";
    if (!newLead.status) newErrors.status = "Status is required";
    if (!newLead.city) newErrors.city = "City is required";
    if (!newLead.state) newErrors.state = "State is required";
    if (!newLead.leadType) newErrors.leadType = "Lead type is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // handle addLead form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;
    console.log(newLead);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold">All Leads</h1>
        <div className="p-2 m-2  outline-2 outline-primary rounded flex gap-2 items-center">
          Add Lead:
          <button className="mr-2 btn btn-neutral btn-sm">
            Upload
            <img src="/mb.png" className="h-6 ml-1" alt="" />
          </button>
          <button className="mr-2 btn btn-neutral btn-sm">
            Upload
            <img src="/99.png" className="h-6 bg-white" alt="" />
          </button>
          <button
            className="btn btn-neutral btn-sm"
            onClick={() => {
              document.getElementById("addLead").showModal();
            }}
          >
            Add manually
          </button>
        </div>
      </div>
      <dialog id="addLead" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">Add New Lead</h3>

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
                value={newLead.name}
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
                value={newLead.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Mobile</span>
              </label>
              <input
                type="number"
                name="mobile"
                placeholder="Mobile"
                className={`input input-bordered mb-2 ${
                  errors.mobile ? "input-error" : ""
                }`}
                value={newLead.mobile}
                onChange={handleInputChange}
              />
              {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Verification Status</span>
              </label>
              <select
                name="emailVerificationStatus"
                className={`select select-bordered w-full mb-2 ${
                  errors.emailVerificationStatus ? "select-error" : ""
                }`}
                value={newLead.emailVerificationStatus}
                onChange={handleInputChange}
              >
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              {errors.emailVerificationStatus && (
                <p className="text-red-500">{errors.emailVerificationStatus}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Mobile Verification Status</span>
              </label>
              <select
                name="mobileVerificationStatus"
                className={`select select-bordered w-full mb-2 ${
                  errors.mobileVerificationStatus ? "select-error" : ""
                }`}
                value={newLead.mobileVerificationStatus}
                onChange={handleInputChange}
              >
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              {errors.mobileVerificationStatus && (
                <p className="text-red-500">
                  {errors.mobileVerificationStatus}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Description"
                className={`textarea textarea-bordered mb-2 ${
                  errors.description ? "textarea-error" : ""
                }`}
                value={newLead.description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <input
                type="text"
                name="status"
                placeholder="Status"
                className={`input input-bordered mb-2 ${
                  errors.status ? "input-error" : ""
                }`}
                value={newLead.status}
                onChange={handleInputChange}
              />
              {errors.status && <p className="text-red-500">{errors.status}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                className={`input input-bordered mb-2 ${
                  errors.city ? "input-error" : ""
                }`}
                value={newLead.city}
                onChange={handleInputChange}
              />
              {errors.city && <p className="text-red-500">{errors.city}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input
                type="text"
                name="state"
                placeholder="State"
                className={`input input-bordered mb-2 ${
                  errors.state ? "input-error" : ""
                }`}
                value={newLead.state}
                onChange={handleInputChange}
              />
              {errors.state && <p className="text-red-500">{errors.state}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Lead Type</span>
              </label>
              <select
                name="leadType"
                className={`select select-bordered w-full mb-2 ${
                  errors.leadType ? "select-error" : ""
                }`}
                value={newLead.leadType}
                onChange={handleInputChange}
              >
                <option value="prospect">Prospect</option>
                <option value="customer">Customer</option>
              </select>
              {errors.leadType && (
                <p className="text-red-500">{errors.leadType}</p>
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
    </>
  );
};

export default AdminAllLeads;
