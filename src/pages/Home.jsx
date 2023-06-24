import React, { useEffect } from 'react';
import { VscCopy, SiCreatereactapp, MdOutlineFavorite } from '../assets/icons';
import Login from '../components/Login';
import Profile from '../components/Profile';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { copyToClipboard } from '../utils/copyToClipboard';
import { rgbToHex } from '../utils/rgbToHex';
import useGenerateColor from '../hooks/useGenerateColor';
import { addFavoriteColor } from '../services/firebase';

const Home = () => {
    const { randomColor, mainColor, variations } = useGenerateColor();

    const selectUser = state => state.user.value;
    const getUser = createSelector(selectUser, user => user);
    const user = useSelector(selectUser);

    const handleAddColorToFavorites = (color) => {
        if (user) {
            addFavoriteColor(color, user)
        }
    }

    useEffect(() => {
        randomColor();
    }, [user]);

    return (
        <div className="flex flex-col gap-1 h-screen relative">
            <div
                style={{
                    background: `linear-gradient(to right, rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue}), ${variations.fourth})`
                }}
                className="text-white py-3 flex items-center justify-evenly flex-wrap"
            >
                <div className="max-w-[1300px] px-5 w-full mx-auto flex justify-center items-center sm:flex-row xs:flex-col xs:gap-2">
                    <button
                        onClick={randomColor}
                        className="bg-dark flex items-center justfiy-center h-10 px-4 rounded-md text-sm"
                    >
                        <SiCreatereactapp size={18} />
                        <span className="ml-2">Generate</span>
                    </button>
                    <div className="grow flex items-center justify-end">
                        {user ? <Profile /> : <Login />}
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-5 grow gap-1 text-sm">
                <div
                    className="group flex items-center justify-center flex-col gap-2"
                    style={{
                        backgroundColor: `rgb(${mainColor.red}, ${mainColor.green}, ${mainColor.blue})`
                    }}
                >
                    {user && (
                        <div
                            className="hover:text-[#d6101a] hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                            onClick={() => handleAddColorToFavorites(rgbToHex(mainColor.red, mainColor.green, mainColor.blue))}
                        >
                            <MdOutlineFavorite size={20} />
                        </div>
                    )}
                    <div
                        className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                        onClick={() => copyToClipboard(rgbToHex(mainColor.red, mainColor.green, mainColor.blue))}
                    >
                        <VscCopy size={20} />
                        <span>{rgbToHex(mainColor.red, mainColor.green, mainColor.blue)}</span>
                    </div>
                </div>
                <div className="group flex items-center justify-center flex-col gap-2" style={{ background: variations.first }}>
                    {user && (
                        <div
                            className="hover:text-[#d6101a] hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                            onClick={() => handleAddColorToFavorites(variations.first)}
                        >
                            <MdOutlineFavorite size={20} />
                        </div>
                    )}
                    <div
                        className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                        onClick={() => copyToClipboard(variations.first)}
                    >
                        <VscCopy size={20} />
                        <span>{variations.first}</span>
                    </div>
                </div>
                <div className="group flex items-center justify-center flex-col gap-2" style={{ background: variations.second }}>
                    {user && (
                        <div
                            className="hover:text-[#d6101a] hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                            onClick={() => handleAddColorToFavorites(variations.second)}
                        >
                            <MdOutlineFavorite size={20} />
                        </div>
                    )}
                    <div
                        className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                        onClick={() => copyToClipboard(variations.second)}
                    >
                        <VscCopy size={20} />
                        <span>{variations.second}</span>
                    </div>
                </div>
                <div className="group flex items-center justify-center flex-col gap-2" style={{ background: variations.third }}>
                    {user && (
                        <div
                            className="hover:text-[#d6101a] hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                            onClick={() => handleAddColorToFavorites(variations.third)}
                        >
                            <MdOutlineFavorite size={20} />
                        </div>
                    )}
                    <div
                        className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                        onClick={() => copyToClipboard(variations.third)}
                    >
                        <VscCopy size={20} />
                        <span>{variations.third}</span>
                    </div>
                </div>
                <div className="group flex items-center justify-center flex-col gap-2" style={{ background: variations.fourth }}>
                    {user && (
                        <div
                            className="hover:text-[#d6101a] hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                            onClick={() => handleAddColorToFavorites(variations.fourth)}
                        >
                            <MdOutlineFavorite size={20} />
                        </div>
                    )}
                    <div
                        className="hidden items-center gap-2 py-2 px-4 text-white rounded-md cursor-pointer bg-dark group-hover:flex"
                        onClick={() => copyToClipboard(variations.fourth)}
                    >
                        <VscCopy size={20} />
                        <span>{variations.fourth}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
