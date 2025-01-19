import { API_URL } from '../config/api';

interface LoginResponse {
    ok: boolean;
    token?: string;
    message?: string;
    user?: any;
}

class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(data.message || 'Error en el inicio de sesión');
        }

        if (!data.token) {
            throw new ApiError('No se recibió el token de autenticación');
        }

        return {
            token: data.token,
            user: data.user || {
                id: "1",
                username: email.split('@')[0],
                email: email,
                avatarUrl: "https://example.com/avatar.jpg",
                nombre: "Usuario",
                apellido: "Ejemplo",
                fechaNacimiento: new Date("1990-01-01"),
                DNI: "12345678A",
            }
        };
    } catch (error) {
        // No logging here, just throw the error
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Error de conexión con el servidor');
    }
}

export async function registerUser(userData: {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    nombreUsuario: string;
    fechaNacimiento: Date;
    DNI: string;
}): Promise<{ token: string; user: any }> {
    try {
        console.log('Iniciando solicitud de registro a:', `${API_URL}/register`);

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (!response.ok) {
            const error = new ApiError(data.message || 'Error en el registro');
            throw error;
        }

        if (!data.token) {
            throw new ApiError('No se recibió el token de autenticación');
        }

        return {
            token: data.token,
            user: data.user || {
                id: "2",
                username: userData.nombreUsuario,
                email: userData.email,
                avatarUrl: "https://example.com/avatar.jpg",
                nombre: userData.nombre,
                apellido: userData.apellido,
                fechaNacimiento: userData.fechaNacimiento,
                DNI: userData.DNI,
            }
        };
    } catch (error) {
        console.error('Error en registerUser:', error);
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Error de conexión con el servidor');
    }
}

