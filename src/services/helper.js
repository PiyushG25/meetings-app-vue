// extracts the response and returns reponse data
export const successHandler = response => response.data;

// gets error, logs the error and throws the error
export const errorHandler = error => {
    console.log( error.message );
    throw error;
}