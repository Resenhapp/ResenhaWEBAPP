'use client'

import InputField from '@/src/components/InputField';
import PasswordField from '@/src/components/PasswordField';
import Button from '@/src/components/Button';
import GoogleButton from '@/src/components/GoogleButton';
import Toggle from '@/src/components/Toggle';
import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import RegisterPageComponent from '@/src/components/RegisterPageComponent';

export default function Cadastro() {

  return (
    <RegisterPageComponent />
  );
}
