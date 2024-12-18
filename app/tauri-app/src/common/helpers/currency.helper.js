export const formatCurrency = (value) => {
    return value.toLocaleString('cs-CZ', {
        style: 'currency',
        currency: 'CZK'
    });
};