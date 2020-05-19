
#include <WiFi.h>
#include <PubSubClient.h>

// Replace the next variables with your SSID/Password combination
const char* ssid = "IZZI-AEB0";
const char* password = "8871B1BEAEB0";

// Add your MQTT Broker IP address, example:
//const char* mqtt_server = "192.168.0.144";
const char* mqtt_server = "192.168.0.6";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

// LED Pin
const char lamp1 = 23;
const char lamp2 = 22;
const char AC = 19;
const char extra = 21;
const char ledPin = 2;

void setup() {
  Serial.begin(115200);
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  pinMode(ledPin, OUTPUT);
  pinMode(lamp1, OUTPUT);
  pinMode(lamp2, OUTPUT);
  pinMode(AC, OUTPUT);
  pinMode(extra, OUTPUT);
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Conectando a :");
  Serial.println(ssid);

  
  while (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(ssid, password);
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Mensaje recibido en topico: ");
  Serial.print(topic);
  Serial.print(" Mensaje: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  // Feel free to add more if statements to control more GPIOs with MQTT

  // If a message is received on the topic esp32/output, you check if the message is either "on" or "off". 
  // Changes the output state according to the message
  if (String(topic) == "esp32/lamp1") {
    Serial.print("Changing lamp1 to ");
    if(messageTemp == "Encendido"){
      Serial.println("Encendido");
      digitalWrite(lamp1, HIGH);
    }
    else if(messageTemp == "Apagado"){
      Serial.println("Apagado");
      digitalWrite(lamp1, LOW);
    }
  }
    if (String(topic) == "esp32/lamp2") {
    Serial.print("Changing lamp2 to ");
    if(messageTemp == "Encendido"){
      Serial.println("Encendido");
      digitalWrite(lamp2, HIGH);
    }
    else if(messageTemp == "Apagado"){
      Serial.println("Apagado");
      digitalWrite(lamp2, LOW);
    }
  }
    if (String(topic) == "esp32/ac") {
    Serial.print("Changing AC to ");
    if(messageTemp == "Encendido"){
      Serial.println("Encendido");
      digitalWrite(AC, HIGH);
    }
    else if(messageTemp == "Apagado"){
      Serial.println("Apagado");
      digitalWrite(AC, LOW);
    }
  }
  if (String(topic) == "esp32/extra") {
    Serial.print("Changing extra output to ");
    if(messageTemp == "Encendido"){
      Serial.println("Encendido");
      digitalWrite(extra, HIGH);
    }
    else if(messageTemp == "Apagado"){
      Serial.println("Apagado");
      digitalWrite(extra, LOW);
  }
}
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.println("Estableciendo la conexion MQTT...");
    // Attempt to connect
    if (client.connect("ESP32")) {
      Serial.println("Conectado");
      // Subscribe
      client.subscribe("esp32/lamp1");
      client.subscribe("esp32/lamp2");
      client.subscribe("esp32/ac");
      client.subscribe("esp32/extra");
    } else {
      Serial.print("Error de conexion, rc=");
      Serial.print(client.state());
      Serial.println("Intentando en 5 segundos");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;
    char* mensaje = "mensaje desde la esp32";
    
    /* client.publish("esp32/test", mensaje);
    /*digitalWrite(ledPin, HIGH);
    delay(1000);
    digitalWrite(ledPin, LOW);
    delay(1000);*/
    /*Serial.println("Mensaje enviado");
*/
  }
}
