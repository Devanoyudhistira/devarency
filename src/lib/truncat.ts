export default function truncate(input:string,number:number) {
  if (input.length > number) {
    return input.substring(0, number) + "";
  }
  return input;
}
