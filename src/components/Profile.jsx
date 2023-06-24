import React, { memo } from 'react'
import { IoLogOutOutline } from "../assets/icons"
import { logout } from '../services/firebase';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SideBar from './SideBar';
import { Tooltip } from 'antd';


const Profile = ({ color }) => {
    const selectUser = state => state.user.value;
    const getUser = createSelector(
        selectUser,
        user => user
    )
    const user = useSelector(selectUser);

    const handleLogout = async () => {
        await logout()
        toast.success("Logout successful", {
            theme: "dark",
            autoClose: 1500
        });
    }
    return (
        <div className='flex items-center gap-4'>
            <SideBar user={user} />
            <Tooltip title="Log out">
                <button onClick={handleLogout} className='cursor-pointer bg-dark h-10 w-10 flex items-center justify-center rounded-full'>
                    <IoLogOutOutline size={20} />
                </button>
            </Tooltip>
            <Tooltip title={user && user.displayName}>
                <img className='h-10 rounded-full' src={user && user.photoURL} alt="" />
            </Tooltip>
        </div>

    )
}

export default memo(Profile)