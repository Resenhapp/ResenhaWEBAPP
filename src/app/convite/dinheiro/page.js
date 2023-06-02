import Button from '@/src/components/Button';
import CopyInput from '@/src/components/CopyInput';
import InputField from '@/src/components/InputField';
import Timer from '@/src/components/Timer';
import Back from '@/src/components/Back';

export const metadata = {
    title: 'Resenha.app • Dinheiro',
    description: 'Venha fazer suas resenhas!',
}

export default function Cash() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col items-center w-full max-w-md p-4">
                <div className='w-full flex items-start'>
                    <Back/>
                </div>
                <div className="mb-4">
                    <svg width="54" height="43" viewBox="0 0 54 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.125 14.25H48.375C49.6348 14.25 50.843 14.7504 51.7338 15.6412C52.6246 16.532 53.125 17.7402 53.125 19V38C53.125 39.2598 52.6246 40.468 51.7338 41.3588C50.843 42.2496 49.6348 42.75 48.375 42.75H15.125C13.8652 42.75 12.657 42.2496 11.7662 41.3588C10.8754 40.468 10.375 39.2598 10.375 38V19C10.375 16.3875 12.5125 14.25 15.125 14.25ZM31.75 35.625C33.6397 35.625 35.4519 34.8743 36.7881 33.5381C38.1243 32.2019 38.875 30.3897 38.875 28.5C38.875 26.6103 38.1243 24.7981 36.7881 23.4619C35.4519 22.1257 33.6397 21.375 31.75 21.375C29.8603 21.375 28.0481 22.1257 26.7119 23.4619C25.3757 24.7981 24.625 26.6103 24.625 28.5C24.625 30.3897 25.3757 32.2019 26.7119 33.5381C28.0481 34.8743 29.8603 35.625 31.75 35.625Z" fill="#F5F5F5" />
                        <path d="M8 28.5V19C8 15.0758 11.2008 11.875 15.125 11.875H15.5325C15.8834 10.8825 16.4533 9.97045 17.2119 9.21186C18.5481 7.87567 20.3603 7.125 22.25 7.125C24.1397 7.125 25.9519 7.87567 27.2881 9.21186C28.0467 9.97045 28.6166 10.8825 28.9675 11.875H43.625V4.75C43.625 3.49022 43.1246 2.28204 42.2338 1.39124C41.343 0.500445 40.1348 0 38.875 0H5.625C3.0125 0 0.875 2.1375 0.875 4.75V23.75C0.875 25.0098 1.37545 26.218 2.26624 27.1088C3.15704 27.9996 4.36522 28.5 5.625 28.5H8Z" fill="#F5F5F5" />
                    </svg>
                </div>
                <div className="flex flex-col mb-0 w-full">
                    <div>
                        <h2 className="text-2xl text-whiteT1 text-center font-bold">Pagamento com dinheiro</h2>
                        <p className="text-sm text-whiteT1 text-center font-thin mb-2">Siga as instruções abaixo para pagar com dinheiro no dia da resenha.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 my-8'>
                    <h1 className='text-xl text-center'>
                        Na tela a seguir, você receberá um comprovante de confirmação da sua presença na resenha.
                    </h1>
                    <h1 className='text-xl text-center'>
                        Quando chegar na resenha, tenha o QR Code apresentado ou o código que estará no mesmo comprovante, você terá que apresetá-lo no dia da resenha.
                    </h1>
                </div>
                <div className="flex flex-col mt-4 mb-4 w-full">
                    <Button label="Confirmar" icon="arrow" />
                </div>
                <div className="justify-center align-center w-full max-w-screen-xs flex mb-8">
                    <h1 className="font-regular">
                        Saiba <a href="https://resenha.app"><b>como funciona</b></a>
                    </h1>
                </div>
            </section>
        </div>
    );
}
