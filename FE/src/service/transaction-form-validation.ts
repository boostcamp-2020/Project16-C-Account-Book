const validateForm = input => {
  const { category, payment, cost } = input;
  const error = new Error();

  if (!category.name) {
    error.name = 'CATEGORY_UNSET';
    error.message = '카테고리를 선택해주세요';
    throw error;
  }
  if (!payment.name) {
    error.name = 'PAYMENT_UNSET';
    error.message = '결제수단을 선택해주세요';
    throw error;
  }
  if (cost === 0) {
    error.name = 'PRICE_UNSET';
    error.message = '금액을 설정해주세요';
    throw error;
  }

  return true;
};

export default validateForm;
