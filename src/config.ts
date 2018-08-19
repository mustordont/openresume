let baseUrl = "";
if (process.env.NODE_ENV === "production") {
   baseUrl = "http://yourdomain.com/api/";
} else {
   baseUrl = "https://api-demo.websanova.com/";
}

export default {
    apiUrl: baseUrl,
};