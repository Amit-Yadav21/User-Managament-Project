import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://user-managament-project.vercel.app/api/user/find/all');
            setUsers(response.data);
            toast.success('Users fetched successfully!');
        } catch (error) {
            toast.error(`${error.response?.data?.message || error.message}`);
        }
    };
    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`https://user-managament-project.vercel.app/api/user/delete/${userId}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            setUsers(users.filter(user => user._id !== userId));
            toast.success('User deleted successfully!');
        } catch (error) {
            toast.error(`${error.response?.data?.message || error.message}`);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const closeEditModal = () => {
        setEditingUser(null);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, editingUser, handleDelete, handleEdit, closeEditModal }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};