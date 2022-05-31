import { Subscription } from 'rxjs';
export default class SharedUtils {
  static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  static unSubscribe(subscriptions: Subscription[]) {
    subscriptions.forEach(sub => sub.unsubscribe())
  }

  static formatSeconds(s: number): string {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + Math.ceil(s);
  }

  static formatMoney(amount: number) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
