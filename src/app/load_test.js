import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 20 }, // 20 utilisateurs simultanés
        { duration: '2m', target: 50 }, // Montée à 50 utilisateurs
        { duration: '1m', target: 0 },  // Descente à 0 utilisateur
    ],
};

//https://sgimali-frontend.vercel.app/
export default function () {
    let res = http.get('http://localhost:3000/');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'content includes title': (r) => r.body.includes('<title>'),
    });
    sleep(1);
}
