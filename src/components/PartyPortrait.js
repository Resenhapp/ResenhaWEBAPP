import React from 'react';
import Image from 'next/image';

const PartyPortrait = ({ partyName, partyImage, partyDate, partyHour, partyGuests, partyMaxGuests }) => {

    const baseFlexClasses = 'flex flex-row items-center gap-1';
    const h3Classes = 'text-[12px]';

    return (
        <div className='bg-purpleT2 rounded-2xl p-2 flex flex-row ring-2 ring-inset ring-purpleT4'>
            <Image src={partyImage} alt="" width={110} height={30} className="bg-purpleT4 mr-2 rounded-xl object-cover" />
            <div className='flex flex-col w-full justify-around'>
                <h1 className='text-xl font-bold'>
                    {partyName} {/* party name */}
                </h1>
                <div>
                    <div className={baseFlexClasses}>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83325 0.916748C7.83325 0.640606 7.60939 0.416748 7.33325 0.416748C7.05711 0.416748 6.83325 0.640606 6.83325 0.916748V1.33325H4.16675V0.916748C4.16675 0.640606 3.94289 0.416748 3.66675 0.416748C3.39061 0.416748 3.16675 0.640606 3.16675 0.916748V1.33325H2.29167C1.50926 1.33325 0.875 1.96752 0.875 2.74992V9.16659C0.875 9.94899 1.50926 10.5833 2.29167 10.5833H8.70833C9.49074 10.5833 10.125 9.94899 10.125 9.16659V2.74992C10.125 1.96752 9.49074 1.33325 8.70833 1.33325H7.83325V0.916748ZM9.125 4.08325V2.74992C9.125 2.5198 8.93845 2.33325 8.70833 2.33325H7.83325V2.75008C7.83325 3.02622 7.60939 3.25008 7.33325 3.25008C7.05711 3.25008 6.83325 3.02622 6.83325 2.75008V2.33325H4.16675V2.75008C4.16675 3.02622 3.94289 3.25008 3.66675 3.25008C3.39061 3.25008 3.16675 3.02622 3.16675 2.75008V2.33325H2.29167C2.06155 2.33325 1.875 2.5198 1.875 2.74992V4.08325H9.125ZM1.875 5.08325H9.125V9.16659C9.125 9.3967 8.93845 9.58325 8.70833 9.58325H2.29167C2.06155 9.58325 1.875 9.3967 1.875 9.16659V5.08325Z" fill="white" />
                        </svg>
                        <h3 className={h3Classes}>{partyDate}, às {partyHour}</h3>
                    </div>
                    <div className={baseFlexClasses}>
                        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 1.5C3.89543 1.5 3 2.39543 3 3.5C3 4.60457 3.89543 5.5 5 5.5C6.10457 5.5 7 4.60457 7 3.5C7 2.39543 6.10457 1.5 5 1.5ZM2 3.5C2 1.84315 3.34315 0.5 5 0.5C6.65685 0.5 8 1.84315 8 3.5C8 5.15685 6.65685 6.5 5 6.5C3.34315 6.5 2 5.15685 2 3.5Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.776864 8.45861C1.28345 7.85821 1.99058 7.5 2.75 7.5H7.25C8.00942 7.5 8.71655 7.85821 9.22314 8.45861C9.72757 9.05647 10 9.85168 10 10.6667V12C10 12.2761 9.77614 12.5 9.5 12.5C9.22386 12.5 9 12.2761 9 12V10.6667C9 10.0672 8.79832 9.50583 8.45884 9.10349C8.12152 8.70369 7.68406 8.5 7.25 8.5H2.75C2.31594 8.5 1.87848 8.70369 1.54116 9.10349C1.20168 9.50583 1 10.0672 1 10.6667V12C1 12.2761 0.776142 12.5 0.5 12.5C0.223858 12.5 0 12.2761 0 12V10.6667C0 9.85168 0.272425 9.05647 0.776864 8.45861Z" fill="white" />
                        </svg>
                        <h3 className={h3Classes}>{partyGuests}/{partyMaxGuests} confirmados</h3>
                    </div>
                </div>
                <div className='flex flex-row  justify-between'> {/* 4 button */}
                    <div className='gap-2 flex'> {/* 3 buttons */}
                        <button className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-2 w-8 h-8 align-center justify-center items-center'>
                            <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.27318 8.63823C3.50689 8.40452 3.87285 8.37978 4.16644 8.53158C5.69481 9.32183 7.62006 9.07615 8.90167 7.79455C10.4872 6.209 10.4872 3.63833 8.90167 2.05278C7.31612 0.467237 4.74544 0.467237 3.1599 2.05278C1.8783 3.33439 1.63262 5.25964 2.42287 6.78801C2.57467 7.08159 2.54993 7.44756 2.31622 7.68127L0.289017 9.70847C0.0247598 9.97273 0.0247598 10.4012 0.289017 10.6654C0.553275 10.9297 0.981721 10.9297 1.24598 10.6654L3.27318 8.63823ZM4.11686 6.83759C3.05983 5.78056 3.05983 4.06677 4.11686 3.00974C5.17389 1.95271 6.88768 1.95271 7.94471 3.00974C9.00173 4.06677 9.00173 5.78056 7.94471 6.83759C6.88768 7.89462 5.17389 7.89462 4.11686 6.83759Z" fill="#F1F1F1" />
                            </svg>
                        </button> {/* inspect */}
                        <button className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-2 w-8 h-8 align-center justify-center items-center'>
                            <svg width="13" height="13" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.48818 2.0261C8.20503 1.74296 7.74597 1.74296 7.46282 2.0261L6.82575 2.66318L8.70053 4.53796L9.33761 3.90089C9.62075 3.61774 9.62075 3.15868 9.33761 2.87554L8.48818 2.0261ZM7.67518 5.56331L5.8004 3.68853L1.66255 7.82638C1.52658 7.96235 1.45019 8.14676 1.45019 8.33906V9.551C1.45019 9.75122 1.6125 9.91352 1.81271 9.91352H3.02466C3.21695 9.91352 3.40136 9.83713 3.53733 9.70116L7.67518 5.56331ZM6.43747 1.00075C7.2869 0.151321 8.6641 0.15132 9.51353 1.00075L10.363 1.85018C11.2124 2.69961 11.2124 4.07681 10.363 4.92624L4.56269 10.7265C4.15477 11.1344 3.60153 11.3636 3.02466 11.3636H1.45019C0.64934 11.3636 0.00012207 10.7144 0.00012207 9.91352V8.33906C0.00012207 7.76218 0.229284 7.20894 0.637195 6.80103L6.43747 1.00075Z" fill="#F1F1F1" />
                            </svg>
                        </button> {/* edit */}
                        <button className='bg-purpleT2 flex ring-purpleT3 ring-inset rounded-full ring-2 w-8 h-8 align-center justify-center items-center'>
                            <svg width="13" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.76608 10.1782H2.33751C1.54853 10.1782 0.908936 9.56691 0.908936 8.81281V2.27451C0.908936 1.52041 1.54853 0.909088 2.33751 0.909088H6.62322C7.4122 0.909088 8.05179 1.52041 8.05179 2.27451V3.63994H9.48036C10.2693 3.63994 10.9089 4.25126 10.9089 5.00537V11.5437C10.9089 12.2978 10.2693 12.9091 9.48036 12.9091H5.19465C4.40567 12.9091 3.76608 12.2978 3.76608 11.5437V10.1782ZM6.26608 2.27451C6.46332 2.27451 6.62322 2.42735 6.62322 2.61587V3.63994H5.19465C4.40567 3.63994 3.76608 4.25126 3.76608 5.00537V8.81281H2.69465C2.49741 8.81281 2.33751 8.65998 2.33751 8.47145L2.33751 2.61587C2.33751 2.42735 2.49741 2.27451 2.69465 2.27451H6.26608Z" fill="#F1F1F1" />
                            </svg>
                        </button> {/* copy link */}
                    </div>
                    <button className='bg-redT2 flex ring-redT4 ring-inset rounded-full ring-2 w-8 h-8 align-center justify-center items-center'>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.0139 1.39088C0.769082 1.39088 0.534294 1.47517 0.361183 1.6252C0.188073 1.77523 0.0908203 1.97871 0.0908203 2.19088V2.99088C0.0908203 3.20305 0.188073 3.40654 0.361183 3.55657C0.534294 3.7066 0.769082 3.79088 1.0139 3.79088H1.47544V10.9909C1.47544 11.4152 1.66994 11.8222 2.01616 12.1223C2.36238 12.4223 2.83196 12.5909 3.32159 12.5909H8.86005C9.34968 12.5909 9.81926 12.4223 10.1655 12.1223C10.5117 11.8222 10.7062 11.4152 10.7062 10.9909V3.79088H11.1677C11.4126 3.79088 11.6473 3.7066 11.8205 3.55657C11.9936 3.40654 12.0908 3.20305 12.0908 2.99088V2.19088C12.0908 1.97871 11.9936 1.77523 11.8205 1.6252C11.6473 1.47517 11.4126 1.39088 11.1677 1.39088H7.93697C7.93697 1.17871 7.83972 0.975225 7.66661 0.825196C7.4935 0.675167 7.25871 0.590881 7.0139 0.590881H5.16774C4.92293 0.590881 4.68814 0.675167 4.51503 0.825196C4.34192 0.975225 4.24467 1.17871 4.24467 1.39088H1.0139ZM3.78313 4.59088C3.90554 4.59088 4.02293 4.63302 4.10948 4.70804C4.19604 4.78305 4.24467 4.88479 4.24467 4.99088V10.5909C4.24467 10.697 4.19604 10.7987 4.10948 10.8737C4.02293 10.9487 3.90554 10.9909 3.78313 10.9909C3.66072 10.9909 3.54333 10.9487 3.45677 10.8737C3.37022 10.7987 3.32159 10.697 3.32159 10.5909V4.99088C3.32159 4.88479 3.37022 4.78305 3.45677 4.70804C3.54333 4.63302 3.66072 4.59088 3.78313 4.59088ZM6.09082 4.59088C6.21323 4.59088 6.33062 4.63302 6.41718 4.70804C6.50373 4.78305 6.55236 4.88479 6.55236 4.99088V10.5909C6.55236 10.697 6.50373 10.7987 6.41718 10.8737C6.33062 10.9487 6.21323 10.9909 6.09082 10.9909C5.96841 10.9909 5.85102 10.9487 5.76446 10.8737C5.67791 10.7987 5.62928 10.697 5.62928 10.5909V4.99088C5.62928 4.88479 5.67791 4.78305 5.76446 4.70804C5.85102 4.63302 5.96841 4.59088 6.09082 4.59088ZM8.86005 4.99088V10.5909C8.86005 10.697 8.81143 10.7987 8.72487 10.8737C8.63831 10.9487 8.52092 10.9909 8.39851 10.9909C8.27611 10.9909 8.15871 10.9487 8.07216 10.8737C7.9856 10.7987 7.93697 10.697 7.93697 10.5909V4.99088C7.93697 4.88479 7.9856 4.78305 8.07216 4.70804C8.15871 4.63302 8.27611 4.59088 8.39851 4.59088C8.52092 4.59088 8.63831 4.63302 8.72487 4.70804C8.81143 4.78305 8.86005 4.88479 8.86005 4.99088Z" fill="#F1F1F1" />
                        </svg>
                    </button> {/* delete */}
                </div>
            </div>
        </div>
    );
};

export default PartyPortrait;