import React, { useContext, useState } from 'react'
import assets from '../../assets/assets'
import './sidebar.css';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { prevPrompts, setRecentPrompt, onSent, newChat } = useContext(Context);
    // Logic to send recent prompt to input
    const loadPrompt = async (prompt) => {
        // setInput(prompt); // Set the clicked prompt to input
        setRecentPrompt(prompt); // Optionally update recent prompt if needed
        await onSent(prompt); // Call onSent with the prompt
    };


    return (
        <div className='sm:inline-flex hidden sidebar min-h-screen bg-[#f0f4f9] flex-col justify-between py-6 px-4 '>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} src={assets.menu} alt="" className="menu w-5 block ml-2.5 cursor-pointer" />
                <div onClick={() => newChat()} className="new-chat mt-12 inline-flex items-center gap-2.5 py-2.5 px-4 bg-[#e6eaf1] rounded-full text-sm text-gray-400 cursor-pointer">
                    <img src={assets.plus} alt="" className='w-5' />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className="recent flex flex-col">
                        <p className="recent-title mt-[30px] mb-5">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry flex items-start gap-2.5 p-2.5 pr-10 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                                    <img src={assets.message} alt="" className='w-5' />
                                    <p>{item.slice(0,18)}...</p>
                                </div>
                            )
                        })}
                    </div> : null}
            </div>
            <div className="bottom flex flex-col">
                <div className="bottom-item pr-2.5 flex items-start gap-2.5 p-2.5 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img src={assets.question} alt="" className='w-8' />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item pr-2.5 flex items-start gap-2.5 p-2.5 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img src={assets.history} alt="" className='w-8' />
                    {extended ? <p>Activities</p> : null}
                </div>
                <div className="bottom-item pr-2.5 flex items-start gap-2.5 p-2.5 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                    <img src={assets.setting} alt="" className='w-10' />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar