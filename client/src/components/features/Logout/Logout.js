import { API_URL } from "../../../config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth()

    useEffect(() => {
        // Pobranie zakodowanego tokena z sessionStorage
        const encodedAuthToken = sessionStorage.getItem('authToken');

        // Sprawdzenie, czy token istnieje
        if (encodedAuthToken) {
            const options = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${encodedAuthToken}`, // Dołączenie zakodowanego tokenu do nagłówka
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include', // Wysyłanie ciasteczek w zapytaniu
            };

            // Wysłanie żądania wylogowania
            fetch(`${API_URL}/auth/logout`, options)
                .then(() => {
                    setIsAuthenticated(false);
                    sessionStorage.clear();
                    
                    // Jeśli wylogowanie zakończyło się sukcesem, przekieruj na stronę główną
                    navigate('/');
                })
                .catch(error => {
                    console.error('Błąd podczas wylogowywania:', error.message);
                });
        } else {
            console.error("Brak zakodowanego tokenu JWT w sessionStorage.");
        }
    }, [navigate]);

    return null;
}

export default Logout;