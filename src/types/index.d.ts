// Tipos de dados do LoRa
export interface LoraMessage {
  id: number;
  payload: string;
  rssi: number;
  snr: number;
  timestamp: string;
}

export interface LoraConfig {
  frequency: number;
  bandwidth: number;
  spreadingFactor: number;
}

export interface LoraDeviceStatus {
  deviceId: string;
  status: 'online' | 'offline';
}

// Resposta esperada do endpoint /getdata
export interface LoRaData {
    status: LoraDeviceStatus;
    config: LoraConfig;
    messages: LoraMessage[];
}

// Tipos de Autenticação
export interface User {
    id: string;
    name: string;
    email: string;
}

// Resposta esperada dos endpoints /login e /register
export interface AuthResponse {
    token: string;
    user: User;
}