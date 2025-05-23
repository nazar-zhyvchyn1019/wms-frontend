import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useModel } from '@umijs/max';

export default () => {
  const [paymentTermList, setPaymentTermList] = useState<any[]>([]);
  const { initialState } = useModel('@@initialState');

  const initialPaymentTermList = useCallback(() => {
    if (initialState?.initialData) setPaymentTermList(initialState.initialData.paymentTerms);
    else setPaymentTermList([]);
  }, [initialState?.initialData]);

  useEffect(() => {
    if (initialState?.currentUser) {
      initialPaymentTermList();
    }
  }, [initialPaymentTermList, initialState?.currentUser]);

  return { paymentTermList, setPaymentTermList, initialPaymentTermList };
};
