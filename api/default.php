<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

include "functions.php";

if (isset($_POST['request'])) {
  $request = sanitize($_POST['request']);

  if (checkRequest(($request))) {
    $request();
  }
  
  else {
    returnError("invalid_request");
  }
}

else {
  returnError("no_request");
}

?>