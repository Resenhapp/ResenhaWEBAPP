'use client'
import NotificationsButton from '@/src/components/NotificationsButton';
import Notifications from '@/src/components/Notifications';
import MenuButton from '@/src/components/MenuButton';
import Menu from '@/src/components/Menu';
import React, { useState } from 'react';

import Button from '@/src/components/Button';
export const metadata = {
    title: 'Resenha.app • Saque',
    description: 'Venha fazer suas resenhas!',
}

export default function WithdrawSuccess() {



    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleNotifications = () => {
        setNotificationsOpen(!isNotificationsOpen);
    };

    const handleNavigation = () => {
        window.location.href = '/webapp/carteira/';
    };

    return (
        <div className='flex flex-col w-screen h-screen '>
            <div className="flex flex-row justify-between items-center w-full max-w-md mt-0 px-6 pt-20">
                <MenuButton toggleMenu={toggleMenu} />
                <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <h1 className='text-2xl text-whiteT1 font-bold'>Pronto!</h1>
                <NotificationsButton toggleNotifications={toggleNotifications} dotVisible={true} />
                <Notifications isOpen={isNotificationsOpen} toggleNotifications={toggleNotifications} />
            </div>
            <div className="flex flex-col  justify-start h-screen px-4 ">
                <section className="flex w-full max-w-md p-4 ">
                    <div className='w-full flex flex-col gap-16 mt-16'>
                        <div className='w-full flex flex-col items-center gap-4'>
                            <svg width="100" height="100" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M30.0483 1.00221C30.0377 1.5544 29.5813 1.99151 29.0291 2.00097C24.524 2.0781 20.1013 3.26133 16.1529 5.45315C11.9127 7.80694 8.37038 11.2402 5.88519 15.4047C3.39999 19.5693 2.0603 24.3169 2.00199 29.1663C1.94367 34.0156 3.1688 38.7941 5.55313 43.0172C7.93746 47.2403 11.3962 50.7577 15.5785 53.2128C19.7609 55.6679 24.5181 56.9733 29.3677 56.9966C34.2174 57.0199 38.9869 55.7604 43.1927 53.3456C47.109 51.0971 50.4068 47.9213 52.8 44.1037C53.0934 43.6358 53.7034 43.4708 54.1817 43.7469C54.66 44.0231 54.8253 44.6357 54.5332 45.1043C51.9628 49.2271 48.4108 52.6559 44.1885 55.0801C39.6769 57.6704 34.5604 59.0216 29.3581 58.9966C24.1558 58.9716 19.0526 57.5712 14.5661 54.9376C10.0795 52.304 6.36928 48.5307 3.81154 44.0005C1.25381 39.4703 -0.0604236 34.3442 0.00213337 29.1422C0.0646904 23.9402 1.50181 18.8472 4.16775 14.3798C6.83368 9.91243 10.6336 6.22949 15.1822 3.70451C19.439 1.34149 24.2097 0.0712974 29.0676 0.000105629C29.6198 -0.00798723 30.0589 0.450032 30.0483 1.00221Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M35.0596 1.54447C34.9519 2.08614 34.4257 2.43603 33.8804 2.34806C33.5004 2.28673 33.119 2.2334 32.7367 2.18808C32.1883 2.12308 31.7783 1.64224 31.8233 1.09179C31.8683 0.541345 32.3513 0.129863 32.8999 0.193514C33.3583 0.2467 33.8154 0.310635 34.2708 0.385266C34.8158 0.474582 35.1674 1.00279 35.0596 1.54447Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M39.8271 2.9338C39.627 3.44855 39.048 3.70178 38.5263 3.5205C38.1627 3.39414 37.7964 3.27542 37.4277 3.16444C36.8989 3.00523 36.5786 2.46051 36.7184 1.92624C36.8583 1.39196 37.4054 1.07056 37.9346 1.22847C38.3769 1.36042 38.8159 1.50272 39.2514 1.65527C39.7727 1.83783 40.0272 2.41904 39.8271 2.9338Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M44.3326 5.16086C44.0452 5.63246 43.4307 5.78005 42.949 5.50996C42.6132 5.32168 42.2734 5.14047 41.93 4.96645C41.4374 4.71682 41.2177 4.1243 41.4493 3.62291C41.6808 3.12151 42.2758 2.90121 42.7691 3.14963C43.1813 3.3572 43.5885 3.57442 43.9905 3.8011C44.4715 4.07238 44.62 4.68927 44.3326 5.16086Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M48.2827 8.06197C47.9187 8.47735 47.288 8.51749 46.8597 8.16885C46.5611 7.92582 46.2575 7.68909 45.9489 7.45881C45.5063 7.12847 45.3914 6.50708 45.7055 6.05276C46.0195 5.59845 46.6435 5.48335 47.0869 5.8126C47.4574 6.08772 47.8214 6.3715 48.1786 6.6637C48.6061 7.01339 48.6466 7.64659 48.2827 8.06197Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M51.9711 11.9669C51.5357 12.3066 50.9087 12.2277 50.5534 11.8049C50.3057 11.5102 50.0519 11.2207 49.792 10.9366C49.4193 10.5291 49.423 9.89715 49.8167 9.50983C50.2104 9.12252 50.8449 9.12654 51.2186 9.53315C51.5309 9.8729 51.8352 10.2199 52.1313 10.574C52.4855 10.9977 52.4066 11.6272 51.9711 11.9669Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M54.8031 16.382C54.3128 16.6361 53.7108 16.4437 53.439 15.9629C53.2496 15.6277 53.0531 15.2966 52.8497 14.9697C52.558 14.5008 52.6774 13.8803 53.1354 13.5717C53.5935 13.2631 54.2165 13.3833 54.5094 13.8515C54.7541 14.2427 54.9897 14.6397 55.2158 15.0419C55.4864 15.5234 55.2934 16.1278 54.8031 16.382Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M56.7739 21.2275C56.2454 21.3878 55.6888 21.0885 55.5094 20.5662C55.3844 20.2021 55.2518 19.8406 55.1116 19.4821C54.9104 18.9677 55.1413 18.3795 55.648 18.1598C56.1547 17.9401 56.7453 18.1721 56.9477 18.686C57.1168 19.1154 57.2758 19.5487 57.4246 19.9855C57.6026 20.5083 57.3024 21.0673 56.7739 21.2275Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M57.8352 26.4371C57.2862 26.4964 56.7948 26.0989 56.7156 25.5524C56.6604 25.1714 56.5972 24.7916 56.526 24.4132C56.4239 23.8704 56.76 23.3353 57.2987 23.2135C57.8374 23.0918 58.3746 23.4295 58.478 23.972C58.5644 24.4253 58.6402 24.8806 58.7053 25.3375C58.7831 25.8843 58.3843 26.3778 57.8352 26.4371Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M57.9121 31.7341C57.3615 31.6908 56.9522 31.2093 56.9755 30.6575C56.9917 30.2728 56.9999 29.8879 57 29.5029C57.0001 28.9506 57.4295 28.4869 57.9814 28.467C58.5333 28.447 58.9987 28.8783 58.9999 29.4306C59.001 29.8921 58.9912 30.3535 58.9706 30.8146C58.9459 31.3663 58.4626 31.7775 57.9121 31.7341Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M57.0446 36.8144C56.5108 36.6726 56.1949 36.1253 56.3172 35.5867C56.4025 35.2113 56.4798 34.8341 56.5493 34.4554C56.6488 33.9122 57.1547 33.5334 57.7012 33.6132C58.2477 33.693 58.6277 34.201 58.5295 34.7445C58.4474 35.1986 58.3547 35.6507 58.2514 36.1005C58.1278 36.6388 57.5784 36.9562 57.0446 36.8144Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M55.1939 41.8289C54.6959 41.5899 54.4878 40.9932 54.7085 40.487C54.8624 40.1341 55.0088 39.778 55.1477 39.4189C55.347 38.9038 55.9146 38.6262 56.4366 38.8066C56.9586 38.987 57.2372 39.5571 57.0392 40.0726C56.8737 40.5035 56.6982 40.9303 56.5127 41.3529C56.2908 41.8586 55.6918 42.0679 55.1939 41.8289Z" fill="#F1F1F1" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M28.3136 10.9968C27.7614 10.9968 27.3136 11.4445 27.3136 11.9968L27.3136 33.4465C27.3136 34.5367 27.9051 35.5412 28.8585 36.07L37.5149 40.8714C37.9979 41.1393 38.6066 40.9649 38.8745 40.4819C39.1423 39.999 38.968 39.3903 38.485 39.1224L29.8286 34.321C29.5108 34.1447 29.3136 33.8099 29.3136 33.4465L29.3136 11.9968C29.3136 11.4445 28.8659 10.9968 28.3136 10.9968Z" fill="#F1F1F1" />
                            </svg>
                            <h1 className='text-2xl text-center w-full font-bold'>O seu saque foi solicitado com sucesso!</h1>
                            <p className='text-center'>Agora é só aguardar a grana cair na tua conta 😎!</p>
                            <hr className='bg-purpleT3 ring-0 w-full rounded-full' />
                            <p className='text-center'>Geralmente, leva no máximo um dia para cair, mas qualquer coisa pode entrar em contato conosco pelo atendimento!</p>
                        </div>
                        <div>
                            <Button label={'Concluir!'} icon={'check'} action={handleNavigation} iconSide='right' height={1} width={1} textAlign='left' />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
