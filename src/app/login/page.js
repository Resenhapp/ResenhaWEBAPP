'use client'

import InputField from '@/src/components/InputField';
import PasswordField from '@/src/components/PasswordField';
import Button from '@/src/components/Button';
import GoogleButton from '@/src/components/GoogleButton';
import Toggle from '@/src/components/Toggle';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const metadata = {
  title: 'Resenha.app • Login',
  description: 'Venha fazer suas resenhas!',
}

export default function Login() {
  const axios = require('axios');
  const qs = require('qs');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await makeRequest('http://localhost/resenha.app/api/', { request: 'tryToAuthenticate', email: email, password: password });

      if (response.user && response.validator) {
        Cookies.set('user', response.user);
        Cookies.set('validator', response.validator);
      }

      else {
        console.log(response);
      } 
    }
    
    catch (error) {
      console.error(error);
    }
  };

  const makeRequest = async (url, data) => {
    try {
      const response = await axios.post(url, qs.stringify(data));
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <section className="flex flex-col items-center w-full max-w-md p-4">
        <div className="mb-16">
          <svg width="275" height="43" viewBox="0 0 275 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 33.4444V0H14.7683C16.9058 0 18.7681 0.366296 20.355 1.09889C21.942 1.83148 23.1727 2.86667 24.0471 4.20444C24.9215 5.54222 25.3588 7.11889 25.3588 8.93445V9.50778C25.3588 11.5144 24.873 13.1389 23.9014 14.3811C22.9298 15.6233 21.7315 16.5311 20.3064 17.1044V17.9644C21.6019 18.0281 22.6059 18.4741 23.3184 19.3022C24.0309 20.0985 24.3872 21.1656 24.3872 22.5033V33.4444H17.9746V23.4111C17.9746 22.6467 17.7641 22.0256 17.3431 21.5478C16.9544 21.07 16.2905 20.8311 15.3513 20.8311H6.41256V33.4444H0ZM6.41256 15.0978H14.0882C15.6104 15.0978 16.7925 14.6996 17.6345 13.9033C18.509 13.0752 18.9462 11.9922 18.9462 10.6544V10.1767C18.9462 8.83889 18.5252 7.77185 17.6831 6.97556C16.8411 6.14741 15.6428 5.73333 14.0882 5.73333H6.41256V15.0978Z" fill="#F1F1F1" />
            <path d="M39.439 34.1133C37.0424 34.1133 34.9211 33.6196 33.075 32.6322C31.2614 31.613 29.8363 30.1956 28.8 28.38C27.796 26.5326 27.294 24.3667 27.294 21.8822V21.3089C27.294 18.8244 27.796 16.6744 28.8 14.8589C29.804 13.0115 31.2128 11.5941 33.0264 10.6067C34.8401 9.58741 36.9452 9.07778 39.3418 9.07778C41.7061 9.07778 43.7626 9.60333 45.5115 10.6544C47.2604 11.6737 48.6206 13.107 49.5922 14.9544C50.5638 16.77 51.0496 18.8881 51.0496 21.3089V23.3633H33.5122C33.577 24.9878 34.1924 26.3096 35.3583 27.3289C36.5242 28.3481 37.9492 28.8578 39.6333 28.8578C41.3498 28.8578 42.6129 28.4915 43.4226 27.7589C44.2322 27.0263 44.8476 26.2141 45.2686 25.3222L50.2723 27.9022C49.8189 28.7304 49.155 29.6381 48.2806 30.6256C47.4385 31.5811 46.305 32.4093 44.88 33.11C43.4549 33.7789 41.6413 34.1133 39.439 34.1133ZM33.5608 18.8722H44.8314C44.7018 17.5026 44.1351 16.4037 43.1311 15.5756C42.1595 14.7474 40.8802 14.3333 39.2933 14.3333C37.6415 14.3333 36.3299 14.7474 35.3583 15.5756C34.3867 16.4037 33.7875 17.5026 33.5608 18.8722Z" fill="#F1F1F1" />
            <path d="M64.0763 34.1133C60.9348 34.1133 58.36 33.4444 56.352 32.1067C54.3441 30.7689 53.1296 28.8578 52.7085 26.3733L58.3438 24.94C58.5705 26.0548 58.943 26.9307 59.4612 27.5678C60.0117 28.2048 60.6757 28.6667 61.4529 28.9533C62.2626 29.2081 63.137 29.3356 64.0763 29.3356C65.5013 29.3356 66.5539 29.0967 67.234 28.6189C67.9141 28.1093 68.2541 27.4881 68.2541 26.7556C68.2541 26.023 67.9303 25.4656 67.2825 25.0833C66.6348 24.6693 65.5984 24.3348 64.1734 24.08L62.8132 23.8411C61.1291 23.5226 59.5907 23.0926 58.1981 22.5511C56.8055 21.9778 55.6881 21.1974 54.8461 20.21C54.004 19.2226 53.583 17.9485 53.583 16.3878C53.583 14.0307 54.4574 12.2311 56.2063 10.9889C57.9552 9.71482 60.2546 9.07778 63.1047 9.07778C65.7928 9.07778 68.0274 9.66704 69.8087 10.8456C71.59 12.0241 72.7559 13.5689 73.3065 15.48L67.6226 17.2C67.3635 15.9896 66.8291 15.1296 66.0195 14.62C65.2422 14.1104 64.2706 13.8556 63.1047 13.8556C61.9387 13.8556 61.0481 14.0626 60.4328 14.4767C59.8174 14.8589 59.5097 15.4004 59.5097 16.1011C59.5097 16.8656 59.8336 17.4389 60.4813 17.8211C61.1291 18.1715 62.0035 18.4422 63.1047 18.6333L64.4649 18.8722C66.2786 19.1907 67.9141 19.6207 69.3715 20.1622C70.8613 20.6719 72.0272 21.4204 72.8692 22.4078C73.7437 23.3633 74.1809 24.6693 74.1809 26.3256C74.1809 28.81 73.2579 30.737 71.4118 32.1067C69.5982 33.4444 67.153 34.1133 64.0763 34.1133Z" fill="#F1F1F1" />
            <path d="M88.0949 34.1133C85.6983 34.1133 83.577 33.6196 81.7309 32.6322C79.9173 31.613 78.4923 30.1956 77.4559 28.38C76.4519 26.5326 75.9499 24.3667 75.9499 21.8822V21.3089C75.9499 18.8244 76.4519 16.6744 77.4559 14.8589C78.4599 13.0115 79.8687 11.5941 81.6823 10.6067C83.496 9.58741 85.6011 9.07778 87.9977 9.07778C90.362 9.07778 92.4185 9.60333 94.1674 10.6544C95.9163 11.6737 97.2765 13.107 98.2481 14.9544C99.2197 16.77 99.7055 18.8881 99.7055 21.3089V23.3633H82.1681C82.2329 24.9878 82.8483 26.3096 84.0142 27.3289C85.1801 28.3481 86.6051 28.8578 88.2892 28.8578C90.0057 28.8578 91.2688 28.4915 92.0785 27.7589C92.8881 27.0263 93.5035 26.2141 93.9245 25.3222L98.9282 27.9022C98.4748 28.7304 97.8109 29.6381 96.9365 30.6256C96.0944 31.5811 94.9609 32.4093 93.5359 33.11C92.1109 33.7789 90.2972 34.1133 88.0949 34.1133ZM82.2167 18.8722H93.4873C93.3577 17.5026 92.791 16.4037 91.787 15.5756C90.8154 14.7474 89.5361 14.3333 87.9492 14.3333C86.2974 14.3333 84.9858 14.7474 84.0142 15.5756C83.0426 16.4037 82.4434 17.5026 82.2167 18.8722Z" fill="#F1F1F1" />
            <path d="M102.725 33.4444V9.74667H108.749V12.8522H109.623C110.012 12.0241 110.74 11.2437 111.809 10.5111C112.878 9.74667 114.497 9.36445 116.667 9.36445C118.546 9.36445 120.181 9.79445 121.574 10.6544C122.999 11.4826 124.1 12.6452 124.877 14.1422C125.654 15.6074 126.043 17.3274 126.043 19.3022V33.4444H119.922V19.78C119.922 17.9963 119.469 16.6585 118.562 15.7667C117.687 14.8748 116.424 14.4289 114.773 14.4289C112.894 14.4289 111.437 15.05 110.4 16.2922C109.364 17.5026 108.846 19.2067 108.846 21.4044V33.4444H102.725Z" fill="#F1F1F1" />
            <path d="M130.231 33.4444V0H136.352V12.6611H137.227C137.486 12.1515 137.891 11.6419 138.441 11.1322C138.992 10.6226 139.721 10.2085 140.627 9.89C141.567 9.53963 142.749 9.36445 144.174 9.36445C146.052 9.36445 147.688 9.79445 149.08 10.6544C150.505 11.4826 151.606 12.6452 152.384 14.1422C153.161 15.6074 153.55 17.3274 153.55 19.3022V33.4444H147.429V19.78C147.429 17.9963 146.975 16.6585 146.068 15.7667C145.194 14.8748 143.931 14.4289 142.279 14.4289C140.401 14.4289 138.943 15.05 137.907 16.2922C136.87 17.5026 136.352 19.2067 136.352 21.4044V33.4444H130.231Z" fill="#F1F1F1" />
            <path d="M165.219 34.1133C163.503 34.1133 161.964 33.8267 160.604 33.2533C159.244 32.6481 158.159 31.7881 157.349 30.6733C156.572 29.5267 156.183 28.1411 156.183 26.5167C156.183 24.8922 156.572 23.5385 157.349 22.4556C158.159 21.3407 159.26 20.5126 160.653 19.9711C162.078 19.3978 163.697 19.1111 165.511 19.1111H172.117V17.7733C172.117 16.6585 171.761 15.7507 171.049 15.05C170.336 14.3174 169.203 13.9511 167.648 13.9511C166.126 13.9511 164.992 14.3015 164.247 15.0022C163.503 15.6711 163.017 16.547 162.79 17.63L157.155 15.7667C157.543 14.5563 158.159 13.4574 159.001 12.47C159.875 11.4507 161.025 10.6385 162.45 10.0333C163.907 9.3963 165.672 9.07778 167.745 9.07778C170.919 9.07778 173.429 9.85815 175.275 11.4189C177.121 12.9796 178.044 15.2411 178.044 18.2033V27.0422C178.044 27.9978 178.498 28.4756 179.404 28.4756H181.348V33.4444H177.267C176.069 33.4444 175.081 33.1578 174.304 32.5844C173.526 32.0111 173.138 31.2467 173.138 30.2911V30.2433H172.215C172.085 30.6256 171.794 31.1352 171.34 31.7722C170.887 32.3774 170.174 32.9189 169.203 33.3967C168.231 33.8744 166.903 34.1133 165.219 34.1133ZM166.288 29.24C168.004 29.24 169.397 28.7782 170.466 27.8544C171.567 26.8989 172.117 25.6407 172.117 24.08V23.6022H165.948C164.814 23.6022 163.924 23.8411 163.276 24.3189C162.628 24.7967 162.304 25.4656 162.304 26.3256C162.304 27.1856 162.644 27.8863 163.324 28.4278C164.005 28.9693 164.992 29.24 166.288 29.24Z" fill="#F1F1F1" />
            <path d="M187.232 34.1133C185.936 34.1133 184.835 33.6993 183.928 32.8711C183.054 32.0111 182.617 30.9122 182.617 29.5744C182.617 28.2367 183.054 27.1537 183.928 26.3256C184.835 25.4656 185.936 25.0356 187.232 25.0356C188.56 25.0356 189.661 25.4656 190.535 26.3256C191.41 27.1537 191.847 28.2367 191.847 29.5744C191.847 30.9122 191.41 32.0111 190.535 32.8711C189.661 33.6993 188.56 34.1133 187.232 34.1133Z" fill="#F1F1F1" />
            <path d="M202.916 34.1133C201.2 34.1133 199.661 33.8267 198.301 33.2533C196.941 32.6481 195.856 31.7881 195.046 30.6733C194.269 29.5267 193.88 28.1411 193.88 26.5167C193.88 24.8922 194.269 23.5385 195.046 22.4556C195.856 21.3407 196.957 20.5126 198.35 19.9711C199.775 19.3978 201.394 19.1111 203.208 19.1111H209.814V17.7733C209.814 16.6585 209.458 15.7507 208.746 15.05C208.033 14.3174 206.9 13.9511 205.345 13.9511C203.823 13.9511 202.689 14.3015 201.944 15.0022C201.2 15.6711 200.714 16.547 200.487 17.63L194.852 15.7667C195.24 14.5563 195.856 13.4574 196.698 12.47C197.572 11.4507 198.722 10.6385 200.147 10.0333C201.604 9.3963 203.369 9.07778 205.442 9.07778C208.616 9.07778 211.126 9.85815 212.972 11.4189C214.818 12.9796 215.741 15.2411 215.741 18.2033V27.0422C215.741 27.9978 216.195 28.4756 217.101 28.4756H219.045V33.4444H214.964C213.766 33.4444 212.778 33.1578 212 32.5844C211.223 32.0111 210.835 31.2467 210.835 30.2911V30.2433H209.912C209.782 30.6256 209.491 31.1352 209.037 31.7722C208.584 32.3774 207.871 32.9189 206.9 33.3967C205.928 33.8744 204.6 34.1133 202.916 34.1133ZM203.985 29.24C205.701 29.24 207.094 28.7782 208.163 27.8544C209.264 26.8989 209.814 25.6407 209.814 24.08V23.6022H203.645C202.511 23.6022 201.621 23.8411 200.973 24.3189C200.325 24.7967 200.001 25.4656 200.001 26.3256C200.001 27.1856 200.341 27.8863 201.021 28.4278C201.702 28.9693 202.689 29.24 203.985 29.24Z" fill="#F1F1F1" />
            <path d="M221.091 43V9.74667H227.115V12.6133H227.989C228.54 11.6896 229.398 10.8774 230.564 10.1767C231.73 9.44407 233.398 9.07778 235.568 9.07778C237.511 9.07778 239.309 9.55556 240.96 10.5111C242.612 11.4348 243.94 12.8044 244.944 14.62C245.948 16.4356 246.45 18.6333 246.45 21.2133V21.9778C246.45 24.5578 245.948 26.7556 244.944 28.5711C243.94 30.3867 242.612 31.7722 240.96 32.7278C239.309 33.6515 237.511 34.1133 235.568 34.1133C234.11 34.1133 232.88 33.9382 231.876 33.5878C230.904 33.2693 230.111 32.8552 229.495 32.3456C228.912 31.8041 228.443 31.2626 228.087 30.7211H227.212V43H221.091ZM233.722 28.8578C235.633 28.8578 237.203 28.2685 238.434 27.09C239.697 25.8796 240.329 24.1278 240.329 21.8344V21.3567C240.329 19.0633 239.697 17.3274 238.434 16.1489C237.171 14.9385 235.6 14.3333 233.722 14.3333C231.843 14.3333 230.273 14.9385 229.01 16.1489C227.746 17.3274 227.115 19.0633 227.115 21.3567V21.8344C227.115 24.1278 227.746 25.8796 229.01 27.09C230.273 28.2685 231.843 28.8578 233.722 28.8578Z" fill="#F1F1F1" />
            <path d="M249.641 43V9.74667H255.665V12.6133H256.54C257.09 11.6896 257.948 10.8774 259.114 10.1767C260.28 9.44407 261.948 9.07778 264.118 9.07778C266.061 9.07778 267.859 9.55556 269.51 10.5111C271.162 11.4348 272.49 12.8044 273.494 14.62C274.498 16.4356 275 18.6333 275 21.2133V21.9778C275 24.5578 274.498 26.7556 273.494 28.5711C272.49 30.3867 271.162 31.7722 269.51 32.7278C267.859 33.6515 266.061 34.1133 264.118 34.1133C262.661 34.1133 261.43 33.9382 260.426 33.5878C259.454 33.2693 258.661 32.8552 258.046 32.3456C257.463 31.8041 256.993 31.2626 256.637 30.7211H255.762V43H249.641ZM262.272 28.8578C264.183 28.8578 265.754 28.2685 266.984 27.09C268.247 25.8796 268.879 24.1278 268.879 21.8344V21.3567C268.879 19.0633 268.247 17.3274 266.984 16.1489C265.721 14.9385 264.15 14.3333 262.272 14.3333C260.394 14.3333 258.823 14.9385 257.56 16.1489C256.297 17.3274 255.665 19.0633 255.665 21.3567V21.8344C255.665 24.1278 256.297 25.8796 257.56 27.09C258.823 28.2685 260.394 28.8578 262.272 28.8578Z" fill="#F1F1F1" />
          </svg>

        </div>
        <div className="flex flex-col mb-0 w-full">
          <h2 className="text-2xl text-whiteT1 font-bold mb-2">Login</h2>
          <div className="flex flex-col mb-4 gap-4 w-full">
            <InputField placeholder="Email" showIcon={true} Icon="mail" value={email} action={handleEmailChange} />
            <PasswordField placeholder="Senha" showIcon={true} value={password} action={handlePasswordChange} />
          </div>
        </div>
        <div className="flex-row flex gap-3 items-center mb-4 w-full">
          <Toggle labelText="Lembre-se de mim" showLabel={true} startToggled={true} />
          <Link href="/recuperacao" className="ml-auto flex-none text-sm font-bold">Esqueceu a senha?</Link>
        </div>

        <div className="flex flex-col mb-4 w-full">
          <Button action={handleClick} label="Entrar" icon="arrow" />
        </div>

        <div className="flex flex-col mb-2 mt-10 w-full">
          <h1 className="text-center text-sm font-regular mb-0">Ou</h1>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <GoogleButton context="Entrar com Google" />
        </div>

        <div className="flex items-center justify-end">
          <p className="mr-1">Ainda não tem uma conta?</p>
          <Link href="/cadastro" className="font-bold">Crie uma!</Link>
        </div>
      </section>
    </div>
  );
  }
