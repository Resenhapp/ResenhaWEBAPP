<?php

define("GLOBAL_API_KEY", "LN8z62TNVsZdb4oBXIc8mdT4");

define("DB_SERVER", "31.170.160.154");
define("DB_NAME", "u878630845_resenhadb");
define("DB_USERNAME", "u878630845_resenhadb");
define("DB_PASSWORD", "kXiHdsMv7g$0");

define("GLOBAL_ENCKEY", "lifeisaparty");

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
$iv = chr(0x1) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);

$root_directory = $_SERVER['DOCUMENT_ROOT'];

$public = [
    "getInviteData",
    "getUserData",
    "getHelpData",
    "getFeedData",
    "getMessages",
    "tryToCreateGuest",
    "tryToWithdraw",
    "tryToAuthenticate",
    "tryToCreateUser",
    "tryToCreateEvent",
    "tryToDeleteEvent",
    "editUserData",
    "clearUserNotifications",
    "seeUserNotifications",
    "switchFollowUser",
    "switchSaveEvent",
    "sendMessage"
];

if ($root_directory == "C:/xampp/htdocs") {
    $pagarmeKey = "c2tfdGVzdF93WVFNZ3Z2aDU1VVBHSzV6Og==";
} 

else {
    $pagarmeKey = "c2tfcU5ENEpOMERpMkk0R205Qjo=";
}

?>