'use strict'
/*
Написать функцию, преобразующую число в объект. Передавая на вход число в диапазоне [0, 999],
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны 
разряды числа:
- единицы (в свойстве units)
- десятки (в свойстве tens)
- сотни (в свойстве hundereds)
Например, для числа 45 мы должны получить следующий объект:
units: 5, //это единицы
tens: 4, //это десятки
hundreds: 0, //это сотни
Если число было передано вне [0, 999] диапазона, не целое число или вообще не число,
необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

/**
 * makes Object with ranks of number in range from 0 to 999 inclusive 
 * @param {Number} number 
 * @returns {Object} Object with digits of number or 
 * empty Object if (isNan(number) || number not in [0, 999])
 */
function getNumberRanks(number) {
    if (!Number.isInteger(number) || number < 0 || number > 999) {
        console.log('Значение аргумента — целое число в интервале от 0 до 999 включительно')
        return {}
    }

    return {
        units: number % 10,
        tens: Math.floor(number / 10) % 10,
        hundreds: Math.floor(number / 100)
    };
}

// some tests
console.log(getNumberRanks(1));           // {units: 1, tens: 0, hundreds: 0}
console.log(getNumberRanks(15));          // {units: 5, tens: 1, hundreds: 0}
console.log(getNumberRanks(180));         // {units: 0, tens: 8, hundreds: 1}
console.log(getNumberRanks(1000));        // {}