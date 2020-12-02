export default function CommaMaker(money) {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
