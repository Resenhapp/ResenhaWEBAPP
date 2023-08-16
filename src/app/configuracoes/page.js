"use client";

import PageHeader from "@/src/components/PageHeader";
import ButtonConfig from "@/src/components/ButtonConfig";
import SearchInput from "@/src/components/SearchInput";
import React from "react";
import Cookies from "js-cookie";

export default function Settings() {
  const handleNavigation = (pageToGo) => {
    if (typeof window !== "undefined") {
      window.location.href = `/configuracoes/${pageToGo}`;
    }
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <PageHeader pageTitle={"Configurações"} />
      <div className="flex flex-col flex-grow justify-items-center items-center p-4 space-y-2">
        <ButtonConfig
          label="Conta"
          action={() => handleNavigation("/conta")}
          rightIcon={"arrowRight06"}
          leftIcon={"user02"}
          textAlign="left"
        />
        <ButtonConfig
          label="Segurança"
          action={() => handleNavigation("/seguranca")}
          rightIcon={"arrowRight06"}
          leftIcon={"shield02"}
          textAlign="left"
        />
        <ButtonConfig
          label="Pagamentos"
          action={() => handleNavigation("/pagamentos")}
          rightIcon={"arrowRight06"}
          leftIcon={"money02"}
          textAlign="left"
        />
        <div className="flex-grow" />
        <div className="flex flex-col justify-items-center items-center p-6">
          <ButtonConfig
            label="Sair"
            action={handleLogOut}
            rightIcon={"arrowRight06"}
            leftIcon={"user02"}
            textAlign="left"
          />
        </div>
      </div>
    </div>
  );
}
