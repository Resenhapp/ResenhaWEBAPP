<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

//header('Access-Control-Allow-Origin: https://www.resenha.app');

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

elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $validParams = array(
        'userid',
        'user@',
        'useremail',
        'userbalanceid',
        'party',
        'usersfromparty',
        'conciergesfromparty',
        'useractivityid',
        'partiesfromuserid',
        'allparties', 
        'allusers'
    );

    $requestedParam = null;

    foreach ($validParams as $param) {
        if (isset($_GET[$param])) {
            $requestedParam = $param;
            break;
        }
    }

    if ($requestedParam !== null) {
        switch ($requestedParam) {
            case 'userid':
            case 'user@':
            case 'useremail':
            case 'userbalanceid':
            case 'party':
                getSingleDataDiscord();
                break;
            case 'usersfromparty':
                getUsersFromParty();
                break;
            case 'conciergesfromparty':
                getConciergesFromParty();
                break;
            case 'useractivityid':
                getUserActivityDiscord();
                break;
            case 'partiesfromuserid':
                getPartiesFromUser();
                break;
            case 'allparties':
                getAllParties();
                break;
            case 'allusers':
                getAllUsers();
                break;
        }
    } 
    
    else {
        $errorData = array('error' => 'No valid param provided');
        echo json_encode($errorData);
    }
} 

else {
    returnError("invalid_request");
}

?>
