import { Drawer } from 'antd';
import { useState, memo } from 'react';
import { MdOutlineFavorite, VscCopy, BsTrash3 } from "../assets/icons"
import { getFavoriteColors, removeColorFromFavorites } from '../services/firebase';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { copyToClipboard } from '../utils/copyToClipboard';
import { Empty } from 'antd';
import { getContrastColor } from '../utils/getContrastColor';
import { Popconfirm } from 'antd';
import { Tooltip } from 'antd';



const SideBar = ({ user }) => {

    const selectColors = state => state.colors.value;
    const getColors = createSelector(selectColors, colors => colors);
    const colors = useSelector(selectColors);

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };

    const handleCopyToClipboard = (color) => {
        copyToClipboard(color)
    }

    const handleRemoveColor = (color) => {
        removeColorFromFavorites(color)
    }

    useEffect(() => {
        if (user) {
            getFavoriteColors(user.uid)
        }
    }, [])

    return (
        <>
            <Tooltip title="Favorites">
                <div type="primary" className='cursor-pointer bg-dark hover:text-[#d6101a] hover:bg-white transition-all duration-500 h-10 w-10 flex items-center justify-center rounded-full' onClick={showDrawer}>
                    <MdOutlineFavorite size={20} />
                </div>
            </Tooltip>
            <Drawer title="Favorite Colors" placement="right" onClose={onClose} open={open}>
                <div className={`gap-2 grid ${colors && colors.length <= 0 ? "grid-cols-1" : "grid-cols-3"}`}>
                    {
                        colors && colors.length > 0 ? colors.map(favorites => (
                            <div key={favorites.id} style={{ background: `${favorites.color}` }} className="flex items-center justify-around h-16 group">
                                <span onClick={() => handleCopyToClipboard(favorites.color)} className="hidden rounded-md cursor-pointer text-white group-hover:flex">
                                    <VscCopy className='drop-shadow-copy' size={25} color={getContrastColor(favorites.color)} />
                                </span>
                                <Popconfirm
                                    title="Delete color"
                                    description={`Are you sure you want to delete the color "${favorites.color}" from favorites?`}
                                    onConfirm={() => handleRemoveColor(favorites)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <span className="hidden rounded-md cursor-pointer text-white group-hover:flex">
                                        <BsTrash3 className='drop-shadow-copy' size={25} color={getContrastColor(favorites.color)} />
                                    </span>
                                </Popconfirm>

                            </div>
                        )) : <Empty description="There are no favorite colors." />
                    }
                </div>
            </Drawer>
        </>
    );
};
export default memo(SideBar);