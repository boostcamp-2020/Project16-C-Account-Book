import { observable } from 'mobx';

export const createStore = () => {
  const store = {
    paymentMethod: [
      {
        name: 'Naver',
        desc: 'main method',
        color: 'hsla(120, 100%, 50%, 0.93)',
      },
      { name: 'Kakao', desc: 'sub method', color: 'hsla(40, 100%, 50%, 0.93)' },
    ],
    addPaymentMethod(data: { name: string; desc: string; color: string }) {
      this.paymentMethod = [data, ...this.paymentMethod];
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;
