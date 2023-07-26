'use client'
import Vector from "@/src/components/Vector"

export default function TypeCode({useCamera}) {
    return (
        <div className="flex flex-col justify-center content-center items-center z-[100]">
            <p className="text-3xl font-bold">Insira o código</p>
            <div className='py-3 content-center items-center justify-around flex flex-row px-2 rounded-xl bg-whiteT1 w-2/3'><Vector vectorname={'code01'} /><input className='text-purpleT0 text-3xl w-2/3 bg-transparent' maxLength={4} inputMode='tel'></input></div>
            <p>Prefere usar a câmera?</p>
            <button onClick={useCamera} className='px-8 py-2 bg-whiteT1 rounded-xl text-purpleT0 font-normal text-xl'>Usar câmera</button>
        </div>
    )
}
