import "./Error.css";

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-message">
        <span className="error-icon">🚧</span>
        <p>¡Ups! Algo salió mal. Por favor, intenta de nuevo más tarde.</p>
      </div>
    </div>
  );
};

export default Error;
