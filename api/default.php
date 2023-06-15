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
            );

            header('Content-Type: application/json');
            echo json_encode($data);
          }
        } 
      else {
        $response = 'No data found for the provided code';
        echo json_encode($response);
      }
      break;
    default:
      $response = 'Invalid function specified';
      echo json_encode($response);
      break;
  }
}

?>