'use client'
import Vector from "@/src/components/Vector"
import { useState } from "react"

export default function Denied({ returnToHome }) {
    const goBack = () => {
        returnToHome("Scanner")
    }

    return (
        <div className="flex flex-col justify-center h-[70vh] mt-12 content-center items-center z-[100]">
            <div className="flex flex-col justify-center gap-4 items-center content-center">
                <Vector vectorname={'exclamation02'} />
                <p className='text-3xl font-bold'>Acesso negado</p>
                <p className="text-center">Esta pessoa <b>não pode passar! </b>O código não foi validado. Instrua a pessoa das regras e a pergunte se ela possui outro código, caso não, siga a política do hospedeiro. </p>
            </div>
            <button onClick={() => goBack()} className="bg-whiteT1 mt-12 px-5 py-5 rounded-full justify-between w-[60vw] mb-16 max-w-[640px] text-purpleT0 text-xl flex flex-row items-center gap-2">
                <p className=" w-full">Voltar</p>
            </button>
        </div>
    )
}
