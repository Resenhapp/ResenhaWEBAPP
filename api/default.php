<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

define("DB_SERVER", "31.170.160.154");
define("DB_NAME", "u878630845_resenha");
define("DB_USERNAME", "u878630845_resenha");
define("DB_PASSWORD", "ADjnidada@8452!");

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
$iv = chr(0x1) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);

$method = 'aes-256-cbc';
$enckey = 'lifeisaparty';

global $enckey;

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

function hash256($string) {
  $hash = hash("sha256", $string);
  return $hash;
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

if (isset($_POST['function'])) {
  $function = $_POST['function'];
  switch ($function) {
    case 'getInviteData':
      $code = $_POST['code'];

      $query = "SELECT * FROM parties WHERE code = '$code'";

      $result = queryDBRows($query);
      if (mysqli_num_rows($result) > 0) {
        foreach ($result as $row) {
            $price = number_format($row["price"], 2, ',', '.');
    
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
                'price' => $price,
                'day' => $day,
                'month' => $month,
                'year' => $year,
                'dayOfWeek' => $dayOfWeek,
                'confirmed' => $confirmed,
                'maxguests' => $row["capacity"],
                'hour' => $row["time"],
                'address' => $row["address"],
                'host' => $host,
                'name' => $row["name"],
                'description' => $row["description"],
                'users' => $users
            );

            header('Content-Type: application/json');
            echo json_encode($data);
          }
        } 
      else {
        $data = array(
          'error' => "no_data",
          'status' => "fail"
        );
  
        header('Content-Type: application/json');
        echo json_encode($data);
      }

      break;
    
    case 'tryToAuthenticate':
      $email = $_POST['email'];
      $password = $_POST['password'];
      
      $password_hash = hash256($password);
    
      $query = "SELECT id, token, password FROM users WHERE email = '$email'";
      $user = queryDB($query);
    
      if (!$user) {
          $data = array(
            'error' => "nonexistent_user",
            'status' => "fail"
          );
    
          header('Content-Type: application/json');
          echo json_encode($data);
      } 
    
      elseif ($user["password"] !== $password_hash) {
          $data = array(
            'error' => "invalid_credentials",
            'status' => "fail"
          );
    
          header('Content-Type: application/json');
          echo json_encode($data);
      } 
      
      elseif (substr($user["token"], 0, 2) == "ec") {
          $data = array(
            'error' => "unconfirmed_email",
            'status' => "fail"
          );
    
          header('Content-Type: application/json');
          echo json_encode($data);
      } 
      
      elseif ($user) {
          $user = $user["id"];
          $validator = hash256($email.$password_hash);
    
          $data = array(
            'user' => $user,
            'validator' => $validator
          );

          header('Content-Type: application/json');
          echo json_encode($data);
      } 
    
      else {
          $data = array(
            'error' => "unexpected_error",
            'status' => "fail"
          );
    
          header('Content-Type: application/json');
          echo json_encode($data);
      }
      break;
    
    case 'tryToCreateUser':
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
        $data = array(
          'error' => $error,
          'status' => "fail"
        );

        header('Content-Type: application/json');
        echo json_encode($data);
      }

      break;
    default:
      $data = array(
        'error' => "invalid_function",
        'status' => "fail"
      );

      header('Content-Type: application/json');
      echo json_encode($data);
      break;
  }
}

?>