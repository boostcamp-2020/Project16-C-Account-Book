import { getDefaultMethods } from '../../api/defaultPaymentMethod';
import { ResponseMessage } from '../../util/message';

export const createStore = () => {
  const store = {
    defaultMethods: [],
    addTemplateData: { name: '', color: '' },
    paymentMethod: [
      {
        name: 'Naver',
        desc: 'main method',
        color: 'hsla(120, 100%, 50%, 0.93)',
      },
      { name: 'Kakao', desc: 'sub method', color: 'hsla(40, 100%, 50%, 0.93)' },
    ],

    async initialMethods() {
      try {
        const res = await getDefaultMethods();
        if (res.status !== ResponseMessage.success) {
          throw new Error();
        }
        this.defaultMethods = res.data;
      } catch (error) {
        throw new Error();
      }
    },

    addPaymentMethod(data: { name: string; desc: string; color: string }) {
      this.paymentMethod = [data, ...this.paymentMethod];
    },
    updateAddTemplate(data: { name: string; color: string }) {
      this.addTemplateData = {
        ...this.addTemplateData,
        name: data.name,
        color: data.color,
      };
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;
