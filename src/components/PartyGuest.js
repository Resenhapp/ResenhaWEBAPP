import Vector from "./Vector";

const PartyGuest = ({ guestName, isFirst, isLast, paidStatus, username, onRemove, onAuthorize, bypass }) => {
    return (
        <div className="flex flex-col items-end border-t-[1px] border-purpleT2">
            {!isFirst && <hr className="w-full mt-1 border-purpleT3 mb-1" />}
            <div className="flex flex-row w-full h-full items-end">
                <div className="flex flex-col justify-between w-full h-full">
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-md font-bold">{guestName}</p>
                        {username && <><p>·</p><p className="text-sm text-purpleT5">@{username}</p></>}
                    </div>
                    <div className="flex flex-row items-center content-center gap-1">
                    {bypass === true ?
                        <>
                            <Vector vectorname={'done1'} />
                            <p className="">Liberado</p>
                        </>
                        :
                        paidStatus === true ?
                            <>
                                <Vector vectorname={'done1'} />
                                <p className="">Pago</p>
                            </>
                            :
                            <>
                                <Vector vectorname={'clock01'} />
                                <p>Pendente</p>
                            </>
                    }
                    </div>
                </div>
            </div>
                <div className="flex flex-row gap-4 h-full justify-end w-full">
                    {username && (
                        <button onClick={() => { window.location.href = "/perfil?u=" + username }} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                            <Vector vectorname={'eye02'} />
                        </button>
                    )}
                    {!paidStatus && <button onClick={onRemove} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                        <Vector vectorname={'block01'} />
                    </button>}
                    {!paidStatus && <button onClick={onAuthorize} className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-1 w-8 h-8 align-center justify-center items-center'>
                        <Vector vectorname={'check02'} />
                    </button>}
                </div>
            {isLast && <hr className="w-full mt-2 border-purpleT3 " />}
        </div>
    )
}

export default PartyGuest;