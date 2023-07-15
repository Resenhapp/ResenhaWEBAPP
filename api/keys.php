<?php

define("DB_SERVER", "31.170.160.154");
define("DB_NAME", "u878630845_resenhadb");
define("DB_USERNAME", "u878630845_resenhadb");
define("DB_PASSWORD", "kXiHdsMv7g$0");

global $enckey;

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
$iv = chr(0x1).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0).chr(0x0);

$method = 'aes-256-cbc';
$enckey = 'lifeisaparty';

$root_directory = $_SERVER['DOCUMENT_ROOT'];

$requests = [
  "getInviteData",
  "getUserData",
  "getHelpData",
  "getFeedData",
  "tryToCreateGuest",
  "tryToAuthenticate",
  "tryToCreateUser",
  "clearUserNotifications",
  "seeUserNotifications",
  "switchFollowUser",
  "sendMessage",
  "getMessages",
];

if ($root_directory == "C:/xampp/htdocs") {
  $pagarmeKey = "c2tfdGVzdF93WVFNZ3Z2aDU1VVBHSzV6Og==";
}

else {
  $pagarmeKey = "c2tfcU5ENEpOMERpMkk0R205Qjo=";
}

?>