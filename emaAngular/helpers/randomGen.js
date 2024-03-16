const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * function to get a certain amount of letters
 * 
 * @param {number} amount - the length you want 
 * @returns amount lengthed string
 */
exports.getLetter = function(amount){
    output=''
    for (let i=0;i<amount;i++){
        output+=alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return output;
}

/**
 * function to get a certain amount of numbers
 * 
 * @param {number} amount - the number of digits you want 
 * @returns amount digited number
 */
exports.getNumber = function(amount){
    output='';
    for (let i=0;i<amount;i++){
        output += Math.floor(Math.random()*9);
    }
    return output;
}

/**
 * function to get the hours and minutes
 * 
 * @param {number} totalMinutes - amount in minutes
 * @returns dictionary with hours and minutes
 */
exports.getTime = function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return { hours, minutes };
  }