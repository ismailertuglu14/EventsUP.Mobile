/**
 * Converts an object to a query string.
 *
 * @param {Object} params - The object containing key-value pairs to be converted.
 * @returns {string} The query string representation of the object.
 *
 * @example
 * // Example usage:
 * const params = {
 *   name: 'John',
 *   age: 30,
 *   city: 'New York'
 * };
 * const queryString = toQueryString(params);
 * console.log(queryString); // Output: "?name=John&age=30&city=New%20York"
 */
export const toQUeryString = (params: any): String => {
    if (params === null || params === undefined) {
        return "";
    }

    let queryString = "?";
    for(const key in params){
        if(params.hasOwnProperty(key)){
            queryString += `${key}=${encodeURIComponent(params[key])}&`;
        }
    }
    return queryString.slice(0, -1);
};