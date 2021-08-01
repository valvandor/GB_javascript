/**
 * Объект с настройками игры.
 * @property {int} rowsCount Количество строк в карте.
 * @property {int} colsCount Количество колонок в карте.
 */
const config = {
    rowsCount: 10,
    colsCount: 10,
};

const availableDirections = [1, 2, 3, 4, 6, 7, 8, 9];
const textOfDirections = '1, 2, 3, 4, 6, 7, 8 или 9'