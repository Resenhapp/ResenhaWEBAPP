<?php

define("GLOBAL_APIKEY", "LN8z62TNVsZdb4oBXIc8mdT4");
define("GLOBAL_ENCKEY", "lifeisaparty");
define("GLOBAL_REDIRECT", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
define("GLOBAL_PAGARMEKEY", "c2tfdGVzdF93WVFNZ3Z2aDU1VVBHSzV6Og=="); // testes c2tfdGVzdF93WVFNZ3Z2aDU1VVBHSzV6Og== // producao c2tfcU5ENEpOMERpMkk0R205Qjo=

define("DB_SERVER", "154.56.47.103");
define("DB_NAME", "u878630845_resenhadb");
define("DB_USERNAME", "u878630845_resenhadb");
define("DB_PASSWORD", "kXiHdsMv7g$0");

date_default_timezone_set('America/Sao_Paulo');

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
$iv = chr(0x1) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);

$public = [
    "getInviteData",
    "getUserData",
    "getHelpData",
    "getFeedData",
    "getMessages",
    "getConciergeData",
    "getTransactionInfo",
    "tryToDeleteConcierge",
    "tryToCreateGuest",
    "tryToCreateConcierge",
    "tryToSendMessage",
    "tryToWithdraw",
    "tryToAuthenticate",
    "tryToCreateUser",
    "tryToUploadUserImage",
    "tryToUploadEventImage",
    "tryToClickOnEvent",
    "tryToCreateEvent",
    "tryToDeleteEvent",
    "tryToAllowGuest",
    "editUserData",
    "editEventData",
    "editConciergeData",
    "clearUserNotifications",
    "seeUserNotifications",
    "switchFollowUser",
    "switchSaveEvent"
];

$private = [
    "tryToEditWithdraw"
];

?>