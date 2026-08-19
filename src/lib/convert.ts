 export default function convertToMoney(price:number,code:string) {
    const number = Number(price);
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    }