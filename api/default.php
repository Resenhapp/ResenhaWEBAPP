<?php

header('Access-Control-Allow-Origin: https://www.resenha.app');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

include "functions.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['request'])) {
        $request = sanitize($_POST['request']);

        if (checkPublicRequest($request) || (checkPrivateRequest($request) && sanitize($_POST["key"]) == GLOBAL_APIKEY)) {
            $request();
        } 
        
        else {
            returnError("invalid_request");
        }
    } 
    
    else {
        returnError("no_request");
    }
} 

else {
    returnError("invalid_request");
}

?>
