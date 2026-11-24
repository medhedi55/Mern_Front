import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../redux/uiSlice.js';

export default function NotificationToast() {
  const toast = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toast.visible) return;

    const timeoutId = setTimeout(() => dispatch(hideToast()), 3000);
    return () => clearTimeout(timeoutId);
  }, [dispatch, toast]);

  return toast.visible ? <div className="notification-toast" role="status">{toast.message}</div> : null;
}
