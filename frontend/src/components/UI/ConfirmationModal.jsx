import { Dialog } from '@headlessui/react';

const ConfirmModal = ({ open, onCancel, onConfirm, title, children }) => (
  <Dialog open={open} onClose={onCancel} className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="bg-black/50 inset-0 fixed" />   {/* backdrop */}
    <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-lg">
      <Dialog.Title className="text-lg font-semibold mb-2">{title}</Dialog.Title>
      <div className="text-sm text-gray-600 dark:text-gray-300">{children}</div>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-1 rounded border">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-1 rounded bg-red-600 hover:bg-red-700 text-white">Yes, delete</button>
      </div>
    </Dialog.Panel>
  </Dialog>
);

export default ConfirmModal;
