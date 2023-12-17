'use client'
import Vector from "@/src/components/Vector"
import { useState } from "react"

export default function TypeCode({ useCamera, codeResponse, tryToAllow }) {
    const [code, setCode] = useState('');

    return (
        <div className="flex flex-col justify-center mt-12 content-center items-center z-[100]">
            <p className="text-3xl font-bold mb-16">Insira o código</p>
            <div className='py-3 content-center items-center justify-around flex flex-row px-2 rounded-xl mb-8 bg-whiteT1 w-2/3'><Vector vectorname={'code01'} />
                <input
                    placeholder="CÓDIGO"
                    className='text-purpleT0 text-3xl w-2/3 bg-transparent'
                    maxLength={4}
                    value={code}
                    inputMode='tel'
                    onChange={(e) => setCode(e.target.value)}
                >
                </input>
            </div>
            <p>Prefere usar a câmera?</p>
            <button onClick={useCamera} className='px-8 font bold rounded-xl text-whiteT1 mb-16 text-xl'>Usar câmera</button>
            <button onClick={() => tryToAllow(code)} className="bg-whiteT1 px-5 py-5 rounded-full justify-between w-[60vw] mb-16 max-w-[640px] text-purpleT0 text-xl flex flex-row items-center gap-2">
                <p className=" w-full">Liberar</p>
                <Vector vectorname={'check03'} />
            </button>
            <div className='items-center flex flex-col mt-12'>
                <p className='text-3xl font-bold'>Atenção:</p>
                <p className='text-center w-[90%]'>Sempre siga as instruções do hospedeiro para garantir a segurança e a melhor experiência para os visitantes.</p>
            </div>
        </div>
    )
}
