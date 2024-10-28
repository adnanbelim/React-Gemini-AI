import React, { useContext } from 'react'
import assets from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const { onSent, input, setInput, recentPrompt, showResults, loading, resultData, } = useContext(Context);

    return (
        <div className='main flex-1 min-h-screen pb-[10vh] relative'>
            <div className="nav flex items-center justify-between text-2xl p-5 text-[#585858]">
                <p>Gemini</p>
                <img src={assets.user} alt="" className='w-12 rounded-full' />
            </div>
            <div className="main-container m-auto max-w-[900px]">

                {
                    !showResults ? 
                        <>
                            <div className="greet my-4 mx-0 text-6xl text-[#c4c7c5] font-medium p-5">
                                <p><span>Hello Dev.</span></p>
                                <p>How can I help you today?</p>
                            </div>
                            <div className="cards sm:grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5 hidden">
                                <div className="card h-[200px] p-4 border bg-[#f0f4f9] relative cursor-pointer rounded-[10px] hover:bg-[#dfe4ea]">
                                    <p className='text-[#585858] text-lg'>Suggest a beautiful place to see on an upcoming road trip</p>
                                    <img src={assets.compass} alt="" className='w-9 p-1 absolute bg-white rounded-[20px] bottom-[10px] right-[10px]' />
                                </div>
                                <div className="card h-[200px] p-4 border bg-[#f0f4f9] relative cursor-pointer rounded-[10px] hover:bg-[#dfe4ea]">
                                    <p className='text-[#585858] text-lg'>Suggest a beautiful place to see on an upcoming road trip</p>
                                    <img src={assets.bulb} alt="" className='w-9 p-1 absolute bg-white rounded-[20px] bottom-[10px] right-[10px]' />
                                </div>
                                <div className="card h-[200px] p-4 border bg-[#f0f4f9] relative cursor-pointer rounded-[10px] hover:bg-[#dfe4ea]">
                                    <p className='text-[#585858] text-lg'>Suggest a beautiful place to see on an upcoming road trip</p>
                                    <img src={assets.message} alt="" className='w-9 p-1 absolute bg-white rounded-[20px] bottom-[10px] right-[10px]' />
                                </div>
                                <div className="card h-[200px] p-4 border bg-[#f0f4f9] relative cursor-pointer rounded-[10px] hover:bg-[#dfe4ea]">
                                    <p className='text-[#585858] text-lg'>Suggest a beautiful place to see on an upcoming road trip</p>
                                    <img src={assets.code} alt="" className='w-9 p-1 absolute bg-white rounded-[20px] bottom-[10px] right-[10px]' />
                                </div>
                            </div>
                        </>
                    : <div className="result py-0 px-[5%] max-h-[70vh] overflow-y-scroll">
                        <div className="result-title my-10 flex items-center gap-5">
                            <img src={assets.user} alt="" className='w-14 rounded-full'/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data flex items-start gap-5">
                            <img src={assets.gemini} alt="" className='w-10'/>

                                {loading ? <div className="loader w-full flex flex-col gap-2.5">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div> : <p dangerouslySetInnerHTML={{ __html: resultData }} className='text-base font-normal text-justify'></p>}

                            
                        </div>
                    </div>
                }

                <div className="main-bottom absolute bottom-0 w-full max-w-[900px] py-0 px-5 m-auto">
                    <div className="search-box flex items-center justify-between gap-5 bg-[#f0f4f9] py-2.5 px-5 rounded-full">
                        <input onChange={(e) => {setInput(e.target.value)}} value={input} type="text" placeholder='Enter a prompt here' className='flex-1 bg-transparent border-none outline-none p-2 text-lg'/>
                        <div className='flex gap-4 items-center'>
                            <img src={assets.gallary} alt="" className='w-6 cursor-pointer' />
                            <img src={assets.mic} alt="" className='w-6 cursor-pointer' />
                            {input ? <img onClick={() => onSent()} src={assets.send_message} alt="" className='w-6 cursor-pointer' /> : null}
                        </div>
                    </div>
                    <p className="bottom-info text-sm my-4 mx-auto text-center font-normal">
                        Gemini may display incorrect info, including about people. 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main