<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

include "functions.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['request'])) {
        $request = sanitize($_POST['request']);

        if (checkPublicRequest($request)) {
            $request();
        } elseif (checkPrivateRequest($request)) {
            $privateKey = sanitize($_POST["key"]);

            if ($privateKey == GLOBAL_APIKEY) {
                $request();
            }
        } else {
            returnError("invalid_request");
        }
    } else {
        returnError("no_request");
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Verifica se a chave "userid" está presente na solicitação GET
    if (isset($_GET['userid'])) {
        // Chama a função para retornar os dados do usuário em formato JSON
        getUserDataDiscord();
    } elseif (isset($_GET['user@'])) {
        getUserDataDiscord();
    } elseif (isset($_GET['useremail'])) {
        getUserDataDiscord();
    } elseif (isset($_GET['userbalanceid'])) {
        getUserDataDiscord();
    } elseif (isset($_GET['party'])) {
        getPartyDataDiscord();
    } elseif (isset($_GET['usersfromparty'])) {
        getUsersFromParty();
    } elseif (isset($_GET['conciergesfromparty'])) {
        getConciergesFromParty();
    } elseif (isset($_GET['useractivityid'])) {
        getUserActivityDiscord();
    }
     else {
        // Caso a chave "userid" não seja fornecida, retorna um erro em JSON
        $errorData = array('error' => 'No valid param provided');
        echo json_encode($errorData);
    }
} else {
    // Retorna um erro se a solicitação não for POST nem GET
    returnError("invalid_request");
}
?>
