export const FloatingActionButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 left-6  bg-primary-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary-700 transition-transform hover:scale-110"
    aria-label="Add new item"
  >
    <i className="fas fa-plus text-xl"></i>
  </button>
);
