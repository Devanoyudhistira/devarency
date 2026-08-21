 export default function convertToMoney(price:number,code:string) {
    const number = Number(price);
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: code,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }