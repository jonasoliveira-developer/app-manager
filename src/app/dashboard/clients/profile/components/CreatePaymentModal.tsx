import { FaTimes } from 'react-icons/fa';
import { CreatePaymentForm } from '@/components/form/CreatePaymentForm';

interface Props {
  carePlanId: string;
  onClose: () => void;
  onCreated: () => void;
}

export function CreatePaymentModal({ carePlanId, onClose, onCreated }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-defaultDarkGreen">
          Criar pagamento
        </h2>
        <CreatePaymentForm
          carePlanId={carePlanId}
          onSuccess={() => {
            onCreated();
            onClose();
          }}
        />
      </div>
    </div>
  );
}