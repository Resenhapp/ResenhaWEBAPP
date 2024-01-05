<?php 

include "functions.php";

$body = file_get_contents('php://input');

if (isset($body)) {
    $data = json_decode($body, true);

    if ($data['type'] === 'order.paid') {
        $charges = $data['data']['charges'];
        $chargeId = $charges[0]['id'];
    
        $query = "SELECT * FROM guests WHERE charge = '$chargeId'";
        $chInfo = queryDBRows($query);

        if (mysqli_num_rows($chInfo) > 0) {
            foreach ($chInfo as $row) {
                $id = $row["id"];
                $paid = $row["paid"];
            }

            if ($paid != '1') {
                $query = "UPDATE guests SET paid = '1' WHERE id = '$id'";
                queryNR($query);
        
                $query = "SELECT * FROM guests WHERE id = '$id'";
                $info = queryDBRows($query);

                if (mysqli_num_rows($info) > 0) {
                    foreach ($info as $row) {
                        $party = $row["party"];
                        $code = $row["code"];
                        $name = $row["name"];
                        $email = $row["email"];
                    }
                }

                $query = "SELECT * FROM parties WHERE code = '$party'";
                $hostInfo = queryDBRows($query);

                if (mysqli_num_rows($hostInfo) > 0) {
                    foreach ($hostInfo as $column) {
                        $hostId = $column["id"];
                        $hostTax = $column["tax"];
                    }
                }
                
                $value = $charges[0]['paid_amount'] / 100;

                $valueAfterTax = (($value * ((100 - $hostTax ) / 100)));
        
                if (($valueAfterTax - $value) <= -1) {
                    $value = $valueAfterTax;
                }
                
                else {
                    $value = $value - 1;
                }

                updateBalance($hostId, $value);

                createNotification(
                    $hostId, 
                    "Resenha criada!", 
                    "$name foi criada com sucesso."
                );
    
                // send_email('Resenha.app', 'noreply@resenha.app', $email, $name, 'VEM PRA RESENHA!', 'ynrw7gy67pnl2k8e', $code);
            }
        }
    }
}

?>