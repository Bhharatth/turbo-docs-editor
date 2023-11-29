import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface messageTypes{
message: string
}

const ToastAlert: React.FC<messageTypes> = ({ message }) => {
  toast.error(message);
  return null;
};

export default ToastAlert;