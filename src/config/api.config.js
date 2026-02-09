// Configuração da API
// Altere apenas o valor de USE_LOCAL_API para true/false conforme necessário

const USE_LOCAL_API = false; // Mude para true se quiser usar localhost durante desenvolvimento

const API_CONFIG = {
    // Localhost - para desenvolvimento local
    LOCAL: 'http://localhost:5000',
    
    // Servidor remoto - produção
    REMOTE: 'http://200.144.255.186:2281'
};

export const getBaseURL = () => {
    if (USE_LOCAL_API) {
        console.log('Using LOCAL API:', API_CONFIG.LOCAL);
        return API_CONFIG.LOCAL;
    } else {
        console.log('Using REMOTE API:', API_CONFIG.REMOTE);
        return API_CONFIG.REMOTE;
    }
};

export default API_CONFIG;
