#include <lmic.h>
#include <hal/hal.h>
#include <SPI.h>
#include <CayenneLPP.h>
CayenneLPP lpp(51) //tamaño del mensaje

uint8_t NWSK[16] = {};
uint8_t APPSKEY[16] = {};
uint32_t DEVADDR = 0x1232134;



void os_getArtEui(u1_t* buf){}
void os_getDevEui(u1_t* buf){}
void os_getDevKey(u1_t* buf){}

const unsigned TX_INTERVAL = 10;
unsigned long previousMillis = 0;

const lmic_pinmap lmic_pins = {
  .nss = 5,
  .rxtx = LMIC_UNUSED_PIN,
  .rst = 14
  .dio = { 2, 33, 32 }
};

void onEvent(ev_t ev){
  switch(ev){
    case EV_TXCOMPLETE:
    break;
    default:
    Serial.println("Evento desconocido");
    break;
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println("[INFO] Iniciando");
  os_init(); //Se inicia el sistema operativo de LMIC
  LMIC_reset(); //Se resetea la libreria
  LMIC_setSession(0x1,DEVADDR,NWSK,APPSKEY); //Se crea una sesion ABP con las credenciales correspondientes
  for(int chan = 0; chan < 72; ++chan){
    LMIC_disableChannel(chan); //Se desactivan los canales que no estan en uso
  }
  //904.3 Mhz banda de 915, la cual va de 902-928Mhz
  LMIC_enableChannel(10);//El canal 10 corresponde a la freq 904.3
  LMIC_setLinkCheckMode(0); //Se desactiva una opcion de redundancia
  LMIC(setDrTxpow(DR_SF7,20); //Se fija la velocidad de transmision de datos y la potencia
  previousMillis = millis(); //Se iguala a milis puesto que la conexion lleva un tiempo
}

void loop() {
  if(millis() > previousMillis + (TX_INTERVAL * 1000)){ //Se multiplica tx interval para pasarlo a milisegundos
    
  }
  
  os_runloop_one(); //Cada vez que se complete un loop se va a ejecutar un ciclo del sistema operativo

}

void enviar_datos(uint8_t *mydata, uint16_t len){
  if(LMIC.opmode & OP_TXRXPEND){
    Serial.println("[LMIC] OP_TXRXPEND, not sending");
  } else {
    LMIC_setTxData2(1,mydata,len, 0);
  }
}

void getInfoAndSend(){
  lpp.addDigitalOutput(1,dato); //Se pasa el canal por el cual ira el dato y la variable del dato
  enviar_datos(lpp.getBuffer(),lpp.getSize()); //Se pasan los datos y la longitud
}
