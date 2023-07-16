<?php

include "keys.php";

function queryDB($query) {
    global $link;
    $result = $link->query($query);
    $row = mysqli_fetch_array($result);
    return $row;
}

function queryNR($query) {
    global $link;
    mysqli_query($link, $query);
}

function queryDBRows($query) {
    global $link;
    $result = $link->query($query);
    return $result;
}

function hash256($string) {
    $hash = hash("sha256", $string);
    return $hash;
}

function sanitize($s) {
    return filter_var($s, FILTER_SANITIZE_STRING);
}

function decrypt($text, $pkey) {
    $key = substr($pkey, 0, 16);
    $text = base64_decode($text);
    $IV = substr($text, strrpos($text, "-[--IV-[-") + 9);
    $text = str_replace("-[--IV-[-".$IV, "", $text);

    return rtrim(openssl_decrypt($text, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $IV), "\0");
}

function encrypt($text, $pkey) {
    $key = substr($pkey, 0, 16);
    $IV = openssl_random_pseudo_bytes(openssl_cipher_iv_length("AES-256-CBC"));

    return base64_encode(openssl_encrypt($text, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $IV)."-[--IV-[-".$IV);
}

function convertMonth($month) {
    $months = array(
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
      '12' => 'Dezembro'
    );

    return $months[$month];
}

function getDayOfWeek($dateString)
{
    $date = DateTime::createFromFormat('d/m/Y', $dateString);
    $dayOfWeek = $date->format('l');

    $dayNames = array(
        'Sunday' => 'Domingo',
        'Monday' => 'Segunda-feira',
        'Tuesday' => 'Terça-feira',
        'Wednesday' => 'Quarta-feira',
        'Thursday' => 'Quinta-feira',
        'Friday' => 'Sexta-feira',
        'Saturday' => 'Sábado'
    );

    return $dayNames[$dayOfWeek] ?? $dayOfWeek;
}

function check_email($email) {
  $query = "SELECT * FROM users WHERE email = '$email'";
  $result = queryDBRows($query);
  $num_rows = mysqli_num_rows($result);
  
  if ($num_rows > 0) {
      return "email_registered";
  } 
}

function check_cpf($cpf) {
  $query = "SELECT * FROM users WHERE cpf = '$cpf'";
  $result = queryDBRows($query);
  $num_rows = mysqli_num_rows($result);
  
  if ($num_rows > 0) {
      return "cpf_registered";
  } 
}

function check_password($password) {
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

function random_code($length) {
  $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  $charactersLength = strlen($characters);
  $code = '';
  
  for ($i = 0; $i < $length; $i++) {
      $randomIndex = random_int(0, $charactersLength - 1);
      $code .= $characters[$randomIndex];
  }

  return $code;
}

function register_log($user, $type, $action, $description = "NONE") {
  $variables = array(&$user, &$type, &$action, &$description);

  foreach ($variables as &$var) {
      $var = sanitize($var);
  }

  date_default_timezone_set('America/Sao_Paulo');
  $date = date('d/m/Y H:i');

  $query = "INSERT INTO logs (user, type, action, description, date) VALUES ('$user', '$type', '$action', '$description', '$date')";
  queryNR($query);
}

function send_message($embed, $webhook) {
  $payload = json_encode(array('content' => '', 'embeds' => array($embed)));

  $ch = curl_init($webhook);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($ch);
  curl_close($ch);
}

function getIp() {
  $ip = isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);

  return $ip;
}

function request_pagarme($data) {
  global $pagarmeKey;

  $ch = curl_init('https://api.pagar.me/core/v5/orders');
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/json',
      'Authorization: Basic '.$pagarmeKey,
      'Accept: application/json')
  );

  $result = curl_exec($ch);

  curl_close($ch);

  $array = json_decode($result, true);

  return $array;
}

function returnError($error) {
  $data = array(
    'error' => $error,
    'status' => "fail"
  );

  header('Content-Type: application/json');
  echo json_encode($data);

  exit();
}

function checkRequest($request) {
    global $requests;

    if (in_array($request, $requests)) {
        return true;
    }

    else {
        return false;
    }
}

function getHelpData() {
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
                        "answer" => $answer
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
                            "answer" => $answer
                        ]
                    ]
                ];
            }
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function check_session($username, $validator) {
    $userQuery = "SELECT * FROM users WHERE username = '$username'";
    $user = queryDBRows($userQuery);

    if (mysqli_num_rows($user) > 0) {
        foreach ($user as $row) {
            $password = $row["password"];
        }
    }

    $generatedValidator = hash256($username.$password);

    if ($generatedValidator == $validator) {
        return true;
    }
    
    else {
        return false;
    }
}

function getFeedData() {
    $query = "SELECT * FROM parties WHERE STR_TO_DATE(CONCAT(`date`, ' ', `time`), '%d/%m/%Y %H:%i') > CONVERT_TZ(NOW(), '+00:00', '-03:00') ";

    if (isset($_POST['searchTerm'])) {
        $searchTerm = $_POST['searchTerm'];
        $query .= " AND name LIKE '%".$searchTerm."%'";
    }

    if (isset($_POST['filterParameters'])) {
        $filterParameters = $_POST['filterParameters'];

        if (isset($filterParameters["address"]) && $filterParameters["radius"]) {
            $userAddress = $filterParameters["address"];
            $locationRadius = $filterParameters["radius"];

            $requestToOpenstreet = "https://nominatim.openstreetmap.org/search?q=" . urlencode($userAddress) . "&format=json";
    
            $httpOptions = [
                "http" => [
                    "method" => "GET",
                    "header" => "User-Agent: Nominatim-Test"
                ]
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

    $parties = [];

    if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            // 0 - Fecha em breve | 1 - Impulsionada | 2 - Bombando | 3 - Criada recentemente | 4 - Com desconto | 5 - Esgotando | 6 - Verificada
            $headers = [];

            $code = $row["code"];
            $capacity = $row["capacity"];
            $hash = hash256($code);
    
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

            if ($differenceInDays <= 2) {
                array_push($headers, 6);
            }
    
            $data = [
                'hash' => $hash,
                'price' => $row["price"],
                'code' => $code,
                'time' => $row["time"],
                'confirmed' => $confirmed,
                'capacity' => $capacity,
                'headers' => $headers,
                'title' => $row["name"]
            ];

            if (isset($_POST['hype'])) {
                if (count($headers) > 0) {
                    array_push($parties, $data);
                }
            }

            else {
                array_push($parties, $data);
            }
        }

        header('Content-Type: application/json');
        echo json_encode($parties);
    } 

    else {
        returnError("no_data");
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

function editUserData() {
    global $enckey;

    $username = $_POST['username'];
    $validator = $_POST['validator'];
    $data = $_POST['data'];

    if (strlen($username) >= 30) {
        $username = decrypt($_POST['username'], $enckey);
    }

    if (check_session($username, $validator)) {
        $responseData = [
            'status' => 'success',
        ];

        if (isset($data['username'])) {
            $newUsername = $data['username'];
        
            $query = "SELECT id FROM users WHERE username = '$newUsername'";
            $result = queryDB($query);
        
            $query = "SELECT password FROM users WHERE username = '$username'";
            $passwordResult = queryDB($query);
        
            if ($result && count($result) > 0) {
                returnError('used_username');
            } 
            
            else {
                $responseData['username'] = encrypt($newUsername, $enckey);
        
                if ($passwordResult && count($passwordResult) > 0) {
                    $password = $passwordResult[0];
                    $responseData['validator'] = hash256($newUsername . $password);
                } 
                
                else {
                    returnError('invalid_session');
                }
            }
        }

        $query = "SELECT id FROM users WHERE username = '$username'";
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
                $query = "UPDATE users SET `$key` = '$value' WHERE id = '$id'";
                queryNR($query);
            }
        }

        header('Content-Type: application/json');
        echo json_encode($responseData);
    } 
    
    else {
        returnError('invalid_session');
    }
}

function getUserData() {
    global $enckey;

    $username = $_POST['username'];
    $validator = $_POST['validator'];

    if (isset($_POST["requested"])) {
        $requested = $_POST["requested"];
    }
    
    if (strlen($username) >= 30) {
        $username = decrypt($_POST['username'], $enckey);
    }

    $query = "SELECT * FROM users WHERE username = '$username'";
  
    $result = queryDBRows($query);
    
    if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            $id = $row["id"];

            $query = "SELECT COUNT(*) as total_parties FROM parties WHERE host = '$id'";
            $events = queryDB($query)[0];

            $hash = hash256($id);

            $query = "SELECT * FROM interests WHERE user = '$id'";
            $interestsResult = queryDBRows($query);
            
            $interests = [];
            
            if (mysqli_num_rows($interestsResult) > 0) {
                foreach ($interestsResult as $iResult) {
                    array_push($interests, $iResult["interest"]);
                }
            }

            $query = "SELECT * FROM balances WHERE user = '$id'";
            $info = queryDBRows($query);

            if (mysqli_num_rows($info) > 0) {
                foreach ($info as $i) {
                    $balances = [
                        "available" => number_format($i["available"], 2, ',', '.'),
                        "processing" => number_format($i["processing"], 2, ',', '.'),
                        "retained" => number_format($i["retained"], 2, ',', '.'),
                        "requested" => number_format($i["requested"], 2, ',', '.')
                    ];
                }
            }

            $query = "SELECT * FROM concierges WHERE host = '$id'";
            $userConcierges = queryDBRows($query);

            $concierges = [];

            if (mysqli_num_rows($userConcierges) > 0) {
                foreach ($userConcierges as $concierge) {
                    $temp = [
                        "name" => $concierge["name"],
                        "token" => $concierge["token"]
                    ];

                    array_push($concierges, $temp);
                }
            }

            $query = "SELECT * FROM guests WHERE user = '$id'";
            $userParties = queryDBRows($query);
            
            $partiesWent = [];
            
            if (mysqli_num_rows($userParties) > 0) {
                foreach ($userParties as $userParty) {
                    $partyCode = $userParty["party"];
                    $userCode = $userParty["code"];
                    $codeUsed = $userParty["used"];
                    
                    $partyQuery = "SELECT name, date, start, end FROM parties WHERE code = '$partyCode'";
                    $partyResult = queryDBRows($partyQuery);
                    
                    if (mysqli_num_rows($partyResult) > 0) {
                        $userParty = mysqli_fetch_assoc($partyResult);
                        
                        $hash = hash256($partyCode);

                        $guests_query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$partyCode' AND paid = '1' OR method = 'dinheiro' AND party = '$partyCode'";
                        $confirmed = queryDB($guests_query)['total_guests'];
            
                        $temp = [
                            "hash" => $hash,
                            "name" => $userParty["name"],
                            "date" => $userParty["date"],
                            "start" => $userParty["start"], 
                            "end" => $userParty["start"], 
                            "confirmed" => $confirmed,
                            "used" => $codeUsed, 
                            "code" => $userCode
                        ];
            
                        array_push($partiesWent, $temp);
                    }
                }
            }

            $query = "SELECT * FROM parties WHERE host = '$id'";
            $userParties = queryDBRows($query);

            $partiesMade = [];

            if (mysqli_num_rows($userParties) > 0) {
                foreach ($userParties as $party) {
                    $code = $party["code"];
                    $hash = hash256($code);

                    $guests_query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$code' AND paid = '1' OR method = 'dinheiro' AND party = '$code'";
                    $confirmed = queryDB($guests_query)['total_guests'];

                    $temp = [
                        "hash" => $hash,
                        "code" => $code,
                        "name" => $party["name"],
                        "date" => $party["date"],
                        "start" => $party["start"],
                        "end" => $party["end"],
                        "capacity" => $party["capacity"],
                        "confirmed" => $confirmed
                    ];

                    array_push($partiesMade, $temp);
                }
            }

            $query = "SELECT * FROM notifications WHERE user = '$id'";
            $userNotifications = queryDBRows($query);

            $notifications = [];

            $notified = false;

            if (mysqli_num_rows($userNotifications) > 0) {
                foreach ($userNotifications as $notification) {
                    if ($notification["cleared"] == "0") {
                        $temp = [
                            "id" => $notification["id"],
                            "title" => $notification["title"],
                            "content" => $notification["content"],
                            "date" => $notification["date"]
                        ];
    
                        array_push($notifications, $temp);
                    }

                    if ($notification["seen"] == "0") {
                        $notified = true;
                    }
                }
            }

            $query = "SELECT COUNT(*) AS followerCount FROM followers WHERE followed = '$id'";
            $followers = queryDB($query)[0];

            $query = "SELECT COUNT(*) AS followingCount FROM followers WHERE follower = '$id'";
            $following = queryDB($query)[0];

            $query = "SELECT c.*, u.name FROM comments AS c 
            INNER JOIN parties AS p ON c.party = p.code 
            INNER JOIN users AS u ON c.user = u.id 
            WHERE p.host = '$id'";
  
            $userComments = queryDBRows($query);
            
            $comments = [];
            
            if (mysqli_num_rows($userComments) > 0) {
                foreach ($userComments as $comment) {
                    $userCommentId = $comment["user"];

                    $query = "SELECT username FROM users WHERE id = '$userCommentId'";
                    $unm = queryDB($query)[0];

                    $temp = [
                        "user" => $userCommentId,
                        "username" => $unm,
                        "name" => $comment["name"],
                        "content" => $comment["content"],
                        "rate" => $comment["rate"],
                        "date" => $comment["date"]
                    ];
            
                    array_push($comments, $temp);
                }
            }
            
            $data = [
                'hash' => $hash,
                'username' => $username,
                'name' => $row["name"],
                'about' => $row["about"],
                'interests' => $interests,
                'followers' => $followers,
                'following' => $following,
                'verified' => $row["verified"],
                'events' => $events,
                'comments' => $comments,
                'partiesMade' => $partiesMade,
                'partiesWent' => $partiesWent,
                'mine' => false,
            ];

            if (check_session($username, $validator)) {
                $data['cpf'] = $row["cpf"];
                $data['balances'] = $balances;
                $data['notifications'] = $notifications;
                $data['notified'] = $notified;
                $data['concierges'] = $concierges;
                $data['mine'] = true;
            }

            if (isset($_POST["comparison"])) {
                $comparison = $_POST["comparison"];
            
                if (strlen($comparison) >= 30) {
                    $comparison = decrypt($_POST['comparison'], $enckey);
                }
            
                $query = "SELECT id FROM users WHERE username = '$username'";
                $followedId = queryDB($query)[0];

                if (!empty($followedId)) {
                    $query = "SELECT id FROM users WHERE username = '$comparison'";
                    $followingId = queryDB($query)[0];

                    if (!empty($followingId)) {
                        $query = "SELECT id FROM followers WHERE follower = '$followingId' AND followed = '$followedId'";
                        $result = queryDB($query);
            
                        if (!empty($result)) {
                            $data['follower'] = true;
                        } 
                        
                        else {
                            $data['follower'] = false;
                        }
                    } 
                } 
            }

            if (isset($requested)) {
                $var = $data[$requested];

                $data = [
                    $requested => $var
                ];
            }

            header('Content-Type: application/json');
            echo json_encode($data);
        }
    } 

    else {
      returnError("no_data");
    }
}

function getInviteData() {
  global $enckey;

  $code = $_POST['code'];

  $query = "SELECT * FROM parties WHERE code = '$code'";

  $result = queryDBRows($query);
  if (mysqli_num_rows($result) > 0) {
    foreach ($result as $row) {
        $host = $row["host"];

        $query = "SELECT name FROM users WHERE id = '$host'";
        $host = queryDB($query)['name'];

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
        $db = queryDBRows($query);

        if (mysqli_num_rows($db) > 0) {
          foreach ($db as $info) {
            $users[] = ['name' => $info['name']];
          }
        }

        if (isset($_POST['username'])&&isset($_POST['validator'])) {
            $validator = $_POST['validator'];
            $username = $_POST['username'];
        
            if (strlen($username) >= 30) {
                $username = decrypt($_POST['username'], $enckey);
            }

            if (check_session($username, $validator)) {
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

            }
          }

          $data = [
            'date' => [
                'day' => $day,
                'month' => $month,
                'rawMonth' => $rawmonth,
                'year' => $year,
                'dayOfWeek' => $dayOfWeek,
            ],
            'impressions' => [
                'views' => $impressions_count,
                'clicks' => $views_count,
                'purchases' => 0,
            ],
            'income' => $income,
            'pricePerItem' => $row["price"],
            'hour' => [
                'start' => $row["start"],
                'end' => $row["end"]
            ],
            'address' => $row["address"],
            'host' => $host,
            'title' => $row["name"],
            'description' => $row["description"],
            'users' => $users,
            'guests' => [
                'capacity' => $row["capacity"],
                'confirmed' => $confirmed,
            ],
        ];

        header('Content-Type: application/json');
        echo json_encode($data);
      }
    } 
  else {
    returnError("no_data");
  }
}

function sendChatMessage() {
    $messageContent = $_POST['content'];

}


function tryToCreateGuest() {
  $party = $_POST['code'];
  $name = $_POST['name'];
  $birth = $_POST['birth'];
  $email = $_POST['email'];
  $method = $_POST['method'];

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
                "quantity" => 1
            ]
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
                    "area_code" => "51"
                ]
            ]
        ],
        "payments" => [
            [
                "payment_method" => "pix",
                "pix" => [
                    "expires_in" => "1800",
                    "additional_information" => [
                        [
                            "name" => "Código da Resenha: ".$party,
                            "value" => "1"
                        ]
                    ]
                ]
            ]
        ]
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
              'inline' => false
          ],
          [
              'name' => 'Email',
              'value' => $email,
              'inline' => false
          ],
          [
              'name' => 'Método',
              'value' => $method,
              'inline' => false
          ],
          [
              'name' => 'Preço',
              'value' => 'R$ '.$price,
              'inline' => false
          ],
          [
              'name' => 'Resenha',
              'value' => $party,
              'inline' => false
          ],
          [
              'name' => 'Código',
              'value' => $code,
              'inline' => false
          ],
      ]
  ];

  send_message($embed, $webhook);

  register_log($guest, "guest", "guest_created", "ID: ".$guest);

  if ($method == "pix") {
    $data = array(
      'guest' => $guest,
      'qrcode' => $qrcode,
      'status' => "success"
    );

    header('Content-Type: application/json');
    echo json_encode($data);
  }
}

function getMessages() {
    global $link;
    $chatCode = $_POST['code'];
    $type = $_POST['type'];
    $chatId = '';

    if ($type !== 'dm' && $type !== 'group') {
        throw new Exception("Invalid chat type: " . $type);
    }

    if ($type === 'dm') {
        $stmt = $link->prepare("SELECT id FROM users WHERE username = ?");
    } else {
        $stmt = $link->prepare("SELECT id FROM parties WHERE code = ?");
    }
    
    if ($stmt === false) {
        throw new Exception("Failed to prepare statement: " . $link->error);
    }
    
    if (!$stmt->bind_param("s", $chatCode)) {
        throw new Exception("Failed to bind parameters: " . $stmt->error);
    }

    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement: " . $stmt->error);
    }
    
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if (!$row) {
        throw new Exception("No chat found with code: " . $chatCode);
    }

    $chatId = $row['id'];

    $query = "SELECT id, sender, date, destination, type, content FROM messages WHERE destination = ?";

    $stmt = $link->prepare($query);
    if ($stmt === false) {
        throw new Exception("Failed to prepare statement: " . $link->error);
    }
    
    if (!$stmt->bind_param("i", $chatId)) {
        throw new Exception("Failed to bind parameters: " . $stmt->error);
    }

    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement: " . $stmt->error);
    }

    $query_result = $stmt->get_result();

    $messages = array();

    while ($row = $query_result->fetch_assoc()) {
        $message = array(
            'id' => $row['id'],
            'sender' => $row['sender'],
            'date' => $row['date'],
            'destination' => $row['destination'],
            'type' => $row['type'],
            'content' => $row['content']
        );

        $messages[] = $message;
    }

    return $messages;
}


function tryToAuthenticate() {
    global $enckey;

    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $password_hash = hash256($password);

    $query = "SELECT username, token, password FROM users WHERE email = '$email'";
    $user = queryDB($query);

    if (!$user) {
        returnError("nonexistent_user");
    } 

    elseif ($user["password"] !== $password_hash) {
        returnError("invalid_credentials");
    } 
    
    elseif (substr($user["token"], 0, 2) == "ec") {
        returnError("unconfirmed_email");
    } 
    
    elseif ($user) {
        $validator = hash256($user["username"].$user["password"]);

        $username = encrypt($user["username"], $enckey);

        $data = array(
            'username' => $username,
            'validator' => $validator
        );

        header('Content-Type: application/json');
        echo json_encode($data);
    } 

    else {
        returnError("unexpected_error");
    }
}

function clearUserNotifications() {
    global $enckey;

    $username = $_POST['username'];
    $validator = $_POST['validator'];
    
    if (strlen($username) >= 30) {
        $username = decrypt($_POST['username'], $enckey);
    }

    if (check_session($username, $validator)) {
        $query = "SELECT * FROM users WHERE username = '$username'";
    
        $result = queryDBRows($query);
        
        if (mysqli_num_rows($result) > 0) {
            foreach ($result as $row) {
                $id = $row["id"];

                $query = "UPDATE notifications SET cleared = '1' WHERE user = '$id' AND cleared = '0'";
                queryNR($query);

                $data = array(
                    'status' => "success"
                );

                header('Content-Type: application/json');
                echo json_encode($data);
            }
        }
    }

    else {
      returnError("invalid_session");
    }
}

function switchFollowUser() {
    global $enckey;

    $username = $_POST['username'];
    $validator = $_POST['validator'];
    $profile = $_POST['profile'];
    
    if (strlen($username) >= 30) {
        $username = decrypt($_POST['username'], $enckey);
    }

    if (check_session($username, $validator)) {
        $query = "SELECT id FROM users WHERE username = '$username'";
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
                        'action' => "unfollowed"
                    ];
                } 
                
                else {
                    $insertQuery = "INSERT INTO followers (`id`, `follower`, `followed`, `date`) VALUES (NULL, '$followingId', '$followedId', '$currentDate')";
                    queryNR($insertQuery);
        
                    $data = [
                        'status' => "success",
                        'action' => "followed"
                    ];
                }

                header('Content-Type: application/json');
                echo json_encode($data);
            } 
            
            else {
                returnError("invalid_profile");
            }
        } 
        
        else {
            returnError("invalid_profile");
        }
    }
}

function seeUserNotifications() {
    global $enckey;

    $username = $_POST['username'];
    $validator = $_POST['validator'];
    
    if (strlen($username) >= 30) {
        $username = decrypt($_POST['username'], $enckey);
    }

    if (check_session($username, $validator)) {
        $query = "SELECT * FROM users WHERE username = '$username'";
    
        $result = queryDBRows($query);
        
        if (mysqli_num_rows($result) > 0) {
            foreach ($result as $row) {
                $id = $row["id"];

                $query = "UPDATE notifications SET seen = '1' WHERE user = '$id' AND seen = '0'";
                queryNR($query);

                $data = array(
                    'status' => "success"
                );

                header('Content-Type: application/json');
                echo json_encode($data);
            }
        }
    }

    else {
      returnError("invalid_session");
    }
}

function tryToWithdraw() {
    global $enckey;

    $username = $_POST['username'];
    $validator = $_POST['validator'];
    $amount = intval($_POST['amount']);
    
    if (strlen($username) >= 30) {
        $username = decrypt($_POST['username'], $enckey);
    }

    if (check_session($username, $validator)) {
        $query = "SELECT * FROM users WHERE username = '$username'";
        $r = queryDBRows($query);

        if (mysqli_num_rows($r) > 0) {
            foreach ($r as $in) {
                $id = $in["id"];
                $name = $in["name"];
                $email = $in["email"];
            }
        }

        $query = "SELECT * FROM balances WHERE user = '$id'";
        $result = queryDBRows($query);
        
        if (mysqli_num_rows($result) > 0) {
            foreach ($result as $row) {
                $available = $row["available"];
                $requested = $row["requested"];
                $retained = $row["retained"];
                $processing = $row["processing"];
            }
        }

        if ($amount <= $available && $amount >= 50.00) {
            $newRequested = $requested + $amount;
            $newAvailable = $available - $amount;

            $query = "UPDATE balances SET requested = $newRequested, available = $newAvailable WHERE user = '$id'";
            queryNR($query);

            $embed = [
                'title' => 'Novo saque solicitado!',
                'color' => hexdec('7d00ff'),
                'fields' => [
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
                        "value" => "R$ ".number_format($newAvailable, 2, ',', '.'),
                    ],
                    [
                        "name" => "Saldo em Processamento",
                        "value" => "R$ ".$processing,
                    ],
                    [
                        "name" => "Saldo Retido",
                        "value" => "R$ ".$retained,
                    ],
                    [
                        "name" => "Saldo Solicitado",
                        "value" => "R$ ".$newRequested,
                    ],
                    [
                        "name" => "Valor da Solicitação",
                        "value" => "R$ ".number_format($amount, 2, ',', '.'),
                    ]
                ]
            ];
        
            $webhook = "https://discord.com/api/webhooks/1116575716646068254/xAmqlhC3WpinvTw-HI5hdbom6-FA94YuY1v5NEUONTSXwroXTwA3PgaqTazIxezTFGn7";
        
            send_message($embed, $webhook);
        } 
        
        else {
            returnError("insufficient_balance");
        }
    }

    else {
      returnError("invalid_session");
    }
}

function tryToCreateUser() {
    global $enckey;

    $email = $_POST['email'];
    $password = $_POST['password'];
    $name = $_POST['name'];
    $cpf = $_POST['cpf'];
    $birth = $_POST['birth'];

        $error = check_email($email) or check_password($password) or check_cpf($cpf);
        
        if (!isset($error)) {
            $token = "ec-".encrypt($email, $enckey);

            $api = random_code(24);

            $date = date('d/m/Y H:i');

            $registration = getIp();

            $last = getIp();

            $pix = "NONE";

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
                        ]
                    ]
                ];
            
                send_message($embed, $webhook);
            
                register_log($user, "host", "user_registered");

                $data = array(
                'user' => $user,  
                'status' => "success"
                );

                header('Content-Type: application/json');
                echo json_encode($data);
            }
        }

    else {
        returnError($error);
    }
}

?>