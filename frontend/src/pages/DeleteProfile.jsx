const DeleteAccount = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
      <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Delete Account</h2>
      <p className="mb-6">This action is irreversible. Are you sure?</p>
      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
        Confirm Delete
      </button>
    </div>
  );
};

export default DeleteAccount;
