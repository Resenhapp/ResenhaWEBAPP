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

function convertMonth($month)
{
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
    // $username = $_POST['username'];

    $query = "SELECT * FROM parties";
  
    $result = queryDBRows($query);

    $parties = [];

    $query = "SELECT * FROM parties";
  
    $result = queryDBRows($query);
    if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            $code = $row["code"];
            $hash = hash256($code);
    
            $guests_query = "SELECT COUNT(*) AS total_guests FROM guests WHERE party = '$code' AND paid = '1' OR method = 'dinheiro' AND party = '$code'";
            $confirmed = queryDB($guests_query)['total_guests'];
    
            $data = [
                'hash' => $hash,
                'price' => $row["price"],
                'code' => $code,
                'time' => $row["time"],
                'confirmed' => $confirmed,
                'capacity' => $row["capacity"],
                'tags' => $row["tags"],
                'title' => $row["name"]
            ];

            array_push($parties, $data);
        }

        header('Content-Type: application/json');
        echo json_encode($parties);
    } 

    else {
        returnError("no_data");
    }
}

function getUserData() {
    global $enckey;

    $username = $_POST['username'];
    $validator = $_POST['validator'];
    
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

            $query = "SELECT * FROM notifications WHERE user = '$id'";
            $userNotifications = queryDBRows($query);

            $notifications = [];

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
                }
            }

            $query = "SELECT c.*, u.name FROM comments AS c 
            INNER JOIN parties AS p ON c.party = p.code 
            INNER JOIN users AS u ON c.user = u.id 
            WHERE p.host = '$id'";
  
            $userComments = queryDBRows($query);
            
            $comments = [];
            
            if (mysqli_num_rows($userComments) > 0) {
                foreach ($userComments as $comment) {
                    $temp = [
                        "user" => $comment["user"],
                        "name" => $comment["name"],
                        "content" => $comment["content"],
                        "rate" => $comment["rate"],
                        "date" => $comment["date"]
                    ];
            
                    array_push($comments, $temp);
                }
            }

            $query = "SELECT COUNT(*) AS followerCount FROM followers WHERE followed = '$id'";
            $followers = queryDB($query)[0];
            
            $query = "SELECT COUNT(*) AS followingCount FROM followers WHERE follower = '$id'";
            $following = queryDB($query)[0];

            $data = array(
                'hash' => $hash,
                'username' => $username,
                'name' => $row["name"],
                'about' => $row["about"],
                'interests' => $row["interests"],
                'followers' => $followers,
                'following' => $following,
                'verified' => $row["verified"],
                'events' => $events,
                'comments' => $comments,
                'mine' => false
            );

            if (check_session($username, $validator)) {
                $data['cpf'] = $row["cpf"];
                $data['balances'] = $balances;
                $data['notifications'] = $notifications;
                $data['concierges'] = $concierges;
                $data['mine'] = true;
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

        $data = array(
            'pricePerItem' => $row["price"],
            'day' => $day,
            'month' => $month,
            'year' => $year,
            'dayOfWeek' => $dayOfWeek,
            'confirmed' => $confirmed,
            'maxguests' => $row["capacity"],
            'hour' => $row["time"],
            'address' => $row["address"],
            'host' => $host,
            'title' => $row["name"],
            'description' => $row["description"],
            'users' => $users
        );

        header('Content-Type: application/json');
        echo json_encode($data);
      }
    } 
  else {
    returnError("no_data");
  }
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