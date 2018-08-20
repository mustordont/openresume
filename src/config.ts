let baseUrl = '';
if (process.env.NODE_ENV === 'production') {
   baseUrl = 'http://yourdomain.com/api/';
} else {
   baseUrl = 'http://localhost:8000/';
}

export const CONFIG: {[key: string]: any} = {
    apiUrl: baseUrl,
};
