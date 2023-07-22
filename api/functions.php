<?php

include "keys.php";

function queryDB($query)
{
    global $link;
    $result = $link->query($query);
    $row = mysqli_fetch_array($result);
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

function check_email($email)
{
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = queryDBRows($query);
    $num_rows = mysqli_num_rows($result);

    if ($num_rows > 0) {
        return "email_registered";
    }
}

function check_cpf($cpf)
{
    $query = "SELECT * FROM users WHERE cpf = '$cpf'";
    $result = queryDBRows($query);
    $num_rows = mysqli_num_rows($result);

    if ($num_rows > 0) {
        return "cpf_registered";
    }
}

function check_password($password)
{
    if (strlen($password) < 8) {
        return "small_password";
    } elseif (!preg_match("/[0-9]/", $password)) {
        return "numeric_password";
    } elseif (!preg_match("/[a-zA-Z]/", $password)) {
        return "alphabetic_password";
    } elseif (!preg_match("/[!@#$%^&*()\-_=+{};:,<.>]/", $password)) {
        return "special_password";
    }
}

function random_code($length)
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

function random_key()
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

function register_log($user, $type, $action, $description = "none")
{
    $variables = [ &$user, &$type, &$action, &$description];

    foreach ($variables as &$var) {
        $var = sanitize($var);
    }

    date_default_timezone_set('America/Sao_Paulo');
    $date = date('d/m/Y H:i');

    $query = "INSERT INTO logs (user, type, action, description, date) VALUES ('$user', '$type', '$action', '$description', '$date')";
    queryNR($query);
}

function send_message($embed, $webhook)
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

function request_pagarme($data)
{
    global $pagarmeKey;

    $ch = curl_init('https://api.pagar.me/core/v5/orders');
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Basic ' . $pagarmeKey,
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

        header('Content-Type: application/json');
        echo json_encode($responseData);
    }

    else {
        returnError("already_approved");
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

function check_session($token)
{
    $token = sanitize($token);

    $api = decrypt($token, GLOBAL_ENCKEY);

    $userQuery = "SELECT * FROM users WHERE api = '$api'";
    $userData = queryDBRows($userQuery);

    if (mysqli_num_rows($userData) > 0) {
        return $userData;
    } else {
        return null;
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

function getParties($result, $userId)
{
    $parties = [];

    if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            $headers = [];

            $partyIdHash = hash256($row["id"]);
            $code = $row["code"];
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

            if ($differenceInDays <= 2) {
                array_push($headers, 0);
            }

            $date = DateTime::createFromFormat("d/m/Y", $row["creation"]);
            $diff = $date->diff(DateTime::createFromFormat("d/m/Y", $todayDate));
            $differenceInDays = intval($diff->format("%a"));

            if ($differenceInDays <= 2) {
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
                        $user['hash'] = hash256($dsa['user']);
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
    $userData = check_session($_POST['token']);

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

        header('Content-Type: application/json');
        echo json_encode($parties);
    }
}

function calculateDistance($lat1, $lon1, $lat2, $lon2)
{
    $earthRadius = 6371;

    $lat1Rad = deg2rad($lat1);
    $lon1Rad = deg2rad($lon1);
    $lat2Rad = deg2rad($lat2);
    $lon2Rad = deg2rad($lon2);

    $deltaLat = $lat2Rad - $lat1Rad;
    $deltaLon = $lon2Rad - $lon1Rad;

    $a = sin($deltaLat / 2) * sin($deltaLat / 2) + cos($lat1Rad) * cos($lat2Rad) * sin($deltaLon / 2) * sin($deltaLon / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    $distance = $earthRadius * $c;

    return $distance;
}

function editUserData()
{
    $userData = check_session($_POST['token']);

    $data = sanitize($_POST['data']);

    foreach ($userData as $column) {
        $userName = $column["username"];

        $responseData = [
            'status' => 'success',
        ];

        if (isset($data['username'])) {
            $newToken = random_code(24);

            $newUsername = $data['username'];

            $query = "SELECT id FROM users WHERE username = '$newUsername'";
            $result = queryDB($query);

            if ($result && count($result) > 0) {
                returnError('used_username');
            } 
        }

        if (isset($data['password'])) {
            $newToken = random_code(24);

            $data['api'] = $newToken;

            $newPassword = $data['password'];

            $data['password'] = hash256($newPassword);
            $responseData['token'] = encrypt($newToken, GLOBAL_ENCKEY);
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
            } else {
                $query = "UPDATE users SET `$key` = '$value' WHERE id = '$id'";
                queryNR($query);
            }
        }

        header('Content-Type: application/json');
        echo json_encode($responseData);
    }
}

function getUserData()
{
    $userData = check_session($_POST['token']);

    if ($userData) {
        if (isset($_POST["profile"])) {
            $profile = sanitize($_POST["profile"]);

            $query = "SELECT * FROM users WHERE username = '$profile'";
            $userData = queryDBRows($query);
        }
    }

    foreach ($userData as $column) {
        $userId = $column["id"];

        $userHash = hash256($userId);

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

                        $query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$partyCode' AND paid = '1' OR method = 'dinheiro' AND party = '$partyCode'";
                        $partyConfirmed = queryDB($query)[0];

                        $temp = [
                            "hash" => hash256($partyId),
                            "name" => $party["name"],
                            "date" => $party["date"],
                            "start" => $party["start"],
                            "end" => $party["end"],
                            "confirmed" => $partyConfirmed,
                            "used" => $codeUsed,
                            "code" => $userCode,
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

                $query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$partyCode' AND paid = '1' OR method = 'dinheiro' AND party = '$partyCode'";
                $partyConfirmed = queryDB($query)['total_guests'];

                $temp = [
                    "hash" => hash256($partyId),
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

        $query = "SELECT * FROM logs WHERE type = 'user' AND user = '$userId'";
        $activityResults = queryDBRows($query);

        $activities = [];

        if (mysqli_num_rows($activityResults) > 0) {
            foreach ($activityResults as $activity) {
                $temp = [
                    "title" => $activity["title"],
                    "description" => $activity["description"],
                    "date" => $activity["date"],
                ];

                if ($activity["hash"] != "none") {
                    $temp["hash"] = $activity["hash"];
                }

                array_push($activity, $temp);
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

                $temp = [
                    "hash" => hash256($purchasePartyId),
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

                $temp = [
                    "hash" => hash256($commentId),
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
            $data['activity'] = $activities;
            $data['purchases'] = $purchases;
            $data['mine'] = true;
        } 
        
        else {
            $userData = check_session($_POST['token']);

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
            $var = $data[sanitize($_POST["requested"])];

            $data = [
                sanitize($_POST["requested"]) => $var,
            ];
        }

        if (isset($requested)) {

        }

        header('Content-Type: application/json');
        echo json_encode($data);
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
                        $user['hash'] = hash256($dsa['user']);
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
                $userData = check_session($_POST['token']);

                if ($userData) {
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
                        } elseif ($method == 'cartao') {
                            $income['card'] += $party_price;
                        } else {
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
            }

            header('Content-Type: application/json');
            echo json_encode($data);
        }
    } else {
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

    $date = date("d/m/Y H:i");

    $query = "SELECT price FROM parties WHERE code = '$party'";
    $price = queryDB($query)[0];

    do {
        $code = rand(1000, 9999);
        $query = "SELECT id FROM guests WHERE code = '$code' AND party = '$party'";
        $result = queryDBRows($query);
    } while (mysqli_num_rows($result) > 0);

    $paid = "0";

    if ($method == "cartao") {
        $paid = "1";
        $charge = "none";
    } 
    
    else if ($method == "pix") {
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

        $array = request_pagarme(json_encode($req));

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

    $query = "INSERT INTO guests (party, name, birth, email, method, date, code, charge, paid, used, deleted) VALUES ('$party', '$name', '$birth', '$email', '$method', '$date', '$code', '$charge', '$paid', '$used', '$deleted')";
    queryNR($query);

    $query = "SELECT id FROM guests WHERE code = '$code' AND party = '$party'";
    $guest = queryDB($query)[0];

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

    send_message($embed, $webhook);

    if ($method == "pix") {
        $data = [
            'guest' => $guest,
            'qrcode' => $qrcode,
            'status' => "success",
        ];

        header('Content-Type: application/json');
        echo json_encode($data);
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

        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        returnError("invalid_credentials");
    }
}

function clearUserNotifications()
{
    $userData = check_session($_POST['token']);

    foreach ($userData as $column) {
        $userName = $column["userName"];
        $userId = $column["id"];

        $query = "UPDATE notifications SET cleared = '1' WHERE user = '$userId' AND cleared = '0'";
        queryNR($query);

        $data = [
            'status' => "success",
        ];

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

function switchSaveEvent()
{
    $partyCode = sanitize($_POST['party']);

    $userData = check_session($_POST['token']);

    foreach ($userData as $column) {
        $userId = $column["id"];

        $dateTime = date('d/m/Y H:i');

        $query = "SELECT id FROM saved WHERE user = '$userId' AND party = '$partyCode'";
        $savedResults = queryDB($query);

        if ($savedResults) {
            $savedId = $savedResults[0];

            $deleteQuery = "DELETE FROM saved WHERE id = '$savedId'";
            queryNR($deleteQuery);

            $data = [
                'status' => "success",
                'action' => "unsaved"
            ];
        }

        else {
            $insertQuery = "INSERT INTO saved (`id`, `user`, `party`, `date`) VALUES (NULL, '$userId', '$partyCode', '$dateTime')";
            queryNR($insertQuery);

            $data = [
                'status' => "success",
                'action' => "saved"
            ];
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

function switchFollowUser()
{
    $userData = check_session($_POST['token']);

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
    $userData = check_session($_POST['token']);

    foreach ($userData as $column) {
        $userName = $column["username"];

        $query = "SELECT * FROM users WHERE username = '$userName'";

        $result = queryDBRows($query);

        if (mysqli_num_rows($result) > 0) {
            foreach ($result as $row) {
                $id = $row["id"];

                $query = "UPDATE notifications SET seen = '1' WHERE user = '$id' AND seen = '0'";
                queryNR($query);

                $data = [
                    'status' => "success",
                ];

                header('Content-Type: application/json');
                echo json_encode($data);
            }
        }
    }
}

function tryToWithdraw()
{
    $userData = check_session($_POST['token']);

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

            send_message($embed, $webhook);
        } 
        
        else {
            returnError("insufficient_balance");
        }
    }
}

function tryToDeleteEvent()
{
    $userData = check_session($_POST['token']);

    foreach ($userData as $column) {
        $userName = $column["userName"];

        $code = sanitize($_POST['code']);

        $query = "DELETE FROM parties WHERE code = '$code'";
        queryNR($query);
    }
}

function tryToSendMessage()
{
    $userData = check_session($_POST['token']);

    $destination = sanitize($_POST['destination']);
    $type = sanitize($_POST['type']);
    $content = sanitize($_POST['content']);

    foreach ($userData as $column) {
        $id = $column["id"];
        $date = date('d/m/Y H:i');

        if ($type == 'dm') {
            $query = "SELECT id FROM users WHERE username = '$destination'";
        } 
        
        else {
            $query = "SELECT id FROM parties WHERE code = '$destination'";
        }

        $destination = queryDB($query)[0];

        $query = "INSERT INTO messages (sender, date, destination, type, content) VALUES ('$id', '$date', '$destination', '$type', '$content')";
        queryNR($query);

        $data = [
            'status' => "success",
            'action' => "message_sent"
        ];
        
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

function getMessages()
{
    $userData = check_session($_POST['token']);

    $code = sanitize($_POST['code']);
    $type = sanitize($_POST['type']);

    foreach ($userData as $column) {
        $id = $column["id"];
        $username = $column["username"];

        if ($username == $code) {
            returnError("chatting_yourself");
        }

        if ($type == 'dm') {
            $query = "SELECT id FROM users WHERE username = '$code'";
        } 
        
        else {
            $query = "SELECT id FROM parties WHERE code = '$code'";
        }

        $chatId = queryDB($query)[0];

        if ($type == 'dm') {
            $query = "SELECT * FROM messages WHERE chatType = '$type' AND (sender = '$id' OR sender = '$chatId') ORDER BY `date` DESC";
            $messages = queryDBRows($query);
        } 
        
        else {
            $query = "SELECT * FROM messages WHERE chatType = '$type' AND destination = '$chatId' ORDER BY `date` DESC";
            $messages = queryDBRows($query);
        }

        $messagesArray = [];

        foreach ($messages as $row) {
            $sent = $row['sender'] == $id;
            $content = $row['content'];
            $dateString = $row["date"];
            list($datePart, $timePart) = explode(' ', $dateString);
            list($day, $month, $year) = explode('/', $datePart);
            $day = (int) $day;
            $month = convertMonth($month);
            $year = (int) $year;
            $destination = $row['destination'];

            $temp = [
                'sent' => $sent,
                'content' => $content,
                'date' => [
                    'day' => $day,
                    'month' => $month,
                    'year' => $year,
                    'hour' => $timePart,
                ],
                'destination' => $destination,
            ];

            array_push($messagesArray, $temp);
        }

        $data = [
            'messages' => $messagesArray,
        ];
        
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

function tryToCreateEvent()
{
    $userData = check_session($_POST['token']);

    foreach ($userData as $column) {
        $userName = $column["userName"];

        $details = sanitize($_POST['details']);

        $query = "SELECT id FROM users WHERE username = '$userName'";
        $host = queryDB($query)[0];

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

        $price = intval(str_replace(',', '.', $details['selectedPrice']));
        $start = date('H:i', strtotime($details['start']));
        $date = date('d/m/Y', strtotime($details['dateSelected']));
        $code = random_code(8);

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

        send_message($embed, $webhook);
    }
}

function tryToCreateUser()
{
    $email = sanitize($_POST['email']);
    $password = sanitize($_POST['password']);
    $name = sanitize($_POST['name']);
    $cpf = sanitize($_POST['cpf']);
    $birth = sanitize($_POST['birth']);

    $error = check_email($email) or check_password($password) or check_cpf($cpf);

    if (!isset($error)) {
        $token = "ec-" . encrypt($email, GLOBAL_ENCKEY);

        $api = random_code(24);

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

            send_message($embed, $webhook);

            $data = [
                'user' => $user,
                'status' => "success",
            ];

            header('Content-Type: application/json');
            echo json_encode($data);
        }
    } 
    
    else {
        returnError($error);
    }
}

?>