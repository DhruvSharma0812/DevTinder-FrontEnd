import io from "socket.io-client";

export const createSocketConnection = () => {
    const token = localStorage.getItem ("authToken");
    return io ("http://localhost:7777", {
        auth : {token},
        withCredentials : true,
    });
};