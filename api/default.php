<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
// header('Access-Control-Allow-Origin: https://www.resenha.app');
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
    if (isset($_GET['userid'])) {
        getSingleDataDiscord();
    } elseif (isset($_GET['user@'])) {
        getSingleDataDiscord();
    } elseif (isset($_GET['useremail'])) {
        getSingleDataDiscord();
    } elseif (isset($_GET['userbalanceid'])) {
        getSingleDataDiscord();
    } elseif (isset($_GET['party'])) {
        getSingleDataDiscord();
    } elseif (isset($_GET['usersfromparty'])) {
        getUsersFromParty();
    } elseif (isset($_GET['conciergesfromparty'])) {
        getConciergesFromParty();
    } elseif (isset($_GET['useractivityid'])) {
        getUserActivityDiscord();
    } elseif (isset($_GET['partiesfromuserid'])) {
        getPartiesFromUser();
    }
     else {
        $errorData = array('error' => 'No valid param provided');
        echo json_encode($errorData);
    }
} else {
    returnError("invalid_request");
}
?>
