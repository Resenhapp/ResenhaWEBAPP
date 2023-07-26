<?php

include "keys.php";

function queryDB($query)
{
    global $link;
    $result = $link->query($query);
    $row = mysqli_fetch_array($result);

    return $row;
}

function queryDBDiscord($query)
{
    global $link;
    $result = $link->query($query);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC); // Adicione o parâmetro MYSQLI_ASSOC aqui

    return $row;
}

function queryNR($query)
{
    global $link;
    mysqli_query($link, $query);

}

function queryDBRows($query)
{
    global $link;
    $result = $link->query($query);
    return $result;
}

function hash256($string)
{
    $string = strval($string);
    $hash = hash("sha256", $string);
    return $hash;
}

function sanitize($s)
{
    return filter_var($s, FILTER_SANITIZE_STRING);
}

function decrypt($text, $pkey)
{
    $key = substr($pkey, 0, 16);
    $text = base64_decode($text);
    $IV = substr($text, strrpos($text, "-[--IV-[-") + 9);
    $text = str_replace("-[--IV-[-" . $IV, "", $text);

    return rtrim(openssl_decrypt($text, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $IV), "\0");
}

function encrypt($text, $pkey)
{
    $key = substr($pkey, 0, 16);
    $IV = openssl_random_pseudo_bytes(openssl_cipher_iv_length("AES-256-CBC"));

    return base64_encode(openssl_encrypt($text, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $IV) . "-[--IV-[-" . $IV);
}

function convertMonth($month)
{
    $months = [
        '01' => 'Janeiro',
        '02' => 'Fevereiro',
        '03' => 'Março',
        '04' => 'Abril',
        '05' => 'Maio',
        '06' => 'Junho',
        '07' => 'Julho',
        '08' => 'Agosto',
        '09' => 'Setembro',
        '10' => 'Outubro',
        '11' => 'Novembro',
        '12' => 'Dezembro',
    ];

    return $months[$month];
}

function getDayOfWeek($dateString)
{
    $date = DateTime::createFromFormat('d/m/Y', $dateString);
    $dayOfWeek = $date->format('l');

    $dayNames = [
        'Sunday' => 'Domingo',
        'Monday' => 'Segunda-feira',
        'Tuesday' => 'Terça-feira',
        'Wednesday' => 'Quarta-feira',
        'Thursday' => 'Quinta-feira',
        'Friday' => 'Sexta-feira',
        'Saturday' => 'Sábado',
    ];

    return $dayNames[$dayOfWeek] ?? $dayOfWeek;
}

function redirect($url = GLOBAL_REDIRECT) {
    header("Location: $url");
}

function checkEmail($email)
{
    if (strlen($email) < 5) {
        return "short_email";
    }

    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = queryDBRows($query);

    $num_rows = mysqli_num_rows($result);

    if ($num_rows > 0) {
        return "email_registered";
    }
}

function checkCpf($cpf)
{
    $query = "SELECT * FROM users WHERE cpf = '$cpf'";
    $result = queryDBRows($query);
    $num_rows = mysqli_num_rows($result);

    if ($num_rows > 0) {
        return "cpf_registered";
    }
}

function checkPassword($password)
{
    if (strlen($password) < 8) {
        return "small_password";
    } 
    
    elseif (!preg_match("/[0-9]/", $password)) {
        return "numeric_password";
    } 
    
    elseif (!preg_match("/[a-zA-Z]/", $password)) {
        return "alphabetic_password";
    } 
    
    elseif (!preg_match("/[!@#$%^&*()\-_=+{};:,<.>]/", $password)) {
        return "special_password";
    }
}

function randomCode($length)
{
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $charactersLength = strlen($characters);
    $code = '';

    for ($i = 0; $i < $length; $i++) {
        $randomIndex = random_int(0, $charactersLength - 1);
        $code .= $characters[$randomIndex];
    }

    return $code;
}

function randomKey()
{
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    $charactersLength = strlen($characters);
    $key = '';

    for ($i = 0; $i < 32; $i++) {
        $randomIndex = random_int(0, $charactersLength - 1);
        $key .= $characters[$randomIndex];
    }

    return $key;
}

function registerLog($user, $type, $action, $description = "none")
{
    $variables = [ &$user, &$type, &$action, &$description];

    foreach ($variables as &$var) {
        $var = sanitize($var);
    }

    date_default_timezone_set('America/Sao_Paulo');
    $date = date('d/m/Y H:i');

    $query = "INSERT INTO activities (user, type, action, description, date) VALUES ('$user', '$type', '$action', '$description', '$date')";
    queryNR($query);
}

function sendMessage($embed, $webhook)
{
    $payload = json_encode(['content' => '', 'embeds' => [$embed]]);

    $ch = curl_init($webhook);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
}

function getIp()
{
    $ip = isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);

    return $ip;
}

function requestPagarMe($data)
{
    $ch = curl_init('https://api.pagar.me/core/v5/orders');

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Basic ' . GLOBAL_PAGARMEKEY,
        'Accept: application/json']
    );

    $result = curl_exec($ch);

    curl_close($ch);

    $array = json_decode($result, true);

    return $array;
}

function returnError($error)
{
    $data = [
        'status' => "fail",
        'error' => $error,
    ];

    header('Content-Type: application/json');
    echo json_encode($data);

    exit();
}

function returnSuccess($message)
{
    $data = [
        'status' => "success",
        'action' => "$message"
    ];
    
    header('Content-Type: application/json');
    echo json_encode($data);
}

function returnData($data)
{
    header('Content-Type: application/json');
    echo json_encode($data);
}

function checkPublicRequest($request)
{
    global $public;

    if (in_array($request, $public)) {
        return true;
    } 
    
    else {
        return false;
    }
}

function checkPrivateRequest($request)
{
    global $private;

    if (in_array($request, $private)) {
        return true;
    } 
    
    else {
        return false;
    }
}

function getHelpData()
{
    $response = [];

    $query = "SELECT * FROM help";
    $result = queryDBRows($query);

    if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            $category = $row["category"];
            $question = $row["question"];
            $answer = $row["answer"];

            $foundCategory = false;

            foreach ($response as &$item) {
                if (isset($item[$category])) {
                    $item[$category][] = [
                        "question" => $question,
                        "answer" => $answer,
                    ];
                    $foundCategory = true;
                    break;
                }
            }

            if (!$foundCategory) {
                $response[] = [
                    $category => [
                        [
                            "question" => $question,
                            "answer" => $answer,
                        ],
                    ],
                ];
            }
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function checkUsername($username) {
    if (empty($username)) {
        return "empty_username";
    }

    if (strlen($username) < 5) {
        return "short_username";
    }

    if (!preg_match('/^[a-zA-Z][a-zA-Z0-9_]*$/', $username)) {
        return "invalid_username";
    }

    $query = "SELECT id FROM users WHERE username = '$username'";
    $result = queryDB($query);

    if ($result && count($result) > 0) {
        return "used_username";
    }

    return null;
}

function checkName($name) {
    if (empty($name)) {
        return "empty_username";
    }

    if (strlen($name) < 5) {
        return "short_username";
    }

    return null;
}

function checkSession($token)
{
    $api = decrypt($token, GLOBAL_ENCKEY);

    $userQuery = "SELECT * FROM users WHERE api = '$api'";
    $userData = queryDBRows($userQuery);

    if (mysqli_num_rows($userData) > 0) {
        return $userData;
    } 
    
    else {
        return null;
    }
}

function getHash($userHash, $urlType) {
    $userHash = hash256($userHash);

    if ($urlType == "event") {
        $urlPrefix = "r";
    }
    
    else {
        $urlPrefix = "u";
    }

    $imageUrl = "https://media.resenha.app/$urlPrefix/$userHash.png";

    $ch = curl_init($imageUrl);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($statusCode == 200) {
        return $userHash;
    } 
    
    else {
        return hash256("default");
    }
}

function createNotification($user, $title, $content)
{
    $dateTime = date('d/m/Y H:i');

    $query = "INSERT INTO notifications (user, title, content, date, seen, cleared) VALUES ('$user', '$title', '$content', '$dateTime', '0', '0')";
    queryNR($query);
}

function createWithdraw($user, $amount)
{
    $dateTime = date('d/m/Y H:i');

    $query = "INSERT INTO withdrawals (user, moderator, amount, reason, approved, date) VALUES ('$user', 'none', '$amount', 'none', '0', '$dateTime')";
    queryNR($query);

    $query = "SELECT id FROM withdrawals WHERE user = '$user' AND amount = '$amount' AND date = '$dateTime'";
    $id = queryDB($query)[0];

    return $id;
}

function tryToEditWithdraw()
{
    $id = sanitize($_POST["id"]);

    $query = "SELECT approved FROM withdrawals WHERE id = '$id'";
    $isAlreadyApproved = queryDB($id)[0];

    if ($isAlreadyApproved == "0") {
        $moderator = sanitize($_POST["moderator"]);
        $reason = sanitize($_POST["reason"]);
        $approved = sanitize($_POST["approved"]);
    
        $query = "SELECT user FROM withdrawals WHERE id = '$id'";
        $user = queryDB($id)[0];
    
        $query = "SELECT amount FROM withdrawals WHERE id = '$id'";
        $amount = queryDB($id)[0];

        $query = "UPDATE balances SET requested = requested - $amount WHERE user = '$user'";
        queryNR($query);
    
        if ($approved == "0") {
            $query = "UPDATE balances SET retained = retained - $amount WHERE user = '$user'";
            queryNR($query);
        }
    
        $query = "UPDATE withdrawals SET moderator = '$moderator', reason = '$reason', approved = '$approved' WHERE id = '$id'";
        queryNR($query);

        $responseData = [
            'status' => 'success'
        ];

        returnData($responseData);
    }

    else {
        returnError("already_approved");
    }
}

function getParties($result, $userId)
{
    $parties = [];

    if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            $headers = [];

            $partyIdHash = getHash($row["id"], "event");

            $code = $row["code"];
            $timestamp = time();

            $dateTime = new DateTime("@" . $timestamp);
            $dateTime->setTimezone(new DateTimeZone("America/Sao_Paulo"));
            
            $dateTimeF = $dateTime->format('d/m/Y H:i');

            $query = "SELECT id FROM impressions WHERE user = '$userId' AND party = '$code'";
            $userHasSeen = queryDB($query);

            if (!$userHasSeen) {
                $query = "INSERT INTO impressions (user, party, clicked, date) VALUES ('$userId', '$code', '0', '$dateTimeF')";
                queryNR($query);
            }

            $capacity = $row["capacity"];

            $savedQuery = "SELECT id FROM saved WHERE party = '$code' AND user = '$userId'";
            $savedQ = queryDB($savedQuery);

            if ($savedQ) {
                $saved = true;
            } 
            
            else {
                $saved = false;
            }

            $guests_query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$code' AND paid = '1' OR method = 'dinheiro' AND party = '$code'";
            $confirmed = queryDB($guests_query)['total_guests'];

            $todayDate = date("d/m/Y");

            $date = DateTime::createFromFormat("d/m/Y", $row["date"]);
            $diff = $date->diff(DateTime::createFromFormat("d/m/Y", $todayDate));
            $differenceInDays = intval($diff->format("%a"));

            if ($differenceInDays <= 1) {
                array_push($headers, 0);
            }

            $date = DateTime::createFromFormat("d/m/Y", $row["creation"]);
            $diff = $date->diff(DateTime::createFromFormat("d/m/Y", $todayDate));
            $differenceInDays = intval($diff->format("%a"));

            if ($differenceInDays <= 1) {
                array_push($headers, 3);
            }

            if ($confirmed >= $capacity * 0.9) {
                array_push($headers, 5);
            }

            $query = "SELECT host FROM parties WHERE code = '$code'";
            $host = queryDB($query)[0];

            $query = "SELECT verified FROM users WHERE id = '$host'";
            $verified = queryDB($query)[0];

            if ($verified == "1") {
                array_push($headers, 6);
            }

            $guests = [];

            $query = "SELECT * FROM guests WHERE party = '$code' AND paid = '1' OR method = 'dinheiro' AND party = '$code'";
            $dba = queryDBRows($query);

            $counter = 0;
            if (mysqli_num_rows($dba) > 0) {
                foreach ($dba as $dsa) {
                    if ($dsa['user'] != "none") {
                        $userHash = hash256($dsa['user']);

                        $user['hash'] = $userHash;
                        $guests[] = $user;

                        $counter++;

                        if ($counter === 5) {
                            break;
                        }
                    }
                }
            }

            $data = [
                'hash' => $partyIdHash,
                'saved' => $saved,
                'price' => $row["price"],
                'code' => $code,
                'start' => $row["start"],
                'end' => $row["end"],
                'confirmed' => $confirmed,
                'capacity' => $capacity,
                'headers' => $headers,
                'title' => $row["name"],
                'guests' => $guests,
            ];

            if (isset($_POST['hype'])) {
                if (count($headers) > 0) {
                    array_push($parties, $data);
                }
            } else {
                array_push($parties, $data);
            }
        }
    }

    return $parties;
}

function getFeedData()
{
    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $userId = $column["id"];

        $query = "SELECT * FROM parties WHERE STR_TO_DATE(CONCAT(`date`, ' ', `start`), '%d/%m/%Y %H:%i') > CONVERT_TZ(NOW(), '+00:00', '-03:00') ";

        if (isset($_POST['searchTerm'])) {
            $searchTerm = sanitize($_POST['searchTerm']);
            $query .= " AND name LIKE '%" . $searchTerm . "%'";
        }

        if (isset($_POST['filterParameters'])) {
            $filterParameters = $_POST['filterParameters'];

            if (isset($filterParameters["address"]) && isset($filterParameters["radius"])) {
                $userAddress = $filterParameters["address"];
                $locationRadius = $filterParameters["radius"];

                $requestToOpenstreet = "https://nominatim.openstreetmap.org/search?q=" . urlencode($userAddress) . "&format=json";

                $httpOptions = [
                    "http" => [
                        "method" => "GET",
                        "header" => "User-Agent: Nominatim-Test",
                    ],
                ];

                $streamContext = stream_context_create($httpOptions);

                $json = file_get_contents($requestToOpenstreet, false, $streamContext);

                $addressDecoded = json_decode($json, true);

                if (!empty($addressDecoded)) {
                    $userLatitude = $addressDecoded[0]["lat"];
                    $userLongitude = $addressDecoded[0]["lon"];

                    $query .= " AND
                        (6371 * 2 *
                            ASIN(
                                SQRT(
                                    POWER(SIN((RADIANS(lat) - RADIANS($userLatitude)) / 2), 2) +
                                    COS(RADIANS($userLatitude)) *
                                    COS(RADIANS(lat)) *
                                    POWER(SIN((RADIANS(lon) - RADIANS($userLongitude)) / 2), 2)
                                )
                            )
                    ) <= $locationRadius";
                }
            }

            if (isset($filterParameters["tags"])) {
                $eventTags = $filterParameters["tags"];

                $eventTagsList = implode(",", $eventTags);

                $query .= " AND parties.code IN (
                    SELECT party FROM tags WHERE tag IN ($eventTagsList)
                )";
            }

            if (isset($filterParameters["vibe"])) {
                $eventVibe = $filterParameters["vibe"];
                $eventVibeList = implode(",", array_map('intval', $eventVibe));

                $query .= " AND parties.code IN (
                    SELECT party FROM guests WHERE user IN (
                        SELECT user FROM interests WHERE interest IN ($eventVibeList)
                    )
                )";
            }
        }

        $result = queryDBRows($query);

        $parties = getParties($result, $userId);

        returnData($parties);
    }
}

function editEventData()
{
    $userData = checkSession($_POST['token']);

    $code = $_POST['code'];
    $data = $_POST['data'];

    foreach ($userData as $column) {
        $responseData = [
            'status' => 'success',
        ];

        $query = "SELECT id FROM parties WHERE code = '$code'";
        $id = queryDB($query)[0];

        foreach ($data as $key => $value) {
            if ($key == 'price') {
                $key = str_replace('R$ ', '', $key);
                $key = str_replace(',', '.', $key);
                $key = floatval($key);
            }

            if ($key == 'address') {
                $requestToOpenstreet = "https://nominatim.openstreetmap.org/search?q=".urlencode($key)."&format=json";

                $httpOptions = [
                    "http" => [
                        "method" => "GET",
                        "header" => "User-Agent: Nominatim-Test",
                    ],
                ];

                $streamContext = stream_context_create($httpOptions);

                $json = file_get_contents($requestToOpenstreet, false, $streamContext);

                $addressDecoded = json_decode($json, true);

                $lat = "none";
                $lon = "none";

                if (!empty($addressDecoded)) {
                    $lat = $addressDecoded[0]["lat"];
                    $lon = $addressDecoded[0]["lon"];
                }

                $query = "UPDATE parties SET lat = '$lat' WHERE id = '$id'";
                queryNR($query);

                $query = "UPDATE parties SET lon = '$lon' WHERE id = '$id'";
                queryNR($query);
            }

            if ($key == 'tags') {
                $query = "DELETE FROM tags WHERE party = '$code'";
                queryNR($query);

                foreach ($value as $tag) {
                    $query = "INSERT INTO tags (tag, party) VALUES ('$tag', '$code')";
                    queryNR($query);
                }
            }

            else {
                $query = "UPDATE parties SET `$key` = '$value' WHERE id = '$id'";
                queryNR($query);
            }
        }

        returnData($responseData);
    }
}

function editUserData()
{
    $userData = checkSession($_POST['token']);

    $data = $_POST['data'];

    foreach ($userData as $column) {
        $userName = $column["username"];

        $responseData = [
            'status' => 'success',
        ];

        if (isset($data['name'])) {
            $nameError = checkName($data['name']);

            if (isset($nameError)) {
                returnError($nameError);
            }
        }

        if (isset($data['email'])) {
            $emailError = checkEmail($data['email']);

            if (isset($emailError)) {
                returnError($emailError);
            }
        }

        if (isset($data['username'])) {
            $usernameError = checkUsername($data['username']);

            if (isset($usernameError)) {
                returnError($usernameError);
            }

            else {
                $newToken = randomKey();

                $data['api'] = $newToken;
            }
        }

        if (isset($data['password']) ) {
            $passwordError = checkPassword($data['password']);

            if (isset($passwordError)) {
                returnError($passwordError);
            }

            else {
                $newToken = randomKey();

                $data['api'] = $newToken;
    
                $newPassword = $data['password'];
    
                $data['password'] = hash256($newPassword);
                $responseData['token'] = encrypt($newToken, GLOBAL_ENCKEY);
            }
        }

        $query = "SELECT id FROM users WHERE username = '$userName'";
        $id = queryDB($query)[0];

        foreach ($data as $key => $value) {
            if ($key == 'interests') {
                $query = "DELETE FROM interests WHERE user = '$id'";
                queryNR($query);

                foreach ($value as $interest) {
                    $query = "INSERT INTO interests (user, interest) VALUES ('$id', '$interest')";
                    queryNR($query);
                }
            } 
            
            else {
                $key = sanitize($key);
                $value = sanitize($value);
                
                $query = "UPDATE users SET `$key` = '$value' WHERE id = '$id'";
                queryNR($query);
            }
        }

        returnData($responseData);
    }
}

function getUserDataDiscord()
{
    header('Content-Type: application/json');

    if (isset($_GET['userid'])) {
        $userId = sanitize($_GET['userid']);
        $query = "SELECT * FROM users WHERE id = $userId";
    } elseif (isset($_GET['user@'])) {
        $userName = sanitize($_GET['user@']);
        $query = "SELECT * FROM users WHERE username = '$userName'";
    } elseif (isset($_GET['useremail'])) {
        $userEmail = sanitize($_GET['useremail']);
        $query = "SELECT * FROM users WHERE email = '$userEmail'";
    }
        $result = queryDBDiscord($query);

        if ($result) {
            echo json_encode($result);
        } else {
            $errorData = array('error' => 'User not found');
            echo json_encode($errorData);
        }
}
function getUsersFromParty()
{
    header('Content-Type: application/json');
    global $link;

    if (isset($_GET['usersfromparty'])) {
        $partyCode = sanitize($_GET['usersfromparty']);

        $query = "SELECT * FROM guests WHERE party = ?";
        $stmt = $link->prepare($query);
        $stmt->bind_param("s", $partyCode);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $usersData = array();
            while ($row = $result->fetch_assoc()) {
                $usersData[] = $row;
            }

            echo json_encode($usersData);
        } else {
            $errorData = array('error' => 'Party does not exist or does not contain guests');
            echo json_encode($errorData);
        }
    } else {
        $errorData = array('error' => 'No party code provided');
        echo json_encode($errorData);
    }
}

function getPartyDataDiscord()
{
    header('Content-Type: application/json');

    if (isset($_GET['party'])) {
        $partyCode = sanitize($_GET['party']);
        $query = "SELECT * FROM parties WHERE code = '$partyCode'";

    $result = queryDBDiscord($query);

    if ($result) {
        echo json_encode($result);
    } else {
        $errorData = array('error' => 'Party not found');
        echo json_encode($errorData);
    }
    }
}

function getUserData()
{
    $userData = checkSession($_POST['token']);

    if ($userData) {
        if (isset($_POST["profile"])) {
            $profile = sanitize($_POST["profile"]);

            $query = "SELECT * FROM users WHERE username = '$profile'";
            $userData = queryDBRows($query);
        }
    }

    foreach ($userData as $column) {
        $userId = $column["id"];

        $userHash = getHash($userId, "user");

        $query = "SELECT * FROM interests WHERE user = '$userId'";
        $interestsResults = queryDBRows($query);

        $interests = [];

        if (mysqli_num_rows($interestsResults) > 0) {
            foreach ($interestsResults as $interest) {
                array_push($interests, $interest["interest"]);
            }
        }

        $query = "SELECT * FROM balances WHERE user = '$userId'";
        $balancesResults = queryDBRows($query);

        if (mysqli_num_rows($balancesResults) > 0) {
            foreach ($balancesResults as $balance) {
                $balances = [
                    "available" => number_format($balance["available"], 2, ',', '.'),
                    "processing" => number_format($balance["processing"], 2, ',', '.'),
                    "retained" => number_format($balance["retained"], 2, ',', '.'),
                    "requested" => number_format($balance["requested"], 2, ',', '.'),
                ];
            }
        }

        $query = "SELECT * FROM concierges WHERE host = '$userId'";
        $conciergesResults = queryDBRows($query);

        $concierges = [];

        if (mysqli_num_rows($conciergesResults) > 0) {
            foreach ($conciergesResults as $concierge) {
                $temp = [
                    "name" => $concierge["name"],
                    "token" => $concierge["token"],
                ];

                array_push($concierges, $temp);
            }
        }

        $query = "SELECT * FROM guests WHERE user = '$userId'";
        $guestsResults = queryDBRows($query);

        $partiesWent = [];

        if (mysqli_num_rows($guestsResults) > 0) {
            foreach ($guestsResults as $guest) {
                $partyCode = $guest["party"];
                $userCode = $guest["code"];
                $codeUsed = $guest["used"];

                $query = "SELECT id, name, date, start, end FROM parties WHERE code = '$partyCode'";
                $partiesResults = queryDBRows($query);

                if (mysqli_num_rows($partiesResults) > 0) {
                    foreach ($partiesResults as $party) {
                        $partyId = $party["id"];

                        $partyIdHash = getHash($partyId, "party");

                        $query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$partyCode' AND paid = '1' OR method = 'dinheiro' AND party = '$partyCode'";
                        $partyConfirmed = queryDB($query)[0];

                        $temp = [
                            "hash" => $partyIdHash,
                            "name" => $party["name"],
                            "date" => $party["date"],
                            "start" => $party["start"],
                            "end" => $party["end"],
                            "confirmed" => $partyConfirmed,
                            "used" => $codeUsed,
                            "token" => $userCode,
                            "code" => $partyCode
                        ];

                        array_push($partiesWent, $temp);
                    }
                }
            }
        }

        $query = "SELECT * FROM parties WHERE host = '$userId'";
        $partiesResults = queryDBRows($query);

        $partiesMade = [];

        if (mysqli_num_rows($partiesResults) > 0) {
            foreach ($partiesResults as $party) {
                $partyId = $party["id"];
                $partyCode = $party["code"];

                $partyIdHashUser = getHash($partyId, "event");

                $query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$partyCode' AND paid = '1' OR method = 'dinheiro' AND party = '$partyCode'";
                $partyConfirmed = queryDB($query)['total_guests'];

                $temp = [
                    "hash" => $partyIdHashUser,
                    "code" => $partyCode,
                    "name" => $party["name"],
                    "date" => $party["date"],
                    "start" => $party["start"],
                    "end" => $party["end"],
                    "capacity" => $party["capacity"],
                    "confirmed" => $partyConfirmed,
                ];

                array_push($partiesMade, $temp);
            }
        }

        $query = "SELECT * FROM notifications WHERE user = '$userId'";
        $notificationsResults = queryDBRows($query);

        $notifications = [];
        $notified = false;

        if (mysqli_num_rows($notificationsResults) > 0) {
            foreach ($notificationsResults as $notification) {
                if ($notification["cleared"] == "0") {
                    $temp = [
                        "id" => $notification["id"],
                        "title" => $notification["title"],
                        "content" => $notification["content"],
                        "date" => $notification["date"],
                    ];

                    array_push($notifications, $temp);
                }

                if ($notification["seen"] == "0") {
                    $notified = true;
                }
            }
        }

        $query = "SELECT * FROM activities WHERE type = 'user' AND user = '$userId'";
        $activitiesResults = queryDBRows($query);

        $activities = [];

        if (mysqli_num_rows($activitiesResults) > 0) {
            foreach ($activitiesResults as $activity) {
                $temp = [
                    "title" => $activity["title"],
                    "description" => $activity["description"],
                    "date" => $activity["date"],
                ];

                if ($activity["hash"] != "none") {
                    $temp["hash"] = $activity["hash"];
                }

                array_push($activities, $temp);
            }
        }

        $query = "SELECT * FROM guests WHERE user = '$userId'";
        $purchasesResults = queryDBRows($query);

        $purchases = [];

        if (mysqli_num_rows($purchasesResults) > 0) {
            foreach ($purchasesResults as $purchase) {
                $purchaseGuestCode = $purchase["code"];
                $purchasePartyCode = $purchase["party"];
                $purchasePartyDate = $purchase["date"];

                $query = "SELECT * FROM parties WHERE code = '$purchasePartyCode'";
                $purchasePartyResults = queryDBRows($query);

                if (mysqli_num_rows($purchasePartyResults) > 0) {
                    foreach ($purchasePartyResults as $purchaseParty) {
                        $purchasePartyId = $purchaseParty["id"];
                        $purchasePartyName = $purchaseParty["name"];
                        $purchasePartyPrice = number_format($purchaseParty["price"], 2, ',', '.');
                    }
                }

                $partyIdHashId = getHash($purchasePartyId, "event");

                $temp = [
                    "hash" => $partyIdHashId,
                    "name" => $purchasePartyName,
                    "code" => $purchaseGuestCode,
                    "price" => $purchasePartyPrice,
                    "date" => $purchasePartyDate
                ];

                array_push($purchases, $temp);
            }
        }

        $query = "SELECT * FROM saved INNER JOIN parties ON saved.party = parties.code WHERE saved.user = '$userId'";
        $savedResults = queryDBRows($query);

        $saved = getParties($savedResults, $userId);

        $query = "SELECT COUNT(*) AS followerCount FROM followers WHERE followed = '$userId'";
        $followers = queryDB($query)[0];

        $query = "SELECT COUNT(*) AS followingCount FROM followers WHERE follower = '$userId'";
        $following = queryDB($query)[0];

        $query = "SELECT c.*, u.name FROM comments AS c INNER JOIN parties AS p ON c.party = p.code INNER JOIN users AS u ON c.user = u.id WHERE p.host = '$userId'";
        $commentsResults = queryDBRows($query);

        $comments = [];

        if (mysqli_num_rows($commentsResults) > 0) {
            foreach ($commentsResults as $comment) {
                $commentId = $comment["user"];

                $query = "SELECT username FROM users WHERE id = '$commentId'";
                $commentUsername = queryDB($query)[0];

                $commentHash = getHash($commentId, "user");

                $temp = [
                    "hash" => $commentHash,
                    "user" => $commentId,
                    "username" => $commentUsername,
                    "name" => $comment["name"],
                    "content" => $comment["content"],
                    "rate" => $comment["rate"],
                    "date" => $comment["date"],
                ];

                array_push($comments, $temp);
            }
        }

        $data = [
            'hash' => $userHash,
            'username' => $column["username"],
            'name' => $column["name"],
            'about' => $column["about"],
            'verified' => $column["verified"],
            'interests' => $interests,
            'followers' => $followers,
            'following' => $following,
            'comments' => $comments,
            'partiesMade' => $partiesMade,
            'partiesWent' => $partiesWent,
            'mine' => false,
        ];

        if ($column["api"] == decrypt(sanitize($_POST["token"]), GLOBAL_ENCKEY)) {
            $data["birth"] = $column["birth"];
            $data["address"] = $column["address"];
            $data["phone"] = $column["phone"];
            $data['cpf'] = $column["cpf"];
            $data['email'] = $column["email"];
            $data['balances'] = $balances;
            $data['notifications'] = $notifications;
            $data['saved'] = $saved;
            $data['notified'] = $notified;
            $data['concierges'] = $concierges;
            $data['activities'] = $activities;
            $data['purchases'] = $purchases;
            $data['mine'] = true;
        } 
        
        else {
            $userData = checkSession($_POST['token']);

            foreach ($userData as $column) {
                $profileId = $column["id"];
            }

            $query = "SELECT id FROM followers WHERE follower = '$profileId' AND followed = '$userId'";
            $result = queryDB($query);

            if (!empty($result)) {
                $data['follower'] = true;
            } else {
                $data['follower'] = false;
            }
        }

        if (isset($_POST["requested"])) {
            $requested = $_POST["requested"];

            if (is_array($requested)) {
                $tempData = [];
                foreach ($requested as $item) {
                    $sanitizedItem = sanitize($item);

                    $var = $data[$sanitizedItem];

                    $tempData[$sanitizedItem] = $var; 
                }
            } 
            
            else {
                $sanitizedRequested = sanitize($_POST["requested"]);

                $var = $data[$sanitizedRequested];

                $tempData = [
                    $sanitizedRequested => $var
                ];
            }

            $data = $tempData;
        }

        returnData($data);
    }
}

function getInviteData()
{
    $code = sanitize($_POST['code']);

    $query = "SELECT * FROM parties WHERE code = '$code'";
    $result = queryDBRows($query);

    if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            $host = $row["host"];
            $id = $row["id"];

            $partyHash = getHash($id, "event");

            $query = "SELECT name FROM users WHERE id = '$host'";
            $host = queryDB($query)[0];

            $guests_query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$code' AND paid = '1' OR method = 'dinheiro' AND party = '$code'";
            $confirmed = queryDB($guests_query)['total_guests'];

            $dateString = $row["date"];
            list($day, $month, $year) = explode('/', $dateString);

            $day = (int) $day;
            $rawmonth = $month;
            $month = convertMonth($month);
            $year = (int) $year;

            $dayOfWeek = getDayOfWeek($dateString);

            $users = [];
            $query = "SELECT * FROM guests WHERE party = '$code'";
            $dba = queryDBRows($query);

            if (mysqli_num_rows($dba) > 0) {
                foreach ($dba as $dsa) {
                    if ($dsa['user'] != "NONE") {
                        $id = $dsa['user'];

                        $query = "SELECT username FROM users WHERE id = '$id'";
                        $uname = queryDB($query)[0];

                        $user['id'] = $id;

                        $userHash = getHash($dsa['user'], "user");

                        $user['hash'] = $userHash;
                        $user['username'] = $uname;
                    }

                    $users[] = $user;
                }
            }

            $tags = [];

            $query = "SELECT * FROM tags WHERE party = '$code'";
            $db = queryDBRows($query);

            if (mysqli_num_rows($db) > 0) {
                foreach ($db as $is) {
                    $tags[] = $is['tag'];
                }
            }

            $data = [
                'hash' => $partyHash,
                'ticket' => $row["price"],
                'address' => $row["address"],
                'host' => $host,
                'title' => $row["name"],
                'description' => $row["description"],
                'users' => $users,
                'tags' => $tags,
                'date' => [
                    'day' => $day,
                    'month' => $rawmonth,
                    'year' => $year,
                    'monthString' => $month,
                    'dayString' => $dayOfWeek,
                ],
                'hour' => [
                    'start' => $row["start"],
                    'end' => $row["end"],
                ],
                'guests' => [
                    'capacity' => $row["capacity"],
                    'confirmed' => $confirmed,
                ],
            ];

            if (isset($_POST['token'])) {
                $userData = checkSession($_POST['token']);

                foreach ($userData as $column) {
                    $userId = $column["id"];

                    if ($userId == $host) {
                        $party_price_query = "SELECT price FROM parties WHERE code = '$code'";
                        $party_price = queryDB($party_price_query)[0];
    
                        $guests_query = "SELECT method FROM guests WHERE party = '$code'";
                        $payment_results = queryDBRows($guests_query);
    
                        $income = [
                            "card" => 0,
                            "cash" => 0,
                            "pix" => 0,
                        ];
    
                        foreach ($payment_results as $payment_row) {
                            $method = $payment_row['method'];
    
                            if ($method == 'pix') {
                                $income['pix'] += $party_price;
                            } 
                            
                            elseif ($method == 'cartao') {
                                $income['card'] += $party_price;
                            } 
                            
                            else {
                                $income['cash'] += $party_price;
                            }
                        }
    
                        $date = new DateTime('now', new DateTimeZone('America/Sao_Paulo'));
    
                        $sql_date = $date->format('Y-m-d H:i:s');
    
                        $impressions_query = "SELECT COUNT(*) AS view_count FROM impressions WHERE party = '$code' AND CONVERT_TZ(STR_TO_DATE(date, '%d/%m/%Y %H:%i'), '+00:00', '-03:00') >= '$sql_date' - INTERVAL 1 HOUR";
                        $impressions_count = queryDB($impressions_query)[0];
    
                        $views_query = "SELECT COUNT(*) AS view_count FROM impressions WHERE party = '$code' AND CONVERT_TZ(STR_TO_DATE(date, '%d/%m/%Y %H:%i'), '+00:00', '-03:00') >= '$sql_date' - INTERVAL 1 HOUR AND clicked = '1'";
                        $views_count = queryDB($views_query)[0];
    
                        $impressions = [
                            'views' => $impressions_count,
                            'clicks' => $views_count,
                            'purchases' => 0,
                        ];
    
                        $data["income"] = $income;
                        $data["impressions"] = $impressions;
                    }

                    else {
                        returnError("not_host");
                    }
                }
            }

            returnData($data);
        }
    } 
    
    else {
        returnError("no_data");
    }
}

function tryToCreateGuest()
{
    $party = sanitize($_POST['code']);
    $name = sanitize($_POST['name']);
    $birth = sanitize($_POST['birth']);
    $email = sanitize($_POST['email']);
    $method = sanitize($_POST['method']);

    $user = "none";

    if (isset($_POST['token'])) {
        $userData = checkSession($_POST['token']);
    
        foreach ($userData as $column) {
            $user = $column["id"];
        }
    }

    $date = date("d/m/Y H:i");

    $query = "SELECT price FROM parties WHERE code = '$party'";
    $price = queryDB($query)[0];

    do {
        $code = rand(1000, 9999);
        $query = "SELECT id FROM guests WHERE code = '$code' AND party = '$party'";
        $result = queryDBRows($query);
    } while (mysqli_num_rows($result) > 0);

    $paid = "0";
    
    if ($method == "pix") {
        $req = [
            "items" => [
                [
                    "amount" => $price * 100,
                    "description" => "Resenha.app",
                    "quantity" => 1,
                ],
            ],
            "customer" => [
                "name" => $name,
                "email" => $email,
                "type" => "individual",
                "document" => "02332277099",
                "phones" => [
                    "mobile_phone" => [
                        "country_code" => "55",
                        "number" => "997722334",
                        "area_code" => "51",
                    ],
                ],
            ],
            "payments" => [
                [
                    "payment_method" => "pix",
                    "pix" => [
                        "expires_in" => "1800",
                        "additional_information" => [
                            [
                                "name" => "Código da Resenha: " . $party,
                                "value" => "1",
                            ],
                        ],
                    ],
                ],
            ],
        ];

        $array = requestPagarMe(json_encode($req));

        $qrcode = $array["charges"][0]["last_transaction"]["qr_code"];
        $qrcodeurl = $array["charges"][0]["last_transaction"]["qr_code_url"];

        $charge = $array["charges"][0]["id"];
    } 
    
    else {
        $paid = "0";
        $charge = "none";
    }

    if ($method != "pix") {
        //send_email('Resenha.app', 'noreply@resenha.app', $email, $name, 'VEM PRA RESENHA!', 'ynrw7gy67pnl2k8e', $code);
    }

    $used = "0";
    $deleted = "0";

    $query = "INSERT INTO guests (user, party, name, birth, email, method, date, code, charge, paid, used, deleted) VALUES ('$user', '$party', '$name', '$birth', '$email', '$method', '$date', '$code', '$charge', '$paid', '$used', '$deleted')";
    queryNR($query);

    $query = "SELECT id FROM guests WHERE code = '$code' AND party = '$party'";
    $guest = queryDB($query)[0];

    $query = "SELECT host FROM parties WHERE code = '$party'";
    $host = queryDB($query)[0];

    $query = "SELECT name FROM parties WHERE code = '$party'";
    $partyName = queryDB($query)[0];

    $query = "SELECT price FROM parties WHERE code = '$party'";
    $price = queryDB($query)[0];

    $price = number_format($price, 2, ',', '.');

    $webhook = "https://discord.com/api/webhooks/1115112981055930458/4rpE9nlwOUukTkubSzsqk1kSTbLC7oJ5cIZ1NbiCFmIsaURpje_jdwFTGksaTMfYpEm4";

    $embed = [
        'title' => 'Novo visitante registrado!',
        'color' => hexdec('7d00ff'),
        'fields' => [
            [
                'name' => 'Nome',
                'value' => $name,
                'inline' => false,
            ],
            [
                'name' => 'Email',
                'value' => $email,
                'inline' => false,
            ],
            [
                'name' => 'Método',
                'value' => $method,
                'inline' => false,
            ],
            [
                'name' => 'Preço',
                'value' => 'R$ ' . $price,
                'inline' => false,
            ],
            [
                'name' => 'Resenha',
                'value' => $party,
                'inline' => false,
            ],
            [
                'name' => 'Código',
                'value' => $code,
                'inline' => false,
            ],
        ],
    ];

    sendMessage($embed, $webhook);

    if ($user != "none") {
        $query = "SELECT username FROM users WHERE id = '$user'";
        $guestUsername = queryDB($query)[0];

        $notificationText =  "O usuário @$guestUsername acaba de comprar um ingresso para a sua resenha chamada: $partyName";
    }

    else {
        $notificationText =  "$name acaba de comprar um ingresso para a sua resenha chamada: $partyName";
    }

    createNotification(
        $host, 
        "Novo convidado!", 
        $notificationText
    );

    if ($method == "pix") {
        $data = [
            'guest' => $guest,
            'qrcode' => $qrcode,
            'status' => "success",
        ];

        returnData($data);
    }
}

function tryToAuthenticate()
{
    $email = sanitize($_POST['email']);
    $password = hash256(sanitize($_POST['password']));

    $query = "SELECT api FROM users WHERE email = '$email' AND password = '$password'";
    $token = queryDB($query);

    if ($token) {
        $response = encrypt($token[0], GLOBAL_ENCKEY);

        $data = [
            'token' => $response,
        ];

        returnData($data);
    } 
    
    else {
        returnError("invalid_credentials");
    }
}

function clearUserNotifications()
{
    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $userId = $column["id"];

        $query = "UPDATE notifications SET cleared = '1' WHERE user = '$userId' AND cleared = '0'";
        queryNR($query);

        returnSuccess("notifications_cleared");
    }
}

function switchSaveEvent()
{
    $partyCode = sanitize($_POST['party']);

    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $userId = $column["id"];

        $timestamp = time();

        $dateTime = new DateTime("@" . $timestamp);
        $dateTime->setTimezone(new DateTimeZone("America/Sao_Paulo"));
        
        $dateTimeF = $dateTime->format('d/m/Y H:i');

        $query = "SELECT id FROM saved WHERE user = '$userId' AND party = '$partyCode'";
        $savedResults = queryDB($query);

        if ($savedResults) {
            $savedId = $savedResults[0];

            $deleteQuery = "DELETE FROM saved WHERE id = '$savedId'";
            queryNR($deleteQuery);

            $action = "unsaved";
        }

        else {
            $insertQuery = "INSERT INTO saved (`id`, `user`, `party`, `date`) VALUES (NULL, '$userId', '$partyCode', '$dateTimeF')";
            queryNR($insertQuery);

            $action = "saved";
        }

        returnSuccess($action);
    }
}

function switchFollowUser()
{
    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $userName = $column["username"];

        $profile = sanitize($_POST['profile']);

        $query = "SELECT id FROM users WHERE username = '$userName'";
        $followingId = queryDB($query)[0];

        if (!empty($followingId)) {
            $currentDate = date('d/m/Y');

            $query = "SELECT id FROM users WHERE username = '$profile'";
            $followedIdResult = queryDB($query);

            if (!empty($followedIdResult)) {
                $followedId = $followedIdResult[0];

                $query = "SELECT id FROM followers WHERE follower = '$followingId' AND followed = '$followedId'";
                $followIdResult = queryDB($query);

                if (!empty($followIdResult)) {
                    $followId = $followIdResult[0];

                    $deleteQuery = "DELETE FROM followers WHERE id = '$followId'";
                    queryNR($deleteQuery);

                    $data = [
                        'status' => "success",
                        'action' => "unfollowed",
                    ];
                } else {
                    $insertQuery = "INSERT INTO followers (`id`, `follower`, `followed`, `date`) VALUES (NULL, '$followingId', '$followedId', '$currentDate')";
                    queryNR($insertQuery);

                    $data = [
                        'status' => "success",
                        'action' => "followed",
                    ];
                }

                header('Content-Type: application/json');
                echo json_encode($data);
            }
        }
    }
}

function seeUserNotifications()
{
    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $userName = $column["username"];

        $query = "SELECT * FROM users WHERE username = '$userName'";

        $result = queryDBRows($query);

        if (mysqli_num_rows($result) > 0) {
            foreach ($result as $row) {
                $id = $row["id"];

                $query = "UPDATE notifications SET seen = '1' WHERE user = '$id' AND seen = '0'";
                queryNR($query);
                
                returnSuccess("notifications_seen");
            }
        }
    }
}

function tryToWithdraw()
{
    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $id = $column["id"];
        $name = $column["name"];
        $email = $column["email"];

        $amount = floatval(sanitize($_POST['amount']));

        $query = "SELECT * FROM balances WHERE user = '$id'";
        $result = queryDBRows($query);

        if (mysqli_num_rows($result) > 0) {
            foreach ($result as $row) {
                $available = floatval($row["available"]);
                $requested = floatval($row["requested"]);
                $retained = floatval($row["retained"]);
                $processing = floatval($row["processing"]);
            }
        }

        if ($amount <= $available && $amount >= 50) {
            $newRequested = $requested + $amount;
            $newAvailable = $available - $amount;

            $query = "UPDATE balances SET requested = $newRequested, available = $newAvailable WHERE user = '$id'";
            queryNR($query);

            $withdrawId = createWithdraw(
                $id,
                $amount
            );

            createNotification(
                $id,
                "Saque solicitado!",
                "Seu saque de R$ ".number_format($amount, 2, ',', '.')." foi solicitado e cairá na sua conta em até 1 dia útil.",
            );

            $embed = [
                'title' => 'Novo saque solicitado!',
                'color' => hexdec('7d00ff'),
                'fields' => [
                    [
                        "name" => "ID do saque",
                        "value" => $withdrawId,
                    ],
                    [
                        "name" => "ID do usuário",
                        "value" => $id,
                    ],
                    [
                        "name" => "Nome",
                        "value" => $name,
                    ],
                    [
                        "name" => "Email",
                        "value" => $email,
                    ],
                    [
                        "name" => "Saldo Atual",
                        "value" => "R$ " . number_format($newAvailable, 2, ',', '.'),
                    ],
                    [
                        "name" => "Saldo em Processamento",
                        "value" => "R$ " . $processing,
                    ],
                    [
                        "name" => "Saldo Retido",
                        "value" => "R$ " . $retained,
                    ],
                    [
                        "name" => "Saldo Solicitado",
                        "value" => "R$ " . $newRequested,
                    ],
                    [
                        "name" => "Valor da Solicitação",
                        "value" => "R$ " . number_format($amount, 2, ',', '.'),
                    ],
                ],
            ];

            $webhook = "https://discord.com/api/webhooks/1116575716646068254/xAmqlhC3WpinvTw-HI5hdbom6-FA94YuY1v5NEUONTSXwroXTwA3PgaqTazIxezTFGn7";

            sendMessage($embed, $webhook);
        } 
        
        else {
            returnError("insufficient_balance");
        }
    }
}

function tryToDeleteEvent()
{
    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $id = $column["id"];

        $code = sanitize($_POST['code']);

        $query = "SELECT * FROM guests WHERE party = '$code' AND paid = '1' OR method = 'dinheiro'";
        $confirmed = queryDB($query);

        if ($confirmed) {
            $query = "SELECT host FROM parties WHERE code = '$code'";
            $host = queryDB($query)[0];
    
            if ($id == $host) {
                $query = "DELETE FROM parties WHERE code = '$code'";
                queryNR($query);
    
                returnSuccess("event_deleted");
            }
    
            else {
                returnError("invalid_token");
            }
        }

        else {
            returnError("guests_confirmed");
        }
    }
}

function tryToSendMessage()
{
    $destination = sanitize($_POST['destination']);
    $type = sanitize($_POST['type']);
    $content = sanitize($_POST['content']);

    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $id = $column["id"];
        $username = $column["username"];

        if ($destination == $username) {
            returnError("chatting_yourself");
        }

        else {
            if ($type == "dm") {
                $query = "SELECT id FROM users WHERE username = '$destination'";
                $destinationId = queryDB($query)[0];
                
                $query = "SELECT id FROM followers WHERE follower = '$id' AND followed = '$destinationId'";
                $result = queryDB($query);
                
                if (!empty($result)) {
                    $query = "SELECT id FROM followers WHERE follower = '$destinationId' AND followed = '$id'";
                    $result = queryDB($query);
                
                    if (empty($result)) {
                        returnError("not_mutual");
                    } 
                } 
    
                else {
                    returnError("not_mutual");
                }
            }

            else {
                $query = "SELECT id FROM guests WHERE user = '$id' AND party = '$destination'";
                $isUserAGuest = queryDB($query);

                if (empty($isUserAGuest)) {
                    returnError("not_guest");
                }
            }
        }

        $timestamp = time();

        $dateTime = new DateTime("@" . $timestamp);
        $dateTime->setTimezone(new DateTimeZone("America/Sao_Paulo"));
        
        $formattedDateTime = $dateTime->format('d/m/Y H:i:s');
        
        if ($type == 'dm') {
            $query = "SELECT id FROM users WHERE username = '$destination'";
        } 
        
        else {
            $query = "SELECT id FROM parties WHERE code = '$destination'";
        }

        $destination = queryDB($query)[0];

        if ($type == 'dm') {
            createNotification(
                $destination,
                "Nova mensagem!", 
                "Você tem uma nova mensagem do usuário @$username."
            );
        }

        $query = "INSERT INTO `messages` (`id`, `sender`, `date`, `destination`, `chatType`, `content`) VALUES (NULL, '$id', '$formattedDateTime', '$destination', '$type', '$content');";
        queryNR($query);

        returnSuccess("message_sent");
    }
}

function getMessages()
{
    $userData = checkSession($_POST['token']);

    $code = sanitize($_POST['code']);
    $type = sanitize($_POST['type']);

    foreach ($userData as $column) {
        $id = $column["id"];
        $username = $column["username"];

        if ($username == $code) {
            returnError("chatting_yourself");
        }

        else {
            if ($type == "dm") {
                $query = "SELECT id FROM users WHERE username = '$code'";
                $destinationId = queryDB($query)[0];
                
                $query = "SELECT id FROM followers WHERE follower = '$id' AND followed = '$destinationId'";
                $result = queryDB($query);
                
                if (!empty($result)) {
                    $query = "SELECT id FROM followers WHERE follower = '$destinationId' AND followed = '$id'";
                    $result = queryDB($query);
                
                    if (empty($result)) {
                        returnError("not_mutual");
                    } 
                } 
    
                else {
                    returnError("not_mutual");
                }
            }

            else {
                $query = "SELECT id FROM guests WHERE user = '$id' AND party = '$code'";
                $isUserAGuest = queryDB($query);

                if (empty($isUserAGuest)) {
                    returnError("not_guest");
                }
            }
        }

        if ($type == 'dm') {
            $query = "SELECT id FROM users WHERE username = '$code'";
        } 
        
        else {
            $query = "SELECT id FROM parties WHERE code = '$code'";
        }

        $chatId = queryDB($query)[0];

        if ($type == 'dm') {
            $query = "SELECT * FROM messages WHERE chatType = '$type' AND (sender = '$id' OR sender = '$chatId') ORDER BY STR_TO_DATE(`date`, '%d/%m/%Y %H:%i:%s') DESC";
            $messages = queryDBRows($query);
        } 
        
        else {
            $query = "SELECT * FROM messages WHERE chatType = '$type' AND destination = '$chatId' ORDER BY STR_TO_DATE(`date`, '%d/%m/%Y %H:%i:%s') DESC";
            $messages = queryDBRows($query);
        }

        $messagesArray = [];

        foreach ($messages as $row) {
            $sent = $row['sender'] == $id;
            $content = $row['content'];
            $dateString = $row["date"];
            list($datePart, $timePart) = explode(' ', $dateString);
            list($day, $month, $year) = explode('/', $datePart);
            list($hour, $minute, $second) = explode(':', $timePart);

            $day = (int) $day;
            $month = convertMonth($month);
            $year = (int) $year;
            $hour = (int) $hour;
            $minute = (int) $minute;
            $second = (int) $second;

            $temp = [
                'sent' => $sent,
                'content' => $content,
                'date' => [
                    'day' => $day,
                    'month' => $month,
                    'year' => $year,
                    'hour' => sprintf('%02d', $hour),
                    'minute' => sprintf('%02d', $minute),
                    'second' => sprintf('%02d', $second),
                ],
                'destination' => $row['destination'],
            ];

            array_push($messagesArray, $temp);
        }

        usort($messagesArray, function ($a, $b) {
            $dateA = $a['date']['year'] . $a['date']['month'] . $a['date']['day'] . $a['date']['hour'] . $a['date']['minute'] . $a['date']['second'];
            $dateB = $b['date']['year'] . $b['date']['month'] . $b['date']['day'] . $b['date']['hour'] . $b['date']['minute'] . $b['date']['second'];
            return strcmp($dateB, $dateA);
        });

        $messagesArray = array_reverse($messagesArray);

        $data = [
            'messages' => $messagesArray,
        ];

        returnData($data);
    }
}

function tryToCreateEvent()
{
    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $host = $column["id"];

        $details = $_POST['details'];

        $requiredFields = ['name', 'address', 'isForAdults', 'start', 'hasTimeToEnd', 'end', 'dateSelected', 'selectedGuests', 'selectedPrice', 'descriptionContent'];

        foreach ($requiredFields as $field) {
            if (!isset($details[$field])) {
                returnError("invalid_request");
            }
        }

        $name = $details['name'];
        $address = $details['address'];
        $maiority = $details['isForAdults'] ? 1 : 0;
        $capacity = $details['selectedGuests'];
        $price = $details['selectedPrice'];
        $capacity = $details['selectedGuests'];
        $description = $details['descriptionContent'];
        $tags = $details['tagsContent'];

        $price = intval(str_replace(',', '.', $details['selectedPrice']));
        $start = date('H:i', strtotime($details['start']));

        $date = date('d/m/Y', strtotime($details['dateSelected']));

        $code = randomCode(8);

        $timezone = new DateTimeZone('America/Sao_Paulo');
        $now = new DateTime('now', $timezone);
        $creation = $now->format('d/m/Y');

        $requestToOpenstreet = "https://nominatim.openstreetmap.org/search?q=" . urlencode($address) . "&format=json";

        $httpOptions = [
            "http" => [
                "method" => "GET",
                "header" => "User-Agent: Nominatim-Test",
            ],
        ];

        $streamContext = stream_context_create($httpOptions);

        $json = file_get_contents($requestToOpenstreet, false, $streamContext);

        $addressDecoded = json_decode($json, true);

        $lat = "none";
        $lon = "none";
        $end = "none";

        if (!empty($addressDecoded)) {
            $lat = $addressDecoded[0]["lat"];
            $lon = $addressDecoded[0]["lon"];
        }

        if ($details['hasTimeToEnd'] == '1') {
            $end = date('H:i', strtotime($details['end']));
        }

        $query = "INSERT INTO parties (host, name, address, maiority, start, end, date, creation, lat, lon, capacity, price, description, code) VALUES ('$host', '$name', '$address', $maiority, '$start', '$end', '$date', '$creation', '$lat', '$lon', '$capacity', '$price', '$description', '$code')";
        queryNR($query);

        foreach ($tags as $tag) {
            $query = "INSERT INTO tags (tag, party) VALUES ('$tag', '$code')";
            queryNR($query);
        }

        $webhook = "https://discord.com/api/webhooks/1115112981055930458/4rpE9nlwOUukTkubSzsqk1kSTbLC7oJ5cIZ1NbiCFmIsaURpje_jdwFTGksaTMfYpEm4";

        $embed = [
            'title' => 'Nova resenha criada!',
            'color' => hexdec('7d00ff'),
            'fields' => [
                [
                    'name' => 'Nome',
                    'value' => $name,
                ],
                [
                    'name' => 'Hospedeiro',
                    'value' => $host,
                ],
                [
                    'name' => 'Endereço',
                    'value' => $address,
                ],
                [
                    'name' => 'Data',
                    'value' => $date,
                ],
                [
                    'name' => 'Horário',
                    'value' => $start,
                ],
                [
                    'name' => 'Descrição',
                    'value' => $description,
                ],
                [
                    'name' => 'Código',
                    'value' => $code,
                ],
            ],
        ];

        createNotification(
            $host, 
            "Resenha criada!", 
            "A $name foi criada com sucesso."
        );

        sendMessage($embed, $webhook);
    }
}

function tryToClickOnEvent() 
{
    $code = sanitize($_POST['party']);

    $userData = checkSession($_POST['token']);

    foreach ($userData as $column) {
        $id = $column["id"];

        $query = "UPDATE impressions SET clicked = '1' WHERE user = '$id' AND party = '$code'";
        queryNR($query);
    }
}

function tryToCreateUser()
{
    $email = sanitize($_POST['email']);
    $password = sanitize($_POST['password']);
    $name = sanitize($_POST['name']);
    $cpf = sanitize($_POST['cpf']);
    $birth = sanitize($_POST['birth']);

    $error = checkEmail($email) or checkPassword($password) or checkCpf($cpf);

    if (!isset($error)) {
        $token = "ec-" . encrypt($email, GLOBAL_ENCKEY);
        $api = randomKey();
        $date = date('d/m/Y H:i');
        $registration = getIp();
        $last = getIp();
        $pix = "none";
        $tax = 10;
        
        $password_hash = hash256($password);

        $confirmation_link = "https://resenha.app/api/?token=$token";

        //$error = send_email('Resenha.app', 'noreply@resenha.app', $email, $name, 'Confirme seu e-mail', 'pxkjn41zvrqlz781', $confirmation_link);

        if (!$error) {
            $query = "INSERT INTO users (email, password, name, birth, cpf, pix, date, api, tax, registration, last, token) VALUES ('$email', '$password_hash', '$name', '$birth', '$cpf', '$pix', '$date', '$api', '$tax', '$registration', '$last', '$token')";
            queryNR($query);

            $query = "SELECT id FROM users WHERE email = '$email' AND password = '$password_hash'";
            $user = queryDB($query)[0];

            $query = "INSERT INTO balances (user, available, processing, retained, requested) VALUES ($user, '0', '0', '0', '0')";
            queryNR($query);

            $webhook = "https://discord.com/api/webhooks/1115112981055930458/4rpE9nlwOUukTkubSzsqk1kSTbLC7oJ5cIZ1NbiCFmIsaURpje_jdwFTGksaTMfYpEm4";

            $embed = [
                'title' => 'Novo usuário criado!',
                'color' => hexdec('7d00ff'),
                'fields' => [
                    [
                        'name' => 'Nome',
                        'value' => $name,
                    ],
                    [
                        'name' => 'Email',
                        'value' => $email,
                    ],
                    [
                        'name' => 'IP',
                        'value' => $registration,
                    ],
                ],
            ];

            sendMessage($embed, $webhook);

            $data = [
                'user' => $user
            ];

            returnData($data);
        }
    } 
    
    else {
        returnError($error);
    }
}

?>