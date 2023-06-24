<?php

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