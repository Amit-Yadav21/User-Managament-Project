import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../Context/UserContext';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './Edit.css'; 

const EditUser = () => {
    const { editingUser, closeEditModal } = useUserContext(); 
    const [name, setName] = useState(editingUser.name);
    const [email, setEmail] = useState(editingUser.email);
    const [password, setPassword] = useState(''); 
    const [mobile, setMobile] = useState(editingUser.mobile); 
    const [showPassword, setShowPassword] = useState(false); 

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://localhost:8080/api/user/update/${editingUser._id}`, {
                name,
                email,
                password,
                mobile, 
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            toast.success('User updated successfully!'); 
            closeEditModal(); 
        } catch (error) {
            toast.error(`${error.response?.data?.message || error.message}`); 
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit User</h2>
                    <FaTimes className="close-icon" onClick={closeEditModal} />
                </div>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <div className="password-container"> 
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <span className="password-icon" onClick={() => setShowPassword(!showPassword)}> 
                            {showPassword ? <FaEyeSlash /> : <FaEye />} 
                        </span>
                    </div>
                    <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Mobile"
                        required
                    />
                    <button type="submit">Update</button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default EditUser;
