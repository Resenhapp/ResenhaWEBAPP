import InputField from '@/src/components/InputField';
import PasswordField from '@/src/components/PasswordField';
import Button from '@/src/components/Button';
import GoogleButton from '@/src/components/GoogleButton';
import Toggle from '@/src/components/Toggle';
import Link from 'next/link';

export const metadata = {
    title: 'Resenha.app • E-mail confirmado',
    description: 'Venha fazer suas resenhas!',
}

export default function Confirmed() {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <section className="flex flex-col items-center w-full max-w-md p-4">
                <div className="mb-2">
                    <svg width="100" height="92" viewBox="0 0 70 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 0C4.92487 0 0 4.92487 0 11V43C0 49.0751 4.92487 54 11 54H42.4311C43.0629 54 43.5124 53.3866 43.3704 52.7709C43.2689 52.3305 42.8848 52 42.4329 52H11C6.02944 52 2 47.9706 2 43V11C2 6.02944 6.02944 2 11 2H51C55.9706 2 60 6.02944 60 11V34.4329C60 34.8848 60.3305 35.2689 60.7709 35.3704C61.3866 35.5124 62 35.0629 62 34.4311V11C62 4.92487 57.0751 0 51 0H11Z" fill="#F1F1F1" />
                        <path d="M48.3972 38.2127C48.8686 37.832 48.9181 37.1111 48.4665 36.7071L37.6524 27.0311C37.2039 26.6298 37.2089 25.9262 37.663 25.5313L54.6562 10.7546C55.0729 10.3922 55.117 9.76058 54.7546 9.34382C54.3922 8.92706 53.7606 8.883 53.3438 9.24539L33.6247 26.3924C32.1196 27.7012 29.8804 27.7012 28.3753 26.3924L8.65618 9.24539C8.23942 8.883 7.60779 8.92706 7.24539 9.34382C6.883 9.76058 6.92706 10.3922 7.34382 10.7546L24.337 25.5313C24.7911 25.9262 24.7961 26.6298 24.3476 27.0311L7.33563 42.2526C6.92285 42.6195 6.88567 43.2516 7.25259 43.6644C7.6195 44.0771 8.25158 44.1143 8.66436 43.7474L26.3685 27.9066C26.5657 27.7302 26.8633 27.7281 27.0629 27.9017C29.3206 29.8648 32.6794 29.8648 34.9371 27.9017C35.1367 27.7281 35.4343 27.7302 35.6315 27.9066L47.1338 38.1983C47.4896 38.5167 48.0258 38.5126 48.3972 38.2127Z" fill="#F1F1F1" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M57.5 60C63.299 60 68 55.299 68 49.5C68 43.701 63.299 39 57.5 39C51.701 39 47 43.701 47 49.5C47 55.299 51.701 60 57.5 60ZM57.5 62C64.4036 62 70 56.4036 70 49.5C70 42.5964 64.4036 37 57.5 37C50.5964 37 45 42.5964 45 49.5C45 56.4036 50.5964 62 57.5 62Z" fill="#F1F1F1" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M63.9142 46.5C64.3047 46.8905 64.3047 47.5237 63.9142 47.9142L58.8284 53C57.6569 54.1716 55.7574 54.1716 54.5858 53L52 50.4142C51.6095 50.0237 51.6095 49.3905 52 49C52.3905 48.6095 53.0237 48.6095 53.4142 49L56 51.5858C56.3905 51.9763 57.0237 51.9763 57.4142 51.5858L62.5 46.5C62.8905 46.1095 63.5237 46.1095 63.9142 46.5Z" fill="#F1F1F1" />
                    </svg>
                </div>
                <div className="flex flex-col mb-0 w-full">
                    <h2 className="text-2xl text-center text-whiteT1 font-bold mb-2">E-mail confirmado!</h2>
                    <div className="flex flex-col mb-16 gap-4 w-full">
                        <div className="flex-col items-center justify-center">
                            <p className=" text-center text-[16px]">Obrigado por confirmar a sua conta! Você já pode começar a usar o <b>resenha.app</b>!</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mb-4 w-full">
                    <Button label="Vamos lá!" icon="arrow" />
                </div>
            </section>
        </div>
    );
}
