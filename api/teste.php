<?php

include "functions.php";

function tryToWithdraw2($token, $amount)
{
    $userData = check_session($token);

    foreach ($userData as $column) {
        $id = $column["id"];
        $name = $column["name"];
        $email = $column["email"];

        $amount = floatval($amount);

        $query = "SELECT * FROM balances WHERE user = '$id'";
        $result = queryDBRows($query);

        if (mysqli_num_rows($result) > 0) {
            foreach ($result as $row) {
                $available = $row["available"];
                $requested = $row["requested"];
                $retained = $row["retained"];
                $processing = $row["processing"];
            }
        }

        if ($amount <= $available && $amount >= 50.00) {
            $newRequested = $requested + $amount;
            $newAvailable = $available - $amount;

            $query = "UPDATE balances SET requested = $newRequested, available = $newAvailable WHERE user = '$id'";
            queryNR($query);

            $embed = [
                'title' => 'Novo saque solicitado!',
                'color' => hexdec('7d00ff'),
                'fields' => [
                    [
                        "name" => "ID do usuário",
                        "value" => $id,
                    ],
                    [
                        "name" => "Nome",
                        "value" => $name,
                    ],
                    [
                        "name" => "Email",
                        "value" => $email,
                    ],
                    [
                        "name" => "Saldo Atual",
                        "value" => "R$ " . number_format($newAvailable, 2, ',', '.'),
                    ],
                    [
                        "name" => "Saldo em Processamento",
                        "value" => "R$ " . $processing,
                    ],
                    [
                        "name" => "Saldo Retido",
                        "value" => "R$ " . $retained,
                    ],
                    [
                        "name" => "Saldo Solicitado",
                        "value" => "R$ " . $newRequested,
                    ],
                    [
                        "name" => "Valor da Solicitação",
                        "value" => "R$ " . number_format($amount, 2, ',', '.'),
                    ],
                ],
            ];

            $webhook = "https://discord.com/api/webhooks/1116575716646068254/xAmqlhC3WpinvTw-HI5hdbom6-FA94YuY1v5NEUONTSXwroXTwA3PgaqTazIxezTFGn7";

            send_message($embed, $webhook);
        } else {
            returnError("insufficient_balance");
        }
    }
}

tryToWithdraw2("2uajdBf8JGlpN99+yXPpZYh2l4dYKrEnN+1HvROJwcd9hFJINNakoDsgXe6hVA4RLVstLUlWLVstXjPxBpLJ49t44bE0Qnb1yg==", 50.00);

?>