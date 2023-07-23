<?php

header('Access-Control-Allow-Origin: http://localhost/');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

include "functions.php";

if (isset($_POST['request'])) {
    $request = sanitize($_POST['request']);

    if (checkPublicRequest(($request))) {
        $request();
    }

    elseif (checkPrivateRequest($request)) {
        $privateKey = sanitize($_POST["key"]);

        if ($privateKey == GLOBAL_APIKEY) {
            $request();
        }
    }

    else {
        returnError("invalid_request");
    }
} 

else {
    returnError("no_request");
}

?>