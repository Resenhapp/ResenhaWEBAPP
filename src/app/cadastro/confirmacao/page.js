'use client'
import Button from "@/src/components/Button";
import Vector from "@/src/components/Vector";

export default function ConfirmacaoCadastro() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col items-center w-full max-w-md p-4">
                <div className="flex flex-col justify-around h-full px-4">
                    <section className="flex flex-col w-full max-w-md p-4 justify-around h-full">
                        <div className='w-full flex flex-col items-center gap-4'>
                            <Vector vectorname={'check05'} />
                            <h1 className='text-2xl text-center w-full font-bold'>Conta criada com sucesso!</h1>
                            <p className='text-center w-full'>Você receberá um email para confirmar a sua conta, este passo é opcional, mas <b>recomendamos fortemente</b> que você confirme.</p>
                            <hr className='bg-purpleT3 ring-0 w-full rounded-full' />
                        </div>
                        <div>
                        </div>
                    </section>
                </div>
                <div className="flex flex-col mb-4 w-full">
                    <Button action={() => { window.location.href = "https://resenha.app/login" }} label="Fazer login" icon="arrow" iconSide='right' />
                </div>
            </section>
        </div>
    );
}